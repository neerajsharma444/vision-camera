import React from 'react';
import {Provider} from 'react-redux';
import store from './Redux/store';
import RootNavigator from './Navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
