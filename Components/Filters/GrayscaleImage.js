import {Grayscale} from 'react-native-color-matrix-image-filters';
import {Image} from 'react-native';

export const GrayscaleImage = ({imageUri, style}) => {
  return (
    <Grayscale style={{flex: 0.3}}>
      <Image
        style={style}
        source={{
          uri: imageUri,
        }}
      />
    </Grayscale>
  );
};
