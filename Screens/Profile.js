import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Profile = ({navigation}) => {
  const [registerUserData, setRegisterUserData] = useState(null);

  const editProfile = () => {
    navigation.navigate('EditProfile');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          'https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109db/post',
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
  }, []);

  const renderPosts = ({item}) => {
    return (
      <View style={styles.postContainer}>
        {item.image && <Image source={{uri: item.image}} style={styles.box} />}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.userContainer}>
        <Image
          style={styles.img}
          source={{uri: registerUserData?.data[0]?.owner.picture}}
        />
        <Text style={styles.userName}>
          {registerUserData?.data[0]?.owner.firstName}{' '}
          {registerUserData?.data[0]?.owner.lastName}
        </Text>
      </View>

      <TouchableOpacity onPress={editProfile} style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <Text style={styles.statsNumber}>{registerUserData?.data?.length}</Text>
        <Text style={styles.statsLabel}>Posts</Text>
      </View>

      <View style={styles.separatorLine} />

      <Text style={styles.sectionHeader}>Posts</Text>

      <FlatList
        data={registerUserData?.data}
        keyExtractor={post => post.id}
        renderItem={renderPosts}
        numColumns={3}
        columnWrapperStyle={styles.postColumnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  userContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  userName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#000000',
  },
  editProfileButton: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#1C6758',
    paddingVertical: 8,
  },
  editProfileButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  statsNumber: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#000000',
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#000000',
  },
  separatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#000000',
    marginBottom: 10,
  },
  postContainer: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    width: 120,
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 2,
    borderColor: 'black',
  },
  postColumnWrapper: {
    justifyContent: 'space-between',
  },
});

export default Profile;
