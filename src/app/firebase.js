import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCEha6akvZmamuvB4lG5TVHh61VH-d-vik",
    authDomain: "fir-project-d08ae.firebaseapp.com",
    projectId: "fir-project-d08ae",
    storageBucket: "fir-project-d08ae.firebasestorage.app",
    messagingSenderId: "266965931449",
    appId: "1:266965931449:web:08a640619494bb29999268",
    measurementId: "G-1FVBXQLRET"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export default (app);