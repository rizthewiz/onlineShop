import { useEffect, useState } from "react";
import axios from "axios";

function Cart({ id }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await axios.get(`/api/users/${id}/cart`);
        console.log(products.data);
        setProducts(products.data);
      } catch (err) {
        console.log("Unable to get products!", err);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      Cart
      {products &&
        products.map((product) => {
          return (
            <>
              <p>Item {product.product_title}</p>
              <p>Price {product.product_price}</p>
              <img src={product.product_image} />
              <p>Quantity {product.quantity}</p>
            </>
          );
        })}
    </>
  );
}

export default Cart;
