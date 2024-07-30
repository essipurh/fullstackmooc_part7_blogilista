import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import User from "./components/User";
import Togglable from "./components/Togglabel";
import BlogForm from "./components/BlogForm";
import Notification from "./components/NotificationBanner";
import { initBlogs  } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(getUser())
  }, []);

  const blogFormRef = useRef();
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs =[...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes); // onlisiko parempi tehdä toisaalla ja pitää yksinkertaisena tämä?

  
  return (
    <div>
      {user === null ? (
        <div>
          <h2>Login</h2>
          <Notification />
          <Login />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <User user={user} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogRef={blogFormRef} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;