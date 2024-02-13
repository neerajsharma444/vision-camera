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
  console.log('After requesting Camera Permission:', hasPermission);
  console.log('After requesting Microphone Permission:', microphonePermission);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (device == null) {
    return (
      <Text
        style={{
          fontSize: 28,
          color: 'black',
          alignSelf: 'center',
        }}>
        Camera not available
      </Text>
    );
  }

  const captureButton = async () => {
    console.log('Taking Picture');
    const photo = await camera.current.takePhoto({
      flash,
      saveToGallery: true,
    });
    setPhoto(photo);
    // setPhoto({uri: photo.uri});
    console.log('Image captured:', photo);
    // catch (error) {
    //   console.error('Error capturing photo:', error);
    // }
  };

  const onStartRecording = async () => {
    if (!camera.current) {
      return;
    }
    setIsRecording(true);
    camera.current.startRecording({
      onRecordingFinished: video => {
        setIsRecording(false);
        setVideo(video);
        console.log(video);
      },
      onRecordingError: error => {
        console.log(error);
        setIsRecording(false);
      },
    });
    console.log('Recording started:');
  };

  const uploadImage = async () => {
    if (!photo) {
      return;
    }
    const file = await camera.current.takePhoto();
    const result = await fetch(`file://${file.path}`);
    const data = await result.blob();
    console.log(data);
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: photo?.width || 300,
      height: photo?.height || 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        setImagePickerVisible(false);
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
      {/* <Text style={styles.heading}>Camera</Text> */}

      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        photo
        device={device}
        isActive={showCamera && !photo} //for showing camera disable or enable
        onPictureTaken={data => {
          const filteredImage = applyFilter(data.image); // Apply filter
          setPhoto(filteredImage);
        }}
      />

      {/* && photo.path */}
      {photo ? (
        <>
          <Image source={{uri: photo.uri}} style={StyleSheet.absoluteFill} />

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
              size={45}
              color="white"
            />
          </View>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={captureButton}
            onLongPress={onStartRecording}
          />
          <MaterialCommunityIcons
            onPress={openImagePicker}
            name="view-gallery"
            size={50}
            color="white"
            style={{
              position: 'absolute',
              left: 20,
              bottom: 55,
            }}
          /> */}
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={captureButton}
            onLongPress={onStartRecording}
          />
          <MaterialIcons
            onPress={handleFlipCamera}
            name="flip-camera-android"
            size={40}
            color="white"
            style={{
              position: 'absolute',
              right: 20,
              bottom: 65,
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
    // backgroundColor: 'green',
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

  img: {
    height: 50,
    width: 50,
  },
  
  cameraButton: {
    width: 75,
    bottom: 50,
    height: 75,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    // backgroundColor: isRecording ? 'red' : 'white',
  },

  cameraTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
