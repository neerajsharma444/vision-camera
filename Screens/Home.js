import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';

const Home = ({route, navigation}) => {
  // const {posts} = route.params ? route.params : {};
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = database().ref('/posts');
    const postsChange = snapshot => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setPosts(postsArray);
      }
    };

    postsRef.on('value', postsChange);

    return () => postsRef.off('value', postsChange);
  }, []);

  const renderPosts = ({item}) => (
    <View style={styles.postContainer}>
      {posts ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: item.uri}}
              resizeMode="cover"
            />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        </>
      ) : (
        <>
          <Text>Photo not available</Text>
        </>
      )}
    </View>
  );

  const emptyData = () => (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 26, color: 'black'}}>No Posts Found!!</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={emptyData}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  postContainer: {
    marginBottom: 20,
  },

  imageContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 2,
    elevation: 5,
    marginBottom: 10,
  },

  image: {
    width: '100%',
    height: 250,

    borderRadius: 10,
  },

  caption: {
    fontSize: 16,
    margin: 5,
    color: 'black',
    fontStyle: 'normal',
  },
});
