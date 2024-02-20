import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';

const Post = ({navigation, route}) => {
  const {photo} = route.params ? route.params : {};
  const [caption, setCaption] = useState('');
  const [posts, setPosts] = useState([]);

  const openCamera = () => {
    navigation.navigate('CameraScreen');
  };

  const uploadPost = () => {
    console.log("object",photo)
    const user = {
      uri: `data:${photo.mime};base64,${photo.data}`,
      caption: caption,
    };

    if (photo && caption) {
      database()
      .ref('/users')
      .push(user)
      .then(()=>{
        console.log('User added successfully')
      })
      .catch(error=>{
        console.log('Error adding user to database:',error);
      });
      
      const newPosts = [...posts, {photo, caption}];
      setPosts(newPosts);
      navigation.navigate('Home', {posts: newPosts});
      navigation.setParams({photo: null});
      setCaption('');
    } else {
      Alert.alert('Please post photo and caption');
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Add Image</Text>
        {photo ? (
          <Image style={styles.image} source={{uri:`data:${photo.mime};base64,${photo.data}`}} />
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
                  color:'black'
                }}>
                Please capture image first....
              </Text>
            </View>
            <View style={styles.cameraButton}>
              <TouchableOpacity onPress={openCamera}>
                <IonIcons name="camera" size={40} color="black" />
              </TouchableOpacity>
              <Text style={{fontSize: 18, color: 'black'}}>
                Choose from Camera
              </Text>
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
          placeholderTextColor='black'
          onChangeText={text => setCaption(text)}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          // backgroundColor: 'yellow',
        }}>
        <TouchableOpacity style={styles.uploadPost} onPress={uploadPost}>
          <Text style={styles.uploadTxt}>Post</Text>
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
    // justifyContent: 'space-around',
    // backgroundColor: 'black',
  },

  heading: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  image: {
    height: 400,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
  },

  inputContainer: {
    marginBottom: 20,
    // backgroundColor: 'green',
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
    color:'black'
  },

  cameraButton: {
    gap: 20,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },

  uploadPost: {
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#1C6758',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});
