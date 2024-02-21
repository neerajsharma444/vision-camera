import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  GrayscaledImage,
  CombinedFiltersImage,
  VintageImage,
  NightvisionImage,
} from './Filter';
import {Vintage} from 'react-native-color-matrix-image-filters';

const uri = 'https://picsum.photos/536/354';

const Scroll = ({url}) => {
  return (
    <ScrollView style={{alignSelf: 'center'}} horizontal={true}>
      <TouchableOpacity
        style={{
          height: 65,
          width: 65,
          backgroundColor: 'white',
          borderRadius: 100,
          borderColor: 'black',
          borderwidth: 5,
        }}>
        <GrayscaledImage
          style={{
            height: 60,
            borderRadius: 100,
            width: 60,
            margin: 2,
          }}
          imageUri={url}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 65,
          width: 65,
          backgroundColor: 'white',
          borderRadius: 100,
          borderColor: 'black',
          borderwidth: 5,
          marginLeft: 10,
        }}>
        <CombinedFiltersImage
          style={{
            height: 60,
            borderRadius: 100,
            width: 60,
            margin: 2,
          }}
          imageUri={url}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 65,
          width: 65,
          backgroundColor: 'white',
          borderRadius: 100,
          borderColor: 'black',
          borderwidth: 5,
          marginLeft: 10,
        }}>
        <VintageImage
          style={{
            height: 60,
            borderRadius: 100,
            width: 60,
            margin: 2,
          }}
          imageUri={url}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 65,
          width: 65,
          backgroundColor: 'white',
          borderRadius: 100,
          borderColor: 'black',
          borderwidth: 5,
          marginLeft: 10,
        }}>
        <NightvisionImage
          style={{
            height: 60,
            borderRadius: 100,
            width: 60,
            margin: 2,
          }}
          imageUri={url}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Scroll;

const styles = StyleSheet.create({});
