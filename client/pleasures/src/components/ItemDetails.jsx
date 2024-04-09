import Home from "./Home";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  const [item, selectItem] = useState([]);
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

  return (
    <div>
      <h3>{item.title}</h3>
      <img src={item.image}></img>
      <p>${item.price}.00</p>
      <p>{item.description}</p>
      {/* {quantity} */}
    </div>
  );
}

export default ItemDetails;
