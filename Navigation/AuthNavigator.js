import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import DrawerNavigator from './DrawerNavigator';
import EditProfile from '../Screens/EditProfile';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
