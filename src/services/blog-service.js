import { firestoreInstance, app } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, getDoc, setDoc, addDoc, getDocs, query, orderBy, where, deleteDoc, limit } from 'firebase/firestore'
import { get, update } from "firebase/database";


const firebaseStorage = getStorage(app);
const userBlogCollectionName = 'userBlogs'
const blogSubCollection = 'blogs'
function convertToDate(date) {
    console.log("date", date);
    if (date)
        return date.toDate();
}

function getBlogContentCollection() {
    return collection(firestoreInstance, 'blogcontent');
}
function getBlogCollection() {
    return collection(firestoreInstance, 'blogs');
}
















export async function searchBlogs(searchString) {


    // lowercase search string and split with space and search usning array-contains on searchQueries field
    const q = query(getBlogCollection(), where('searchQueries', 'array-contains-any', searchString.toLowerCase().split(" ").slice(0,20)), orderBy('updatedOn', 'desc'));
  
    const blogs = await getDocs(q);
    return blogs.docs.map((blog) => {
        return { ...blog.data(), updatedOn: convertToDate(blog.data().updatedOn), createdOn: convertToDate(blog.data().createdOn), id: blog.id };
    });
}



export async function getBlogs() {



    // fetch first 5 blogs ordered by updatedOn date
    const q = query(getBlogCollection(), orderBy('updatedOn', 'desc'));

    
    const blogs = await getDocs(q);
    return blogs.docs.map((blog) => {
        return { ...blog.data(), updatedOn: convertToDate(blog.data().updatedOn), createdOn: convertToDate(blog.data().createdOn), id: blog.id };
    });
}


export async function getBlogsByAuthor(authorId) {

    const q = query(getBlogCollection(), where('authorId', '==', authorId), orderBy('updatedOn', 'desc'));
    const blogs = await getDocs(q);
    return blogs.docs.map((blog) => {
        return { ...blog.data(), updatedOn: convertToDate(blog.data().updatedOn), createdOn: convertToDate(blog.data().createdOn), id: blog.id };
    });
}


export async function getBlog(id) {

    const blogRef = doc(getBlogCollection(), id);
    const blog = await getDoc(blogRef);
    const blogContent = await getDoc(doc(firestoreInstance, getBlogContentCollection().path, id));

    console.log("blog", blog);
    if (blog.exists())
    {

        return { ...blog.data(), updatedOn: convertToDate(blog.data().updatedOn), createdOn: convertToDate(blog.data().createdOn), id: blog.id, content: blogContent.exists() ? blogContent.data().content : '' };
    }
    else {
        return {};
    }
}