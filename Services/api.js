import axios from 'axios';

const API_BASE_URL = 'https://dummyapi.io/data/v1/';
const APP_ID = '65a941a1ba3fef5e4652e747';

export const registerUser = async userData => {
  try {
    console.log('Registration request payload:', userData);
    const response = await fetch('https://dummyapi.io/data/v1/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'app-id': '65a941a1ba3fef5e4652e747',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    console.log('Registration response:', data);
    return data;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/post`, {
      headers: {
        'Content-Type': 'application/json',
        'app-id': APP_ID,
      },
    });

    const posts = response.data.data;

    // Fetch comments for each post
    const postsWithComments = await Promise.all(
      posts.map(async post => {
        const commentsResponse = await axios.get(
          `${API_BASE_URL}/post/${post.id}/comment`,
          {
            headers: {
              'Content-Type': 'application/json',
              'app-id': APP_ID,
            },
          },
        );

        const comments = commentsResponse.data.data;
        return {...post, comments};
      }),
    );

    return postsWithComments;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        'app-id': APP_ID,
      },
    });

    const users = response.data.data;
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
