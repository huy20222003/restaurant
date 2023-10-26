import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyARA3Qv3HZI8Ipof9ldA559ygFgRa9VXME',
  authDomain: 'restaurant-7f5a6.firebaseapp.com',
  projectId: 'restaurant-7f5a6',
  storageBucket: 'restaurant-7f5a6.appspot.com',
  messagingSenderId: '480735665245',
  appId: '1:480735665245:web:34584e5544cf95abaf01b4',
  measurementId: 'G-XV1SHYG1E3',
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
