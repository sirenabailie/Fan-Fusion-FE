import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Chapter
const getSingleChapter = (chapterId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/chapters/${chapterId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE publish or save draft
const publishOrSaveDraftChapter = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/chapters`, {
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

// DELETE Chapter
const deleteChapter = (chapterId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/chapters/${chapterId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSingleChapter, publishOrSaveDraftChapter, deleteChapter };
