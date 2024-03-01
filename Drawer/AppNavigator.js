// AppNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DriverScreen from '../screens/DriverScreen';
import ReferScreen from '../screens/ReferScreen';
import HelpScreen from '../screens/HelpScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import OrdersScreen from '../screens/OrdersScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ArriveScreen from '../screens/ArriveScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import VerfiyOtpScreen from '../screens/VerfiyOtpScreen';
import SettingScreen from '../screens/SettingScreen';
import SignOutScreen from '../screens/SignOutScreen';
const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  
  <Drawer.Navigator
  initialRouteName="Home" // Set the position to "bottom"
  // Set initial route to "Onboarding"
  screenOptions={{
    drawerStyle: {
      backgroundColor: '#01a399',
      width: 240,
    },
    drawerLabelStyle: {
      color: 'white',
    },
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'space-between',  // Align items at the bottom
      paddingBottom: 20,  // Add bottom margin
    },
  }}
>
 <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>

     <Drawer.Screen
    name="OnboardingScreen"
    component={OnboardingScreen}
    options={{
      drawerIcon: ({ color, size }) => (
        <MaterialIcons name="home" size={size} color={'white'}back />
      ),
      headerShown: false, // Hide the header
    }}
  />
    <Drawer.Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="receipt" size={size} color={'white'} />
          
        ),
        headerShown: false,
      }}
    />
     <Drawer.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="notifications" size={size} color={'white'} />
          ),
      }}
    />
     <Drawer.Screen
      name="Help Center"
      component={HelpScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="help-outline" size={size} color={'white'} />
        ),
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="settings" size={size} color={'white'} />
        ),
      }}
    />
     <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="person" size={size} color={'white'} />
          ),
      }}
    />
    <Drawer.Screen
      name="Finding a Driver"
      component={DriverScreen}
      options={{
        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>
    <Drawer.Screen
      name="Refer a Friend"
      component={ReferScreen}
      options={{
        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>
   

<Drawer.Screen
      name="ReviewScreen"
      component={ReviewScreen}
      options={{
        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>
  
    <Drawer.Screen
      name="Arrive"
      component={ArriveScreen}
      options={{
        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>

  
   
    
    <Drawer.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>
    <Drawer.Screen
      name="VerfiyOtpScreen"
      component={VerfiyOtpScreen}
      options={{
        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>
    {/* Add other screens if needed */}
    <Drawer.Screen
      name="SignOut"
      component={SignOutScreen}
      options={{
        drawerLabel: 'Sign Out',
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="exit-to-app" size={size} color={'white'}  />
        ),

      }}

    />
  </Drawer.Navigator>
);

export default AppNavigator;
