import { firestoreInstance, app } from "./firebase-config";
import { getStorage, ref , uploadBytes, getDownloadURL} from "firebase/storage";
import {collection, doc, getDoc, setDoc, addDoc, collectionGroup} from 'firebase/firestore'
import { get } from "firebase/database";

const firebaseStorage = getStorage(app);

export function getBlogObject() {
return  {
    id: new Date().getTime().toString(),
    title: '',
    content: '',
    photourl: '',
    summary: '',
    createdOn: '',
    state: 'draft',
    authorid: ''
};
}

export const getBlog = async (id) => {
    const blogRef = doc(firestoreInstance,'blogs', id);
    const blog = await getDoc(blogRef);
    console.log("blog",blog);
    if (blog.exists())
        return blog.data();
    else 
     {
        return getBlogObject();
     }
};


export const getCurrentuserBlog = async (userId,id) => {
    const blogRef = doc(firestoreInstance,'userblogs', userId,id);
    const blog = await getDoc(blogRef);
    console.log("blog",blog);
    if (blog.exists())
        return blog.data();
    else 
     {
        return getBlogObject();
     }
};

export const getCurrentuserAllBlogs = async (userId,id) => {
    const blogRef = doc(firestoreInstance,'userblogs');
    const blog = await getDoc(blogRef);
    console.log("blog",blog);
    if (blog.exists())
        return blog.data();
    else 
     {
        return getBlogObject();
     }
};

export const updateBlog = async (blog, id, userId) => {
    
        const blogRef = doc(firestoreInstance, 'userblogs', userId, id);
        await setDoc(blogRef, blog);
        return blog;
}

export const createBlog = async (blog, userId) => {
    
    const blogRef = doc(firestoreInstance, `userblogs/${userId}`, 'blogs');
   const snapshot = await addDoc(blogRef, blog);
    return snapshot.id;
}

export const uploadBlogImage = async (file, id, userId) => {
        
        const imageRef = ref(firebaseStorage, `blogs/${userId}/blog-${id}.jpg`);
    var snapshot = await uploadBytes(imageRef, file);
        return await getDownloadURL(snapshot.ref);
};