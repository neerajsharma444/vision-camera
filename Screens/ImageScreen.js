import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const ImageScreen = ({navigation, route}) => {
  const {photo} = route.params;

  const handleCross = () => {
    navigation.navigate('CameraScreen');
    console.log('image', photo);
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flex: 0.07,
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'yellow',
        }}>
        <TouchableOpacity onPress={handleCross}>
          <Entypo name="cross" size={40} color="black" />
        </TouchableOpacity>

        <Text style={styles.heading}>Preview Image </Text>
      </View>
      <Image source={{uri: `file://${photo.path}`}} style={styles.image} />
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'green',
  },

  heading: {
    fontSize: 30,
    color: 'black',
    marginLeft: 40,
    fontWeight: 'bold',
  },

  image: {
    borderRadius: 10,
    flex: 0.9,
    resizeMode: 'cover',
  },
});
