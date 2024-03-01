import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
        <LinearGradient
        colors={['#8ee4a5', '#01a399']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          flexDirection: 'row', // Align items horizontally
          justifyContent: 'center', // Center items horizontally
          alignItems: 'center', // Center items vertically
        }}
      >
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Wallet"
        onPress={() => props.navigation.navigate('Wallet')}
      /> </LinearGradient>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
