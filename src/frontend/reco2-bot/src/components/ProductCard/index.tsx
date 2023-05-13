
import logo from '../../assets/react.svg';

import './ProductCard.css';

type Product = {
    id: number;
    name: string;
    price: number;
}

type ProductCardProps = {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    console.log(product);
    return (
        <div className="product-card">
            <img src={logo} className="product-card-logo" alt="logo" />
            <h1 className="product-card-title">{ product.name } - { product.price }</h1>
            <button className="product-card-buy-button">Buy</button>
        </div>
    )
}

export default ProductCard;
