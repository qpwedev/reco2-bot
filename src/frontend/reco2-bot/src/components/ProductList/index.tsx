import ProductCard from "../ProductCard";

import emission_data from "../../assets/emission.json";

import "./ProductList.css";
import { Product } from "../../types";

type ProductListProps = {
  cart: Array<Product>;
  addToCart: (product: Product) => void;
  handleConnect: () => void;
  navigate: (route: string) => void;
};

function ProductList({ cart, handleConnect, addToCart, navigate }: ProductListProps) {
  return (
    <div className="product-list">
      {emission_data.activities.map((product: any, index: number) => (
        <ProductCard key={index} product={product} addToCart={addToCart} />
      ))}
      <button onClick={handleConnect}>Connect</button>
      <button onClick={() => console.log(cart)}>Cart</button>
      <button onClick={() => navigate('/checkout')}>Checkout</button>
    </div>
  );
}

export default ProductList;
