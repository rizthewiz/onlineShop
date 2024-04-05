import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Navigation({ token, setToken, user }) {
  const nav = useNavigate();

  return (
    <div>
      <button onClick={() => nav("/")}> Home </button>
      Other otions here
      {token ? (
        <button
          onClick={() => {
            setToken(null);
            localStorage.clear();
            nav("/login");
          }}
        >
          Log Out {user}
        </button>
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
