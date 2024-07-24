import { useState, useImperativeHandle, forwardRef } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { useSelector, useDispatch } from 'react-redux'

const Notification = forwardRef((_, ref) => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const notificationMessages = (messagesList, notificationType) => {
    const notificationMessage = messagesList.map((er) => er.message).join(" ");
    dispatch(setNotification({ type: notificationType, message: notificationMessage }, 5))
  };
  useImperativeHandle(ref, () => {
    return {
      notificationMessages,
    };
  });

  if (!notification) {
    return null;
  }
  return <div className={notification.type}>{notification.message}</div>;
});

Notification.displayName = "Notification";

export default Notification;
