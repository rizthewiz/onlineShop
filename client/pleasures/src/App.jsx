import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ItemDetails from "./components/ItemDetails";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [user_id, setUser_Id] = useState(localStorage.getItem("user_id"));

  return (
    <>
      <Navigation token={token} setToken={setToken} name={name} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart user_id={user_id} />}></Route>
        <Route
          path="/:id"
          element={<ItemDetails token={token} user_id={user_id} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setName={setName}
              setUser_Id={setUser_Id}
            />
          }
        ></Route>
        <Route path="/OrderPlaced" element={<MyOrders />}></Route>
      </Routes>
    </>
  );
}

export default App;
