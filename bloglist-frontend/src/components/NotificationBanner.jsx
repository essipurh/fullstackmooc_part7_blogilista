import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null;
  }
  return <div className={notification.type}>{notification.message}</div>;
};

Notification.displayName = "Notification";

export default Notification;
