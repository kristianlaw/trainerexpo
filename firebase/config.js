import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyBJ7ynCmc0aMSRvy7Y6Sz53SxLENH5aqF8',
  authDomain: 'trainerexpo-4b6bf.firebaseapp.com',
  databaseURL: 'https://trainerexpo-4b6bf.firebaseio.com',
  projectId: 'trainerexpo-4b6bf',
  storageBucket: 'trainerexpo-4b6bf.appspot.com',
  messagingSenderId: '419587334322',
  appId: '1:419587334322:web:33f990b8b1861bf5fe69ab',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
