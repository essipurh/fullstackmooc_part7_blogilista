import { useDispatch } from "react-redux";
import { updateLikes } from "../reducers/blogsReducer";

const BlogRow = ({ visible, blog }) => {
  const dispatch = useDispatch()

  const displayBlogDetails = { display: visible ? "" : "none" };

  return (
  <div style={displayBlogDetails} className="blogDetails">
    <div>{blog.url}</div>
    <div>
      likes {blog.likes}
      <button onClick={() => dispatch(updateLikes({...blog, likes: blog.likes +1}))}>like</button>
    </div>
    <div>{blog.user ? blog.user.name : ""}</div>
  </div>
)};

export default BlogRow