import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotificationObject(state, action) {
      return action.payload;
    },
  },
});

export const { setNotificationObject } = notificationSlice.actions;
export const setNotification = (notificationObject, timeSeconds) => {
  return (dispatch) => {
    dispatch(setNotificationObject(notificationObject));
    setTimeout(() => {
      dispatch(setNotificationObject(null));
    }, timeSeconds * 1000);
  };
};

export const setConfirmation = (message, timeSeconds = 5) => {
  return (dispatch) => {
    dispatch(
      setNotification({ type: "confirmation", message: message }, timeSeconds),
    );
  };
};

export const setError = (error, timeSeconds = 5) => {
  return (dispatch) => {
    let errorString = error.response.data.error.message;
    if (error.response.status === 400) {
      errorString = Object.values(error.response.data.error)
        .map((err) => err.message)
        .join(" ");
    }
    dispatch(
      setNotification({ type: "error", message: errorString }, timeSeconds),
    );
  };
};

export default notificationSlice.reducer;
