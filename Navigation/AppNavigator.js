import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraScreen from '../Screens/CameraScreen';
import OpenCamera from '../Screens/OpenCamera';
import ImageScreen from '../Screens/ImageScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OpenCamera"
          component={OpenCamera}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
