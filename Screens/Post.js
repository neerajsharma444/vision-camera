import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';

const Post = ({navigation, route}) => {
  const {photo} = route.params ? route.params : {};
  console.log(photo, 'photuu');
  const [caption, setCaption] = useState('');
  const [posts, setPosts] = useState([]);

  const openCamera = () => {
    navigation.navigate('CameraScreen');
  };

  const uploadPost = () => {
    const user = {
      uri: `data:${photo.mime};base64,${photo.data}`,
      caption: caption,
    };

    if (photo && caption) {
      database()
        .ref('/users')
        .push(user)
        .then(() => {
          console.log('User added successfully');
        })
        .catch(error => {
          console.error('Error adding user to DB:', error);
        });

      const newPosts = [...posts, {photo, caption}];
      setPosts(newPosts);
      navigation.navigate('Home', {posts: newPosts});
      navigation.setParams({photo: null});
      setCaption('');
    } else {
      Alert.alert('Please upload photo and caption');
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Add Image</Text>
        {photo ? (
          <Image
            style={styles.image}
            source={{uri: `data:${photo.mime};base64,${photo.data}`}}
          />
        ) : (
          <>
            <View
              style={{
                margin: 15,
                alignItems: 'center',
                // backgroundColor: 'green',
              }}>
              <Text
                style={{
                  fontSize: 18,
                }}>
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
    </ScrollView>
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

  image: {
    height: 300,
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
    // backgroundColor: 'yellow',
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
