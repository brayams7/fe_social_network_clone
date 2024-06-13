
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCf6L9ssyXFOBouaBAbcNNZHTD41sinrds",
  authDomain: "social-media-store-18082.firebaseapp.com",
  projectId: "social-media-store-18082",
  storageBucket: "social-media-store-18082.appspot.com",
  messagingSenderId: "735044721951",
  appId: "1:735044721951:web:cbdff79c3fe7a5d1ac642a"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)


export const  uploadFile = async (file) => {
    const storageRef = ref(storage)
    const response = await uploadBytes(storageRef, file)
    console.log(response)
}