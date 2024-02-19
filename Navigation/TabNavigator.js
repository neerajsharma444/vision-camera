import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Post from '../Screens/Post';
import Home from '../Screens/Home';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Posts',
          headerTitleStyle: {
            fontSize: 35,
            color: 'aqua',
            fontFamily: 'DancingScript-Bold',
          },
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'black', borderBottomWidth: 0.4},
          tabBarStyle: {backgroundColor: 'black'},
          tabBarIcon: () => <FontAwesome name="home" size={32} color="aqua" />,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          title: 'New post',
          headerTitleStyle: {
            fontSize: 35,
            color: 'aqua',
            fontFamily: 'DancingScript-Bold',
          },
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'black', borderBottomWidth: 0.4},
          tabBarStyle: {backgroundColor: 'black'},
          tabBarIcon: () => (
            <FontAwesome name="plus-square" size={30} color="aqua" />
          ),
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
