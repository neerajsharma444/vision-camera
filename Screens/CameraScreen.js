import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import Entypo from 'react-native-vector-icons/Entypo';
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

  if (!hasPermission || !microphonePermission) {
    return <ActivityIndicator />;
  }

  useEffect(() => {
    const cameraScreen = navigation.addListener('focus', () => {
      setPhoto(undefined);
    });

    return cameraScreen;
  }, [navigation]);

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

  const flashButton = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: photo?.width || 300,
      height: photo?.height || 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setPhoto(image);
      })
      .catch(error => {
        if (ImagePicker.isCancel(error)) {
          console.log('User cancelled image selection');
        } else {
          console.log('Error picking image:', error);
        }
      });
  };

  const captureButton = async () => {
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
    console.log('result', result);
    // const data = await result.blob();
    // console.log('data', data);
    navigation.navigate('Post', {photo: photo});
  };

  return (
    <View style={styles.mainContainer}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        photo
        device={device}
        isActive={showCamera && !photo}
        onPictureTaken={data => {
          const filteredImage = applyFilter(data.image);
          setPhoto(filteredImage);
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
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // padding: 10,
    justifyContent: 'flex-end',
    // backgroundColor: 'green',
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

  img: {
    height: 50,
    width: 50,
  },

  cameraTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
