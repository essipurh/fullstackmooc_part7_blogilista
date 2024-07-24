import { useState } from "react";
import BlogRow from "./BlogDetails";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogsReducer";


const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  
  const user = JSON.parse(window.localStorage.getItem("loggedUser"));
  const handleDelete = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return;
    }
    dispatch(deleteBlog(blog))
  }
  const sameUser = user && blog.user && blog.user.username === user.username; // ei paras, koska  mitä jos virheellisesti kaksi samannmistä useria.. id olisi parempi

  return (
    <div className="blogPost">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <BlogRow
        visible={visible}
        blog={blog}
      />
      <div>
        {sameUser && (
          <button className="deleteButton" onClick={handleDelete}>
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
