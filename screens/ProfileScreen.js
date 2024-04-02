import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet,Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component from react-native-vector-icons/FontAwesome
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response.uri);
      }
    });
  };
  return (
    <LinearGradient
      colors={['#8ee4a5', '#01a399']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
     <View style={styles.topContainer}>
      <TouchableOpacity onPress={handleImageUpload}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="camera" size={50} color="#CCCCCC" />
          )}
        </View>
        {/* <Text style={styles.name}>John Doe</Text>
        <Text style={styles.phoneNumber}>+1234567890</Text> */}
      </TouchableOpacity>
    </View>

      {/* White card with shadow */}
      <View style={styles.bottomCard}>
      <View style={styles.detailCard}>
  <View style={styles.detailRow}>
    <Text style={styles.detail}>Email</Text>
    <Text style={styles.value}>example@example.com</Text>
  </View>
  <View style={styles.detailRow}>
    <Text style={styles.detail}>Date of Birth</Text>
    <Text style={styles.value}>01/01/1990</Text>
  </View>
  <View style={styles.detailRow}>
    <Text style={styles.detail}>Gender</Text>
    <Text style={styles.value}>Male</Text>
  </View>
  <View style={styles.detailRow}>
    <Text style={styles.detail}>Phone Number</Text>
    <Text style={styles.value}>+1234567890</Text>
  </View>
</View>
<View style={styles.detailCard}>
<View style={styles.detailRows}>
  <Text style={[styles.detail, { flex: 1, textAlign: 'center' }]}>Change Password</Text>
  <View style={styles.lockIconContainer}>
    <Icon name="lock" size={25} color="#333" />
  </View>
  </View>
</View>
<View style={styles.detailCard}>
<View style={styles.detailRowss}>
  <Text style={[styles.detail, { flex: 1, textAlign: 'center' }]}>My Orders</Text>
  <View style={styles.lockIconContainer}>
  <Icon name="gift" size={25} color="#333" />
  </View>
  </View>
  <View style={styles.detailRows}>
  <Text style={[styles.detail, { flex: 1, textAlign: 'center' }]}>Help Centre</Text>
  <View style={styles.lockIconContainer}>
  <Icon name="question-circle" size={25} color="#333" />
  </View>
  </View>
</View>
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
  topContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  bottomCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 80,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    minHeight:500,
    marginBottom:-160,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#B87333',
    justifyContent: 'center',
    alignItems: 'center',

  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop:20,

  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding:5,
    borderBottomWidth:1,
    borderBottomColor: '#ccc',
  },
  detailRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,

    padding:5,
  },
  detailRowss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth:1,
    borderBottomColor: '#ccc',
    padding:8,
  },
  detail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  lockIconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
});

export default ProfileScreen;
