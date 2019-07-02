//import * as firebase from 'firebase';
import firebase from '@firebase/app';
import '@firebase/auth';
import "@firebase/database";
// import '@firebase/messaging';
const firebaseConfig = {
apiKey: "AIzaSyD0CxcJSL7xJPudllKEh45sK_KxmaeLGAI",
authDomain: "new-2oui.firebaseio.com",
databaseURL: "https://new-2oui.firebaseio.com/",
storageBucket: "new-2oui.appspot.com",
messagingSenderId: "253764758317",
}
firebase.initializeApp(firebaseConfig);
export default firebase;