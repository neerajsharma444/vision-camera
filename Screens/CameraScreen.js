import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = () => {
  const camera = useRef(null);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraType, setCameraType] = useState('back');
  const device = useCameraDevice(cameraType);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const toggleCameraType = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
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

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => {}} style={styles.closeIcon}>
          <FontAwesome name="close" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFlash()}
          style={[styles.flashIcon]}>
          <FontAwesome
            name={flashOn ? 'flash' : 'flash'}
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        flash={flashOn ? 'on' : 'off'}
      />
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => setImagePickerVisible(true)}>
          <Text style={styles.galleryIcon}>
            <FontAwesome name="image" size={28} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleCameraType()}
          style={[styles.cameraIcon]}>
          <FontAwesome name="camera" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleCameraType()}
          style={[styles.flipIcon]}>
          <FontAwesome name="retweet" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isImagePickerVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setImagePickerVisible(false)}>
            <Text style={styles.closeModalButton}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImagePick}>
            <Text style={styles.pickImageText}>Pick Image</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {selectedImage && (
        <TouchableOpacity
          style={styles.selectedImageContainer}
          onPress={handleCloseImage}>
          <Image style={styles.selectedImage} source={{uri: selectedImage}} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeIcon: {
    fontSize: 18,
    marginBottom: 10,
    color: '#006175',
  },
  flashIcon: {},
  camera: {
    flex: 0.95,
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  galleryIcon: {
    alignSelf: 'center',
  },
  cameraIcon: {},
  bottomRightIcon: {},
  flipIcon: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  closeModalButton: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFF',
  },
  pickImageText: {
    fontSize: 18,
    color: '#FFF',
  },
  selectedImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  selectedImage: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
  },
});

export default CameraScreen;
