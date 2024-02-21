import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  sepia,
  tint,
  concatColorMatrices,
  ColorMatrix,
} from 'react-native-color-matrix-image-filters';

const CombinedFiltersImage = ({imageUrl}) => {
  const [combinedFilters, setCombinedFilters] = useState(false);

  const toggleCombinedFilters = () => {
    setCombinedFilters(!combinedFilters);
  };

  // Define the combined filter matrix
  const combinedMatrix = concatColorMatrices(sepia(), tint(1.25));

  return (
    <View style={{flex: 1}}>
      {combinedFilters ? (
        <ColorMatrix matrix={combinedMatrix}>
          <Image
            source={{uri: imageUrl}}
            style={{flex: 1, width: null, height: null}}
            resizeMode="cover"
          />
        </ColorMatrix>
      ) : (
        <Image
          source={{uri: imageUrl}}
          style={{flex: 1, width: null, height: null}}
          resizeMode="cover"
        />
      )}
      <TouchableOpacity
        onPress={toggleCombinedFilters}
        style={{position: 'absolute', top: 20, left: 20}}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
          {combinedFilters ? 'Original' : 'CombinedFilters'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CombinedFiltersImage;
