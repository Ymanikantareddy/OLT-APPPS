import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Text,
  Vibration,
  View,
  FlatList,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Card, TextInput} from 'react-native-paper';
import  CustomButton from'../Component/CustomButton';
// import SwipeButton from 'rn-swipe-button';
import Icon from 'react-native-vector-icons/Ionicons';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Import FontAwesome5
import Icons from 'react-native-vector-icons/FontAwesome'; // Import the desired icon from the library

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import SlideAcceptButton from '../components/FlashingSwipeButton';
// import FlashingSwipeButton from '../components/FlashingSwipeButton';
// import CircleAnimation from '../components/CircleAnimation';
// import Sound from 'react-native-sound';
// import QRCode from 'react-native-qrcode-svg';
import { DrawerItem } from '@react-navigation/drawer';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const HomeScrren = () => {
  // const Sound = require('react-native-sound');
  const splashAnimation = useRef(new Animated.Value(0)).current;
  const [input4Filled, setInput4Filled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isRideAccepted,setIsRideAccepted]=useState("RIDEINTIATE");
  //const [isRideAccepted, setIsRideAccepted] = useState('DASHBOARD');

  const [isTripStarted, setIsTripStarted] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddreess] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
 
  // const route = useRoute();

  // const dataSet = route.params?.dataSet;

  const [showStyles, setStyles] = useState(false);
  // const onFocus = () => {};
  const navigation = useNavigation(); // Get navigation object

   const [source, setSource] = useState('');

  const [destination, setDestination] = useState('');
  const renderCarouselItem = ({ item }) => (
    <View style={[styles.carouselItem, { backgroundColor: item.color }]}>
      <Text style={styles.carouselText}>Refer a Friend And get 30% * off</Text>
    </View>
  );
  const bottomSheetRef = React.useRef(null);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [showFromAddress, setShowFromAddress] = useState(true);
  const [showToAddress, setShowToAddress] = useState(true);
  const [sourceAddress, setSourceAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const onFocus = (addressType) => {
    if (addressType === 'from') {
      setShowFromAddress(true);
      setShowToAddress(false);
    } else if (addressType === 'to') {
      setShowFromAddress(true);
      setShowToAddress(true);
    }
  };
  
  const handleLocationSelect = (data, details, type) => {
    const { geometry } = details;
    const { location } = geometry;
  
    if (type === 'from') {
      let obj = {
        fromAddress: details.formatted_address,
        locationDetails: details.geometry,
        selectedVehicle: selectedVehicle,
      };
      setFromAddress(obj);
  
      // After searching in 'From Address', show 'To Address'
      setShowFromAddress(true);
      setShowToAddress(true);
  
      // Additional logic for handling coordinates if needed
      setSource({
        latitude: location.lat,
        longitude: location.lng,
      });
      setSourceAddress(data.description);
    } else if (type === 'to') {
      let obj = {
        toAddress: details.formatted_address,
        toLocationDetails: details.geometry,
      };
      setToAddreess(obj);
  
      // After searching in 'To Address', show both 'From' and 'To' addresses
      setShowFromAddress(true);
      setShowToAddress(true);
  
      // Additional logic for handling coordinates if needed
      setDestination({
        latitude: location.lat,
        longitude: location.lng,
      });
      setDestinationAddress(data.description);
    }
  };




  // const handleLocationSelect = (data, details, type) => {
  //   if (type === 'from') {
  //     let obj = {
  //       fromAddress: details.formatted_address,
  //       locationDetails: details.geometry,
  //       selectedVehicle: selectedVehicle,
  //     };
  //     setFromAddress(obj);
  
  //     // After searching in 'From Address', show 'To Address'
  //     setShowFromAddress(true);
  //     setShowToAddress(true);
  //   } else if (type === 'to') {
  //     let obj = {
  //       toAddress: details.formatted_address,
  //       toLocationDetails: details.geometry,
  //     };
  //     setToAddreess(obj);
  
  //     // After searching in 'To Address', show both 'From' and 'To' addresses
  //     setShowFromAddress(true);
  //     setShowToAddress(true);
  //   }
  // };

  // const handleLocationSelect = (data, details, type) => {
  //   const {geometry} = details;
  //   const {location} = geometry;

  //   if (type === 'from') {
  //     setSource({
  //       latitude: location.lat,
  //       longitude: location.lng,
  //     });
  //     setSource(data.description);
  //   } else if (type === 'to') {
  //     setDestination({
  //       latitude: location.lat,
  //       longitude: location.lng,
  //     });
  //     setDestination(data.description);
  //   }
  // };


  // const handleLocationSelect = (data, details, type) => {
  //   //console.log("Location selected:", data, details);
  //   // console.log("Location selected:", data);
  //   // console.log("Details selected:", details.geometry);


  //   if (type === "from") {
  //   let obj={"fromAddress":details.formatted_address,"locationDetails":details.geometry,"selectedVehicle":selectedVehicle}

  //     setFromAddress(obj);
  //   } else if (type === "to") {
  //   let obj={"toAddress":details.formatted_address,"tolocationDetails":details.geometry}

  //     setToAddreess(obj);
  //   }
  // };

  //  const onFocus = (inputType) => {
  //   if (inputType === "from") {
  //     setShowToInput(false);
  //   } else if (inputType === "to") {
  //     setShowFromInput(false);
  //   }
  // };

  // const onBlur = () => {
  //   setShowFromInput(true);
  //   setShowToInput(true);
  // };
  // const onFocus = (input) => {
  //   setFocusedInput(input);
  // };
  const handleVehiclePress = (vehicle) => {
    // Open the bottom sheet when a vehicle is pressed
    // bottomSheetRef.current.expand();
    // Handle the press event here
    console.log("Vehicle pressed:", vehicle);
    setSelectedVehicle(vehicle);
    toggleModal();
  
    // Show the button on the bottom bar
    setShowButton(true);
  };
  
  const navigations = useNavigation(); // Get navigation object

  const handleButtonPress = () => {

    // Handle button press event here
    console.log("Button pressed",  { 
      ...selectedVehicle, 
      fromAddress: fromAddress, 
      toAddress: toAddress 
    });
    navigations.navigate('ReviewScreen', {
      dataSet: { 
        vehicle:selectedVehicle, 
        fromAddress: fromAddress, 
        toAddress: toAddress 
      }
    });
    // navigations.navigate('Orders', {
    //   dataSet: { 
    //     vehicle:selectedVehicle, 
    //     fromAddress: fromAddress, 
    //     toAddress: toAddress 
    //   }
    // });
    toggleModal();
    setShowButton(false);
    // You can perform any action you want when the button is pressed
  };
  const handleCancelButtonClick = () => {
    // Add your cancel logic here
    // console.log("Cancel button pressed");
};

const autocompleteRef = useRef(null);

const clearTextInput = () => {
  if (autocompleteRef.current) {
    autocompleteRef.current.setAddressText('');
  }
}

  const availableVehiclesData = [
    {
      id: 1,
      type: "Motorcycle",
      desc: "Best for delivering documents & '\n' daily essentials",
      weight: "0.4 x 0.4 x 0.4 Meter .Up to 20 kg",
      price: "₹ 2000",
      imageURL:
        "https://lh3.googleusercontent.com/d/1v8oBV-c3CwxlXrixywUirM6LmusQ3Owt=w1000?authuser=0",
    },

    {
      id: 2,
      type: "3-Wheeler",
      desc: "Best for Carrying bulk fruits & '\n' vegetable supplies",
      weight: "1.5 x 1.3 x 1.8 Meter .Up to 500 kg",
      price: "₹ 3000",
      imageURL:
        "https://lh3.googleusercontent.com/d/1Uj83JxEmqIVubj_1LbSCmE2G71rLOuWE=w1000?authuser=0",
    },
    {
      id: 3,
      type: "7ft",
      desc: "Best for delivering furniture & '\n'commercial goods",
      weight: " 2.2 x 1.4 x 1.8 Meter .Up to 750 kg",
      price: "₹ 4000",
      imageURL:
        "https://lh3.googleusercontent.com/d/12IORb_JCea51IvODEA8xMLkjeMiy0pIw=w1000?authuser=0",
    },
    {
      id: 4,
      type: "8ft",
      desc: "Best for office & furniture & '\n' heavy machinery",
      weight: " 2.5 x 1.4 x 1.8 Meter .Up to 1000 kg",
      price: "₹ 6000",
      imageURL:
        "https://lh3.googleusercontent.com/d/1e1lp4GExSjcqayxyVvVNEUrJEmZ7893L=w1000?authuser=0",
    },
    {
      id: 5,
      type: "Tata 407",
      desc: "Best for office & furniture & '\n' heavy machinery",
      weight: " 2.5 x 1.4 x 1.8 Meter .Up to 1000 kg",
      price: "₹ 8000",
      imageURL: "https://lh3.googleusercontent.com/d/1_f-8vQJFLhrtdCaRZ6t3mV8Dd-RdgAEQ=w1000?authuser=0",
    },
  ];
  const mainEmpty = [{"id":"1"}
    
  ];

  const renderAvailableVehicleItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleVehiclePress(item)}
      style={styles.availableVehicleItem}
    >
      <View style={styles.vehicleItemContainer}>
        <View>
          <Image source={{ uri: item.imageURL }} style={styles.vehicleImage} />
        </View>
        <View
          style={
            fromAddress && toAddress
              ? styles.vehicleInfoContainerActive
              : styles.vehicleInfoContainer
          }
        >
          <Text style={styles.vehicleText}>{item.type}</Text>
          <Text style={styles.vehiclePrice}>{item.price}</Text>

          <View
            style={{
              marginRight: 100,
              width: "100%",
              position: "absolute",
              left: 160,
              top: 70,
            }}
          >
            {/* {fromAddress && toAddress && (
              <Text style={styles.priceText}> Rs {item.price}</Text>
            )} */}
          </View>
          {fromAddress && toAddress && (
            <>
              <Text style={{ marginLeft: 20, marginRight: 25,color:'black', }}>
                {item.desc}
              </Text>
              <Text style={{ marginLeft: 20 ,color:'black',}}>{item.weight}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleFocusInput1 = () => {
    setInput4Filled(false);
  };
  const handleFocusInput2 = () => {
    setInput4Filled(true);

    setIsRideAccepted('RIDEVERIFIED');
  };
  const flashAnimation = useRef(new Animated.Value(0)).current;
  const animationValue = useRef(new Animated.Value(0)).current;

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace') {
      // If Backspace is pressed, move focus to the previous input
      switch (index) {
        case 1:
          input1Ref.current.focus();
          break;
        case 2:
          input1Ref.current.focus();
          break;
        case 3:
          input2Ref.current.focus();
          break;
        case 4:
          input3Ref.current.focus();
          break;
        default:
          break;
      }
    } else if (key >= '0' && key <= '9') {
      // If a digit is entered, move focus to the next input
      switch (index) {
        case 1:
          input2Ref.current.focus();
          break;
        case 2:
          input3Ref.current.focus();
          break;
        case 3:
          input4Ref.current.focus();
          break;
        case 4:
          // Do something when the last input is reached, like submitting the OTP
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 1500, // Adjust duration as needed
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
    Animated.loop(
      Animated.timing(splashAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
    const flashSequence = Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(flashSequence).start();
  };

  const handleEndTrip = () => {
    setIsRideAccepted('RIDECOMPLETED');
  };

  const flashInterpolation = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5], // Adjust opacity values as needed
  });

  const region = {
    latitude: 13.09058934167909, // Your desired latitude
      longitude: 77.55343444727205, // Your desired longitude
      latitudeDelta: 0.2, // Adjust the zoom level by changing this value
      longitudeDelta: 0.2, // Adjust the zoom level by changing this value
   
  };

  // const ThumbIcon: () => React.ReactElement = () => (
  //   <Animated.View style={[styles.thumbIcon, {opacity: flashInterpolation}]}>
  //     <View style={styles.thumbIcon}>
  //       <Icon name="arrow-forward-circle" size={25} color="#fff" />
  //     </View>
  //   </Animated.View>
  // );

  const customMapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#a1984f',
        },
        {
          lightness: -45,
        },
        {
          visibility: 'on',
        },
        {
          weight: 5.5,
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [
        {
          saturation: 55,
        },
        {
          lightness: 60,
        },
        {
          weight: 8,
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text',
      stylers: [
        {
          weight: 5,
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'landscape.natural.landcover',
      elementType: 'geometry.fill',
      stylers: [
        {
          saturation: 85,
        },
        {
          lightness: 80,
        },
        {
          weight: 8,
        },
      ],
    },
    {
      featureType: 'landscape.natural.terrain',
      elementType: 'geometry.fill',
      stylers: [
        {
          weight: 7,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

 
  // const source = {
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  // };

  // const destination = {
  //   latitude: 37.74929093476236,
  //   longitude: -122.48792820869227,
  // };
  const vehicleLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
 
  // function handleButtonClick(): void {
  //   throw new Error('Function not implemented.');
  // }

  // function handleStartTripButtonClick(): void {
  //   startAnimation();

  //   setIsRideAccepted('RIDESTART');
  // }

  // function handleAcceptRide(): void {
  //   //throw new Error('Function not implemented.');
  //   setIsRideAccepted('RIDEACCEPT');
  //   // Play audio
  //   const sound = new Sound(
  //     'https://drive.usercontent.google.com/download?id=1gs_kHcfXiAbNLyUhQa-FdX0PaN3hbZHW&export=view&authuser=0',
  //     null,
  //     error => {
  //       if (error) {
  //         console.log('Failed to load the sound', error);
  //         return;
  //       }
  //       // Play the sound
  //       sound.play(success => {
  //         if (!success) {
  //           console.log('Sound playback failed');
  //         }
  //       });
  //     },
  //   );

  //   // Vibrate the phone
  //   Vibration.vibrate([500, 1000, 500, 1000]);
  // }

  return (
    <View style={styles.container}>
<View style={styles.drawerHeader}>
        <DrawerItem
          label=""
          icon={() => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <View style={styles.menuIcon}>
        <View style={styles.line} />
        <View style={[styles.line, styles.lineShort]} />
        <View style={[styles.line, styles.lineShorts]} />
      </View>
    </TouchableOpacity>
          )}
          onPress={() => navigation.toggleDrawer()}
        />
        <View style={styles.headerContent}>
          <Text style={styles.labelText}>OLT</Text>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/490/490049.png' }}
            style={styles.drawerLogo}
          />
        </View>
        <Icon name="notifications" size={24} color="black" style={styles.notificationIcon} />
      </View>
      {/* <FlatList
        ref={flatListRef}
        // data={carouselData}
        renderItem={renderCarouselItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / 300);
          setActiveSlide(slideIndex);
        }}
      /> */}
         {/* <Icon name="notifications" size={24} color="black" style={styles.notificationIcon} /> */}


        {/* <Text style={styles.onlineLabel}>Online</Text> */}

        
        <View>
      {showFromAddress && (
        <View style={styles.inputContainers}>
        <GooglePlacesAutocomplete
          placeholder="From Address"
          listViewDisplayed="auto"
          onFocus={() => onFocus("from")}
          // onBlur={onBlur}
          fetchDetails={true}
          GooglePlacesSearchQuery={{
              rankby: "distance",
              color: 'black',
          }}
          debounce={200}
          numberOfLines={10}
          filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3",
          ]}
          textInputProps={{
            placeholderTextColor: "black",
            returnKeyType: "search",
            onFocus: () => onFocus("from"),
          }}
          styles={{
              container: {
                  flex: 0,
                  zIndex: 999,
              },
              textInputContainer: {
                backgroundColor: 'white', // Example of conditional styling
                width: "90%",
                  borderColor: "#0cba70", // Set border color
                  borderWidth: 1, // Set border width
                  zIndex: 999,
                  borderTopWidth: 1, // Removed border
                  borderBottomWidth: 1, // Removed border
                  paddingHorizontal: 20,
                  borderRadius: 10,
              },
              description: {
                  fontWeight: "bold",
                  color: "black",
                  zIndex: 999
              },
              textInput: {
                  marginLeft: 20,
                  marginRight: 0,
                  height: 45,
                  color: "black",
                  fontSize: 14,
                  borderBottomWidth: 0,
                  borderBottomColor: "black",
                  zIndex: 999
              },
              predefinedPlacesDescription: {
                  color: "black",
                  zIndex: 999
              },
          }}
          onPress={(data, details = null) => {
              handleLocationSelect(data, details, "from");
          }}
          query={{
              key: "AIzaSyBOE4JakwwQK9x3OSBWSuXUOWfWXbj4BsQ",
              language: "en",
              radius: "1500",
              types: ["geocode", "address"],
          }}
          renderRightButton={() => (
            <TouchableOpacity onPress={() => { clearTextInput(); handleCancelButtonClick(); }} style={styles.cancelButton}>
              <Icon name="close" size={20} color="gray" />
            </TouchableOpacity>
          )}
      
          renderLeftButton={() => (
            <Image source={require('../assets/locate.png')}  style={styles.icon} />

          )}
        />
      </View>

      )}

      {showToAddress && (
        <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder="To Address"
          listViewDisplayed="auto"
          onFocus={() => onFocus("to")}
          // onBlur={onBlur}
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
            color: "black",
          }}
          debounce={200}
          numberOfLines={10}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3",
          ]}
          textInputProps={{
            placeholderTextColor: "black",
            returnKeyType: "search",
            onFocus: () => onFocus("to"),
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInputContainer: {
              backgroundColor: 'white',
              width: "90%",
              borderColor: "#0cba70",
              borderWidth: 1,
              zIndex: 999,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              paddingHorizontal: 20,
              borderRadius: 10,
            },
            description: {
              fontWeight: "bold",
              color: "black",
              zIndex: 999
  
            },
            textInput: {
              marginLeft: 20,
              marginRight: 0,
              height: 45,
              color: "black",
              fontSize: 14,
              borderBottomWidth: 0,
              borderBottomColor: "black",
              zIndex: 999
            },
            predefinedPlacesDescription: {
              color: "black",
            },
          }}
          onPress={(data, details = null) => {
            handleLocationSelect(data, details, "to");
          }}
          query={{
            key: "AIzaSyBOE4JakwwQK9x3OSBWSuXUOWfWXbj4BsQ",
            language: "en",
            radius: "1500",
            types: ["geocode", "address"],
          }}
          renderRightButton={() => (
            <TouchableOpacity onPress={() => { clearTextInput(); handleCancelButtonClick(); }} style={styles.cancelButton}>
              <Icon name="close" size={20} color="gray" />
            </TouchableOpacity>
          )}
         
  
          renderLeftButton={() => (
            <Image source={require('../assets/locate.png')}  style={styles.icons} />
          )}
        />
  
      </View>

      )}
    </View>
  


{/* Toggle Switch */}
{/* <Switch
  style={styles.toggleSwitch}
  trackColor={{ false: '#767577', true: '#8ee4a5' }}
  thumbColor={'#f4f3f4'}
  ios_backgroundColor="#3e3e3e"
  onValueChange={toggleSwitch}
  value={isEnabled}
/> */}

      <MapView
        style={styles.map}
        region={region}
        mapType={'standard'}
        userInterfaceStyle={'light'}
        customMapStyle={customMapStyle}
        showsUserLocation={true}
        zoomControlEnabled={true}
        followsUserLocation={true}
        showsMyLocationButton={true}>
                 
        <View>
          
        {source !== "" && (
  <Marker
    coordinate={source}
    title="Source"
    description="Source Location"
  >
    <Image
      source={{
        uri: 'https://drive.usercontent.google.com/download?id=1Tb-II3sAPxQvjAsqDIgaMEcbFmUTZWww&export=view&authuser=0',
      }}
      style={{ width: 50, height: 50, marginLeft: 10 }}
      onError={error => console.log('Error loading image:', error)}
    />
  </Marker>
)}

{destination !== "" && (
  <Marker
    coordinate={destination}
    title="Destination"
    description="Destination Location"
    pinColor="#02b869" // Light green color
  >
    <Image source={require('../assets/destination.png')} style={{ width: 40, height: 40 }} />
  </Marker>
)}

       
         <MapViewDirections
          origin={source}
          destination={destination}
          apikey={'AIzaSyBOE4JakwwQK9x3OSBWSuXUOWfWXbj4BsQ'}
          strokeWidth={5}
          strokeColor="#00C49A"
        />
        </View>
      </MapView>
      {isRideAccepted != 'RIDECOMPLETED' && isRideAccepted != 'DASHBOARD' && (
        <Card
          style={[
            styles.bottomSheet,
            // {padding: 2, flexDirection: 'row', alignItems: 'center'},
          ]}>
          {/* Left side */}
          {/* <View style={{flexDirection: 'row'}}> */}
            {/* <Image
              source={{
                uri: 'https://drive.usercontent.google.com/download?id=1kShEOzFYh1aDdJ2hKkql1yfg4ImnXAx2&export=view&authuser=0',
              }}
              // style={{width: 50, height: 50, marginLeft: 10}}
              // onError={error => console.log('Error loading image:', error)}
            /> */}
            {/* <Text
              style={[
                styles.labelStyle,
                {fontSize: 12, maxWidth: '90%', margin: 10},
              ]}>
              CListas user
            </Text> */}
            <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={availableVehiclesData}
        renderItem={renderAvailableVehicleItem}
        keyExtractor={(item) => item.id.toString()}
      />

<Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
          {showButton && (
            <>
            <View style={styles.priceContainer}>
  <Text style={styles.priceText}>Price</Text>
  <Text style={styles.priceText}>{selectedVehicle.price}</Text>
</View>

<View >
      {/* Use the CustomButton component */}
      <CustomButton 
        title="Review Order"
        onPress={handleButtonPress}
        style={styles.bottomBarButtonText}
      />
    </View>

              
          </>
        )}
          </View>
        </Modal>


            {/* <CircleAnimation /> */}
            <View
              style={{
                // flexDirection: 'column',
                // margin: 10,
                // marginLeft: 'auto',
                // maxWidth: '90%',
              }}>
              {/* <Text style={[styles.labelStyle, {fontSize: 15}]}>
                Total: 12 KMs
              </Text> */}
              {/* <Text
                style={[
                  styles.labelStyle,
                  {fontSize: 12, color: 'grey', marginLeft: 'auto'},
                ]}>
                To Pickup:12 KMs
              </Text> */}
            </View>
          {/* </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
              marginTop: 15,
              marginBottom: -30,
            }}> */}
            {/* <Image
              source={{
                uri: 'https://drive.usercontent.google.com/download?id=15WpSbCeQq1o7JGaJ-6zQRgAqEW4zln9I&export=view&authuser=0',
              }}
              style={{width: 100, height: 100, marginLeft: -30}}
              onError={error => console.log('Error loading image:', error)}
            /> */}
            {/* Right side */}
            {/* <View style={{flexDirection: 'column'}}> */}
              {/* <Text
                style={[
                  styles.labelStyle,
                  {marginBottom: 25, fontSize: 12, maxWidth: '90%'},
                ]}>
                Malleshwaram, Test, Bangalore
              </Text> */}
              {/* <Text
                style={[
                  styles.labelStyle,
                  {marginBottom: 10, fontSize: 12, maxWidth: '90%'},
                ]}>
                Vidyaranypura, Teest Bangalore
              </Text> */}
            {/* </View> */}
            <View style={{flexDirection: 'column'}}>
              {/* <Text
                style={[
                  styles.labeCardFooterLastName,
                  {marginBottom: 10, maxWidth: '90%'},
                ]}>
                ₹ 2000
              </Text> */}
            </View>
          {/* </View> */}
          {/* <View style={{ flexDirection: 'row', alignItems: 'center',margin:10 }}>
      
      <CustomButton title="Accept"   onPress={handleButtonClick} />
      <View style={{marginLeft:10}}>
      <CustomButton title="Decline"   onPress={handleButtonClick} />
    

      </View>
     
        </View> */}
          <View>
            {isRideAccepted === 'RIDEACCEPT' && (
              <View
                style={{
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  // margin: 10,
                  // marginTop: 30,
                }}>
                {/* <CustomButton title="Call" onPress={handleButtonClick} /> */}
                {/* <View style={{marginLeft: 10}}>
                  <CustomButton
                    title="Start Trip"
                    onPress={handleStartTripButtonClick}
                  />
                </View> */}
              </View>
            )}
            {isRideAccepted === 'RIDESTART' && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 40,
                  marginLeft: 30,
                  marginBottom: input4Filled ? 0 : 50,
                }}>
                <TextInput
                  ref={input1Ref}
                  style={styles.otpInput}
                  maxLength={1}
                  onFocus={handleFocusInput1}
                  keyboardType="numeric"
                  onKeyPress={({nativeEvent}) =>
                    handleKeyPress(1, nativeEvent.key)
                  }
                />
                <TextInput
                  ref={input2Ref}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="numeric"
                  onKeyPress={({nativeEvent}) =>
                    handleKeyPress(2, nativeEvent.key)
                  }
                />
                <TextInput
                  ref={input3Ref}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="numeric"
                  onKeyPress={({nativeEvent}) =>
                    handleKeyPress(3, nativeEvent.key)
                  }
                />
                <TextInput
                  ref={input4Ref}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="numeric"
                  onFocus={handleFocusInput2}
                  onKeyPress={({nativeEvent}) =>
                    handleKeyPress(4, nativeEvent.key)
                  }
                />
              </View>
            )}
            {isRideAccepted === 'RIDEINTIATE' && (
              <LinearGradient
                colors={['#8ee4a5', '#01a399']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={{
                  borderRadius: 85,
                  alignItems: 'center',
                  marginTop: 25,
                }}>
                {/* <View style={{position: 'relative', width: '100%', height: 75}}> */}
                  {/* AnimatedLinearGradient */}
                  {/* <AnimatedLinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: 100,
                      bottom: 0,
                      width: '100%',
                      transform: [
                        {
                          translateX: splashAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-300, 0],
                          }),
                        },
                      ],
                    }}
                  /> */}
                  {/* SwipeButton */}
                  {/* <SwipeButton
                    railBackgroundColor="transparent"
                    railBorderColor="transparent"
                    railStyles={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      borderBlockColor: 'transparent',
                    }}
                    height={55}
                    width="100%"
                    thumbIconBackgroundColor="#25aa8e"
                    title="Accept Ride"
                    titleColor="white"
                    thumbIconComponent={ThumbIcon}
                    onSwipeSuccess={handleAcceptRide}
                    thumbIconStyles={{
                      minHeight: 65,
                      marginBottom: 10,
                      height: 60,
                      width: 50,
                      minWidth:65,
                      position:"relative",
                      left:10,
                      backgroundColor:"green"
                    }}
                    
                  /> */}
                {/* </View> */}
              </LinearGradient>
            )}

            {isRideAccepted === 'RIDEVERIFIED' && (
              <LinearGradient
                colors={['#8ee4a5', '#01a399']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={{
                  borderRadius: 85,
                  alignItems: 'center',
                  marginTop: 25,
                }}>
                <View style={{position: 'relative', width: '100%', height: 75}}>
                  {/* AnimatedLinearGradient */}
                  {/* <AnimatedLinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: 100,
                      bottom: 0,
                      width: '100%',
                      transform: [
                        {
                          translateX: splashAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-300, 0],
                          }),
                        },
                      ],
                    }}
                  /> */}
                  {/* SwipeButton */}
                  {/* <SwipeButton
                    railBackgroundColor="transparent"
                    railBorderColor="transparent"
                    railStyles={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      borderBlockColor: 'transparent',
                    }}
                    height={55}
                    width="100%"
                    thumbIconBackgroundColor="#FFFFFF"
                    title="End Ongoing Trip"
                    titleColor="white"
                    thumbIconComponent={ThumbIcon}
                    onSwipeSuccess={handleEndTrip}
                    thumbIconStyles={{
                      minHeight: 65,
                      marginBottom: 5,
                      height: 10,
                      width: 10,
                    }}
                  /> */}
                </View>
              </LinearGradient>
            )}

            {/* <View style={{ flexDirection: 'column' }}>
          <Text style={[styles.labeCardFooterName]}>Clistas, Bangalore</Text>
          <Text style={[styles.labeCardFooterLastName,{  marginBottom: 10,fontSize:12,maxWidth:"90%" }]}>PVT LTD.</Text>
        </View>
        <View style={{ flexDirection: 'column',marginLeft:"auto" }}>
     
          <Text style={[styles.labeCardFooterName]}>Price</Text>
          <Text style={[styles.labeCardFooterLastName,{  marginBottom: 10,fontSize:12,maxWidth:"90%" }]}>₹ 2000</Text>
        
                    </View> */}
          </View>
          {/* <View></View> */}
        </Card>
      )}
      {isRideAccepted == 'RIDECOMPLETED' && (
        <Card style={[styles.bottomSheet, {padding: 2, alignItems: 'center'}]}>
          <Text
            style={[
              styles.labeCardFooterLastName,
              {marginBottom: 10, maxWidth: '90%', marginTop: 10},
            ]}>
            Collect
          </Text>
          <Ionicons name="checkmark-done-circle" size={80} color="#01a399" />
          <Text
            style={[
              styles.labeCardFooterLastName,
              {marginBottom: 10, maxWidth: '90%', color: '#01a399'},
            ]}>
            ₹ 2000
          </Text>

          <QRCode value="https://clistas.com" />
        </Card>
      )}
      {isRideAccepted == 'DASHBOARD' && (


        <Card
          style={[
            // styles.bottomSheet,
            // {padding: 2, flexDirection: 'row', alignItems: 'center'},
          ]}>
            {/* <View style={{marginLeft:'auto',position:'relative',top:-65,backgroundColor:"#8ee4a5",padding:10}}>
             <MatIcon name="target" size={20} color="black"  />

            </View> */}
          {/* Left side */}
          {/* <View style={{flexDirection: 'row', marginTop: 0}}> */}
            {/* <Image
              source={{
                uri: 'https://drive.usercontent.google.com/download?id=1kShEOzFYh1aDdJ2hKkql1yfg4ImnXAx2&export=view&authuser=0',
              }}
              style={{width: 50, height: 50, marginLeft: 10}}
              onError={error => console.log('Error loading image:', error)}
            /> */}
            {/* <Text
              style={[
                styles.labelStyle,
                {fontSize: 12, maxWidth: '90%', margin: 10},
              ]}>
              CListas user
            </Text> */}

            {/* <View style={{marginLeft: 85}}> */}
              <Text style={[styles.labelStyle, {fontSize: 15}]}>Balance</Text>
              {/* <Text
                style={[
                  styles.labelStyle,
                  {fontSize: 12, color: 'grey', marginLeft: 'auto'},
                ]}>
                ₹ 2000
              </Text> */}
            {/* </View> */}
          {/* </View> */}
          <LinearGradient
        colors={['#8ee4a5', '#01a399']}
        start={{ x: 0.5, y: 0.10 }}
        end={{ x: 0.5, y: 0.75 }}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: 'center',
          margin:20,
          marginTop:35,
          position:"relative",
          height:150,
          bottom:20,
          padding:35,
          paddingBottom:120,
          marginBottom:0
         
        }}
      >
          {/* <View */}
            style={{
              minHeight: '50%',
              minWidth: '85%',
              margin: 0,
              borderRadius: 10,
              justifyContent: 'center',
              height:100,
              
            }}
            {/* Row container for three columns */}
            {/* <View */}
              {/* style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
              {/* First column */}
              {/* <View style={styles.column}>
                <Ionicons name="cash" size={40} color="#fff" />
                <Text style={{margin: 5, marginLeft: 0,fontWeight:'bold',fontSize:20}}>₹ 500</Text>
                <Text style={{margin: 2,fontWeight:'bold'}}>Earnings</Text>
              </View> */}

              {/* Second column */}
              {/* <View style={styles.column}>
                <Ionicons name="map" size={40} color="#fff" />
                <Text style={{margin: 5,fontWeight:'bold',fontSize:20}}>500</Text>
                <Text style={{fontWeight:'bold'}}>Trips</Text>
              </View> */}

              {/* Third column */}
              {/* <View style={styles.column}>
                <Ionicons name="speedometer" size={40} color="#fff" />
                <Text style={{margin: 5,fontWeight:'bold',fontSize:20}}>240</Text>
                <Text style={{fontWeight:'bold'}}>Total KMs</Text>
              </View> */}
            {/* </View> */}
          {/* </View> */}
          </LinearGradient>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 0,
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    height: '40%', // Adjust height as needed
    margin: 20,
    marginBottom: 0,
  },
  labelStyle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#323232',
  },
  labeCardFooterName: {
    fontFamily: 'Poppins',
    fontSize: 11,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#323232',
    marginLeft: 10,
  },
  labeCardFooterLastName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'black',
    marginLeft: 10,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'white',
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
 
  
  // toggleSwitch: {
  //   position: 'absolute',
  //   top: 40,
  //   right: 20,
    
  //   zIndex: 1,
  //   width:120
  // },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'absolute',
    minWidth:'100%',    
    zIndex: 1,
    fontWeight:'bold',
    fontSize:18,
    // color: 'black',
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
    color:'#8ee4a5',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#8ee4a5',
  },
  lineShort: {
    width: '65%',
    color:'#8ee4a5',// Adjust the length of smaller lines as needed
  },
  lineShorts: {
    width: '25%',
    color:'#8ee4a5',
     // Adjust the length of smaller lines as needed
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -85,
  },
  drawerLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    
  },
  notificationIcon: {
    marginLeft: 10,
    color:'#8ee4a5',
  },
  flatListContainer: {
    paddingBottom: 20,
    // marginTop:10, // Adjust as needed
  },

  vehicleItemContainer: {
    flexDirection: "row",
  },
  vehicleImage: {
    width: 70, // Adjust as needed
    height: 70, // Adjust as needed
    marginRight: 10, // Adjust as needed
    marginTop: 0,
    marginLeft: 10,
  },
  vehicleText: {
    fontSize: 16,
    verticalAlign: "middle",
    marginTop: 15,
    marginLeft: 5,
    padding: 0,
    paddingLeft: 15,
    fontWeight: "bold",
    color:'black',

  },
  vehiclePrice: {
    fontSize: 16,
    verticalAlign: "middle",
    marginTop: -20,
    marginLeft: 160,
    padding: 0,
    paddingLeft: 15,
    fontWeight: "bold",
    // color: "black",

    color:'#0cba70',

  },
  onlineLabel: {
    position: 'absolute',
    top: 40,
    left: 150,
    zIndex: 1,
    fontWeight:'bold',
    fontSize:18,
    color: 'black',
  },
  icons: {
    position:'absolute',
    marginLeft: 10,
    marginTop:10,
    height:30,
    width:21,},
icon: {
  position:'absolute',
  marginLeft: 10,
  marginTop:10,
  height:20,
  width:20,
},

vehicleInfoContainer: {
  minHeight: 10,
},
vehicleInfoContainerActive: {
  minHeight: 100,
},
priceContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
 inputContainer: {
  position: 'absolute',
  top: 130,
  left: 20,
  minWidth:'100%',    
  zIndex: 1,
  fontWeight:'bold',
  fontSize:18,
  color: 'black',// Padding bottom to create space between icon and input
  },
  inputContainers:{
    position: 'absolute',
    top: 70,
    left: 20,
    minWidth:'100%',    
    zIndex: 1,
    fontWeight:'bold',
    fontSize:18,
    color: 'black',
  },
  bottomBarButtonText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 2,
    height: 40,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
  },
  modalCloseButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 16,
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color:'black',
  },
  

});

export default HomeScrren;
