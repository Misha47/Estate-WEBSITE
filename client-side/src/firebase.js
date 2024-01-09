import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA24tR4NjI9gXKpBThwpcuwO_ZmEPhcSdU",
  authDomain: "estate-db.firebaseapp.com",
  projectId: "estate-db",
  storageBucket: "estate-db.appspot.com",
  messagingSenderId: "962119443789",
  appId: "1:962119443789:web:dff52823d0208379e90304",
  measurementId: "G-M3Y5EYJRWG"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);