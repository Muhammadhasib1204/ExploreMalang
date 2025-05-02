import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screen/home';
import Favorite from './src/screen/favorite';
import Profile from './src/screen/profile';
import Pencarian from './src/screen/pencarian';
import EditProfil from './src/screen/editprofile';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Pencarian" component={Pencarian} />
        <Stack.Screen name="EditProfil" component={EditProfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
