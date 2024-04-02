import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Component/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation hook
import { useTranslation } from 'react-i18next';

const VerifyOtpScreen = () => {
  const route=useRoute();
  let loginType=route.params.loginType;

  console.log("loginType",route.params.loginType);

  const { t } = useTranslation();

  const [sentOTP] = useState('1234'); // Initialize with the correct sent OTP
  const [otp, setOTP] = useState('');
  const navigation = useNavigation(); // Initialize navigation object

  const otpInputRefs = useRef([
    ...Array.from({ length: 4 }).map(() => useRef(null))
  ]);

  const handleOTPChange = (index, value) => {
    if (value && /^[0-9]$/.test(value)) {
      setOTP(prevOTP => {
        const updatedOTP = prevOTP.split('');
        updatedOTP[index] = value;
        return updatedOTP.join('');
      });

      if (index < otpInputRefs.current.length - 1 && value) {
        otpInputRefs.current[index + 1].current.focus();
      }
    } else if (!value) {
      setOTP(prevOTP => {
        const updatedOTP = prevOTP.split('');
        updatedOTP[index] = '';
        return updatedOTP.join('');
      });

      if (index > 0) {
        otpInputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handleVerifyOTPButtonClick = () => {
    // Trim any leading or trailing whitespace from the entered OTP
    const trimmedOTP = otp.trim();

    // Check if the trimmed OTP matches the sent OTP
    if (trimmedOTP === sentOTP) {
      // If OTP is verified, display a success message
      Alert.alert('Success', 'OTP Verified Successfully');
      // Navigate to the appropriate screen based on the loginType
      if (loginType === 'login') {
        navigation.navigate('home');
      } else if (loginType === 'register') {
        navigation.navigate('profile');
      }
    } else {
      // If OTP is invalid, display an error message
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <LinearGradient
      colors={['#8ee4a5', '#01a399']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.whiteBox}>
        <Icon name="car" size={50} color="#0cba70" />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>{t('enter_code')}</Text>
        <Text style={styles.description}>
          {t('enter_code_description')}
        </Text>
        <View style={styles.topBar} />
        <View style={styles.whiteBoxs}>
          <View style={styles.containers}>
            {Array.from({ length: 4 }).map((_, index) => (
              <TextInput
                key={index}
                ref={otpInputRefs.current[index]}
                style={styles.input}
                placeholder=""
                placeholderTextColor="#e7e7e7"
                backgroundColor='#e7e7e73'
                keyboardType="numeric"
                maxLength={1}
                onChangeText={value => handleOTPChange(index, value)}
                value={otp[index] || ''}
              />
            ))}
          </View>
          <CustomButton title={t('verify_otp')} onPress={handleVerifyOTPButtonClick} />
          <Text style={styles.agreeText}> {t('didnt_receive_code')} </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  topBar: {
    backgroundColor: 'white',
    height: 5,
    width: '20%',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  carContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  whiteBox: {
    backgroundColor: 'white',
    width: '30%',
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -370,
  },
  whiteBoxs: {
    backgroundColor: 'white',
    width: 320,
    height: 180,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D7D7D7',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  buttonContainer: {
    width: '90%',
    marginBottom: -80,
    marginTop: -20, // Add margin bottom to create space between input and next element
    // Adjust width as needed
  },
  agreeContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreeText: {
    marginTop: 10,
    marginLeft: 5, // Adjust margin as needed
    color: 'black',
  },
  containers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: -10,
  },
});

export default VerifyOtpScreen;
