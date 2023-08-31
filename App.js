import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import AddItemScreen from './screens/AddItem';
import PhotoScreen from './screens/Photos';
import { TouchableOpacity, Image } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: '#333',
          },
          headerTintColor: '#333',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerTitle: 'Home',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => console.log('Settings Pressed')}
              >
                <Image 
                source={require('./styles/settings.png')} 
                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen 
          name="AddItem" 
          component={AddItemScreen}
          options={{
            headerTitle: 'Add Item',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => console.log('Settings Pressed')}
              >
                <Image 
                source={require('./styles/settings.png')} 
                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            ),
          }}        
        />
        <Stack.Screen 
          name="Photos" 
          component={PhotoScreen}
          options={{
            headerTitle: 'Photos',
            headerTitleAlign: 'center',
          }}        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
