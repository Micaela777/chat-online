import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "5HLyUAMFoL5DMrKTLfx2XpqRQDytIQdGm7sjvtr1",
    databaseURL: "https://apx-dwf-m6-cc986-default-rtdb.firebaseio.com",
    projectId: "apx-dwf-m6-cc986",
    authDomain: "apx-dwf-m6-cc986.firebaseapp.com"
});

const rtdb = firebase.database();

export { rtdb };