import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const User = ({ user }) => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
  }
  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={logout}>Logout</button>
      </p>
    </div>
  );
};

export default User;
