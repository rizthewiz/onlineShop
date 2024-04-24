import Home from "./Home";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ItemDetails({ token, user_id }) {
  const { id } = useParams();
  const [item, selectItem] = useState(null);
  const route = `/api/products/${id}`;

  useEffect(() => {
    async function getItem() {
      try {
        const item = await axios(route);
        selectItem(item.data);
      } catch (err) {
        console.error(err);
      }
    }
    getItem();
  }, []);

  async function addToCart() {
    try {
      const response = await fetch(`/api/users/${user_id}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: item.id,
          quantity: 1,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("Issue", error);
    }
  }

  if (!item) {
    return null;
  }

  return (
    <div>
      <h3>{item.title}</h3>
      <img src={item.image}></img>
      <p>${item.price}.00</p>
      <p>{item.description}</p>
      {item.quantity && (
        <p>
          Available{token && <button onClick={addToCart}>Add to Cart</button>}
        </p>
      )}
    </div>
  );
}

export default ItemDetails;
