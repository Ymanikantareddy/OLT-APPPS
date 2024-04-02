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
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translation function (t)

  return (
    <Drawer.Navigator
  initialRouteName="language" // Set the position to "bottom"
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
      name="language"
      component={LanguageSelectionScreen}
      options={{
        headerShown: false,
        drawerLabel: t('language'), // Translate the label here

        drawerItemStyle: { display: 'none' }
}}
/>

<Drawer.Screen
  name="home"
  component={HomeScreen}
  options={({ navigation }) => ({
    drawerLabel: t('home'), // Translate the label here
    drawerIcon: ({ color, size }) => (
      <MaterialIcons name="home" size={size} color={'white'} />
    ),
    headerShown: false, // Hide the header
  })}
/>
    <Drawer.Screen
      name="orders"
      component={OrdersScreen}
      options={{
        drawerLabel: t('orders'), // Translate the label here

        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="receipt" size={size} color={'white'} />
          
        ),
        headerShown: false,
      }}
    />
     <Drawer.Screen
      name="notification"
      component={NotificationScreen}
      options={{
        drawerLabel: t('notification'), // Translate the label here

        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="notifications" size={size} color={'white'} />
          ),
          headerShown: false, // Hide the header

      }}
    />
     <Drawer.Screen
      name="Help Center"
      component={HelpScreen}
      options={{
        drawerLabel: t('help_center'), // Translate the label here

        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="help-outline" size={size} color={'white'} />
        ),
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        drawerLabel: t('settings'), // Translate the label here

        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="settings" size={size} color={'white'} />
        ),
        headerShown: false, // Hide the header

      }}
    />
    

<Drawer.Screen
  name="profile"
  component={ProfileScreen}
  options={({ navigation }) => ({
    drawerLabel: t('profile'), // Translate the label here
    drawerIcon: ({ color, size }) => (
      <MaterialIcons name="person" size={size} color={'white'} />
    ),
    headerShown: false, // Hide the header

  })}
/>

<Drawer.Screen
  name="Finding a Driver"
  component={DriverScreen}
  options={{
    drawerLabel: t('finding_driver'), // Translate the label here

    headerShown: false,

    drawerItemStyle: { display: 'none' }
}}
/>

   
    <Drawer.Screen
      name="Refer a Friend"
      component={ReferScreen}
      options={{
        headerShown: false,
        drawerLabel: t('refer_friend'), // Translate the label here

        drawerItemStyle: { display: 'none' }
}}
/>
   

<Drawer.Screen
      name="Review"
      component={ReviewScreen}
      options={{
        headerShown: false,
        drawerLabel: t('review'), // Translate the label here

        drawerItemStyle: { display: 'none' }
}}
/>
  
    <Drawer.Screen
      name="Arrive"
      component={ArriveScreen}
      options={{
        headerShown: false,
        drawerLabel: t('arrive'), // Translate the label here

        drawerItemStyle: { display: 'none' }
}}
/>

<Drawer.Screen
      name="OnboardingScreen"
      component={OnboardingScreen}
      options={{
        drawerLabel: t('onboarding'), // Translate the label here

        headerShown: false,

        drawerItemStyle: { display: 'none' }
}}
/>
   
    
    <Drawer.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
        headerShown: false,
        drawerLabel: t('login'), // Translate the label here

        drawerItemStyle: { display: 'none' }
}}
/>
  {/* Other screens */}
  <Drawer.Screen
    name="VerifyOtpScreen"
    component={VerfiyOtpScreen}
    options={{
      headerShown: false,
      drawerLabel: t('verify_otpp'), // Translate the label here
      drawerItemStyle: { display: 'none' }
    }}
  />
    {/* Add other screens if needed */}
    <Drawer.Screen
      name="Sign Out"
      component={SignOutScreen}
      options={{
        // drawerLabel: 'Sign Out',
        drawerLabel: t('sign_out'), // Translate the label here

        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="exit-to-app" size={size} color={'white'}  />
        ),

      }}

    />
  </Drawer.Navigator>
);
    }
export default AppNavigator;