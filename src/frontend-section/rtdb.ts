import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: process.env.API_KEY,
    databaseURL: process.env.DATA_BASE_URL,
    projectId: process.env.PROJECT_ID,
    authDomain: process.env.AUTH_DOMAIN,
});

const rtdb = firebase.database();

export { rtdb };