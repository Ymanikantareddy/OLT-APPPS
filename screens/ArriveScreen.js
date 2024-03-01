import { View, Text, StyleSheet,Image,TouchableOpacity, ScrollView,ActivityIndicator,Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icons from 'react-native-vector-icons/FontAwesome'; // Import the desired icon from the library
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import {Header} from 'react-native-elements';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Import FontAwesome5

import  CustomButton from'../Component/CustomButton';
const ArriveScreen = () => {

   const [fromAddress, setFromAddress] = useState("");
    const [toAddress, setToAddreess] = useState("");
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    // Initialize navigation
    const [region, setRegion] = useState({
      latitude: 13.09058934167909, // Your desired latitude
      longitude: 77.55343444727205, // Your desired longitude
      latitudeDelta: 0.1, // Adjust the zoom level by changing this value
      longitudeDelta: 0.1, // Adjust the zoom level by changing this value
    });
    const onFocus = () => {};
    const handleLocationSelect = (data, details, type) => {
        //console.log("Location selected:", data, details);
        // console.log("Location selected:", data);
        // console.log("Details selected:", details.geometry);
    
    
        if (type === "from") {
        let obj={"fromAddress":details.formatted_address,"locationDetails":details.geometry,}
    
          setFromAddress(obj);
        } else if (type === "to") {
        let obj={"toAddress":details.formatted_address,"tolocationDetails":details.geometry}
    
          setToAddreess(obj);
        }
      };

      const handleCancelButtonClick = () => {
        // Add your cancel logic here
        console.log("Cancel button pressed");
      };
      const handleBackPress = () => {
        navigation.goBack(); // Navigate back to the previous screen (HomeScreen)
    };
    const handleButtonClick = () => {
      // Add your cancel logic here
      console.log("handle Button Clicked");
    };
    const source = {
       
      latitude:13.090541625014849,
      longitude:77.54633385769881,
    };
     
    const destination = {
       
      latitude:  13.086345779772317,
      longitude: 77.54857797378894,
  
    };
    const vehicleLocation = {
      latitude: 13.075553648625451,
      longitude: 77.54706509722163
    };

  return (
    <View style={styles.container}>
    <Header
            backgroundColor="white"
            leftComponent={
                <CustomButton
                    onPress={handleBackPress}
                    icon="arrow-back"
                    color="black"
                    size={20}
                />
            }
            centerComponent={{ text: 'Arrive', style: { color: 'black', fontSize: 20 } }}
        />

         <View style={styles.mapContainer}>
  <MapView
    style={styles.map}
    region={region}
  >
    {/* Source Marker */}
    <Marker
      coordinate={source}
      title="Source"
      description="Source Location"
      pinColor="#0cba70" // Light black color
    >
{loading && (
<ActivityIndicator
  style={styles.sourceloadingIndicator}
  size="large"
  color="#0000ff"
/>
)}
<Image
source={{ uri: 'https://lh3.googleusercontent.com/d/1btSgSWdq36K6uoAE5bHeHbYZwTdJLHQs=w1000?authuser=1/view' }}
style={styles.images}
onLoad={() => setLoading(false)} // hide the loading indicator when the image is loaded
/>




  {/* Source Marker Icon */}

 
</Marker>

    {/* Destination Marker */}
    <Marker
      coordinate={destination}
      title="Destination"
      description="Destination Location"
      pinColor="#0cba70" // Light black color
    >
      
      {loading && (
    <ActivityIndicator
      style={styles.destinationloadingIndicator}
      size="large"
      color="#0000ff"
    />
  )}
  <Image
    source={{ uri: 'https://lh3.googleusercontent.com/d/163iqc2tygeR50Clwkjl0Iq8Ze_M8_tA7=w1000?authuser=1/view' }}
    style={styles.images}
    onLoad={() => setLoading(false)} // hide the loading indicator when the image is loaded
  />  


    </Marker>

    {/* Vehicle Marker for live tracking */}
    <Marker
      coordinate={vehicleLocation} // Assuming you have the vehicle's location
      title="Vehicle"
      description="Current Vehicle Location"
    >
      {/* Vehicle Marker Icon */}

     
      <Icon name="directions-car" size={30} color="#02b869" />
    </Marker>

    {/* MapView Directions */}
    {/* <MapViewDirections
      origin={source}
      destination={destination}
      apikey={'AIzaSyBOE4JakwwQK9x3OSBWSuXUOWfWXbj4BsQ'}
      strokeWidth={4}
      strokeColor="#0cba70"
    /> */}
  </MapView>
</View>
<ScrollView style={{ flex: 1 }}>

      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Arriving</Text>
        </View> 
       
      
        <View style={styles.imageContainer}>
          <Image source={require('../assets/cabDriver.jpg')} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.boldText}>Mahmud Hasan </Text>
            <Text>Toyato vitz </Text>
            <Text>652485 </Text>
          </View>
        </View> 
        <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.callbutton}> */}
            {/* <MaterialIcons name="call" size={24} color="white" /> */}
            <View style={styles.callcontainer}>
        <CustomButton title="Call Now" onPress={handleButtonClick} icon="call" />
  
      </View>
  
      <View style={styles.messageContainer}>
    <CustomButton title="Message" onPress={handleButtonClick} icon="message" />
  </View>
  {/* <CustomButton  style={styles.buttonText} title="Call Now" onPress={handleButtonClick} /> */}
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.button}> */}
            {/* <MaterialIcons name="message" size={24} color="black" /> */}
            {/* <Text style={styles.buttonTextmessage}>Message</Text> */}
          {/* </TouchableOpacity> */}
  
        </View> 
  
        <View style={styles.toAddressContainer}>
    {/* <Text style={styles.inputHeading}>Drop Point</Text> */}
    <FontAwesome6 name="circle-dot" size={20} color="green" style={styles.icons} />
    <View style={styles.DropContainer}>
          <Text style={styles.NormalTextpickupp} >Drop Point</Text>
          <Text style={styles.headingTextpickup}>Sambhram College Canteen,</Text>
  
        </View>
        
    </View>
    <View style={styles.verticalLine} />
  
    {/* <View style={styles.verticalLine}></View> */}
  <View style={styles.toAddressContainer}>
    {/* <Text style={styles.inputHeading}>Drop Point</Text> */}
    {<Icons name="map-marker" size={20} color="green" style={styles.icon} /> }
    <View style={styles.DropContainers}>
          <Text style={styles.NormalTextpickup}>PickUp Point</Text>
          <Text style={styles.headingTextpick}>Sambhram College Canteen,</Text>
  
        </View>
    
    </View>
    <View style={styles.paymentContainer}>
    <View style={styles.paymentTextContainer}>
      <Text>Payment</Text>
      <Text style={styles.headingText}>Cash</Text>
    </View>
    <View style={styles.amountTextContainer}>
      <Text>Amount</Text>
      <Text style={styles.headingTextAmount}>50Br</Text>
    </View>
  </View>
  <View style={styles.cancelButtonContainer}>
          <CustomButton title="Cancel" onPress={handleCancelButtonClick} />
        </View>
 
        <View style={styles.iconContainer}>
          <MaterialIcons name="expand-more" size={30} />
        </View>     
         </View>
         </ScrollView>
   
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '500%',
  },
  card: {
    width: 330,
    height: 600,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    borderRadius: 10,
    shadowColor: '#000', // Shadow on iOS
    marginLeft: 10,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: 5, // Adjust as needed
    left: 10, // Adjust as needed
  },
  text: {
    fontSize: 16,
    color:'black',

  },
  iconContainer: {
    position: 'absolute',
    top: 5, // Adjust as needed
    right: 40,
    color:'black',
    // Adjust as needed
  },
  imageContainer: {
    position: 'absolute',
    top: 40, // Adjust as needed
    left: 10,
    padding:15,
    color:'black',

  },
  image: {
    width: 100, // Adjust width as needed
    height: 100,
borderRadius:10, 
// Adjust height as needed
  },
  detailsContainer: {
    top: -100, // Adjust as needed
    marginLeft:110,
    padding: 15,
    flexDirection: 'column',
    color:'black',
  },
  boldText: {
    fontWeight: 'bold',
    color:'black',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    color:'black',

  },
  
  
  buttonTextmessage: {
    color:'black',
    marginLeft: 5,
  },
  buttonText: {
    color:'white',
    marginLeft: 5,
  },
  fromAddressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  toAddressContainer:{
    alignItems: 'center',
    marginTop: 30,


  },
 
  icons:{
    marginLeft:-280,
    marginBottom:-40,
  },
  icon:{
    marginLeft:-280,
    marginTop:-30,

      },
DropContainer:{
    marginLeft:-100,
    color:'black',
    marginBottom:-10,


},
DropContainers:{
  marginLeft:-100,
  color:'black',
  marginTop:-30,
  

},
paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    
  },
  paymentTextContainer: {
    alignItems: 'flex-start',
    left:-50,
    color:'black',
    marginTop:30,

  },
  amountTextContainer: {
    alignItems: 'flex-end',
    color:'black',
    marginTop:30,


  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'black',
    marginTop:5,

  },
  headingTextpickup:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'black',
    marginLeft:100,
    borderBottomWidth:1,
    borderBottomColor: '#e0e0e0',
    minWidth: '60%',
    padding: 10,

  },
  headingTextpick:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'black',
    marginLeft:120,
    borderBottomWidth:1,
    borderBottomColor: '#e0e0e0',
    minWidth: '75%',
    padding: 10,


    },
  NormalTextpickup:{
    fontSize: 16,
    color:'black',
    marginLeft:140,
    
  },
  NormalTextpickupp:{
    fontSize: 16,
    color:'black',
    marginLeft:110,
    marginBottom:-10,
  },
  headingTextAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    color:'black',
    marginTop:5,

  },
  subText: {
    fontSize: 14,
    color:'black',

  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    color:'black',

  },
  cancelButton: {
    backgroundColor: '#0cba70',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginBottom:-70,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  callcontainer:{
    alignItems: 'flex-start', // Align items to the start (left)
    marginHorizontal: 18, // Adjust the horizontal margin as needed
    marginTop: 60,
    marginLeft:-100,
  },
  messageContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space items evenly along the row
    marginHorizontal: 20, // Adjust the horizontal margin as needed
    marginTop: 60,
    marginRight:-100, // Adjust the top margin as needed
  },

normalText: {
  fontSize: 16,
  color:'black', // Set the desired font size for normal text
  // Add any other styles for normal text
},
cancelButtonContainer: {
  marginTop: 36, // Adjust as needed
  marginBottom:-90,
  width:'80%',
  textAlign:'center', // Set the width to 100% to take the full width

},
lineContainer: {
  alignItems: 'center',
},
lineContainers: {
  alignItems: 'flex-start',
  paddingLeft: 20, // Add space to the left
},
lightColorLine: {
  borderBottomColor: '#e0e0e0', // Light color of your choice
  borderBottomWidth: 1, // Adjust the width as needed
  width: '100%', // Set the width of the line
},
verticalLine: {
  height: '15%',
  width: 2, // Adjust the width of the vertical line as needed
  backgroundColor: '#e0e0e0', // Set the color of the vertical line
  marginHorizontal: 10,
  marginLeft:-270, // Adjust the horizontal margin as needed
},
images:{
   
  width: 70,
  height: 70,
  // Add other image styles as needed
},
sourceloadingIndicator: {
paddingLeft:150,
},
destinationloadingIndicator:{
paddingLeft:150,

},
});

export default ArriveScreen;
