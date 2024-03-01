import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity,Image,Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import  CustomButton from'../Component/CustomButton';

const slides = [
    {
        imageURL: "https://lh3.googleusercontent.com/d/1Xs3opsTOBma8VFqzh9L-142BVN_OzzTx=w1000?authuser=0", 
        desc: 'CHOOSE LOCATION', 
        subheading: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.'
      },
      {
        imageURL: "https://lh3.googleusercontent.com/d/1xUh1L_59Z-B55HqKhc5zYOpNXjpSgt5V=w1000?authuser=0",
        desc: 'CHOOSE YOUR RIDE',
        subheading: 'Secure your financial future with our Money Reserve program. Gain peace of mind knowing that your savings are protected against inflation and economic fluctuations. Start building your nest egg today and enjoy a worry-free tomorrow!'
      },
      
      {
        imageURL: "https://lh3.googleusercontent.com/d/1qqdJxazQojsAB-CYaPXlRvxR1u-1tG_i=w1000?authuser=0",
        desc: 'ENJOY YOUR TRIP',
        subheading: 'Embark on a journey of discovery and adventure. Explore breathtaking landscapes, immerse yourself in vibrant cultures, and create unforgettable memories along the way. Let go of worries and embrace the excitement of new experiences. Your adventure awaits!'
      }
      
  ];
  
      
const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const renderSlide = ({ item }) => (
    <LinearGradient
      colors={['#8ee4a5', '#01a399']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.slide}>
        <View style={styles.images}>
        <Image source={{ uri: item.imageURL }} style={styles.image} />

        </View>
<View>
<Text style={styles.text}>{item.desc}</Text>
        <Text style={styles.subheading}>{item.subheading}</Text>
</View>
        

      </View>
    </LinearGradient>
  );

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ animated: true, index: currentIndex + 1 });
    } else {
      navigation.navigate('LoginScreen'); // Navigate to LoginScreen after finishing the onboarding process
    }
  };
  const goToLoginScreen = () => {
    navigation.navigate('LoginScreen');
};
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
          setCurrentIndex(newIndex);
        }}
      />
        <View style={styles.buttonContainer}>
        <View style={[styles.dotContainer, { justifyContent: 'space-between', paddingHorizontal: 20 }]}>
    <TouchableOpacity style={[styles.dot, currentIndex === 0 && styles.activeDot]} />
    <TouchableOpacity style={[styles.dot, currentIndex === 1 && styles.activeDot]} />
    <TouchableOpacity style={[styles.dot, currentIndex === 2 && styles.activeDot]}  />
    <View style={{ alignSelf: 'flex-end', marginRight: -50, marginBottom: 1,position:'relative',left:100,}}>
  {currentIndex === 2 && (
   <TouchableOpacity onPress={goToLoginScreen} style={[styles.button, { backgroundColor: 'white' }]}>
   <Text style={{ color: 'black' }}>Get Started</Text>
 </TouchableOpacity>
  )}
  
</View>
  </View>


</View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign:'center',
  },
//   button: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     backgroundColor: '#01a399',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width:300,
    height:300,
    marginTop:-10, // Adjust the height as needed
  },
  subheading: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginLeft:10,
    marginRight:10, // Add padding to ensure text doesn't touch the edges
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -10,
    marginLeft:10, // Adjust the marginTop as needed
  },
  dotContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop:-90,
       alignItems: 'center',
 
  },
  images:{
    width:300,
    height:250,
    verticalAlign:'middle',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  button: {
    marginLeft:-40,
    padding: 10,
    borderRadius:10,
  }
});

export default OnboardingScreen;
