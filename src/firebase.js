import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import getStorage

const firebaseConfig = {
    apiKey: "AIzaSyBHumO_R-dZ_iLWoJVibOAGizlPEeQDthQ",
    authDomain: "emplyoee-attendence-app.firebaseapp.com",
    projectId: "emplyoee-attendence-app",
    storageBucket: "emplyoee-attendence-app.appspot.com",
    messagingSenderId: "649249129781",
    appId: "1:649249129781:web:5f278b002233b30cb3f87c",
    measurementId: "G-3JN54YR7B8"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app); // Initialize and export storage
  
  export { auth, db, storage }; // Export storage
