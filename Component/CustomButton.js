// Import necessary components and libraries
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import the icon library you are using

const CustomButton = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
        {icon && <MaterialIcons name={icon} size={24} color="white" style={{ marginRight: 8 }} />}
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
