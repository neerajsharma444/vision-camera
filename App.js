import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
// import store from './src /redux/store/store';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './Navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    // <Provider store={store}>
    <AppNavigator />
    // </Provider>
  );
};

export default App;
