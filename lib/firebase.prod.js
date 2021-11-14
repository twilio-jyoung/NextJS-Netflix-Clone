import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from "../seed";

try {
	firebase.initializeApp({
		databaseURL: "https://jyoung-netflix-demo-default-rtdb.firebaseio.com",
		apiKey: "AIzaSyCLSPHnbKzCMnyb4vdPwZsBPeA96bJ1S1g",
		authDomain: "netflix-demo-337cd.firebaseapp.com",
		projectId: "netflix-demo-337cd",
		storageBucket: "netflix-demo-337cd.appspot.com",
		messagingSenderId: "1041403822781",
		appId: "1:1041403822781:web:76835b76fd53f5793aadd4",
		measurementId: "G-KS4VG91X07",
	});
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error("Firebase initialization error raised", err.stack);
	}
}

// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment
// this so you don't get duplicate data

export default firebase;
