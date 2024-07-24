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

export default notificationSlice.reducer;
