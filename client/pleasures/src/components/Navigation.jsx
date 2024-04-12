import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Navigation({ token, setToken, name }) {
  const nav = useNavigate();

  return (
    <div>
      {token && <h2>Welcome, {name}! </h2>}
      <button onClick={() => nav("/")}> Home </button>
      Other otions here
      {token ? (
        <>
          <button onClick={() => nav("/cart")}>View Cart</button>
          <button
            onClick={() => {
              setToken(null);
              localStorage.clear();
              nav("/login");
            }}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button onClick={() => nav("/login")}> Log In </button>
          <button onClick={() => nav("/register")}> Register </button>
        </>
      )}
    </div>
  );
}

export default Navigation;
