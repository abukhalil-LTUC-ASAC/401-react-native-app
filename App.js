import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Text, View, Button, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

function App(props) {

  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setPermissions(true);
  };

  const showContacts = async () => {
    const contactList = await Contacts.getContactsAsync();
    setContacts(contactList.data);
  };


  useEffect( () => {
    getPermissions();
  }, []);

  const call = contact => {
    let phoneNumber = contact.phoneNumbers[0].number.replace(/[\(\)\-\s+]/g, '');
    console.log(contact.phoneNumbers)
    let link = `tel:${phoneNumber}`;
    Linking.canOpenURL(link).then(supported=> Linking.openURL(link)).catch(console.error);
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={showContacts}
        title="Show Contacts"
      />

      <View style={styles.section}>
        <Text>Data asdsd...</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>{
            console.log(item);
          return <Button style={styles.person} title={item.name + ''} onPress={()=> call(item) } />}
        }/>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  person: {
    marginTop:'1em',
  },
  section: {
    margin: 10,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
  },
});

export default App;
