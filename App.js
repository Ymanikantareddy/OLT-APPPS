// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Drawer/AppNavigator';
const App = () => (
  <NavigationContainer>
  {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}

    <AppNavigator />

  </NavigationContainer>
);

export default App;
