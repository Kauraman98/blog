import { firestoreInstance, app } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, getDoc, setDoc, addDoc, getDocs, query, orderBy, where, deleteDoc } from 'firebase/firestore'
import { get, update } from "firebase/database";


const firebaseStorage = getStorage(app);
const userBlogCollectionName = 'userBlogs'
const blogSubCollection = 'blogs'

function getBlogContentCollection() {
    return collection(firestoreInstance, 'blogcontent');
}
function getBlogCollection() {
    return collection(firestoreInstance, 'blogs');
}

export async function getBlogs() {

    const q = query(getBlogCollection(), orderBy('updatedOn', 'desc'));
    const blogs = await getDocs(q);
    return blogs.docs.map((blog) => {
        return { ...blog.data(), updatedOn: blog.data().updatedOn.toDate(), createdOn: blog.data().createdOn.toDate(), id: blog.id };
    });
}

export async function getBlog(id) {

    const blogRef = doc(getBlogCollection(), id);
    const blog = await getDoc(blogRef);
    const blogContent = await getDoc(doc(firestoreInstance, getBlogContentCollection().path, id));

    console.log("blog", blog);
    if (blog.exists())
    {

        return { ...blog.data(), updatedOn: blog.data().updatedOn.toDate(), createdOn: blog.data().createdOn.toDate(), id: blog.id, content: blogContent.exists() ? blogContent.data().content : '' };
    }
    else {
        return {};
    }
}