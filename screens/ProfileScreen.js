import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,ScrollView,Alert,Image,Modal,FlatList,Button, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import  CustomButton from'../Component/CustomButton';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera } from 'react-native-image-picker'; // If you're using react-native-image-picker
import FileViewer from 'react-native-file-viewer';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient from your library
import { Picker } from '@react-native-picker/picker';
import { MaskedView } from '@react-native-masked-view/masked-view';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import Svg, { Circle } from 'react-native-svg';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const[address,setAddress]=useState('');
  const [selfieTaken, setSelfieTaken] = useState(false);

  const [currentTab, setCurrentTab] = useState('PersonalDetails');
  const [photoUri, setPhotoUri] = useState(null);
  const [selfieError, setSelfieError] = useState('');
  const [accountType, setAccountType] = useState('Account Type');
  const [accountName, setAccountName] = useState('');
  const [accountValue, setAccountValue] = useState('');
  const [branch, setBranch] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [fileUri, setFileUri] = useState(''); // Assuming you have the file URI in state
  const [showPreview, setShowPreview] = useState(false);
  const [aadharFileUri, setAadharFileUri] = useState('');
  const [drivingLicenseFileUri, setDrivingLicenseFileUri] = useState('');
  const [rccardLicenseFileUri, setRccardLicenseFileUri] = useState('');
  const [vechicleInsurance, setvechicleInsuranceLicense] = useState('');
  const [driverPhoto, setdriverPhoto] = useState('');
  const cameraRef = useRef(null);

  const [nameError, setNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [AddressError, setAddressError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const vehicleTypes = ['2 Wheeler', '3 Wheeler','7 feet Vehicle','8 feet Vehicle','Tata 407 Vehicle','Eicher Vehicle'];
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [aadharPhotoUri, setAadharPhotoUri] = useState(null);
  const [drivingLicensePhotoUri, setDrivingLicensePhotoUri] = useState(null);
  const [rcCardPhotoUri, setRcCardPhotoUri] = useState(null);
  const [vehicleInsurancePhotoUri, setVehicleInsurancePhotoUri] = useState(null);
  const [driverPhotoUri, setDriverPhotoUri] = useState(null);
  const [frontPhotoUri, setFrontPhotoUri] = useState(null);
  const [backPhotoUri, setBackPhotoUri] = useState(null);
  const [showFrontCloseButton, setShowFrontCloseButton] = useState(false);
  const [showBackCloseButton, setShowBackCloseButton] = useState(false);
  const [aadharPhotoTaken, setAadharPhotoTaken] = useState(false);

  const handleNext = () => {
    if (currentTab === 'PersonalDetails') {
      // Check if mandatory fields are filled
      if (!name.trim() || !mobileNumber.trim() ||  !address.trim()) {
        // Display a general error message for mandatory fields
        setGeneralError('*Please Enter Mandatory Fields');

        // Display specific error messages for individual fields
        setNameError(!name.trim() ? 'Name is a mandatory field.' : '');
        setMobileNumberError(!mobileNumber.trim() ? 'Mobile Number is a mandatory field.' : '');
        // setSelfieError(!selfieTaken ? 'Please take a selfie before proceeding.' : '');
        setAddressError(!address.trim() ? 'Address is a mandatory field.' : '');

        // If any mandatory field is not filled, return without proceeding
        return;
      } else {
        // Reset the general error when all mandatory fields are filled
        setGeneralError('');
      }
    } else if (currentTab === 'IDProof') {
      // Clear any previous error messages when moving to the next tab
      setGeneralError('');
      setNameError('');
      setMobileNumberError('');
      // setSelfieError('');
      setAddressError('');
      setCurrentTab('BankDetails');
    }
  };
  RNFetchBlob.fs.dirs.DocumentDir; // Accessing directories

  // const handleTakePhoto = () => {
  //   // Logic to capture the selfie
  //   // After successfully capturing the selfie, update the selfieTaken state
  //   setSelfieTaken(true);
  // };

  const handleCloseButton = (type) => {
    if (type === 'aadhar') {
      setAadharFileUri('');
    } else if (type === 'drivingLicense') {
      setDrivingLicenseFileUri('');
    }else if(type === 'rccard'){
      setRccardLicenseFileUri('');

    }else if(type === 'vechicleInsurance'){
      setvechicleInsuranceLicense('');
  }else if(type === 'driverPhoto'){
    setdriverPhoto('');
};
}
  const openFile = async (fileUri) => {
    try {
      await FileViewer.open(fileUri);
    } catch (error) {
      console.error('Error opening file:', error);
      Alert.alert('Error', 'Could not open the file.');
    }
  };

  const submitNext = () => {
    if (accountType === 'Account Type') {
      setAccountType('Savings');
    } else if (accountType === 'Savings') {
      setAccountType('Current');
    }
  };
  const isImageFile = (fileUri) => {
    const extension = getFileExtension(fileUri).toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  };
  const getFileName = (fileUri) => {
    const uriParts = fileUri.split('/');
    return uriParts[uriParts.length - 1];
  };
  
  const isPdfFile = (fileUri) => {
    if (!fileUri) {
      return false;
    }
    const extension = fileUri.split('.').pop().toLowerCase();
    return extension === 'pdf';
  };

  const uploadAadharCard = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const uri = res[0].uri;
  
      if (!res[0].type || typeof res[0].type !== 'string') {
        throw new Error('Invalid file type');
      }
  
      setAadharFileUri(uri);
      Alert.alert('Aadhar card uploaded successfully!');
    } catch (error) {
      console.error('Error uploading Aadhar card:', error);
      Alert.alert('Error uploading Aadhar card. Please try again.');
    }
  };

  const uploadDrivingLicense = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const uri = res[0].uri;
  
      if (!res[0].type || typeof res[0].type !== 'string') {
        throw new Error('Invalid file type');
      }
  
      setDrivingLicenseFileUri(uri);
      Alert.alert('Driving License uploaded successfully!');
    } catch (error) {
      console.error('Error uploading Driving License:', error);
      Alert.alert('Error uploading Driving License. Please try again.');
    }
  };
  
  const uploadRCCard = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const uri = res[0].uri;
  
      if (!res[0].type || typeof res[0].type !== 'string') {
        throw new Error('Invalid file type');
      }
  
      setRccardLicenseFileUri(uri);
      Alert.alert('RC Card uploaded successfully!');
    } catch (error) {
      console.error('Error uploading RC Card:', error);
      Alert.alert('Error uploading RC Card. Please try again.');
    }
  };
  // Similar functions for other documents
  
  const uploadVehicleInsurance = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const uri = res[0].uri;
  
      if (!res[0].type || typeof res[0].type !== 'string') {
        throw new Error('Invalid file type');
      }
  
      setvechicleInsuranceLicense(uri);
      Alert.alert('Vehicle Insurance uploaded successfully!');
    } catch (error) {
      console.error('Error uploading Vehicle Insurance:', error);
      Alert.alert('Error uploading Vehicle Insurance. Please try again.');
    }
  };

  const uploadDriverPhoto = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const uri = res[0].uri;
  
      if (!res[0].type || typeof res[0].type !== 'string') {
        throw new Error('Invalid file type');
      }
  
      setdriverPhoto(uri);
      Alert.alert('Driver Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading Driver Photo:', error);
      Alert.alert('Error uploading Driver Photo. Please try again.');
    }
  };
  
  const handleAction = async (documentType) => {
    if (documentType === 'aadhar' && aadharPhotoUri) {
      await handleFileUpload(documentType);
    } else {
      handleTakePhoto(documentType);
    }
  };
  
  const handleFileUpload = async (documentType) => {
    switch (documentType) {
      case 'aadhar':
        await uploadAadharCard();
        break;
        case 'drivingLicense':
          await uploadDrivingLicense();
          break;
          case 'rccard':
            await uploadRCCard();
            break;
            case 'vechicleInsurance':
              await uploadVehicleInsurance();
              break;
              case 'driverPhoto':
                await uploadDriverPhoto();
                break;
      default:
        console.error('Unknown document type:', documentType);
    }
  };



  
  
  const getFileExtension = (fileUri) => {
    const uriParts = fileUri.split('.');
    return uriParts[uriParts.length - 1].toUpperCase(); // Extract the last part after the dot
  };

  const handleTakePhoto = (documentType) => {
  const options = {
    mediaType: 'photo',
    maxWidth: 800,
    maxHeight: 800,
    quality: 1,
  };

  setIsCameraActive(true);

  launchCamera(options, (response) => {
    setIsCameraActive(false);

    if (response.didCancel) {
      console.log('User cancelled camera picker');
    } else if (response.error) {
      console.log('ImagePicker Error:', response.error);
    } else {
      if (response.assets && response.assets.length > 0) {
        const capturedPhotoUri = response.assets[0].uri;
        console.log('Photo URI:', capturedPhotoUri);

        // Use the documentType to set the corresponding state
        switch (documentType) {
          case 'aadhar':
            setAadharPhotoUri(capturedPhotoUri);
            break;
          case 'drivingLicense':
            setDrivingLicensePhotoUri(capturedPhotoUri);
            break;
          case 'rccard':
            setRcCardPhotoUri(capturedPhotoUri);
            break;
          case 'vehicleInsurance':
            setVehicleInsurancePhotoUri(capturedPhotoUri);
            break;
          case 'driverPhoto':
            setDriverPhotoUri(capturedPhotoUri);
            break;
            case 'front':
              setFrontPhotoUri(capturedPhotoUri);
              break;
              case 'back':
                setBackPhotoUri(capturedPhotoUri);
                break;
          default:
            console.error('Unknown document type:', documentType);
        }
      }
    }
  });
};
  
const handleClosePhoto = (documentType) => {
  switch (documentType) {
    case 'aadhar':
      setAadharPhotoUri(null);
      break;
    case 'drivingLicense':
      setDrivingLicensePhotoUri(null);
      break;
    case 'rccard':
      setRcCardPhotoUri(null);
      break;
    case 'vehicleInsurance':
      setVehicleInsurancePhotoUri(null);
      break;
    case 'driverPhoto':
      setDriverPhotoUri(null);
      break;
    // Add cases for other document types
    default:
      console.error('Unknown document type:', documentType);
  }
};

const handleClosePhotoFB = (documentType) => {
  // Reset the corresponding state variable
  switch (documentType) {
    case 'front':
      setFrontPhotoUri(null);
      setShowFrontCloseButton(false);
      break;
    case 'back':
      setBackPhotoUri(null);
      setShowBackCloseButton(false);
      break;
    // Add cases for other document types
    default:
      console.error('Unknown document type:', documentType);
  }
};

  // const handleTakePhoto = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     maxWidth: 800,
  //     maxHeight: 800,
  //     quality: 1,
  //   };

  //   setIsCameraActive(true);

  //   launchCamera(options, (response) => {
  //     setIsCameraActive(false);

  //     if (response.didCancel) {
  //       console.log('User cancelled camera picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error:', response.error);
  //     } else {
  //       if (response.assets && response.assets.length > 0) {
  //         const capturedPhotoUri = response.assets[0].uri;
  //         console.log('Photo URI:', capturedPhotoUri);
  //         setPhotoUri(capturedPhotoUri);
  //       }
  //     }
  //   });
  // };

  // const handleTakePhoto = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     maxWidth: 800,
  //     maxHeight: 800,
  //     quality: 1,
  //   };

  //   setIsCameraActive(true); // Activate the camera

  //   launchCamera(options, (response) => {
  //     setIsCameraActive(false); // Deactivate the camera

  //     if (response.didCancel) {
  //       console.log('User cancelled camera picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //       setSelfieError('Error capturing selfie. Please try again.');
  //     } else {
  //       console.log('Photo URI:', response.uri);
  //       setPhotoUri(response.uri);
  //       setSelfieError(''); // Clear the selfie error when a new photo is taken
  //     }
  //   });
  // };


  console.log('Rendering with Photo URI:', photoUri);

  const handleAadharPress = () => {
    // Add your logic here for handling the press event for the "Aadhar card" button
  };
  const handleDropdownPress = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionPress = (item) => {
    setSelectedVehicleType(item);
    setDropdownOpen(false);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Documents</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, (currentTab === 'PersonalDetails' || currentTab === 'IDProof' || currentTab === 'BankDetails') && styles.activeTab]}
          onPress={() => setCurrentTab('PersonalDetails')}
        >
          <Text style={[styles.tabText, (currentTab === 'PersonalDetails' || currentTab === 'IDProof' || currentTab === 'BankDetails') && styles.activeTabText]}>Personal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, (currentTab === 'IDProof' || currentTab === 'BankDetails') && styles.activeTab]}
          onPress={() => setCurrentTab('IDProof')}
        >
          <Text style={[styles.tabText, (currentTab === 'IDProof' || currentTab === 'BankDetails') && styles.activeTabText]}>ID Proof</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentTab === 'BankDetails' && styles.activeTab]}
          onPress={() => setCurrentTab('BankDetails')}
        >
          <Text style={[styles.tabText, currentTab === 'BankDetails' && styles.activeTabText]}>Bank Details</Text>
        </TouchableOpacity>
      </View>

      {currentTab === 'PersonalDetails' && (
  <View style={styles.card}>
    <Text style={styles.cardHeading}>Enter Your Details</Text>
    <Text style={styles.label}><Text style={{ color: 'red' }}>{generalError}</Text></Text>

    <View>
  
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Name<Text style={{ color: 'red' }}>*</Text></Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: nameError && !name ? 'red' : 'gray' }
          ]}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError('');
            setGeneralError('');
          }}
        />
      </View>
</View>
<View>
      {/* Other parts of your component */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number<Text style={{ color: 'red' }}>*</Text></Text>
        <TextInput
style={[
  styles.input,
  { borderColor: mobileNumberError && !mobileNumber ? 'red' : 'gray' }
]}          value={mobileNumber}
          onChangeText={(text) => {
            setMobileNumber(text);
            setMobileNumberError('');
            setGeneralError('');
            // Clear the error when the user starts typing
          }}
          keyboardType="phone-pad"
        />

      </View>
      {/* Other parts of your component */}
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
    </View>
    <View style={styles.inputContainer}>
    <Text style={styles.label}>Address<Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
style={[
  styles.input,
  { borderColor: AddressError && !address ? 'red' : 'gray' }
]}         value={address}
onChangeText={(text) => {
  setAddress(text);
setAddressError(''); // Clear the error when the user starts typing
}}
        keyboardType="default"
      />

    </View>
    <View>
    <View style={styles.cameraCard}>
      <View style={styles.camera}>
        <TouchableOpacity onPress={handleTakePhoto} style={{ padding: 10, borderRadius: 5 }}>
          <Icon name="camera" size={34} color="#00c49b" />
        </TouchableOpacity>
        <Text style={styles.cameraHeading}>Take a Self<Text style={{ color: 'red' }}>*</Text></Text>
      </View>

      {/* Show the circular masked layout while the camera is active */}
      {isCameraActive && (
        <MaskedView
          style={styles.maskLayout}
          maskElement={
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="50" fill="white" />
            </Svg>
          }
        >
          <View style={styles.cameraPreview} />
        </MaskedView>
      )}

      {/* Display the preview if a selfie is captured */}
      {photoUri && (
        <View style={{ marginTop: 10 }}>
          {/* Image */}
          <Image
            source={{ uri: photoUri }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      )}
    </View>
 
      {/* Other parts of your component */}
    </View>
    <View style={styles.customnext}>
      <CustomButton
        title="NEXT"
        onPress={handleNext}
        style={styles.nextButton}
        titleStyle={styles.nextButtonText}
      />
    </View>
  </View>
)}
 {currentTab === 'IDProof' && (

        <View style={styles.card}>
    <ScrollView style={{ flex: 2 }} showsVerticalScrollIndicator={false}>

           <View style={styles.inputContainer}>
      <Text style={styles.label}>Enter Vehicle Type</Text>
      
      {/* Use Picker component for dropdown */}
      <Picker
        selectedValue={selectedVehicleType}
        onValueChange={(itemValue) => {
          setSelectedVehicleType(itemValue);
          setNameError('');
          setGeneralError('');
        }}
        style={[
          styles.input,
          { borderColor: nameError && !selectedVehicleType ? 'red' : 'gray' },
        ]}
      >
        <Picker.Item label="Select Vehicle Type" value="" />
        {vehicleTypes.map((type, index) => (
          <Picker.Item key={index} label={type} value={type} />
        ))}
      </Picker>
    </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Registration Number</Text>
        <TextInput
          style={[
            styles.input,
          ]}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError('');
            setGeneralError('');
          }}
        />
      </View>

        <Text style={styles.cardHeading}>Choose Document Type</Text>
        <View style={styles.idProofOptionContainer}>
        <View style={styles.rowContainer}>
  <LinearGradient
    colors={['#8ee4a5', '#01a399']}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{
      width: '50%', // Set width to 100%
      height: '100%', // Set height to 100%
      borderRadius: 8,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

    }}
  >
   <CustomButton
  title="Aadhar card"
  color="transparent"
  // onPress={() => handleOpenFile(aadharFileUri)}
  style={{
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }}
/>
  </LinearGradient>


  <View style={styles.fileContainer}>
    {aadharFileUri && (
      <>
        {isImageFile(aadharFileUri) ? (
          <Image source={{ uri: aadharFileUri }} style={styles.fileImage} />
        ) : (
          <TouchableOpacity onPress={() => openFile(aadharFileUri)}>
            <Text>{getFileName(aadharFileUri)}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleCloseButton('aadhar')} style={styles.closeButton}>
          <Icon name="close" size={10} color="#01a399" />
        </TouchableOpacity>
      </>
      
    )}
  </View>
  {/* Display Aadhar photo preview */}
  {aadharPhotoUri && (
    <View style={{ marginTop: 10 }}>
      <Image
        source={{ uri: aadharPhotoUri }}
        style={{ width: 50, height: 50 }}
      />
      <TouchableOpacity onPress={() => handleClosePhoto('aadhar')} style={styles.closeButtoncamera}>
    <Icon name="close" size={10} color="#01a399" />
  </TouchableOpacity>
    </View>
    
  )}
 
  <View>
  <TouchableOpacity onPress={() => handleFileUpload('aadhar')} style={styles.uploadButton}>
    <Icon name="upload" size={24} color="#00c49b" />
  </TouchableOpacity>
</View>
<View>
<TouchableOpacity onPress={() => handleTakePhoto('aadhar')} style={styles.cameraButton}>
      <Icon name="camera" size={24} color="#00c49b" />
    </TouchableOpacity>
    {/* Display the preview if a photo is captured */}
    
  </View>
</View>

<View style={styles.rowContainer}>
  <LinearGradient
    colors={['#8ee4a5', '#01a399']}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{
      width: '50%',
      height: '100%',
      borderRadius: 8,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

    }}
  >
    <CustomButton
      title="Driving License"
      color="transparent"

      onPress={() => handleOpenFile(drivingLicenseFileUri)}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        Color: 'transparent', // Set the background color to transparent
      }}
    />
   
  </LinearGradient>
  <View style={styles.fileContainer}>
    {drivingLicenseFileUri && (
      <>
        {isImageFile(drivingLicenseFileUri) ? (
          <Image source={{ uri: drivingLicenseFileUri }} style={styles.fileImage} />
        ) : (
          <TouchableOpacity onPress={() => openFile(drivingLicenseFileUri)}>
            <Text>{getFileName(drivingLicenseFileUri)}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleCloseButton('drivingLicense')} style={styles.closeButton}>
          <Icon name="close" size={10} color="#01a399" />
        </TouchableOpacity>
      </>
    )}

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
  },
  uploadButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff', // White background color
    marginVertical: -20,
    marginRight: -40, // Adjust spacing as needed
  },

  cameraButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff', // White background color
    marginVertical: -20,
    marginRight: -10, // Adjust spacing as needed

  },
  customnext:{
marginTop:-30,
  },
  customnexts:{
    marginTop:60,
      },
      customnextss:{
        marginTop:-60,
          },
      uploadedFileContainer: {
        marginTop: 10,
        alignItems: 'center',
      },
      uploadedFileText: {
        fontSize: 16,
        marginBottom: 10,
      },
      uploadedFileImage: {
        width: 30,
        height: 30,
        resizeMode: 'cover', // Adjust the image content mode as needed
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      pdf: {
        flex: 1,
        width: '50%',
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
      },
      fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      fileImage: {
        width: 40,
        height: 40,
        borderColor: '#01a399',
        borderWidth: 1,
        marginTop:14,
        marginLeft:0,

      },
      closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
      },
      closeButtoncamera: {
        position: 'absolute',
        top: -8,
        right: -10,
      },
      maskLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      circleOverlay: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the background color and opacity as needed
        justifyContent: 'center',
        alignItems: 'center',
      },
       rowContainer: {
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
