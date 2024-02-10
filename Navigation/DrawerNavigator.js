/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import SearchFeed from '../Screens/SearchFeed';
import SearchUser from '../Screens/SearchUser';
import DeleteAccount from '../Screens/DeleteAccount';
import Logout from '../Screens/Logout';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: () => <FontAwesome name="home" size={22} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Search Feed"
        component={SearchFeed}
        options={{
          drawerIcon: () => (
            <FontAwesome name="search" size={22} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Search User"
        component={SearchUser}
        options={{
          drawerIcon: () => <FontAwesome name="user" size={22} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Delete Account"
        component={DeleteAccount}
        options={{
          drawerIcon: () => <FontAwesome name="trash" size={22} color="red" />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: () => (
            <FontAwesome name="sign-out" size={22} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
