import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';

const NotificationScreen = () => {
  const navigation = useNavigation(); // Get navigation object

  const notificationsData = [
    {
      id: 1,
      type: 'weather',
      heading: 'Stormy Skies Ahead',
      subHeading: 'Period Starting in 3 days',
      date: 'March 12, 2024',
    },
    {
      id: 2,
      type: 'mood',
      heading: 'Weather Radar',
      subHeading: "Don't forget to track your moods!",
      date: 'March 15, 2024',
    },
    {
      id: 3,
      type: 'mood',
      heading: 'Weather Radar',
      subHeading: "Don't forget to track your moods!",
      date: 'March 15, 2024',
    },
    {
      id: 4,
      type: 'mood',
      heading: 'Weather Radar',
      subHeading: "Don't forget to track your moods!",
      date: 'March 15, 2024',
    },
    {
      id: 5,
      type: 'mood',
      heading: 'Weather Radar',
      subHeading: "Don't forget to track your moods!",
      date: 'March 15, 2024',
    },
    {
      id: 6,
      type: 'mood',
      heading: 'Weather Radar',
      subHeading: "Don't forget to track your moods!",
      date: 'March 15, 2024',
    },
    {
      id: 7,
      type: 'mood',
      heading: 'Weather Radar',
      subHeading: "Don't forget to track your moods!",
      date: 'March 15, 2024',
    },
    
    // Add more notification objects as needed
  ];

  const renderNotificationItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icons name="envelope" size={24} color="#8ee4a5" />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{item.heading}</Text>
        <Text style={styles.subHeading}>{item.subHeading}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <DrawerItem
          label=""
          icon={() => (
            <Icon
              name="arrow-back" // Use the name of the back arrow icon from Ionicons
              size={30}
              color="black" // Set the color of the back arrow icon
              onPress={() => navigation.goBack()} // Use the navigation.goBack() function to go back
            />
          )}
        />
        <View style={styles.headerContent}>
        <Text style={styles.labelText}>Notification</Text>
      </View>
      </View>
      
      <FlatList
        data={notificationsData}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    minWidth: '120%',
    marginTop: -10,
  },
  card: {
    flexDirection: 'row', // Align items horizontally
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    marginLeft:10, // Adjust width to 80%
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft:10,
    color:'blue',
  },
  subHeading: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginLeft:10,

  },
  date: {
    fontSize: 14,
    color: '#666',
    marginLeft:10,

  },
  drawerHeader: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
    fontWeight: 'bold',
    marginLeft: -15,
  },
  headerContent: {
    flexDirection: 'row',
  },
  labelText: {
   marginTop:-40,
   marginLeft:150,
   fontWeight: 'bold',
fontSize:18,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10, // Adjust icon container margin
  },
  textContainer: {
    flex: 1, // Take remaining space for text container
  },
});

export default NotificationScreen;
