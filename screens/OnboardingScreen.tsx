import React, { useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity,Image,Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import  CustomButton from'../Components/CustomButtons';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
const slides = [
    {
      animation: require('../assets/Globaldelivery.json'),    
      title: 'title_one', 
        subheading: 'onboarding_one_desc'
      },
      {
        animation: require('../assets/DeliverymanRidingscooter.json'),
        title: 'title_two',
        subheading: 'onboarding_two_desc'
      },
      
      {
        animation: require('../assets/OnlineDeliveryService.json'),
        title: 'title_three',
        subheading:'onboarding_three_desc'
      },
      
  ];
  
  
      
const OnboardingScreen = () => {
    const { t } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const [showSecondAnimation, setShowSecondAnimation] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Function to toggle the showSecondAnimation state
    const toggleAnimation = () => {
      setShowSecondAnimation((prev) => !prev); // Toggle between true and false
      setTimeout(toggleAnimation, 3000); // Call the function again after 3 seconds
    };

    // Start the initial timer
    const timer = setTimeout(() => {
      setShowSecondAnimation(true);
      toggleAnimation(); // Start the recursive loop after 3 seconds
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures the effect runs only once

  
  const renderSlide = ({ item, index }) => {
    let animationSource;
  
    // Check if it's the second slide
    if (index === 1) {
      // Show the Truckdeliveryservice.json animation for the first 3 seconds
      if (!showSecondAnimation) {
        
        animationSource = require('../assets/DeliverymanRidingscooter.json');
      } else {
        // After 3 seconds, show the Deliveryman Riding scooter.json animation
        animationSource = require('../assets/Truckdeliveryservice.json');
      }
    } else {
      // For other slides, use the animation specified in the item object
      animationSource = item.animation;
    }
  
    return (
      <LinearGradient
        colors={['#fff', '#fff']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.linearGradient}
      >
        <View style={styles.slide}>
          <View style={styles.images}>
          <LottieView
  source={animationSource}
  autoPlay
  loop={!showSecondAnimation || true}
  style={{ width: 300, height: 300, marginTop: 0 }}
/>
          </View>
          <View>
     <Text style={styles.text}>{t(item.title)}</Text>
     <Text style={styles.subheading}>{t(item.subheading)}</Text>
   </View>
        </View>
      </LinearGradient>
    );
  };


//   const renderSlide = ({ item }) => (
//     <LinearGradient
//       colors={['#fff', '#fff']}
//       start={{ x: 0.5, y: 0 }}
//       end={{ x: 0.5, y: 1 }}
//       style={styles.linearGradient}
//     >
//     <View style={styles.slide}>
//   <View style={styles.images}>
//   <LottieView
//         source={item.animation}
//         autoPlay
//         loop
//         style={{ width: 300, height: 300,marginTop:0, }} // Apply styles to the LottieView
//       />
//   </View>
//   <View>
//     <Text style={styles.text}>{t(item.title)}</Text>
//     <Text style={styles.subheading}>{t(item.subheading)}</Text>
//   </View>
// </View>

//     </LinearGradient>
//   );

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
        <View style={[styles.dotContainer, { justifyContent: 'flex-start',marginRight:"15%" }]}>
    <TouchableOpacity style={[styles.dot, currentIndex === 0 && styles.activeDot]} />
    <TouchableOpacity style={[styles.dot, currentIndex === 1 && styles.activeDot]} />
    <TouchableOpacity style={[styles.dot, currentIndex === 2 && styles.activeDot]}  />
    <View style={{ alignSelf: 'flex-end', marginRight: -50, marginBottom: 1,position:'relative',left:100,}}>
  {currentIndex === 2 && (
   <TouchableOpacity onPress={goToLoginScreen} style={[styles.button, { backgroundColor: '#33d0af' }]}>
   <Text style={{ color: 'white' }}>{t('Get Started')}</Text>
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
    color: 'black',
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
    color: 'black',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'justify',
    paddingHorizontal: 20,
    fontWeight:"500",
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
    backgroundColor: '#33d0af',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'grey',
  },
  button: {
    marginLeft:-40,
    padding: 10,
    borderRadius:10,
  },
  lottie: {
    width: 300, // Adjust width as needed
    height: 300,
    marginTop:-20, // Adjust height as needed
  },
});

export default OnboardingScreen;
