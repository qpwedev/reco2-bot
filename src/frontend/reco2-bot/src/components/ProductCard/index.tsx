import { Product } from "../../types";

import co2 from "../../assets/CO2.png";
import Car from "../../assets/Car.png";
import Coffee from "../../assets/Coffee.png";
import Burger from "../../assets/Burger.png";
import Shopping from "../../assets/Shopping.png";

import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
};

function ProductCard({ product, addToCart }: ProductCardProps) {
  console.log(product);
  return (
    <div className="product-card">
      <img
        // We are sorry and feel bad for this ternary monster :'(
        src={product.name === "Car" ? Car : product.name === "Coffee" ? Coffee : product.name === "Burger" ? Burger : Shopping}
        alt="product"
        className="product-card-image"
      />
      <div className="product-card-row">
        <div className="product-card-text">
          <h1 className="product-card-text-title">{product.name}</h1>
          <div className="product-card-text-details">
            <img
              src={co2}
              alt="co2"
              className="product-card-text-details-co2"
            />
            <h1 className="product-card-text-details-price">
              : {product.co2Emission}
            </h1>
          </div>
        </div>

        <div>
          <button
            className="product-card-button"
            onClick={() => addToCart(product)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
