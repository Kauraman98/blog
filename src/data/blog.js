
var blog = {
    id:"uuidsadadsd",
    title: "First Blog",
    description: "This is my first blog",
    publishdate: "May 20, 2024 12:56",
    author: "AuthorId",
    topics: ["technology", "Programming"]
};

var blogContent = {
    blogId: "uuidsadadsd",
    content: " First blog . Thi is my first blog"
}

// firebase
{
    blogs: {
        uuidsadadsd:  {
         id: "",
         title""
        }
        ,
        uuidsadadsd:  {
            id: "",
            title""
           }
    }



    users: {
        "user1": {
            name: "",
            
        }
    }

    user_blog: {
        uuidsadadsd:  {
            id: "",
            title"",
            state: "draft"
           }
       ,
       uuidsadadsd:  {
        id: "",
        title"",
        state: "draft"
       }
         
    }
}


/***
 * Home page  Route: "/"
 *     if loggedIn 
 *          NavBar    
 *          List of blogs
 *          Footer
 *     if not logged in
 *          Show login page
 * 
 * Home page -> User click on blog 
 *   view blog page   Route blog/:blogId
 * 
 * 
 * User
 *   My Blog  Route -> myBlogs
 *      List of blog created by user  [Draft| Published]
 *   Create/Edit Blog   -> editblog/:blogId
 *                      -> createblog
 *       Form:
 *            Cover Image: 
*             Title
            Main Content
 * 
 * 
 * 
 * 
 * 
 * 
 */