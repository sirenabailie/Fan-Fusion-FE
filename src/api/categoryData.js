import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// READ Categories
const getCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// Get Stories by Category
const getStoriesByCategory = (categoryId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/users/${userId}/categories/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export { getCategories, getStoriesByCategory };
