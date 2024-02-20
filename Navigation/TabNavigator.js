import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Post from '../Screens/Post';
import Home from '../Screens/Home';
import {TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarInactiveBackgroundColor: '#3f3f3f',
        }}>
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
            headerStyle: {
              backgroundColor: 'black',
              borderBottomWidth: 0.4,
            },
            tabBarStyle: {backgroundColor: 'black'},
            tabBarIcon: () => (
              <FontAwesome name="home" size={32} color="aqua" />
            ),
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
              marginLeft: 10,
              fontFamily: 'DancingScript-Bold',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CameraScreen')}>
                <Entypo
                  name="cross"
                  size={40}
                  color="aqua"
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>
            ),
            // headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'black',
              borderBottomWidth: 0.4,
            },
            tabBarStyle: {backgroundColor: 'black'},
            tabBarIcon: () => (
              <Feather name="plus-square" size={28} color="aqua" />
            ),
            tabBarLabel: '',
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default TabNavigator;
