import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart({ user_id }) {
  const [products, setProducts] = useState([]);
  const productTracker = products;
  const nav = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await axios.get(`/api/users/${user_id}/cart`);
        setProducts(products.data);
      } catch (err) {
        console.log("Unable to get products!", err);
      }
    }
    getProducts();
  }, []);

  async function updateQuantity(e, id) {
    try {
      console.log(e.target.value);

      setProducts((prevProducts) => {
        const selected = prevProducts.find(
          (product) => product.product_id === id
        );

        if (selected) {
          const unselected = products.filter((product) => product != selected);
          selected.quantity = e.target.value;
          return [...unselected, selected];
        }
      });

      const response = await fetch(`/api/users/${user_id}/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: id,
          quantity: e.target.value,
        }),
      });
      const result = await response.json();
    } catch (error) {
      console.log("Issue", error);
    }
  }

  async function deleteItem(product_id) {
    try {
      await fetch(`/api/users/${user_id}/cart/${product_id}`, {
        method: "DELETE",
      });

      setProducts(
        productTracker.filter((item) => item.product_id != product_id)
      );
    } catch (error) {
      console.log("Issue", error);
    }
  }

  async function placeOrder() {
    nav("/OrderPlaced");
  }
  return (
    <>
      <h2>Cart</h2>
      {products.length > 0 && <button onClick={placeOrder}>Place order</button>}
      {products.length > 0 ? (
        products.map((product) => {
          return (
            <>
              <h3>Item {product.product_title}</h3>
              <p>Price {product.product_price}</p>
              <img src={product.product_image} />
              <label>
                Quantity
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => updateQuantity(e, product.product_id)}
                />
              </label>
              <button onClick={() => deleteItem(product.product_id)}>
                Remove
              </button>
            </>
          );
        })
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
}

export default Cart;
