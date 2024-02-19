import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';

const Home = ({route}) => {
  const {photo, caption} = route.params ? route.params : {};
  // const {posts} = route.params ? route.params : {};

  // const renderPosts = ({item}) => {
  // return(
  //   <View style={styles.postContainer}>
  //     <View style={styles.imageContainer}>
  //       <Image
  //         style={styles.image}
  //         source={{uri: `file://${item.photo.path}`}}
  //       />
  //     </View>
  //     <Text style={styles.caption}>{item.caption}</Text>
  //   </View>
  // );
  // }

  // const emptyData = () => {
  //   return (
  //     <View style={{alignItems: 'center', justifyContent: 'center'}}>
  //       <Text style={{fontSize: 26, color: 'white'}}>No Data Found!!</Text>
  //       <Text style={{fontSize: 18, color: 'white'}}>
  //         Please Fill Data first..
  //       </Text>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Welcome to Home Screen</Text>
      {photo && (
        <>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: `file://${photo.path}`}}
            />
          </View>
          {caption && <Text style={styles.caption}>{caption}</Text>}
        </>
      )}

      {/* <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={emptyData}
      /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },

  heading: {
    fontSize: 30,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'TwinkleStar-Regular',
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  caption: {
    fontSize: 18,
    color: 'white',
  },
});
