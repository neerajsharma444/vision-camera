import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logIn} from '../Redux/reducers/authSlice';
import {fetchUsers} from '../Services/api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notification, setNotification] = useState(null);

  const handleNotification = (type, message) => {
    setNotification({type, message});
  };

  const handleLogin = async () => {
    try {
      const users = await fetchUsers();
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
      console.log('User logged in', firstName, lastName);

      handleNotification(
        'success',
        'You are now logged in...Tap to move to new screen',
      );

      // Redirect to another screen after successful login
      navigation.navigate('DrawerNavigator');
    } catch (error) {
      console.error('Login failed:', error);
      handleNotification('error', 'Login Failed: ' + error.message);
    }
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {notification && (
        <View
          style={[
            styles.notification,
            notification.type === 'success'
              ? styles.notificationSuccess
              : styles.notificationError,
          ]}>
          <Text style={styles.notificationText}>{notification.message}</Text>
          {/* Add a cross icon for dismissing the notification */}
          <TouchableOpacity onPress={dismissNotification}>
            <FontAwesome
              name="close"
              size={20}
              color="#333"
              // style={{marginLeft: 5}}
              onPress={dismissNotification}
            />
          </TouchableOpacity>
        </View>
      )}
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
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
    fontSize: 14,
    marginTop: 15,
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
    marginTop: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#1C6758',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  submitButtonText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 14,
  },
  signUpLink: {
    fontFamily: 'Poppins-Bold',
    textDecorationLine: 'underline',
    color: '#1C6758',
    fontSize: 14,
  },
  notification: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
    zIndex: 999,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', // Added flexDirection to align the icon horizontally
    alignItems: 'center', // Added alignItems to vertically align the icon
  },
  notificationText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    flex: 1, // Added flex to allow text to take remaining space
  },
  notificationSuccess: {
    backgroundColor: '#4CAF50',
  },
  notificationError: {
    backgroundColor: '#f44336',
  },
});

export default Login;
