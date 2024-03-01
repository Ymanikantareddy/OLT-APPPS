import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import  CustomButton from'../Component/CustomButton';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icons from 'react-native-vector-icons/MaterialIcons'; // Replace 'MaterialIcons' with the icon set you want to use

const LoginScreen = () => {
  const navigation = useNavigation(); // Initialize navigation object
  const [mobileNumber, setMobileNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [sentOTP, setSentOTP] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);

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
  const handleSendSMSButtonClick = () => {
    // Generate a random OTP (for demonstration purposes)
    const randomOTP = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit OTP
    setSentOTP(randomOTP.toString()); // Convert OTP to string and store it
    // Simulate sending SMS with OTP
    console.log('Sending SMS OTP to:', mobileNumber);
    console.log('SMS OTP:', randomOTP);
    navigation.navigate('VerfiyOtpScreen');

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
        <Text style={styles.heading}>Welcome to CarApp</Text>
        <Text style={styles.description}>
          Your ultimate destination for all things cars.
        </Text>
       

        <View style={styles.topBar} />
        <View style={styles.carContainer}></View>
        <View style={styles.whiteBoxs}>
         
        <View style={{ flexDirection: 'row', alignItems: 'left' }}>
      <TouchableOpacity onPress={handleCallButtonPress}>
        <Icons name="call" size={20} color={'#0cba70'}  style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, isInputFocused && styles.inputFocused]}
        placeholder="Enter Your Mobile Number"
        keyboardType="phone-pad"
        onFocus={handleFocus}
      />
    </View>
  {/* <View>
    <Icon name="phone" size={30} color="#0cba70" style={styles.icon} />

    </View>     */}
          <View style={styles.buttonContainer}>
          {/* <Icon name="phone" size={20} color="#0cba70" style={styles.icon} /> */}

            <CustomButton title="Send OTP" onPress={handleSendSMSButtonClick} />
            <TouchableOpacity onPress={handleAgreeButtonClick} style={styles.agreeContainer}>
    <Icon name={agreed ? "check-circle" : "circle-thin"} size={20} color="#0cba70" />
    <Text style={styles.agreeText}>I agree with all terms and conditions</Text>
  </TouchableOpacity>
          </View>
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
    marginTop: -350,
  },
  whiteBoxs: {
    backgroundColor: 'white',
    width: 320,
    height: 180,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-10,
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
  buttonContainer: {
    width: '90%', 
    marginTop: -100, // Add margin bottom to create space between input and next element
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
});

export default LoginScreen;
