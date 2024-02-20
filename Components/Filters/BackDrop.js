import {
  Canvas,
  BackdropFilter,
  Fill,
  Image,
  ColorMatrix,
  useImage,
} from '@shopify/react-native-skia';
const BLACK_AND_WHITE = [
  0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0,
];
const BackDrop = ({imageUrl}) => {
  const [isBackDrop, setIsBackDropped] = useState(false);
  const image = useImage(imageUrl);

  if (!image) {
    return null;
  }

  const toggleBackDrop = () => {
    setIsBackDropped(!isBackDrop);
  };

  return (
    <Canvas style={{width: 256, height: 256}}>
      <Image image={image} x={0} y={0} width={900} height={900} fit="cover" />
      <BackdropFilter
        clip={{x: 0, y: 128, width: 256, height: 128}}
        filter={<ColorMatrix matrix={BLACK_AND_WHITE} />}
      />
    </Canvas>
  );
};

export default BackDrop;
