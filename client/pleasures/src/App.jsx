import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({ email: "", password: "" });

  return (
    <>
      <Navigation token={token} setToken={setToken} user={user} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={<Login setToken={setToken} user={user} setUser={setUser} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
