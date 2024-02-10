import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

const EditProfile = () => {
  const userState = useSelector(state => state.auth.user);

  const [registerUserData, setRegisterUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://dummyapi.io/data/v1/user/${userState[0].id}/post`,
          {
            headers: {
              'Content-Type': 'application/json',
              'app-id': '65a941a1ba3fef5e4652e747',
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setRegisterUserData(data);
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProfile = async () => {
    try {
      if (!userState || !userState[0]?.id) {
        console.error('User ID not found');
        return;
      }

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'app-id': '65a941a1ba3fef5e4652e747',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          contact: contact,
          gender: gender,
          region: region,
        }),
      };

      console.log('Sending PUT request...');
      console.log('requestOptions:', requestOptions);

      const response = await fetch(
        `https://dummyapi.io/data/v1/user/${userState[0]?.id}`,
        requestOptions,
      );
      console.log('PUT request completed.');

      if (response.ok) {
        const data = await response.json();
        console.log('Update successful:', data);
      } else {
        const data = await response.json();
        console.error('Update failed:', data);
      }
    } catch (error) {
      console.error('Error during Updation:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.userContainer}>
          {/* <Image
            style={styles.img}
            source={
              registerUserData?.data?.[0]?.owner?.picture
                ? {uri: registerUserData?.data?.[0]?.owner?.picture}
                : require('../Assets/images/user-default.jpg')
            }
          /> */}
          <Text style={styles.userInfo}>
            {registerUserData?.data?.[0]?.owner?.firstName}{' '}
            {registerUserData?.data?.[0]?.owner?.lastName}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={contact}
              onChangeText={text => setContact(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Gender</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={text => setGender(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Region</Text>
            <TextInput
              style={styles.input}
              value={region}
              onChangeText={text => setRegion(text)}
            />
          </View>

          <TouchableOpacity onPress={updateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.97,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 50,
    width: 50,
  },
  userInfo: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 5,
    color: '#1C6758',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1C6758',
    borderRadius: 10,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default EditProfile;
