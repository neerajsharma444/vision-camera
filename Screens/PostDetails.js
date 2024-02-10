import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';

const PostDetails = ({post, handleCommentIconPress, selectedPost, onClose}) => {
  const [commentText, setCommentText] = useState('');

  const renderComment = ({item, index}) => (
    <View style={styles.commentContainer} key={index.toString()}>
      <View style={styles.commentUserInfo}>
        <Image
          source={{uri: item.owner.picture}}
          style={styles.commentProfileImage}
        />
        <Text style={styles.commentUsername}>
          <Text style={styles.boldText}>
            {item.owner.firstName} {item.owner.lastName}
          </Text>
          : {item.message}
        </Text>
      </View>
    </View>
  );

  const handlePostComment = () => {
    setCommentText('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={selectedPost !== null}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>

        <View style={styles.postContainer}>
          <View style={styles.userInfo}>
            <Image
              source={{uri: post.owner.picture}}
              style={styles.profileImage}
            />
            <Text style={styles.username}>
              {post.owner.firstName} {post.owner.lastName}
            </Text>
          </View>
          <Text style={styles.postText}>{post.text}</Text>
          {post.image && (
            <Image source={{uri: post.image}} style={styles.postImage} />
          )}

          {/* Display comments for the selected post */}
          <FlatList
            data={post.comments}
            keyExtractor={(comment, index) => comment.id || index.toString()}
            renderItem={renderComment}
          />

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={text => setCommentText(text)}
            />
            <TouchableOpacity
              style={styles.postCommentButton}
              onPress={handlePostComment}>
              <Text style={styles.postCommentButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  },
  postText: {
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
    resizeMode: 'cover',
  },

  commentContainer: {
    marginVertical: 8,
  },
  commentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  commentUsername: {
    fontSize: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingLeft: 8,
    marginRight: 8,
  },
  postCommentButton: {
    backgroundColor: '#1C6758',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postCommentButtonText: {
    color: '#fff',
  },
  closeButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButtonText: {
    color: '#1C6758',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default PostDetails;
