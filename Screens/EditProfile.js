import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const EditProfile = () => {
  const userState = useSelector(state => state.auth.user);
  console.log('EditProfile', userState);

  const [registerUserData, setRegisterUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    if (userState) {
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
    }
  }, [userState]);

  const updateProfile = async () => {
    if (!userState) {
      console.error('User state is null');
      return;
    }

    try {
      console.log('Sending PUT request...');
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'app-id': '65b2433a2fe979ac57fe617f',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      };

      const response = await fetch(
        `https://dummyapi.io/data/v1/user/${userState[0].id}`,
        requestOptions,
      );

      console.log('PUT request completed.');

      const data = await response.json();

      if (response.ok) {
        console.log('Update successful:', data);
      } else {
        console.error('Update failed:', data);
      }
    } catch (error) {
      console.error('Error during Updation:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Render loading indicator or message if userState is null */}
      {!userState ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {/* Render profile editing form */}
          {/* Replace this with your profile editing UI */}
          <Text>Profile Editing Form</Text>
          {/* Example input for first name */}
          <TextInput
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder="First Name"
          />
          {/* Example input for last name */}
          <TextInput
            value={lastName}
            onChangeText={text => setLastName(text)}
            placeholder="Last Name"
          />
          {/* Button to trigger profile update */}
          <TouchableOpacity onPress={updateProfile}>
            <Text>Update Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor:'green',
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
  },

  img: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },

  // cameraImg: {
  //   height: 20,
  //   width: 20,
  //   position: 'absolute',
  //   bottom: -30,
  //   right: -10,
  // },

  inputContainer: {
    // flex: 0,
    borderRadius: 10,
    justifyContent: 'space-around',
    // backgroundColor: 'green',
  },

  txtContainer: {
    marginTop: 30,
  },

  inputText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'Poppins',
    marginBottom: 10,
  },

  textInput: {
    width: '45%',
    marginTop: 10,
    flexDirection: 'column',
    // backgroundColor:'green',
  },

  inputStyle2: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },

  inputStyle: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#006175',
  },

  inputStyle1: {
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },

  btnContainer: {
    width: '100%',
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#1C6758',
  },

  btnTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },

  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    //  backgroundColor:'green',
  },
});
