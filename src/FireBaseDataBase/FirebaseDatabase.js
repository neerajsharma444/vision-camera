import database from '@react-native-firebase/database';

export const handleDatabase = () => {
  console.log('hello');
  addData();
  //   getuserData();
};

// const getuserData = () => {
//   database()
//     .ref('/users/aman')
//     .once('value')
//     .then(snapshot => {
//       const user = snapshot.val();
//       if (user) {
//         console.log('Retrive user data  :', user);
//       } else {
//         console.log('not found!');
//       }
//     })
//     .catch(error => {
//       console.log('error reading data');
//     });
// };
const addData = () => {
  const user_data = [
    {
      cap: '1',
      img: '1',
      e_mail: 'rahul@gmail.com',
    },
    {
      name: 'rahul',
      image: 'b64',
      email: 'rahul1@gmail.com',
    },
  ];

  // database()
  //   .ref('/users/123')
  //   .set({
  //     name: 'Ada Lovelace',
  //     age: 31,
  //     gender: 'Female',
  //   })
  //   .then(() => console.log('Data set.'));

  database()
    .ref('/rahul')
    // .push()
    .set(user_data)
    .then(() => {
      console.log('User added successfully');
    })
    .catch(error => {
      console.error('Error adding user to DB:', error);
    });
};
