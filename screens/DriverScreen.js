import React, { useRef, useEffect,useState } from 'react';
import { View, StyleSheet, Text, ScrollView ,TouchableOpacity,Animated,Image, Easing} from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons
import { useRoute } from '@react-navigation/native';
import { Overlay, Button } from 'react-native-elements';

const DriverScreen = () => {
  const route = useRoute();
  const dataSet = route.params?.dataSet;
  // console.log("DriverScreen",dataSet);
  const [isVisible, setIsVisible] = useState(false);
  const [amount, setAmount] = useState(0); // Initial amount

  const handleAddPriorityPress = () => {
    setIsVisible(true);
  };

  const handleIncrementAmount = () => {
    setAmount(amount + 10); // Increment amount by 10
  };

  const handleDecrementAmount = () => {
    if (amount > 0) {
      setAmount(amount - 10); // Decrement amount by 10, if greater than 0
    }
  };
  const handleConfirmPriorityPress = () => {
    setIsVisible(false);
  };

  const handleCancelPriorityPress = () => {
    setIsVisible(false);
  };

  // const copyToClipboard = (text) => {
  //   Clipboard.setString(text);
  //   console.info('text')
  // };

  const linePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moveLines = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(linePosition, {
            toValue: 300, // Target position of the lines (horizontal movement)
            duration: 5500, // Duration of the animation (2.5 seconds)
            useNativeDriver: true,
          }),
          Animated.timing(linePosition, {
            toValue: 1, // Move back to the start position
            duration: 0, // Instantly
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    moveLines(); // Start moving the lines

    return () => {
      linePosition.stopAnimation(); // Stop animation on unmount
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.whiteRectangle}>
        {/* First rectangle */}
        <View style={styles.linecontainer}>
      <Animated.View style={[styles.linehorizontal, { transform: [{ translateX: linePosition }] }]} />
      <Animated.View style={[styles.linehorizontal, { transform: [{ translateX: linePosition }] }]} />
      <Animated.View style={[styles.linehorizontal, { transform: [{ translateX: linePosition }] }]} />
      <Animated.View style={[styles.linehorizontal, { transform: [{ translateX: linePosition }] }]} />
    </View>
    <View style={{ flex: 1 }}>
      <View style={styles.line} />
      <TouchableOpacity onPress={handleAddPriorityPress}>
        <Text style={styles.labelAddPriority}>+ Add Priority Fee</Text>
      </TouchableOpacity>

      <Overlay
        isVisible={isVisible}
        onBackdropPress={handleCancelPriorityPress}
        overlayStyle={styles.overlay}
      >
        <View style={{ padding: 20 }}>
          <View style={styles.amountContainer}>
            <TouchableOpacity onPress={handleDecrementAmount} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>₹{amount}</Text>
            </View>
            <TouchableOpacity onPress={handleIncrementAmount} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.amountContainerpop}>
          <TouchableOpacity onPress={() => setAmount(50)} style={[styles.amountBoxpop, amount === 50 && styles.selectedAmount]}>
  <Text style={styles.amountText}>₹50</Text>
</TouchableOpacity>
  <TouchableOpacity onPress={() => setAmount(100)} style={[styles.amountBoxpop, amount === 100 && styles.selectedAmount]}>
    <Text style={styles.amountText}>₹100</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setAmount(150)} style={[styles.amountBoxpop, amount === 150 && styles.selectedAmount]}>
    <Text style={styles.amountText}>₹150</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setAmount(200)} style={[styles.amountBoxpop, amount === 200 && styles.selectedAmount]}>
    <Text style={styles.amountText}>₹200</Text>
  </TouchableOpacity>
</View>
          <View style={styles.buttonContainer}>


          <TouchableOpacity onPress={handleConfirmPriorityPress} style={[styles.buttongreen, { backgroundColor: 'green' }]}>
    <Text style={[styles.buttonText, { color: 'white' }]}>Confirm</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={handleCancelPriorityPress} style={[styles.buttonred, { backgroundColor: 'red', marginLeft: 10 }]}>
    <Text style={[styles.buttonText, { color: 'white' }]}>Cancel</Text>
  </TouchableOpacity>

  </View>
        </View>
      </Overlay>
    </View>
</View>
      <View style={styles.otherRectangle}>
      {/* Starting point icon and text */}
      <View style={styles.vehiclecontainer}>
  <Text style={styles.textMotor}>{dataSet.vehicle.type}</Text>
  <Image
    source={{uri: dataSet.vehicle.imageURL}}
    style={styles.image}
  />
</View>
      <View style={styles.lineMap} />

      <View style={styles.iconWithTextgreen}>
        <FontAwesome name="map-marker" size={30} color="green" style={styles.locationIcon} />
        <Text style={styles.textfromAddress}>{dataSet.fromAddress.fromAddress}</Text>
      </View>

      {/* Dotted line road */}
      <View style={styles.dottedLine} />

      {/* End point icon and text */}
      <View style={styles.iconWithTextred}>
        <FontAwesome name="map-marker" size={30} color="red" style={styles.locationIcon} />
        <Text style={styles.texttoAddress}>{dataSet.toAddress.toAddress}</Text>
      </View>
    </View>

      <View style={styles.detailsRectangle}>
        {/* Third rectangle */}
        <Text style={styles.additional}>Additional Info</Text>
        <View style={styles.additionalline} />
        <View style={styles.orderInfoContainer}>
        {/* <TouchableOpacity onPress={() => copyToClipboard('5362485658')}> */}
  
    <Text style={styles.orderNumber}>5362485658</Text>
    <Text style={styles.orderId}>Order ID</Text>
    <MaterialIcons name="content-copy" size={24} color="black" style={styles.copyIcon} />

    {/* </TouchableOpacity> */}

  </View>


  <View style={styles.contactline} />
  <View style={styles.orderInfoContainer}>
  {/* <TouchableOpacity onPress={() => copyToClipboard('9666584596')}> */}

    <Text style={styles.contactNumber}>9666584596</Text>
    <Text style={styles.ordercontact}>Order Contact Number</Text>
    <MaterialIcons name="content-copy" size={24} color="black" style={styles.copyIcons} />

    {/* </TouchableOpacity> */}

  </View>

</View>

      <View style={styles.cashRectangle}>
    <Text style={styles.cashText}>Cash</Text>
    <View style={styles.amountContainer}>
    <Text style={styles.amount}>{dataSet.vehicle.price}</Text>
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Adjust as needed
  },
  whiteRectangle: {
    minHeight: 260,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  additional: {
    textAlign: 'left',
    fontSize: 16,
    marginTop:20,
    marginLeft:20,
    color:'black',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },
  texttoAddress:{
     fontSize: 18,
    color:'black',
  },
  textfromAddress:{
    fontSize: 18,
   color:'black',
 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 60,
    height: 60,
  },
  subText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  line: {
    borderBottomWidth: 1,
    marginTop: 40,
    borderBottomColor: 'gray',
    width: '100%',
  },
  lineMap:{
    borderBottomWidth: 1,
    marginTop:-2,
    marginBottom:10,
    borderBottomColor: 'gray',
    width: '126%',
    marginLeft:-40, 
  },
  additionalline: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderBottomColor: 'gray',
    width: '100%',
  },
  contactline:{
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: 'gray',
    width: '100%',
  },
  otherRectangle: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 40,
  },
  iconWithTextgreen: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:-5,

  },
  iconWithTextred: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-20,

  },
  locationIcon: {
    marginRight: 30,
  },
  textMotor:{
    fontSize:16,
    textAlign:'left',
    marginLeft:-20,
    color:'black',
  },
  dottedLine: {
    width: 1,
    height: 30,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'black',
    marginBottom: 10,
    fontSize:18,
    marginLeft:8,

  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelAddPriority: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',

  },
  detailsRectangle: {
    minHeight: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },

  orderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumber: {
    fontWeight: 'bold',
    flex: 1,
    fontSize:18,
    marginTop:20,
    marginLeft:20,

  },
  contactNumber: {
    fontWeight: 'bold',
    flex: 1,
    fontSize:18,
    marginTop:20,
    marginLeft:20,
    marginBottom:1,

  },
  ordercontact:{
    marginTop:5,
    marginLeft:20,
  },
  orderId:{
    marginTop:5,
    marginLeft:20,
  },
  copySymbol: {
    marginLeft: 5,
  },
  cashRectangle: {
    minHeight: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  cashText: {
    marginRight: 10,
    fontWeight: 'bold',
    marginLeft:20,
    fontSize:18,
    marginTop:20,

  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  amount: {
    fontWeight: 'bold',
    marginTop:-20,
    marginLeft:290,
  fontSize:18,
  },
  copyIcon: {
    marginLeft: 320,
    marginTop:-20, // Push the icon to the right side
  },
  copyIcons:{
    marginLeft: 320,
    marginBottom:20,
    marginTop:-20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
  },
  linecontainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:60,
  },
  linehorizontal: {
    width: 60,
    height: 5,
    backgroundColor: 'green',
  },
  overlay: {
    width: '100%', // Adjust width as needed
    borderRadius: 10, // Adjust border radius as needed
    padding: 10,
  },
  // amountContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 20,
  // },
  amountBox: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius:10,
  },
  amountText: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  buttongreen: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonred: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },

  amountContainerpop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  amountBoxpop: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop:15,
    marginBottom:-15,

  },
  selectedAmount: {
    backgroundColor: 'lightgray',
  },
  amountText: {
    fontSize: 18,
    color: 'black',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft:15,
     // Optional: Add border radius for rounded corners
  },
  vehiclecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-40, // Center the items vertically
  },
  
 
});

export default DriverScreen;
