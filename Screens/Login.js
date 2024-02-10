import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logIn} from '../Redux/reducers/authSlice';
import {fetchUsers} from '../Services/api';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = async () => {
    try {
      // Fetch the list of users from the backend
      const users = await fetchUsers();

      // Find the user with matching first and last names
      const matchingUser = users.find(
        user =>
          user.firstName.toLowerCase() === firstName.toLowerCase() &&
          user.lastName.toLowerCase() === lastName.toLowerCase(),
      );

      if (!matchingUser) {
        throw new Error('User not found. Please check your credentials.');
      }

      // Dispatch the logIn action if the user is found
      await dispatch(logIn({firstName, lastName}));

      // Navigate to the authenticated screen
      navigation.navigate('DrawerNavigator');

      Alert.alert('You are now logged in', `${firstName} ${lastName}`);
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Login</Text>
        <Text style={styles.subHeadingText}>Enter your Credentials</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  headingContainer: {
    marginTop: 20,
    flex: 0.15,
    justifyContent: 'center',
  },
  headingText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    fontSize: 20,
  },
  subHeadingText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 16,
  },
  inputContainer: {
    flex: 0.6,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 14,
  },
  input: {
    paddingLeft: 15,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    borderColor: '#006175',
    borderWidth: 0.5,
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: '#1C6758',
    borderRadius: 10,
  },
  submitButtonText: {
    fontSize: 25,
    color: 'white',
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
  },
  signUpText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 14,
    alignSelf: 'center',
  },
  signUpLink: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
    color: '#1C6758',
    fontSize: 14,
  },
});

export default Login;
