import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Screen</Text>
      {user && (
        <View style={styles.userInfoContainer}>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userInfoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
});

export default Profile;
