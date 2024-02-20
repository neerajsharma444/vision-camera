import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Canvas, ColorMatrix, Image, useImage} from '@shopify/react-native-skia';

const MatrixColor = ({imageUrl}) => {
  const [isColor, setColor] = useState(false);
  const image = useImage(imageUrl);

  if (!image) {
    return null;
  }

  const toggleColor = () => {
    setColor(!isColor);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={toggleColor}
        style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            {isColor ? 'Back to Original' : 'Apply Color Filter'}
          </Text>
        </View>
      </TouchableOpacity>
      <Canvas style={{flex: 1}}>
        {isColor ? (
          <Image x={0} y={0} width={900} height={900} image={image} fit="cover">
            <ColorMatrix
              matrix={[
                -0.578, 0.99, 0.588, 0, 0, 0.469, 0.535, -0.003, 0, 0, 0.015,
                1.69, -0.703, 0, 0, 0, 0, 0, 1, 0,
              ]}
            />
          </Image>
        ) : (
          <Image
            x={0}
            y={0}
            width={900}
            height={900}
            image={image}
            fit="cover"
          />
        )}
      </Canvas>
      <View>
        <TouchableOpacity>
          <Text style={{color: '#fff', fontSize: 16, alignSelf: 'center'}}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatrixColor;
