import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// READ Story
const getStories = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Story.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// CREATE Story
const createStory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Story.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE Story
const updateStory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/Story/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getStories, createStory, updateStory };
