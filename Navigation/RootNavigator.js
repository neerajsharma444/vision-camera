import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../Screens/CameraScreen';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {handleDatabase} from '../src/FireBaseDataBase/FirebaseDatabase';
import Home from '../Screens/Home';
import Post from '../Screens/Post';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            title: 'MY POST',
            headerShown: true,
            headerStyle: {backgroundColor: '#1C6758'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              // fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('CameraScreen')}>
                <Feather
                  name="plus-square"
                  size={35}
                  color="white"
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            title: 'Post',
            headerShown: true,
            headerStyle: {backgroundColor: '#1C6758'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
