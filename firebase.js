// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMXdNpOYAQoQRFldtq5FZqxxA2NzE-vyo",
  authDomain: "rn-stock-app-2c47e.firebaseapp.com",
  projectId: "rn-stock-app-2c47e",
  storageBucket: "rn-stock-app-2c47e.appspot.com",
  messagingSenderId: "376825112998",
  appId: "1:376825112998:web:ef8482dc1e7e12ef714767"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };