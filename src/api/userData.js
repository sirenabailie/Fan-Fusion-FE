import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET User
const getUser = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getUser;
