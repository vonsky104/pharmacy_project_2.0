import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCTQuiB-VOS_XrqZhQ-8KBSzYLkWZ0e9mY",
    authDomain: "sports-friend-finder-3953b.firebaseapp.com",
    databaseURL: "https://sports-friend-finder-3953b.firebaseio.com",
    projectId: "sports-friend-finder-3953b",
    storageBucket: "sports-friend-finder-3953b.appspot.com",
    messagingSenderId: "35975487296",
    appId: "1:35975487296:web:74ea21d4c115bb520a24a5"
};

export const key = 'AIzaSyCTQuiB-VOS_XrqZhQ-8KBSzYLkWZ0e9mY';

export const firebaseApp = firebase.initializeApp(config);
export const db = firebase.database();
const eventsRef = db.ref('events');
const usersRef = db.ref('users');
const opinionsRef = db.ref('opinions');

export { eventsRef, usersRef, opinionsRef };

