import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SingleItem from "./SingleItem";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await axios.get("/api/products");
        setProducts(products.data);
      } catch (err) {
        console.log("Unable to get products!", err);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      {products.map((product) => {
        return (
          <SingleItem
            key={product.id}
            id={product.id}
            img={product.image}
            quantity={product.quantity}
            description={product.description}
            title={product.title}
            price={product.price}
          />
        );
      })}
    </>
  );
}

export default Home;
