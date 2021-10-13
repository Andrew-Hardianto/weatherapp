import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import Router from './src/router';


function App() {
  return (
    <NavigationContainer>
      <Router />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

export default App;