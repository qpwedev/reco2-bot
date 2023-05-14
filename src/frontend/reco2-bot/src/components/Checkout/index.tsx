import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

import { Product } from "../../types";

type CheckoutProps = {
  cart: Array<Product>;
  navigate: (route: string) => void;
};

function Checkout({ cart, navigate }: CheckoutProps) {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.BackButton.onClick(() => {
      tg.BackButton.offClick(() => navigate("/"));
      tg.BackButton.hide();
      navigate("/");
    });
    tg.BackButton.show();
  });

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-products">
        {cart.map((product) => (
          <div key={product.id} className="checkout-product">
            <h1 className="checkout-product-title">
              {product.name} - {product.price}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Checkout;
