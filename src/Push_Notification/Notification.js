import messaging from '@react-native-firebase/messaging';

export default async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('Token = ', token);
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

getToken();
