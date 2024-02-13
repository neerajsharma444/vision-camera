import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ImageScreen = ({route}) => {
  const {photo} = route.params;

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Preview Image </Text>
      <Image source={{uri: photo.path}} style={styles.image} />
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'green',
    // justifyContent: 'center',
  },

  heading: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },

  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    // backgroundColor: 'white',
  },
});
