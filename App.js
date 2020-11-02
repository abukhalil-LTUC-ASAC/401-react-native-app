  import React, {useState, useEffect} from 'react';
  import { StyleSheet, FlatList, Text, View, Button, Linking } from 'react-native';
  import * as Permissions from 'expo-permissions';
  import * as Contacts from 'expo-contacts';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';

  function ContactsScreen({ navigation }) {

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

        <Button
          onPress={() => navigation.navigate('Location')}
          title="Show Location"
        />

        <View style={styles.section}>
          <Button
          onPress={() => navigation.navigate('Contacts')}
          title="Return to Home"
          />
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
      marginTop:'3em',
    },
    section: {
      margin: 15,
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      marginTop: 35,
    },
  });


  function LocationScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Here lies the location data, if I had any.</Text>
        <Button
          onPress={() => navigation.navigate('Contacts')}
          title="Return to Home"
          />
      </View>
    );
  }


  const Stack = createStackNavigator();

  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contacts">
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


  export default App;
