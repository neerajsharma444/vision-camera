import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import {fetchUsers} from '../Services/api';

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        setAllUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (Array.isArray(allUsers)) {
      const filtered = allUsers.filter(
        user =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  };

  const renderUser = ({item}) => (
    <View style={styles.userContainer}>
      <Image source={{uri: item.picture}} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {item.firstName} {item.lastName}
        </Text>
        {/* Add more user details as needed */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search User"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onBlur={handleSearch}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={user => user.id.toString()}
        renderItem={renderUser}
        extraData={searchQuery} // Re-render when searchQuery changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchUser;
