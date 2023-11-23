import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const isApiQuotaOver = true;
let firebaseConfig;
if (isApiQuotaOver) {
  firebaseConfig = {
    apiKey: "AIzaSyD4oxriDL89T6HFIJueFCDK8rXPh0vieGM",
    authDomain: "ytclone-1997.firebaseapp.com",
    projectId: "ytclone-1997",
    storageBucket: "ytclone-1997.appspot.com",
    messagingSenderId: "964881863221",
    appId: "1:964881863221:web:efa59f299b4e29f0b6177c",
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyASfLL9pOzsjaiy5XZ9i9eJWYtxSiSxw_4",
    authDomain: "clone2-92221.firebaseapp.com",
    projectId: "clone2-92221",
    storageBucket: "clone2-92221.appspot.com",
    messagingSenderId: "1076201639825",
    appId: "1:1076201639825:web:92f70864cfb7b8a64bd430",
  };
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth, firebaseConfig };
