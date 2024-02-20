import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';

const Home = ({route}) => {
  const {posts} = route.params ? route.params : {};

  const renderPosts = ({item}) => (
    <View style={styles.postContainer}>
      {posts ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{uri: `file://${item.photo.path}`}}
            />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );

  const emptyData = () => (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 26, color: 'white'}}>No Posts Found!!</Text>
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

  postContainer: {
    flex: 1,
    marginBottom: 20,
  },

  imageContainer: {
    marginBottom: 5,
  },

  image: {
    width: '100%',
    height: 600,
    borderRadius: 10,
  },

  caption: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
});
