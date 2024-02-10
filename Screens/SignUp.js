import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
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

      dispatch(signUp(response)); // Assuming the response contains user data

      Alert.alert('User Registered Successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error.message);
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Personal Information</Text>
        <Text style={styles.subHeadingText}>Please fill the following</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            placeholder="Enter your First Name"
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            placeholder="Enter your Last Name"
            onChangeText={text => setLastName(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <TouchableOpacity onPress={handleSignUp} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>SignUp</Text>
        </TouchableOpacity>
        <Text style={styles.signInText}>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInLink}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAwareScrollView>
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
    justifyContent: 'space-between',
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
  signInText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 14,
    alignSelf: 'center',
  },
  signInLink: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
    color: '#000000',
    fontSize: 14,
  },
});

export default SignUp;
