import React, {useState} from 'react';
import {Canvas, Blur, Image, useImage} from '@shopify/react-native-skia';
import {View, TouchableOpacity, Text} from 'react-native';

const BlurImage = ({imageUrl}) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const image = useImage(imageUrl);

  if (!image) {
    return null;
  }

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={toggleBlur}
        style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
          {isBlurred ? 'Unblur' : 'Blur'}
        </Text>
      </TouchableOpacity>
      <Canvas style={{flex: 1}}>
        {isBlurred ? (
          <Image x={0} y={0} width={900} height={900} image={image} fit="cover">
            <Blur blur={4} />
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
    </View>
  );
};

export default BlurImage;
