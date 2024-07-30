import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetUsernamePassword = () => {
    setUsername("");
    setPassword("");
  };

  const login = (event) => {
    event.preventDefault();
    console.log("logging in", username, password);
    dispatch(loginUser({ username, password }))
    resetUsernamePassword();
  };

  return (
    <form onSubmit={login}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
