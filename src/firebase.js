// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAwU85JFD08AV2WI1iWPm059WP4naJUy50",
	authDomain: "time-manager-40666.firebaseapp.com",
	projectId: "time-manager-40666",
	storageBucket: "time-manager-40666.appspot.com",
	messagingSenderId: "687115700274",
	appId: "1:687115700274:web:dc4478ec45cee6bc35542b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

export default app;