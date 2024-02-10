import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const DeleteAccount = () => {
  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delete Account Screen</Text>
      <Button title="Delete Account" onPress={handleDeleteAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default DeleteAccount;
