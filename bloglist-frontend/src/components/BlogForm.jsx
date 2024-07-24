import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";


const BlogForm = ({ blogRef }) => {
  const dispatch = useDispatch()

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const resetBlogInputs = () => {
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  const addBlog = (event) => {
    event.preventDefault();
    const newBlogObject = {
      author: author,
      title: title,
      url: url,
    };
    dispatch(createBlog(newBlogObject))
    blogRef.current.toggleVisibility();
    resetBlogInputs(); 
  };


  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid="blogTitle"
            type="text"
            value={title}
            name="BlogTitle"
            id="blogTitle"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="blogAuthor"
            type="text"
            value={author}
            name="BlogAuthor"
            id="blogAuthor"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid="blogUrl"
            type="text"
            value={url}
            name="BlogUrl"
            id="blogUrl"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
