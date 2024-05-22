import { firestoreInstance, app } from "./firebase-config";
import { getStorage, ref , uploadBytes, getDownloadURL} from "firebase/storage";
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseStorage = getStorage(app);


export const updateProfile = async (profile, id) => {

    const profileRef = doc(firestoreInstance, 'profiles', id);
    await setDoc(profileRef, profile);
    return profile;
};

export const getProfile = async (id) => {
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
}


export const uploadProfileImage = async (file, id) => {
    
    const imageRef = ref(firebaseStorage, `profiles/${id}/profile-${id}.jpg`);
   var snapshot = await uploadBytes(imageRef, file);
    return await getDownloadURL(snapshot.ref);
}

