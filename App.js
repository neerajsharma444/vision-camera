import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
// import store from './src /redux/store/store';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './Navigation/RootNavigator';
import requestUserPermission from './src/Push_Notification/Notification';
import getToken from './src/Push_Notification/Notification';
import {handleDatabase} from './src/FireBaseDataBase/FirebaseDatabase';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    getToken();
    requestUserPermission();
    handleDatabase();
  }, []);

  return (
    // <Provider store={store}>
    <RootNavigator />
    // </Provider>
  );
};

export default App;
