import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setError, setConfirmation } from "../reducers/notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    pushBlog(state, action) {
      state.push(action.payload);
    },
    setUpdated(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, pushBlog, setUpdated, removeBlog } =
  blogsSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(pushBlog(newBlog));
      dispatch(
        setConfirmation(
          `A new blog ${newBlog.title} by ${newBlog.author} added`,
        ),
      );
    } catch (error) {
      dispatch(setError(error));
    }
  };
};

export const updateLikes = (object) => {
  return async (dispatch) => {
    try {
      console.log("reducer", object);
      const updated = await blogService.update(object);
      dispatch(setUpdated(updated));
      dispatch(setConfirmation(`${updated.title} by ${updated.author} liked.`));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export const deleteBlog = (object, notificationRef) => {
  return async (dispatch) => {
    try {
      console.log("poistossa", object);
      await blogService.remove(object.id);
      dispatch(removeBlog(object.id));
      dispatch(setConfirmation(`${object.title} by ${object.author} deleted.`));
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    }
  };
};

export default blogsSlice.reducer;
