import database from '@react-native-firebase/database';

export const handleDatabase = () => {
  addUserData();
  showUserData();
};

const addUserData = () => {
  const postData = {
    likes: 24,
    uri: 'IMAGE_URL',
    caption: 'PQRST',
  };

  const user = {
    user: 'Vaibhav',
    age: 22,
    email: 'vaibhav@gmail.com',
  };

  database()
    .ref('/users') // Adjust the reference path as needed
    .push(user) // or .child() if you want to specify a key
    // .set(user)
    // .update(postData)
    // .on('value', snapshot => {
    //   console.log('User data: ', snapshot.val());
    // });
    .then(() => {
      console.log('User added successfully');
    })
    .catch(error => {
      console.error('Error adding user to DB:', error);
    });
};

const showUserData = () => {
  database()
    .ref('/user')
    .on('value', snapshot => {
      console.log('User data: ', snapshot.val());
    });
};
