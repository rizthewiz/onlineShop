import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });
  const route = "/api/users/register";
  const nav = useNavigate();

  function handleUserChange(e) {
    const { name, value } = e.target;
    setNewUser((prevalue) => {
      return { ...prevalue, [name]: value };
    });
  }

  async function addUser(e) {
    e.preventDefault();
    try {
      axios
        .post(route, newUser)
        .then(function (response) {
          alert("Account Created: Please Log In");
          nav("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(`Error: Unable to add user ${error}`);
    }
  }

  return (
    <div>
      <h1>Register Here</h1>
      <form onSubmit={(e) => addUser(e)}>
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label>
          Address
          <input
            type="address"
            name="address"
            value={newUser.address}
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
