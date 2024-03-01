import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

import MapView, {Marker, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RadioButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Header } from 'react-native-elements';
import MapViewDirections from 'react-native-maps-directions';
import  CustomButton from'../Component/CustomButton';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const ReviewScreen = navigation => {
  const route = useRoute();
  const navigations = useNavigation(); // Get navigation object
  const [loading, setLoading] = useState(true);

  const dataSet = route.params?.dataSet;
  // console.log("OrderScreen",dataSet);
  const [region, setRegion] = useState(
    {
      latitude: 13.09058934167909, // Your desired latitude
      longitude: 77.55343444727205, // Your desired longitude
      latitudeDelta: 0.2, // Adjust the zoom level by changing this value
      longitudeDelta: 0.2, // Adjust the zoom level by changing this value
    },
    [],
  );

  // const [region, setRegion] = useState({
  //   latitude: dataSet.fromAddress.locationDetails.location.lat, // Your desired latitude
  //   longitude: dataSet.fromAddress.locationDetails.location.lng, // Your desired longitude
  //   latitudeDelta: dataSet.toAddress.tolocationDetails.location.lat,
  //   longitudeDelta: dataSet.toAddress.tolocationDetails.location.lng,

  // },[]);
  const handleBackPress = () => {
    // Navigate to HomeScreen
    console.log('pressed');

    navigations.navigate('Home');
    console.log('pressed');
  };

  const handlePlaceOrderPress = () => {
    navigations.navigate('Finding a Driver', {dataSet: dataSet}); // Navigate to DriverScreen
  };

  const handleLocationSelect = (data, details, type) => {
    const {geometry} = details;
    const {location} = geometry;

    if (type === 'from') {
      setSource({
        latitude: location.lat,
        longitude: location.lng,
      });
      setSourceText(data.description);
    } else if (type === 'to') {
      setDestination({
        latitude: location.lat,
        longitude: location.lng,
      });
      setDestinationText(data.description);
    }
  };

  const onFocus = () => {};

  const [orderContactNo, setOrderContactNo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [payMethod, setPayAtMethod] = useState('pickup');

  const [source, setSource] = useState({
    latitude: dataSet.fromAddress.locationDetails.location.lat,
    longitude: dataSet.fromAddress.locationDetails.location.lng,
  });
  const [destination, setDestination] = useState({
    latitude: dataSet.toAddress.tolocationDetails.location.lat,
    longitude: dataSet.toAddress.tolocationDetails.location.lng,
  });
  const [sourceText, setSourceText] = useState('');
  const [destinationText, setDestinationText] = useState('');

  //   latitude: dataSet.fromAddress.locationDetails.location.lat, // Your desired latitude
  //   longitude: dataSet.fromAddress.locationDetails.location.lng, // Your desired longitude
  //   latitudeDelta: dataSet.toAddress.tolocationDetails.location.lat,
  //   longitudeDelta: dataSet.toAddress.tolocationDetails.location.lng,

  return (
    <>
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
                centerComponent={{ text: 'Order Review', style: { color: 'black', fontSize: 20 } }}
            />
      <SafeAreaView style={styles.container}>
        
        {/* MapView */}
        <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        region={{
          latitude: source.latitude,
          longitude: source.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
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
    style={styles.image}
    onLoad={() => setLoading(false)} // hide the loading indicator when the image is loaded
/>

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
        style={styles.image}
        onLoad={() => setLoading(false)} // hide the loading indicator when the image is loaded
      />  
       

        </Marker>

        {/* MapView Directions */}
        <MapViewDirections
          origin={source}
          destination={destination}
          apikey={'AIzaSyBOE4JakwwQK9x3OSBWSuXUOWfWXbj4BsQ'}
          strokeWidth={4}
          strokeColor="#0cba70"
        />
      </MapView>
    </View>
          {/* Labels for Source and Destination */}

          {/* Text Input for Source */}

          {/* Google Places Autocomplete for From and To Address */}
          <ScrollView>

          <View style={styles.whiteRectangle}>
            {/* <GooglePlacesAutocomplete
          placeholder="Source:"
          listViewDisplayed="auto"
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
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
              zIndex: 999
            },
            textInputContainer: {
              width: "100%",
              zIndex: 999
            },
            description: {
              fontWeight: "bold",
              zIndex: 999
            },
            textInputContainer: {
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              paddingHorizontal: 20,
              zIndex: 999
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 45,
              color: "black",
              fontSize: 14,
              borderBottomWidth: 1,
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
        />
        <GooglePlacesAutocomplete
          placeholder="Destination:"
          listViewDisplayed="auto"
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
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
            },
            textInputContainer: {
              width: "100%",
            },
            description: {
              fontWeight: "bold",
            },
            textInputContainer: {
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              paddingHorizontal: 20,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 45,
              color: "black",
              fontSize: 14,
              borderBottomWidth: 1,
              borderBottomColor: "black",
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
        /> */}
            <View style={styles.iconWithTextgreen}>
        <FontAwesome name="map-marker" size={30} color="green" style={styles.locationIcon} />
        <Text style={styles.lebelAddStop}>{dataSet.fromAddress.fromAddress}</Text>
      </View>

      {/* Dotted line road */}
      <View style={styles.dottedLine} />

      {/* End point icon and text */}
      <View style={styles.iconWithTextred}>
        <FontAwesome name="map-marker" size={30} color="red" style={styles.locationIcon} />
        <Text style={styles.lebelAddStop}>{dataSet.toAddress.toAddress}</Text>
      </View>

            {/* <Text style={styles.lebelAddStop}>+ Add Stop</Text> */}
          </View>

          {/* Carousel */}
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Order Contact No:</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.prefix}>+91 9966628346</Text>
              <TextInput
                style={styles.prefixInput}
                value={orderContactNo}
                onChangeText={text => setOrderContactNo(text)}
                keyboardType="numeric" // Use numeric keyboard for better user experience
              />
            </View>
          </View>
          <View style={styles.vehileContainer}>
            <Text style={styles.label}>Vehicle Type : </Text>

            <Text style={styles.label}>{dataSet.vehicle.type}</Text>
            <Text style={styles.labelVehile}>
              {'   '}
              {/* Add space here */}
              <Text style={{fontSize: 18}}>
                {dataSet.fromAddress.selectedVehicle}
              </Text>
            </Text>
            <Image
              source={{uri: dataSet.vehicle.imageURL}}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.paymentlabel}>
            <Icon name="info" size={20} color="#000" />
                You can Pay By Cash/UPI Payment
            </Text>
        </View>
          <View style={styles.mainpaymentContainer}>
            

            <Text style={styles.paymentlabel}>Select Payment Method:</Text>

            <View style={styles.paymentContainer}>
              <RadioButton
                value="cash"
                status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
                onPress={() => setPaymentMethod('cash')}
              />
              <Text style={styles.radioButtonLabel}>Cash</Text>

              <RadioButton
                value="upi"
                status={paymentMethod === 'upi' ? 'checked' : 'unchecked'}
                onPress={() => setPaymentMethod('upi')}
              />
              <Text style={styles.radioButtonLabel}>UPI</Text>
            </View>
          </View>
          <View style={styles.mainpayContainer}>
            <Text style={styles.paylabel}>Pay At :</Text>

            <View style={styles.payContainer}>
              <RadioButton
                value="PickUpPoint"
                status={payMethod === 'PickUpPoint' ? 'checked' : 'unchecked'}
                onPress={() => setPayAtMethod('PickUpPoint')}
              />
              <Text style={styles.payButtonLabel}>PickUp Point</Text>

              <RadioButton
                value="DropPoint"
                status={payMethod === 'DropPoint' ? 'checked' : 'unchecked'}
                onPress={() => setPayAtMethod('DropPoint')}
              />
              <Text style={styles.payButtonLabel}>Drop Point</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
  {/* Your OrderScreen content goes here */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: -10 }}>
    <Text style={{ fontSize: 18, color: 'black', paddingBottom: 10,marginTop: 20 }}>Total Amount</Text>
    <Text style={{ fontSize: 18, marginRight: 15, marginTop: 20, color: 'black' }}> {dataSet.vehicle.price}</Text>
  </View>

  {/* Bottom Button */}
  <CustomButton
      title="Place Order"
      onPress={handlePlaceOrderPress}
      style={{ backgroundColor: 'green', paddingVertical: 10, marginVertical: 0 }}
      titleStyle={{ fontSize: 16, color: 'white' }}
    />
      {/* Total Amount */}
      
    </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 10,
    backgroundColor: 'white',
  },
  headerBox: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  image: {
    width: 70,
    height: 70,
    // Add other image styles as needed
  },
  sourceloadingIndicator: {
    paddingLeft:15,
  },

  orderBox: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginBottom: 2,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
    color: 'black',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20, // Adjust this value to move the text upward
  },
  placeoderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    marginLeft: 120,
  },
  mapContainer: {
    margin:-10,
    flex: 1, // Adjust as needed
    minHeight: 450,
  },
  
  map: {
    flex: 1,
  },
  lebelAddStop: {
    fontSize: 16,
    textAlign: 'center',
  },
  vehileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 2,
    width: 250,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  labelsorce: {
    fontSize: 20,
    marginLeft: 5,
  },

  labelVehile: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    paddingLeft: 5,
    height: 40,
  },
  prefix: {
    fontSize: 15,
    marginRight: 5,
  },
  prefixInput: {
    flex: 1,
    height: 40,
    fontSize: 18,
    paddingLeft: 5,
  },
  // Add other styles as needed
  whiteRectangle: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  autocompleteStyles: {
    container: {
      flex: 0,
      zIndex: 999,
    },
    textInputContainer: {
      width: '100%',
      zIndex: 999,
    },
    description: {
      fontWeight: 'bold',
      zIndex: 999,
    },

    predefinedPlacesDescription: {
      color: 'black',
      zIndex: 999,
    },
  },

  mainpaymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 2,
    width: 250,
  },
  paymentlabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  labelAddStop: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  mainpayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    width: 150,
  },
  paylabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  payContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payButtonLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  dottedLine: {
    width: 1,
    height: 50,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginRight:20,
    marginLeft:8,
    fontSize:18,
  },
   iconWithTextgreen: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  iconWithTextred: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-10,
  
  },
 
  // Add other styles as needed
});

export default ReviewScreen;
