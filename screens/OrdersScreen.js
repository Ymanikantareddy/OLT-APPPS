import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity,Text,Image} from 'react-native';

import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Header} from 'react-native-elements';
import MapViewDirections from 'react-native-maps-directions';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements'; // Assuming you're using Avatar component from react-native-elements

const OrdersScreen = () => {
  const route = useRoute();
  const navigations = useNavigation(); // Get navigation object

  const dataSet = route.params?.dataSet;
  const [rating, setRating] = useState(0); // State to hold the rating

  const [region, setRegion] = useState({
    latitude: 13.09058934167909, // Your desired latitude
    longitude: 77.55343444727205, // Your desired longitude
    latitudeDelta: 0.1, // Adjust the zoom level by changing this value
    longitudeDelta: 0.1, // Adjust the zoom level by changing this value
  });

  const handleStarPress = (star) => {
    // Set the rating to the pressed star
    setRating(star);
  };
  const handleBackPress = () => {
    navigations.navigate('ReviewScreen');
  };
   
  const source = {
   
    latitude:  13.090581148259592,
    longitude:77.54630437153357,
  };
   
  const destination = {
   
    latitude:  13.08646040575342,
    longitude: 77.54854438846529,

  };
  const vehicleLocation = {
    latitude: 13.075553648625451,
    longitude: 77.54706509722163
  };
  return (
    <>
      <Header
        backgroundColor="white"
        leftComponent={
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="arrow-back" color="black" size={25} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Tracking ',
          style: {color: 'black', fontSize: 20},
        }}
      />
      <SafeAreaView style={styles.container}>
        {/* MapView */}
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
 


      <Image 
        source={require('../assets/output-onlinegiftools.gif')} 
        style={{ width: 70, height: 80 ,marginRight:50,marginBottom:-55,}} // Adjust the width and height as needed
      />
       <View style={styles.circle}>
       <View style={styles.innerCircle}></View>

      <Icon
        name="location-on"
        size={20}
        color="white"
        style={{ 
          position: 'absolute',
          margin: 5,
          left: 2, // Adjust positioning if needed
          top: 0, // Adjust positioning if needed
        }}
      />
    </View>

      {/* Source Marker Icon */}

     
 </Marker>

        {/* Destination Marker */}
        <Marker
          coordinate={destination}
          title="Destination"
          description="Destination Location"
          pinColor="#0cba70" // Light black color
        >
          
          <Image 
        source={require('../assets/output-onlinegiftools.gif')} 
        style={{ width: 70, height: 80 ,marginRight:50,marginBottom:-55,}} // Adjust the width and height as needed
      />
       <View style={styles.circle}>
       <View style={styles.innerCircle}></View>

      <Icon
        name="location-on"
        size={20}
        color="white"
        style={{ 
          position: 'absolute',
          margin: 5,
          left: 2, // Adjust positioning if needed
          top: 0, // Adjust positioning if needed
        }}
      />
    </View>


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
        <MapViewDirections
          origin={source}
          destination={destination}
          apikey={'AIzaSyBOE4JakwwQK9x3OSBWSuXUOWfWXbj4BsQ'}
          strokeWidth={3}
          strokeColor="#0cba70"
        />
      </MapView>
    </View>
      </SafeAreaView>
      <View style={styles.container}>
  {/* Left side: Profile Image Circle and Driver Details */}
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {/* Profile Image Circle */}
    <Image 
      source={require('../assets/driver.jpg')} 
      style={{ width: 100, height: 100, marginRight: 10 }} // Adjust the width and height as needed
    />
    {/* Driver Details */}
    <View>
      <Text style={styles.label}>Driver Name: Joy</Text>
      <Text style={styles.value}></Text>
      <Text style={styles.label}>Vehicle Number: KA123-458E</Text>
      <Text style={styles.value}></Text>
      <View style={styles.ratingContainer}>
    <Text style={styles.label}>Ratings:</Text>
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handleStarPress(star)}
          activeOpacity={0.7}>
          <Icon
            name={rating >= star ? 'star' : 'star-o'}
            size={25}
            color={rating >= star ? '#FFD700' : '#C0C0C0'}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
    </View>
    
  </View>
</View>
  {/* Right side: Driver's Details and Ratings */}
  <View style={styles.rightContainer}>
  {/* Driver's Name */}
  

  {/* Vehicle Number */}
  

  {/* Star Ratings */}
  
</View>



    </>
  );
};

const styles = StyleSheet.create({
 
  mapContainer: {
    margin: -20,
    flex: 1, // Adjust as needed
    minHeight: 630,
  },
  map: {
    flex: 1,
  },
  
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10, // Adjust padding as needed
    marginVertical: 15, // Adjust margin as needed
    borderWidth: 1, // Add border for visualization
    borderColor: 'gray', // Add border color for visualization
    borderRadius: 20,
    backgroundColor:'white',
    // Add border radius for visualization
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleNumber: {
    fontSize: 14,
  },
  
  rightContainer: {
    flex: 1, // Allow the container to take up available space
    marginLeft: 75,
     // Add some margin to the right side
  },
  labelContainer: {
    alignItems: 'center',
    marginBottom: 20, // Reduce the bottom margin
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Reduce the bottom margin
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  leftContainer: {
    alignItems: 'center', // Center items horizontally
    marginBottom: 30, // Add margin between the left container and other content
  },
  profileImage: {
    borderWidth: 2,
    borderColor: 'white',
    marginTop:30,
  },
  
  icon:{
    width:150,
    height:150,
  },
  circle: {
    width: 35, // Adjust the width and height as needed for your circle
    height: 35,
    borderRadius: 25,
    margin:19,
    marginTop:-4,
    backgroundColor: 'white', // Adjust the color as needed
    justifyContent: 'space-evenly', // Center the content horizontally and vertically
    alignItems: 'center',
  },
  innerCircle: {
    width: 30, // Adjust the width and height as needed for your inner circle
    height: 30,
    borderRadius: 20, // Adjust the border radius to create a circle
    backgroundColor: 'green', // Adjust the color as needed
  },
});

export default OrdersScreen;
