import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ItemDetails from "./components/ItemDetails";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(null);

  return (
    <>
      <Navigation token={token} setToken={setToken} name={name} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<ItemDetails />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={<Login setToken={setToken} setName={setName} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
