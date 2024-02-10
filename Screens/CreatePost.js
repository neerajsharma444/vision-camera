import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {addPost} from '../Redux/reducers/feedSlice';

const CreatePost = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [caption, setCaption] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImagePress = () => {
    toggleModal();
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const options = {quality: 1, base64: true};
      const data = await cameraRef.current.capture(options);
      setCapturedImage(data.uri);
      toggleModal();
    }
  };

  const handleSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setCapturedImage(image.path);
        toggleModal();
      })
      .catch(error => {
        console.log('Error selecting image:', error);
      });
  };

  const handleCancel = () => {
    setCapturedImage(null);
    toggleModal();
  };

  const handleSubmit = () => {
    // Dispatch addPost action with image URI and caption
    dispatch(addPost({image: capturedImage, text: caption}));
    setCaption('');
    setCapturedImage(null);
    toggleModal();
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Select Image */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePress}>
        {capturedImage ? (
          <Image style={styles.image} source={{uri: capturedImage}} />
        ) : (
          <Image
            style={styles.plusIcon}
            source={require('../Assets/images/plus.png')}
          />
        )}
      </TouchableOpacity>

      {/* Add Caption */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Add Caption</Text>
        <TextInput
          style={styles.captionInput}
          multiline
          placeholder="Write a caption..."
          value={caption}
          onChangeText={text => setCaption(text)}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Post</Text>
      </TouchableOpacity>

      {/* Native Modal (Camera & Image Picker) */}
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.closeModalButton}>Close</Text>
          </TouchableOpacity>
          <View style={styles.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={styles.cameraPreview}
              cameraType="back"
              flashMode="off"
              captureAudio={false}
            />
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}>
              <Text style={styles.captureButtonText}>Capture</Text>
            </TouchableOpacity>
          </View>
          <Button title="Select Image" onPress={handleSelectImage} />
          {capturedImage && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  plusIcon: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 14,
  },
  captionInput: {
    paddingLeft: 15,
    width: '100%',
    height: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    borderColor: '#006175',
    borderWidth: 0.5,
    marginTop: 2,
    textAlignVertical: 'top',
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#1C6758',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  submitButtonText: {
    fontSize: 25,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  closeModalButton: {
    fontSize: 18,
    marginBottom: 10,
    color: '#006175',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  cameraPreview: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#1C6758',
    borderRadius: 50,
    padding: 15,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 18,
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cancelButtonText: {
    color: '#FF0000',
    fontSize: 18,
  },
});

export default CreatePost;
