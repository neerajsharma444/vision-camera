import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {signUp} from '../Redux/reducers/authSlice';
import {registerUser} from '../Services/api';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName || !email) {
        throw new Error('Please fill all required fields');
      }

      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      };

      console.log('Registration request payload:', userData);

      const response = await registerUser(userData);

      dispatch(signUp(response));

      setMessage('User Registered Successfully');
      setTimeout(() => setMessage(''), 3000);

      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error.message);
      setMessage('Registration Failed: ' + error.message);
    }
  };

  const dismissMessage = () => {
    setMessage('');
  };
  655;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {message !== '' && (
        <TouchableOpacity
          style={[
            styles.notification,
            message.includes('Successfully')
              ? styles.notificationSuccess
              : styles.notificationError,
          ]}
          onPress={dismissMessage}>
          <Text style={styles.notificationText}>{message}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Personal Information</Text>
        <Text style={styles.subHeadingText}>Please fill the following</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          placeholder="Enter your First Name"
          onChangeText={text => setFirstName(text)}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          placeholder="Enter your Last Name"
          onChangeText={text => setLastName(text)}
        />
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>SignUp</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 10,
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
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#1C6758',
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 25,
    color: 'white',
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 14,
    alignSelf: 'center',
  },
  loginLink: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
    color: '#000000',
    fontSize: 14,
  },
  notification: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 999,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  notificationSuccess: {
    backgroundColor: 'green',
  },
  notificationError: {
    backgroundColor: 'red',
  },
});

export default SignUp;
