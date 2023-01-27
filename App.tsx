import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import * as React from 'react';
import {StorageContextProvider} from './src/context/StorageContext';
import HomeScreen from './src/screens/Home';
import NewScreen from './src/screens/New';
import NoteScreen from './src/screens/Note';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <StorageContextProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: () => null,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="New" component={NewScreen} />
            <Stack.Screen name="Note" component={NoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </StorageContextProvider>
  );
};

export default App;
