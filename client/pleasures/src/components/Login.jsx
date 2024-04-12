import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setToken, setName, setId }) {
  const [user, setUser] = useState({ email: "", password: "" });

  const nav = useNavigate();
  const route = "api/users/login";

  function handleUserChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUser((preValue) => {
      return { ...preValue, [name]: value };
    });
  }

  async function logIn(e) {
    e.preventDefault();
    try {
      axios
        .post(route, user)
        .then(function (response) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log(response.data);
          setName(response.data.name);
          setId(response.data.id);
          nav("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => logIn(e)}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <button type="submit">Log In!</button>
      </form>
    </div>
  );
}

export default Login;
