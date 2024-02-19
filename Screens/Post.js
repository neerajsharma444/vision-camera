import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';

const Post = ({navigation, route}) => {
  const {photo} = route.params ? route.params : {};
  const [inputText, setInputText] = useState('');
  const [caption, setCaption] = useState('');

  const openCamera = () => {
    navigation.navigate('CameraScreen');
  };

  const uploadPost = () => {
    console.log(photo);
    if (photo) {
      setInputText(prevText =>
        prevText
          ? prevText + `\n![Uploaded Image](${photo})`
          : `![Uploaded Image](${photo})`,
      );
    }
    navigation.navigate('Home', {photo, caption});
    navigation.setParams({photo: null});
    setCaption('');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Add Image</Text>
        {photo ? (
          <Image style={styles.image} source={{uri: `file://${photo.path}`}} />
        ) : (
          <>
            <View>
              <Text style={{fontSize: 18, marginTop: 10}}>
                Please capture or upload image first....
              </Text>
            </View>
            <View style={styles.cameraButton}>
              <IonIcons name="camera" size={40} color="black" />
              <TouchableOpacity onPress={openCamera}>
                <Text style={{fontSize: 18, color: 'black'}}>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Add Caption</Text>
        <TextInput
          multiline
          value={caption}
          style={styles.captionInput}
          placeholder="Write a caption..."
          onChangeText={text => setCaption(text)}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.uploadButton} onPress={uploadPost}>
          <Text style={styles.uploadTxt}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'black',
  },

  heading: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  inputTxt: {
    height: 100,
    marginTop: 10,
    width: '100%',
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#006175',
    textAlignVertical: 'top',
  },

  image: {
    height: 150,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Medium',
  },

  imageContainer: {
    // height: 100,
    backgroundColor: 'black',
    // flexDirection: 'row',
    // alignItems: 'center',
  },

  captionInput: {
    paddingLeft: 15,
    width: '100%',
    height: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    borderColor: '#006175',
    borderWidth: 0.5,
    marginTop: 10,
    textAlignVertical: 'top',
    padding: 10,
  },

  cameraButton: {
    gap: 30,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadButton: {
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#1C6758',
    justifyContent: 'center',
  },

  uploadTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
  },
});
