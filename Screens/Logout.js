import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../Redux/reducers/authSlice';

const Logout = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log('Logout successful');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logout Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
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

export default Logout;
