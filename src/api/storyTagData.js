import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// ADD Tag
const addStoryTag = (storyId, tagId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/${storyId}/add-tag/${tagId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE Tag
const removeStoryTag = (storyId, tagId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/${storyId}/remove-tag/${tagId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { removeStoryTag, addStoryTag };
