import {
  Canvas,
  Image,
  Turbulence,
  DisplacementMap,
  useImage,
} from '@shopify/react-native-skia';

const DisplacementMap = ({imageUrl}) => {
  const [isDisplaced, setIsDisplaced] = useState(false);
  const image = useImage(imageUrl);
  if (!image) {
    return null;
  }
  const toggleDisplacement = () => {
    setIsDisplaced(!isDisplaced);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={toggleDisplacement}
        style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            {isDisplaced ? 'Back to Original' : 'Apply Displacement Filter'}
          </Text>
        </View>
      </TouchableOpacity>
      <Canvas style={{width: 256, height: 256}}>
        {isDisplaced ? (
          <Image image={image} x={0} y={0} width={700} height={700} fit="cover">
            <DisplacementMap channelX="g" channelY="a" scale={20}>
              <Turbulence freqX={0.01} freqY={0.05} octaves={2} seed={2} />
            </DisplacementMap>
          </Image>
        ) : (
          <Image
            x={0}
            y={0}
            width={700}
            height={700}
            image={image}
            fit="cover"
          />
        )}
      </Canvas>
    </View>
  );
};

export default DisplacementMap;
