import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/login";
import { setError, setConfirmation } from "../reducers/notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const loginUser = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await userService.login(userObject);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(setConfirmation(`${user.name} logged in.`));
    } catch (error) {
      dispatch(setError(error));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
    console.log("user logged out");
  };
};

export const getUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  };
};

export default userSlice.reducer;
