/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from '../Screens/Feed';
import CreatePost from '../Screens/CreatePost';
// import Profile from '../Screens/Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EditProfile from '../Screens/EditProfile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator style={styles.tabNavigator}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={22} color="#000" />,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="plus" size={22} color="#000" />,
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={22} color="#000" />,
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabNavigator: {
    backgroundColor: '#F1F1F1',
  },
});

export default TabNavigator;
