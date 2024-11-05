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
const getStoriesByCategory = (categoryId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/categories/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const trash = () => {
  console.warn('delete me');
};

export { getCategories, getStoriesByCategory, trash };
