import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/checkUser/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => {
        if (resp.ok) {
          resolve(resp.json());
        } else {
          resolve({});
        }
      })
      .catch(reject);
  });

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut, checkUser };
