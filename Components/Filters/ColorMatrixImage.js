import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {ColorMatrix} from 'react-native-color-matrix-image-filters';

const ColorMatrixImage = ({imageUrl}) => {
  const [isColored, setIsColored] = useState(false);

  const toggleColor = () => {
    setIsColored(!isColored);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={toggleColor}
        style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
          {isColored ? 'Color Filter' : 'Original'}
        </Text>
      </TouchableOpacity>
      {isColored ? (
        <ColorMatrix
          matrix={[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]}>
          <Image
            source={{uri: imageUrl}}
            style={{flex: 1}}
            resizeMode="contain"
          />
        </ColorMatrix>
      ) : (
        <Image
          source={{uri: imageUrl}}
          style={{flex: 1}}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default ColorMatrixImage;
