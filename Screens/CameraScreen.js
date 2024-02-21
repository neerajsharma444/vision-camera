import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {GrayscaleImage} from '../Components/Filters/GrayscaleImage';
import {Grayscale} from 'react-native-color-matrix-image-filters'; // Import Grayscale filter

const CameraScreen = ({navigation}) => {
  const camera = useRef(null);
  const [photo, setPhoto] = useState();
  const [flash, setFlash] = useState('off');
  const [showCamera, setShowCamera] = useState(true);
  const [cameraType, setCameraType] = useState('back');
  const device = useCameraDevice(cameraType);
  const [isRecording, setIsRecording] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();
  const [showFullImage, setShowFullImage] = useState(false); // State to control full image display
  const [isGrayscale, setIsGrayscale] = useState(false); // State to control grayscale filter

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    if (!microphonePermission) {
      requestMicrophonePermission();
    }
  }, [hasPermission, microphonePermission]);

  useEffect(() => {
    const cameraScreen = navigation.addListener('focus', () => {
      setPhoto(undefined); // Reset photo state when navigating back to CameraScreen
    });

    return cameraScreen;
  }, [navigation]);

  const flashButton = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
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

  const captureButton = async () => {
    if (isRecording) {
      camera.current?.stopRecording();
      return;
    }
    console.log('Taking Picture');
    const photo = await camera.current.takePhoto({
      flash,
      saveToGallery: true,
      base64Encoded: true,
    });
    console.log('Image captured:', photo);
    setPhoto(photo);
  };

  const handleFlipCamera = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  const uploadImage = async () => {
    if (!photo) {
      return;
    }
    const result = await fetch(`file://${photo.path}`);
    console.log('result...', result);
    navigation.navigate('Post', {photo: photo});
  };

  return (
    <View style={styles.mainContainer}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        photo
        device={device}
        isActive={showCamera && !photo} // for showing camera disable or enable
        onPictureTaken={data => {
          setPhoto(data.image);
        }}
      />

      {photo ? (
        <>
          <Image
            source={{uri: `file://${photo.path}`}}
            style={StyleSheet.absoluteFill}
          />

          <Entypo
            onPress={() => setPhoto(undefined)}
            name="cross"
            size={50}
            color="white"
            style={{top: 10, left: 10, position: 'absolute'}}
          />
          <View style={styles.uploadImageView}>
            <TouchableOpacity
              onPress={() => setShowFullImage(true)} // Toggle full image display
              style={{
                height: 65,
                width: 65,
                borderRadius: 100,
                borderColor: '#fff',
                borderWidth: 5,
                alignSelf: 'center',
              }}>
              {showFullImage ? ( // Check if full image display is active
                <GrayscaleImage // Render GrayscaleImage component
                  style={{
                    height: 60,
                    borderRadius: 100,
                    width: 60,
                    margin: 2,
                  }}
                  imageUri={`file://${photo.path}`}
                />
              ) : (
                <Image // Render original image
                  style={{
                    height: '100%',
                    borderRadius: 100,
                    width: '100%',
                    margin: 2,
                  }}
                  source={{uri: `file://${photo.path}`}}
                />
              )}
            </TouchableOpacity>
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
            size={40}
            color="white"
            style={{top: 10, left: 10, position: 'absolute'}}
          />
          <View style={styles.flashButton}>
            <TouchableOpacity onPress={flashButton}>
              {flash === 'off' ? (
                <Image
                  source={require('../images/flash-off.png')}
                  style={{height: 35, width: 25}}
                />
              ) : (
                <Image
                  source={require('../images/flash-on.png')}
                  style={{height: 35, width: 25}}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              borderRadius: 10,
              justifyContent: 'space-between',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <TouchableOpacity
              onPress={openImagePicker}
              style={{justifyContent: 'center'}}>
              <Image
                source={require('../images/gallery.png')}
                style={{height: 55, width: 55, left: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={captureButton}
              onLongPress={onStartRecording}
              style={{justifyContent: 'center'}}>
              <Image
                source={require('../images/capture.png')}
                style={{height: 90, width: 90}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFlipCamera}
              style={{justifyContent: 'center'}}>
              <Image
                source={require('../images/flip-camera.png')}
                style={{height: 55, width: 55, right: 20}}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      {photo && showFullImage && (
        <TouchableOpacity
          onPress={() => setShowFullImage(false)} // Hide full image when tapped
          style={StyleSheet.absoluteFill}>
          <Image
            source={{uri: `file://${photo.path}`}}
            style={{flex: 1, width: null, height: null}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  uploadImageView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
  },

  uploadImageText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#00FFFF',
  },

  flashButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10,
  },
});
