import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// READ Story
const getStories = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET SINGLE STORY
const getSingleStory = (storyId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/${storyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE Story
const createStory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories`, {
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
const updateStory = (storyId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/${storyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE Story
const deleteStory = (storyId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/${storyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// Add to Favorites list toggle for story card's favorite button
const favoritesStoryToggle = (storyId, userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/stories/${storyId}/users/${userId}/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getStories, getSingleStory, createStory, updateStory, deleteStory, favoritesStoryToggle };
