import { useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import ProductCard from "../ProductCard";
import { AnimatePresence, motion } from "framer-motion";

import "./ProductList.css";
import { Product } from "../../types";

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
  { id: 5, name: "Product 5", price: 500 },
  { id: 6, name: "Product 6", price: 600 },
  { id: 7, name: "Product 7", price: 700 },
  { id: 8, name: "Product 8", price: 800 },
  { id: 9, name: "Product 9", price: 900 },
  { id: 10, name: "Product 10", price: 1000 },
  { id: 11, name: "Product 11", price: 1100 },
  { id: 12, name: "Product 12", price: 1200 },
  { id: 13, name: "Product 13", price: 1300 },
  { id: 14, name: "Product 14", price: 1400 },
];

type ProductListProps = {
  cart: Array<Product>;
  addToCart: (product: Product) => void;
  handleConnect: () => void;
  navigate: (route: string) => void;
};

function ProductList({ cart, handleConnect, addToCart, navigate }: ProductListProps) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
      <button onClick={handleConnect}>Connect</button>
      <button onClick={() => console.log(cart)}>Cart</button>
      <button onClick={() => navigate('/checkout')}>Checkout</button>
    </div>
  );
}

export default ProductList;
