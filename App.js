import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
// import store from './src /redux/store/store';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './Navigation/RootNavigator';
import {handleDatabase} from './handleDatabase';
import {Filter} from './Filter';
import Test from './Test';

// handleDatabase();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    // <Provider store={store}>
    <Test />
    // </Provider>
  );
};

export default App;
