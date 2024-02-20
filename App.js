import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './Navigation/RootNavigator';
import BlurImage from './Components/Filters/BlurImage';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RootNavigator />
    // <BlurImage />
  );
};

export default App;
