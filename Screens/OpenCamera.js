import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const OpenCamera = ({navigation}) => {
  const openCamera = () => {
    navigation.navigate('CameraScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
        <Text style={styles.cameraTxt}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OpenCamera;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    // backgroundColor: 'green',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    // textAlign: 'center',
    color: 'white',
  },

  cameraButton: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#1C6758',
  },

  cameraTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },

  imgContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
