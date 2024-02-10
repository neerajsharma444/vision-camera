import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {fetchPosts} from '../Services/api';
import PostDetails from './PostDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchFeed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetchPosts();
        setAllPosts(postsData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (Array.isArray(allPosts)) {
      const filtered = allPosts.filter(post =>
        post.text.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredPosts(filtered);
    }
  };

  const handleCommentIconPress = post => {
    setSelectedPost(selectedPost === post ? null : post);
  };

  const handleClosePostDetails = () => {
    setSelectedPost(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Feed by Post Content"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onBlur={handleSearch}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={post => post.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() => handleCommentIconPress(item)}>
            <View style={styles.userInfo}>
              <Image
                source={{uri: item.owner.picture}}
                style={styles.profileImage}
              />
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
        )}
        extraData={searchQuery}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
    fontSize: 16,
    color: '#333',
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

export default SearchFeed;
