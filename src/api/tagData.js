import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// READ Tags
const getTags = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// READ Tagged stories
const getTagStories = (tagId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${tagId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data.stories))
      .catch(reject);
  });

export { getTags, getTagStories };
