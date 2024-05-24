import { firestoreInstance, app } from "./firebase-config";
import { getStorage, ref , uploadBytes, getDownloadURL} from "firebase/storage";
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'


export const getAuthorProfile = async (id) => {
    const profileRef = doc(firestoreInstance,'profiles', id);
    const profile = await getDoc(profileRef);
    console.log("profile",profile);
    if (profile.exists())
        return profile.data();
    else 
     {
        return {
            name: '',
            about: '',
            photourl: ''
        };
     }
};