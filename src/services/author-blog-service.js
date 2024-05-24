import { firestoreInstance, app } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, getDoc, setDoc, addDoc, getDocs, query, orderBy, where, deleteDoc } from 'firebase/firestore'
import { get, update } from "firebase/database";


const firebaseStorage = getStorage(app);
const userBlogCollectionName = 'userBlogs'
const blogSubCollection = 'blogs'
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

function getBlogContentCollection() {
    return collection(firestoreInstance, 'blogcontent');
}
function getUserBlogCollection(userId) {
    return collection(firestoreInstance, userBlogCollectionName, userId, 'blogs');
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
    const blogSubCollection = getUserBlogCollection(userId);

    const blogRef = doc(firestoreInstance, blogSubCollection.path, id);
    const blog = await getDoc(blogRef);

    const blogContent = await getDoc(doc(firestoreInstance, getBlogContentCollection().path, id));

    if (blog.exists())
    {
        const blogData = blog.data();
        blogData.content = blogContent.exists() ? blogContent.data().content : '';
        return blogData;
    }
    else 
     {
        return getBlogObject();
     }
};

export const getCurrentuserAllBlogs = async (userId, state) => {
    const blogCollection = getUserBlogCollection(userId);
    //read all blogs filter by state
    const q = query(blogCollection, where('state', '==', state), orderBy('updatedOn', 'desc'));
    const blogs = await getDocs(q);
    return blogs.docs.map((blog) => {
        return { ...blog.data(), updatedOn: blog.data().updatedOn.toDate(), createdOn: blog.data().createdOn.toDate(), id: blog.id };
    });

};

export const updateBlog = async (blog, id, userId) => {
    const blogSubCollection = getUserBlogCollection(userId);
    const _blog = { ...blog };
    delete _blog.content;

    const blogRef = doc(firestoreInstance, blogSubCollection.path, id);
        await setDoc(blogRef, blog);
    await setDoc(doc(firestoreInstance, getBlogContentCollection().path, id), { id: id, content: blog.content });
        return blog;
}

export const createBlog = async (blog, userId) => {
    // const userIdDoc = doc(firestoreInstance, userBlogs, userId);
    const _blog = { ...blog };
    delete _blog.content;

    const blogSubCollection = getUserBlogCollection(userId);
    const blogContentCollection = getBlogContentCollection()

    // const blogRef = doc(firestoreInstance, blogSubCollection, 'blogs');
    const snapshot = await addDoc(blogSubCollection, blog);

    const contentSnapshot = await setDoc(doc(firestoreInstance, blogContentCollection.path, snapshot.id), { id: snapshot.id, content: blog.content });
    return snapshot.id;
}

export const uploadBlogImage = async (file, id, userId) => {
        
        const imageRef = ref(firebaseStorage, `blogs/${userId}/blog-${id}.jpg`);
    var snapshot = await uploadBytes(imageRef, file);
        return await getDownloadURL(snapshot.ref);
};

export const deleteBlogImage = async (id, userId) => {

    const imageRef = ref(firebaseStorage, `blogs/${userId}/blog-${id}.jpg`);

    return await deleteObject(imageRef);

};

export const publishBlog = async (blog, id, userId) => {

    // add it to blogs collection
    const blogRef = doc(firestoreInstance, 'blogs', id);
    await setDoc(blogRef, blog);
    // update the state to published

};

export const archiveBlog = async (blog, id, userId) => {

    // add it to blogs collection
    const blogRef = doc(firestoreInstance, 'blogs', id);
    await deleteDoc(blogRef, blog);
    // update the state to published

};

export const deleteBlog = async (id, userId) => {
    await deleteBlogImage(id, userId);
    const collection = getUserBlogCollection(userId);
    const blogRef = doc(firestoreInstance, collection.path, id);

    await deleteDoc(blogRef);
    const blogContentRef = doc(firestoreInstance, getBlogContentCollection().path, id);
    await deleteDoc(blogContentRef);
};

