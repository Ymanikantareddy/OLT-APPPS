import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import  CustomButton from'../Component/CustomButton';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icons from 'react-native-vector-icons/MaterialIcons'; // Replace 'MaterialIcons' with the icon set you want to use
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

const LoginScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation(); // Initialize navigation object
  const [mobileNumber, setMobileNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [sentOTP, setSentOTP] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);
  const [registrationType, setRegistrationType] = useState('Self'); // Default value 'Self'

  const handleFocus = () => {
    setInputFocused(true);
  };
  const handleCallButtonPress = () => {
    // Add your logic for handling the call button press here
    console.log('Call button pressed!');
    // You can implement the functionality to make a call or perform any other action.
  };
  
  const handleMobileNumberChange = (text) => {
    // Validate the input format
    if (/^[0-9]{0,10}$/.test(text) || text === '') {
      // Update the state only if the input is valid
      setMobileNumber(text);
    }

  };
  const handleSendSMSButtonClick = (loginType) => {
    // Generate a random OTP (for demonstration purposes)
    const randomOTP = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit OTP
    setSentOTP(randomOTP.toString()); // Convert OTP to string and store it
    // Simulate sending SMS with OTP
    // console.log('Sending SMS OTP to:', mobileNumber);
    // console.log('SMS OTP:', randomOTP);
    // navigation.navigate('VerfiyOtpScreen');
    if (loginType === 'register') {
      navigation.navigate('VerifyOtpScreen', { loginType: 'register' });
    } else {
      navigation.navigate('VerifyOtpScreen', { loginType: 'login' });
    }
    // You can replace the above console logs with your actual logic to send the OTP via SMS
  };
  const handleCancelButtonClick = () => {
    // Add your logic to handle cancel button click
    // For example:
    console.log('Cancel button clicked');
  };
  const handleAgreeButtonClick = () => {
    setAgreed(!agreed);
  };

 const renderDriverNumberInput = () => {
  if (registrationType === 'Self') {
    return (
      <TextInput
        style={styles.inputt}
        placeholder={t('Enter Your Mobile Number')}
        keyboardType="phone-pad"
        onChangeText={(text) => setMobileNumber(text)}
        value={mobileNumber}
      />
    );
  } else if (registrationType === 'Refer') {
    return (
      <>
        <TextInput
          style={styles.inputs}
          placeholder={t('Enter Refer Driver Number')}
          keyboardType="phone-pad"
          onChangeText={(text) => {}}
        />
        <TextInput
          style={styles.inputt}
          placeholder={t('Enter Your Mobile Number')}
          keyboardType="phone-pad"
          onChangeText={(text) => setMobileNumber(text)}
          value={mobileNumber}
        />
      </>
    );
  }
};

  

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

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

      <Text style={styles.heading}>{t('welcome')}</Text>
                 <Text style={styles.description}>{t('ultimate_destination')}</Text>

       

        <View style={styles.topBar} />
        <View style={styles.carContainer}></View>
        <View style={styles.whiteBoxs}>
         
        <View style={{ flexDirection: 'row', alignItems: 'left' }}>
      <TouchableOpacity onPress={handleCallButtonPress}>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, isInputFocused && styles.inputFocused]}
        placeholder={t('enter_mobile')}
        keyboardType="phone-pad"
        onFocus={handleFocus}
      />
    </View>
 
          <View style={styles.buttonContainer}>

          <CustomButton title={t('send_otp')} onPress={() => handleSendSMSButtonClick('login')} />
            <TouchableOpacity onPress={handleAgreeButtonClick} style={styles.agreeContainer}>
    <Icon name={agreed ? "check-circle" : "circle-thin"} size={20} color="#0cba70" />
    <Text style={styles.agreeText}>{t('agree_terms_conditions')}</Text>
  </TouchableOpacity>
          </View>
        </View>
        <View style={styles.spcingBox}>
          
        </View>
        <View>
        <Text style={styles.heading}>{t('Welcome To Register')}</Text>
                 <Text style={styles.description}>{t('Register By')}</Text>

        </View>
        
         {/* White box for registration */}
         <View style={styles.registrationBox}>
          <Picker
            selectedValue={registrationType}
            style={styles.picker}
            onValueChange={(itemValue) => setRegistrationType(itemValue)}
          >
            <Picker.Item label={t('Self Driver')} value="Self" />
            <Picker.Item label={t('Refer Driver')}value="Refer" />
          </Picker>
          {renderDriverNumberInput()}
          <View style={styles.buttonContainers}>
          {/* <Icon name="phone" size={20} color="#0cba70" style={styles.icon} /> */}

          <CustomButton title={t('send_otpp')} onPress={() => handleSendSMSButtonClick('register')} />
          </View>
          {/* Add registration fields here */}
        </View>
        
      </View>
      
    </LinearGradient>
    </KeyboardAvoidingView>
    
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
    marginTop: 20,
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
    marginTop: 10,
    marginBottom: 10,
  },
  carContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  whiteBox: {
    backgroundColor: 'white',
    width: '30%',
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -200,
  },
  whiteBoxs: {
    backgroundColor: 'white',
    width: 320,
    height: 180,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-20,
  },
  input: {
    height: 40, // Set a fixed height for the input field
    borderColor: '#D7D7D7',
    backgroundColor:'#f5f5f5',
    borderWidth: 1,
    marginTop:15,
    paddingHorizontal: 15,
    color: 'black',
    width: '90%', // Adjust width as needed
    marginBottom: 110,
    borderRadius:10, // Add margin bottom to create space between input and next element
  },
  inputs:{
    height: 40, // Set a fixed height for the input field
    borderColor: '#D7D7D7',
    backgroundColor:'#f5f5f5',
    borderWidth: 1,
    marginTop:-15,
    paddingHorizontal: 15,
    color: 'black',
    width: '100%', // Adjust width as needed
    marginBottom: 30,
    borderRadius:10,
  },
  inputt:{
    height: 40, // Set a fixed height for the input field
    borderColor: '#D7D7D7',
    backgroundColor:'#f5f5f5',
    borderWidth: 1,
    marginTop:-15,
    paddingHorizontal: 15,
    color: 'black',
    width: '100%', // Adjust width as needed
    marginBottom: 20,
    borderRadius:10,
  },
  buttonContainer: {
    width: '90%', 
    marginTop: -100,
    marginBottom:-10, // Add margin bottom to create space between input and next element
    // Adjust width as needed
  },
  buttonContainers: {
    width: '100%', 
    marginTop: -10,
    // Adjust width as needed
  },
  agreeContainer: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreeText: {
    marginLeft: 5, // Adjust margin as needed
    color: 'black',
  },
  icon: {
    position: 'absolute',

    marginLeft: -15,
    marginTop:25,
  },
  inputFocused: {
    marginBottom: 120, // Keep the margin fixed

  },
  registrationBox: {
      backgroundColor: 'white',
      width: 320,
      height: 200,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding:20,
    marginBottom:-180,
  },
  spcingBox:{
height:80,
  },
  
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    marginTop:-10,
  },

});

export default LoginScreen;
