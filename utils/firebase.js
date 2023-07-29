
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyClKyBzj2DaHlOjtZHf-Pfa4jR-LwQ_OOY",
  authDomain: "virtual-bank-a93fa.firebaseapp.com",
  projectId: "virtual-bank-a93fa",
  storageBucket: "virtual-bank-a93fa.appspot.com",
  messagingSenderId: "317155963180",
  appId: "1:317155963180:web:c66bcf2a0f08963b6d7c89"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;