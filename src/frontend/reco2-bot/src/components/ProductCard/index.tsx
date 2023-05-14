import { Product } from "../../types";

import co2 from "../../assets/CO2.png";

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
        src="https://picsum.photos/200"
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
            <h1 className="product-card-text-details-price">: {product.price}</h1>
          </div>
        </div>
        <button
          className="product-card-button"
          onClick={() => addToCart(product)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
