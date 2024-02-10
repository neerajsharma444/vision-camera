import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addPost} from '../Redux/reducers/feedSlice';
import {fetchPosts} from '../Services/api';
import PostDetails from './PostDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.feed.posts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetchPosts();
        dispatch(addPost(postsData));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleCommentIconPress = post => {
    setSelectedPost(selectedPost === post ? null : post);
  };

  const handleClosePostDetails = () => {
    setSelectedPost(null);
  };

  const renderPost = ({item}) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => handleCommentIconPress(item)}>
      <View style={styles.userInfo}>
        <Image source={{uri: item.owner.picture}} style={styles.profileImage} />
        <Text style={styles.username}>
          {item.owner.firstName} {item.owner.lastName}
        </Text>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
      {item.image && (
        <Image source={{uri: item.image}} style={styles.postImage} />
      )}

      {/* Comment Icon */}
      <View style={styles.commentIconContainer}>
        <FontAwesome
          style={styles.commentIcon}
          name="comment-o"
          size={20}
          color="#000000"
        />
        <Text style={styles.commentCount}>{item.comments.length}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={post => post.id}
        renderItem={renderPost}
        extraData={selectedPost}
      />

      {/* Render PostDetails Modal */}
      {selectedPost && (
        <PostDetails
          post={selectedPost}
          handleCommentIconPress={handleCommentIconPress}
          selectedPost={selectedPost}
          onClose={handleClosePostDetails}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  commentIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentIcon: {
    marginRight: 4,
  },
  commentCount: {
    fontSize: 14,
  },
});

export default Feed;
