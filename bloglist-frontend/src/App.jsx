import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import User from "./components/User";
import Togglable from "./components/Togglabel";
import BlogForm from "./components/BlogForm";
import Notification from "./components/NotificationBanner";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { initBlogs  } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setConfirmation, setError } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleLogin = async (userLoginDetails) => {
    try {
      const user = await loginService.login(userLoginDetails);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      dispatch(setError(error))
    }
  };



  const blogs = useSelector(state => state.blogs)
  const sortedBlogs =[...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes); // onlisiko parempi tehdä toisaalla ja pitää yksinkertaisena tämä?
    
  return (
    <div>
      {user === null ? (
        <div>
          <h2>Login</h2>
          <Notification  />
          <Login handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <User user={user} handleLogout={handleLogout} />
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