import React, {useEffect, useRef, useState} from 'react';
import {
  // ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = ({navigation}) => {
  const camera = useRef(null);
  const [photo, setPhoto] = useState();
  const [flash, setFlash] = useState('off');
  const [showCamera, setShowCamera] = useState(true);
  const [cameraType, setCameraType] = useState('back');
  const device = useCameraDevice(cameraType);
  const {hasPermission, requestPermission} = useCameraPermission();
  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    if (!microphonePermission) {
      requestMicrophonePermission();
    }
  }, [hasPermission, microphonePermission]);

  const captureButton = async () => {
    console.log('Taking Picture');
    const photo = await camera.current.takePhoto({
      flash,
    });
    setPhoto(photo);
  };

  const uploadImage = async () => {
    if (!photo) {
      return;
    }
    // Handle image upload here
    console.log('Selected image:', photo);
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: photo?.width || 300,
      height: photo?.height || 400,
      cropping: true,
    })
      .then(image => {
        setPhoto(image);
      })
      .catch(error => {
        console.log('Error picking image:', error);
      });
  };
  const handleFlipCamera = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Camera</Text>

      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        photo
        device={device}
        isActive={showCamera && !photo} //for showing camera disable or enable
      />

      {photo ? (
        <>
          <Image source={{uri: photo.path}} style={StyleSheet.absoluteFill} />

          <Entypo
            onPress={() => setPhoto(undefined)}
            name="cross"
            size={60}
            color="white"
            style={{top: 0, left: 10, position: 'absolute'}}
          />
          <View style={styles.uploadImageView}>
            <TouchableOpacity onPress={uploadImage}>
              <Text style={styles.uploadImageText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Entypo
            onPress={() => navigation.goBack('OpenCamera')}
            name="cross"
            size={60}
            color="white"
            style={{top: 10, left: 10, position: 'absolute'}}
          />

          <View style={styles.flashButton}>
            <Ionicons
              name={flash === 'off' ? 'flash-off' : 'flash'}
              onPress={() =>
                setFlash(curValue => (curValue === 'off' ? 'on' : 'off'))
              }
              size={50}
              color="white"
            />
          </View>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={captureButton}
          />
          <MaterialCommunityIcons
            onPress={openImagePicker}
            name="view-gallery"
            size={60}
            color="white"
            style={{
              position: 'absolute',
              left: 20,
              bottom: 55,
            }}
          />
          <MaterialIcons
            onPress={handleFlipCamera}
            name="flip-camera-android"
            size={60}
            color="white"
            style={{
              position: 'absolute',
              right: 20,
              bottom: 55,
            }}
          />
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  uploadImageView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
  },

  uploadImageText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#00FFFF',
  },

  flashButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10,
  },

  cameraButton: {
    width: 75,
    bottom: 50,
    height: 75,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
  },

  cameraTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
