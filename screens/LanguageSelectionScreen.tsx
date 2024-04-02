import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  CustomButton from'../components/CustomButton';
import i18n from '../Resource/i18n'; // Import the i18n instance
import LinearGradient from 'react-native-linear-gradient';

const LanguageSelectionScreen = () => {
    const navigation = useNavigation();

    const handleLanguageSelect = (language) => {
      // Change the language and navigate to the onboarding screen
      i18n.changeLanguage(language);
      navigation.navigate('OnboardingScreen');
    };

    const navigateToOnboarding = () => {
      navigation.navigate('OnboardingScreen');
    };

    return (
      <LinearGradient
        colors={['#33d0af', '#33d0af']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.linearGradient}
      >
        
        <View style={styles.container}>
          <Text style={styles.heading}>Choose Language</Text>
          <View style={styles.languageContainer}>
            <TouchableOpacity onPress={() => handleLanguageSelect('kn')}>
              <View style={styles.flagContainer}>
              <Text style={[styles.flagText,{margin:5}]}>Kannada</Text>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/d/1mQYBoohU-0YYT2cX0LlDgZ-i4FTHVgDk=w1000?authuser=0' }} style={[styles.flag,{width:80,height:80,marginBottom:10,marginTop:-10}]} />
               
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelect('en')}>
              <View style={styles.flagContainer}>

                <Text style={styles.flagText}>English</Text>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/d/16rGYqJJgnSkawJJ4cy-jZSX8xNliPC9q=w1000?authuser=0' }} style={styles.flag} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelect('hi')}>
            <View style={styles.flagContainer}>
            <Text style={styles.flagText}>Hindi</Text>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/d/1NYg3cso8_cQDIuSyQC_D4dG3G-reXX3D=w1000?authuser=0' }} style={styles.flag} />
            </View>
          </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={() => handleLanguageSelect('hi')}>
            <View style={styles.flagContainer}>
            <Text style={styles.flagText}>Hindi</Text>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/d/1NYg3cso8_cQDIuSyQC_D4dG3G-reXX3D=w1000?authuser=0' }} style={styles.flag} />
            </View>
          </TouchableOpacity> */}
          {/* <View style={styles.BottomButton}> */}
            {/* Your language selection components */}
            {/* <CustomButton onPress={navigateToOnboarding} title="Continue" /> */}
          {/* </View> */}
        </View>
      </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color:'black',
    textAlign: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  flagContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 80,
  },
  flagContainers: {
    alignItems: 'center',
    marginLeft: -200,
    marginTop: 30,
  },
  flag: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },

  
  flagText: {
    fontSize: 18,
    margin:2,
    color:'black',

  },
  BottomButton: {
    marginLeft: 20,
    marginTop: 30,
    marginBottom: -190,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageSelectionScreen;
