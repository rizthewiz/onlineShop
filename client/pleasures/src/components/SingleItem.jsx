import React from "react";
import Home from "./Home";
import { Link } from "react-router-dom";

function SingleItem({ id, img, title, price, quantity, description }) {
  return (
    <div>
      <Link to={`/${id}`}>
        <h3>{title}</h3>
        <img src={img}></img>
        <p>${price}.00</p>
      </Link>
    </div>
  );
}

export default SingleItem;
