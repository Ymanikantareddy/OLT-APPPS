import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { DrawerItem } from '@react-navigation/drawer';


const SettingScreen = () => {
  const navigation = useNavigation(); // Get navigation object

  const [offersSwitch, setOffersSwitch] = useState(false);
  const [emailSwitch, setEmailSwitch] = useState(false);
  const [smsSwitch, setSmsSwitch] = useState(false);
  const [orderUpdatesSwitch, setOrderUpdatesSwitch] = useState(false);

  const renderSwitchIcon = (value, onToggle) => {
    const iconColor = value ? '#00c49b' : '#ccc';
    return (
      <TouchableOpacity onPress={onToggle}>
        <Icon name={value ? 'toggle-on' : 'toggle-off'} size={40} color={iconColor} />
      </TouchableOpacity>
    );
  };

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
          <Text style={styles.labelText}>Settings</Text>
        </View>
 
        </View>

      {/* <Text style={styles.mainheading}>Notification</Text> */}
      <Text style={styles.subheading}>Offers and Promotions</Text>
      <Text style={styles.description}>
        Get notified on promotions, rewards, and rebates.
      </Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Push </Text>
        {renderSwitchIcon(offersSwitch, () => setOffersSwitch(!offersSwitch))}
      </View>
      <View style={styles.separator} />
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Email</Text>
        {renderSwitchIcon(emailSwitch, () => setEmailSwitch(!emailSwitch))}
      </View>
      <View style={styles.separator} />
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>SMS</Text>
        {renderSwitchIcon(smsSwitch, () => setSmsSwitch(!smsSwitch))}
      </View>
      <Text style={styles.heading}>Order Updates</Text>
      <Text style={styles.description}>
        Get updates about order status and new app features
      </Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Push </Text>
        {renderSwitchIcon(orderUpdatesSwitch, () => setOrderUpdatesSwitch(!orderUpdatesSwitch))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    backgroundColor: 'white',
  },
  mainheading:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -10,
    textAlign:'center',
  
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subheading: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchText: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
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
  drawerHeader: {
    marginTop:-20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
    fontWeight:'bold',
    minWidth:'120%',
    marginLeft:-15,   
    // color: 'black',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 150,
    marginTop:-40,
    alignItems: 'center',

  },
  drawerLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    
  },
  
});


export default SettingScreen;
