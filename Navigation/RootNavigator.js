/* eslint-disable react/react-in-jsx-scope */
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // const isAuthenticated = true;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          </>
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
