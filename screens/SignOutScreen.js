import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,ScrollView,Alert,Image,Modal,FlatList,Button,PermissionsAndroid,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import  CustomButton from'../Component/CustomButton';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera } from 'react-native-image-picker'; // If you're using react-native-image-picker
import FileViewer from 'react-native-file-viewer';
import Pdf from 'react-native-pdf';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient from your library
import { Picker } from '@react-native-picker/picker';
import { MaskedView } from '@react-native-masked-view/masked-view';
// import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import Svg, { Circle } from 'react-native-svg';
import RNFetchBlob from 'rn-fetch-blob';

const SignOutScreen = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState(''); 
  const[address,setAddress]=useState('');
  const [selfieTaken, setSelfieTaken] = useState(false);
  const source = aadharFileUri ? { uri: aadharFileUri.URL, cache: true } : null;

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
  const [selfiePhotoUri, setSelfiePhotoUri] = useState(null);
  const [showPdfContent, setShowPdfContent] = useState(false);
  const [pdfContent, setPdfContent] = useState(''); // State for storing PDF content

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
    let isPng= ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
    console.log("isImageFIle",isPng);
    return isPng;
  };
  const getFileName = (fileUri) => {
    const uriParts = fileUri.split('/');
    return uriParts[uriParts.length - 1];
  };
  
  const isPdfFile = (fileUri) => {
    if (!fileUri) {
      return false;
    }
    const extension = fileUri;
    let isPdf =extension === 'pdf';
    console.log("isPdf",fileUri);
  };

  React.useEffect(() => {
    if (isPdfFile(aadharFileUri)) {
      console.log('PDF file is uploaded:', aadharFileUri);
    }
  }, [aadharFileUri]);

  // const uploadAadharCard = async (type) => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  
  //     const uri = res[0].uri;
  
  //     if (!res[0].type || typeof res[0].type !== 'string') {
  //       throw new Error('Invalid file type');
  //     }
  
  //     setAadharFileUri({"URL":uri,"isFile":true});
  //     setShowPdfContent(true);
  //     Alert.alert('Aadhar card uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading Aadhar card:', error);
  //     Alert.alert('Error uploading Aadhar card. Please try again.');
  //   }
  // };


  const uploadAadharCard = async () => {
    // Check if the app has permission to read external storage
    if (Platform.OS === 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const hasPermission = await PermissionsAndroid.check(permission);

      if (hasPermission) {
        // Request the permission
        const status = await PermissionsAndroid.request(permission);

        // Check the permission result
        if (status === 'granted') {
          console.warn('Permission denied by user');
          return;
        }
      }
    }
  
    // Continue with your existing upload logic
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const uri = res[0].uri;
  
      if (!res[0].type || typeof res[0].type !== 'string') {
        throw new Error('Invalid file type');
      }
      console.log("File URI:", uri);
       // Log the URI
       const filePath = `file://${RNFS.DocumentDirectoryPath}/yourFileName.pdf`;

        setAadharFileUri(uri); // Set the file URI directly
        setShowPdfContent(true);
      // setShowPdfContent(true); // Show PDF content after upload
      Alert.alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error uploading file. Please try again.');
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
  
      setDrivingLicenseFileUri({"URL":uri,"isFile":true});
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
  
  const handleFileUpload = async (documentType,type) => {
    switch (documentType) {
      case 'aadhar':
        await uploadAadharCard(type);
        break;
        case 'drivingLicense':
          await uploadDrivingLicense(type);
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

  const handleTakeselfie = () => {
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
          setSelfiePhotoUri(capturedPhotoUri); // Setting state for selfie photo
        }
      }
    });
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
            setAadharPhotoUri({"URI":capturedPhotoUri,"isFile":false});
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


  // console.log('Rendering with Photo URI:', photoUri);

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
        <TouchableOpacity onPress={handleTakeselfie} style={styles.cameraButton}>
          <Icon name="camera" size={34} color="#00c49b" />
        </TouchableOpacity>
        <Text style={styles.cameraHeading}>Take a Selfie<Text style={{ color: 'red' }}>*</Text></Text>
      </View>

      {/* Show the circular masked layout while the camera is active */}
      {isCameraActive && (
        <View style={styles.circularMask}>
          <Text style={{ color: 'white' }}>Camera Active</Text>
        </View>
      )}

      {/* Display the selfie preview inside the circular mask if selfiePhotoUri is not null */}
      {selfiePhotoUri && (
        <View style={styles.circularMask}>
          <Image source={{ uri: selfiePhotoUri }} style={styles.circularImage} />
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
    {aadharFileUri && typeof aadharFileUri === 'string' && (
        <>
            {aadharFileUri.split('.').pop().toLowerCase() === 'pdf' ? (
                <>
                    <TouchableOpacity
                        onPress={() => setShowPdfContent(!showPdfContent)}
                        style={styles.pdfContainer}
                    >
                        <Text style={{ color: "grey", borderColor: "black", borderWidth: 0.5, width: 150, height: 150 }}>
                            {showPdfContent ? 'Hide PDF' : 'Show PDF'}
                        </Text>
                    </TouchableOpacity>
                    <Pdf
    source={{ uri: filePath }}
    trustAllCerts={Platform.OS === 'android'}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`current page: ${page}`);
                        }}
                        onError={error => {
                            console.log(error);
                        }}
                        onPressLink={uri => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdfView}
                    />
                </>
            ) : (
              <View style={styles.imageContainer}>
                 <Image
                    source={{ uri: aadharFileUri }}
                    style={{ width: 50, height: 50,marginLeft:-40, }}
                />
              </View>
               
                
            )}
            <TouchableOpacity onPress={() => handleCloseButton('aadhar')} style={styles.closeButton}>
        <Icon name="close" size={10} color="#01a399" />
    </TouchableOpacity>
        </>
    )}
    
</View>



  {/* Display Aadhar photo preview */}
  {aadharPhotoUri && (
    <View style={{ marginTop: 10,marginLeft:-60 }}>
      <Image
        source={{ uri: aadharPhotoUri.URI }}
        style={{ width: 50, height: 50,marginRight:-30, }}
      />
      <TouchableOpacity onPress={() => handleClosePhoto('aadhar', "photo")} style={styles.closeButtoncamera}>
        <Icon name="close" size={10} color="#01a399" />
      </TouchableOpacity>
    </View>
  )}

  {/* Upload file button */}
  
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => handleFileUpload ('aadhar', 'upload')} style={styles.uploadButton}>
        <Icon name="upload" size={24} color="#00c49b" />
      </TouchableOpacity>
    </View>
  

  {/* Camera button */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => handleTakePhoto('aadhar', "photo")} style={styles.cameraButton}>
        <Icon name="camera" size={24} color="#00c49b" />
      </TouchableOpacity>
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
   {/* Display Driving License photo preview */}
   {drivingLicensePhotoUri && (
    <View style={{ marginTop: 10 }}>
      <Image
        source={{ uri: drivingLicensePhotoUri }}
        style={{ width: 50, height: 50 }}
      />
      <TouchableOpacity onPress={() => handleClosePhoto('drivingLicense')} style={styles.closeButtoncamera}>
    <Icon name="close" size={10} color="#01a399" />
  </TouchableOpacity>
    </View>
  )}

  <View>
  <TouchableOpacity onPress={() => handleFileUpload('drivingLicense')} style={styles.uploadButton}>
    <Icon name="upload" size={24} color="#00c49b" />
  </TouchableOpacity>
</View>
<View>
   {/* Set type as 'drivingLicense' when taking Driving License photo */}
   <TouchableOpacity onPress={() => handleTakePhoto('drivingLicense')} style={styles.cameraButton}>
      <Icon name="camera" size={24} color="#00c49b" />
    </TouchableOpacity>
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
      title="RC card"
      onPress={() => handleOpenFile(fileUri)}
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
          {rccardLicenseFileUri && (
            <>
              {isImageFile(rccardLicenseFileUri) ? (
                <Image source={{ uri: rccardLicenseFileUri }} style={styles.fileImage} />
              ) : (
                <TouchableOpacity onPress={() => openFile(rccardLicenseFileUri)}>
                  <Text>{getFileName(rccardLicenseFileUri)}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleCloseButton('rccard')} style={styles.closeButton}>
                <Icon name="close" size={10} color="#01a399" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {rcCardPhotoUri && (
    <View style={{ marginTop: 10 }}>
      <Image
        source={{ uri: rcCardPhotoUri }}
        style={{ width: 50, height: 50 }}
      />
      <TouchableOpacity onPress={() => handleClosePhoto('rccard')} style={styles.closeButtoncamera}>
    <Icon name="close" size={10} color="#01a399" />
  </TouchableOpacity>
    </View>
  )}
        <View>
  <TouchableOpacity onPress={() => handleFileUpload('rccard')} style={styles.uploadButton}>
    <Icon name="upload" size={24} color="#00c49b" />
  </TouchableOpacity>
</View>
<View>
<TouchableOpacity onPress={() => handleTakePhoto('rccard')} style={styles.cameraButton}>
      <Icon name="camera" size={24} color="#00c49b" />
    </TouchableOpacity>
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
      title="Vechicle Insurance"
      onPress={() => handleOpenFile(fileUri)}
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
          {vechicleInsurance && (
            <>
              {isImageFile(vechicleInsurance) ? (
                <Image source={{ uri: vechicleInsurance }} style={styles.fileImage} />
              ) : (
                <TouchableOpacity onPress={() => openFile(vechicleInsurance)}>
                  <Text>{getFileName(vechicleInsurance)}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleCloseButton('vechicleInsurance')} style={styles.closeButton}>
                <Icon name="close" size={10} color="#01a399" />
              </TouchableOpacity>
            </>
          )}
        </View>
        {vehicleInsurancePhotoUri && (
    <View style={{ marginTop: 10 }}>
      <Image
        source={{ uri: vehicleInsurancePhotoUri }}
        style={{ width: 50, height: 50 }}
      />
        <TouchableOpacity onPress={() => handleClosePhoto('vehicleInsurance')} style={styles.closeButtoncamera}>
    <Icon name="close" size={10} color="#01a399" />
  </TouchableOpacity>
    </View>
  )}
        <View>
  <TouchableOpacity onPress={() => handleFileUpload('vechicleInsurance')} style={styles.uploadButton}>
    <Icon name="upload" size={24} color="#00c49b" />
  </TouchableOpacity>
</View>
<View>
<TouchableOpacity onPress={() => handleTakePhoto('vehicleInsurance')} style={styles.cameraButton}>
      <Icon name="camera" size={24} color="#00c49b" />
    </TouchableOpacity>
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
      title="Driver Photo"
      onPress={() => handleOpenFile(fileUri)}
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
          {driverPhoto && (
            <>
              {isImageFile(driverPhoto) ? (
                <Image source={{ uri: driverPhoto }} style={styles.fileImage} />
              ) : (
                <TouchableOpacity onPress={() => openFile(driverPhoto)}>
                  <Text>{getFileName(driverPhoto)}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleCloseButton('driverPhoto')} style={styles.closeButton}>
                <Icon name="close" size={10} color="#01a399" />
              </TouchableOpacity>
            </>
          )}
        </View>
        {driverPhotoUri && (
    <View style={{ marginTop: 10 }}>
      <Image
        source={{ uri: driverPhotoUri }}
        style={{ width: 50, height: 50 }}
      />
       <TouchableOpacity onPress={() => handleClosePhoto('driverPhoto')} style={styles.closeButtoncamera}>
    <Icon name="close" size={10} color="#01a399" />
  </TouchableOpacity>
    </View>
  )}
        <View>
  <TouchableOpacity onPress={() => handleFileUpload('driverPhoto')} style={styles.uploadButton}>
    <Icon name="upload" size={24} color="#00c49b" />
  </TouchableOpacity>
</View>
<View>
<TouchableOpacity onPress={() => handleTakePhoto('driverPhoto')} style={styles.cameraButton}>
      <Icon name="camera" size={24} color="#00c49b" />
    </TouchableOpacity>
</View>
</View>





        </View>
        <View>
          <Text style={styles.sectionHeading}>Upload FrontView and BackView of Registering Vehicle</Text>
          <Text style={styles.sectionText}>Please make sure While taking photo number plate of Vehicle should clearly visible </Text>
        </View>
        <View style={styles.cameraContainer}>
        <View style={styles.cameraCard}>
  <View style={styles.camera}>
    {frontPhotoUri ? (
      <>
        <Image source={{ uri: frontPhotoUri }} style={{ width: 50, height: 50, borderRadius: 5 }} />
        <TouchableOpacity onPress={() => handleClosePhotoFB('front')} style={styles.closeButtoncamera}>
          <Icon name="close" size={10} color="#01a399" />
        </TouchableOpacity>
      </>
    ) : (
      <TouchableOpacity onPress={() => handleTakePhoto('front')} style={{ padding: 10, borderRadius: 5 }}>
        <Icon name="camera" size={34} color="#00c49b" />
      </TouchableOpacity>
    )}
    <Text style={styles.cameraHeading}>Front</Text>
  </View>
</View>
<View style={styles.cameraCard}>
  <View style={styles.camera}>
    {backPhotoUri ? (
      <>
        <Image source={{ uri: backPhotoUri }} style={{ width: 50, height: 50, borderRadius: 5 }} />
        <TouchableOpacity onPress={() => handleClosePhotoFB('back')} style={styles.closeButtoncamera}>
          <Icon name="close" size={10} color="#01a399" />
        </TouchableOpacity>
      </>
    ) : (
      <TouchableOpacity onPress={() => handleTakePhoto('back')} style={{ padding: 10, borderRadius: 5 }}>
        <Icon name="camera" size={34} color="#00c49b" />
      </TouchableOpacity>
    )}
    <Text style={styles.cameraHeading}>Back</Text>
  </View>
</View>
        </View>
        <View style={styles.customnextss}>
<CustomButton
  title="NEXT"
  onPress={handleNext}
  style={styles.nextButton}
  titleStyle={styles.nextButtonText}
/>
</View>
</ScrollView>

      </View>

      )}

      {currentTab === 'BankDetails' && (
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Enter Account Details</Text>
          
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name of the Account</Text>
            <TextInput
              style={styles.input}
              value={accountName}
              onChangeText={setAccountName}
              placeholder=""
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              value={accountValue}
              onChangeText={setAccountValue}
              keyboardType="numeric"
              placeholder=" "
            />
          </View>
          <View style={styles.inputContainer}>
  <Text style={styles.label}>Branch</Text>
  <TextInput
    style={styles.input}
    value={branch}
    onChangeText={setBranch}
    placeholder=""
  />
</View>
<View style={styles.inputContainer}>
  <Text style={styles.label}>IFSC Code</Text>
  <TextInput
    style={styles.input}
    value={ifscCode}
    onChangeText={setIfscCode}
    placeholder=""
  />
</View>
<View style={styles.inputContainer}>
        <Text style={styles.label}>UPID</Text>
        <TextInput
          style={styles.input}
          value={upiId}
          onChangeText={setUpiId}
          placeholder=""
        />
      </View>
<View style={styles.customnexts}>

<CustomButton
  title="Submit"
  onPress={submitNext}
  style={styles.nextButton}
  titleStyle={styles.nextButtonText}
/>
</View>
        </View>
      )}

      

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:10,
    color:'black',

  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  tab: {
    borderBottomWidth: 5,
    marginRight: 40,
    paddingBottom: 15,
    borderBottomColor: 'gray',

  },
  tabText: {
    fontSize: 18,
    color: 'gray',
  },
  activeTab: {
    borderBottomWidth: 5,
    borderBottomColor: '#01a399',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    
  },
  activeTabText: {
    color: '#00c49b',
    
  },
  tabContainers: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  tabs: {
    marginRight: 30,
    paddingBottom: 15,
    backgroundColor: '#00c49b',
    borderRadius: 15,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTexts: {
    fontSize: 18,
    color: 'black',
  },
  activeTabs: {
    borderBottomColor: 'green',
    backgroundColor: 'green',
    width: 100,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabTexts: {
    color: 'white',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    marginTop: -20,
    height: 690,
    width: 390,
    marginLeft: -18,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 10,
    color:'black',

  },
  label: {
    marginBottom: 5,
    color:'black',

  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    backgroundColor:'#f0f5f4',
    marginBottom: 10,
    color:'black',

  },
  idProofOptionContainer: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  // idProofOption: {
  //   backgroundColor: 'green',
  //   width: 100,
  //   height: 40,
  //   borderRadius: 15,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  idProofOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  nextButton: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    // marginBottom:10,
   alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
  nextButtons: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 20,
    marginBottom:20,
    alignItems: 'center',
  },
  nextButtonTexts: {
    color: 'white',
    fontSize: 18,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:-10,
    marginBottom:10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 0,
  },
  cameraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center', // Center items vertically
  },
  cameraCard: {
    backgroundColor: 'white',
    padding: 10,
    width:150,
    height:100,
    borderRadius: 10,
    elevation: 3,
    marginBottom:80,
  },
  camera: {
    alignItems: 'center',
  },
  cameraHeading: {
    fontSize: 18,
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
    marginRight: -5, // Adjust spacing as needed

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
      // pdf: {
      //   flex: 1,
      //   width: '50%',
      // },
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
        top: -10,
        right: -5,
      },
      closeButtoncamera: {
        position: 'absolute',
        top: -8,
        right: -40,
      },
      maskLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      circularMask: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginLeft:210,
        marginTop:-50,
      },
      circularImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
       rowContainer: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  cameraPreview: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Placeholder background color
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer:{
textAlign:'center',
marginLeft:10,
  },
  dropdownButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:15,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal at the bottom
  },
  modalContent: {
    padding: 5,
    borderRadius: 5,
    width: '50%',
    marginLeft:210,
    marginBottom:210, // Full width
  },
  optionItem: {

    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#01a399',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
  },
  vehicleTypesText:{
    fontSize: 16,
    backgroundColor: '#eee',


  },
  registercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  registrationView: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginRight: 70,
  },
  registrationText: {
    fontSize: 16,
  },
  vehicletypeViews: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
  },
  registrationTexts: {
    fontSize: 16,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor:'#f0f5f4',
    marginTop:10,

  },
  pdfContainer: {
    flex: 1,
    width: '50%', // Adjust as needed
    height: '50%', // Adjust as needed
  },
  pdfView: {
    flex: 1, // or adjust according to your layout
    width: '30%', // or adjust accordingly
    height: '30%', // or adjust accordingly
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginLeft:5 // Adjust as needed
  },
});



export default SignOutScreen;
