import React from "react";
import Home from "./Home";

function SingleItem({ id, img, title, price, quantity, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <img src={img}></img>
      <p>${price}.00</p>
      {/* <details>{description}</details> */}
      {/* {quantity} */}
    </div>
  );
}

export default SingleItem;
