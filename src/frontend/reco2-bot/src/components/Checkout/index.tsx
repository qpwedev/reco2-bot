import { useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";

import { Product } from "../../types";

import BN from "bn.js";

type CheckoutProps = {
  cart: Array<Product>;
  navigate: (route: string) => void;
  account: string;
  totalCo2Emission: number;
};

function Checkout({
  cart,
  navigate,
  account,
  totalCo2Emission,
}: CheckoutProps) {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.BackButton.onClick(() => {
      tg.BackButton.offClick(() => navigate("/"));
      tg.BackButton.hide();
      navigate("/");
    });
    tg.BackButton.show();

    tg.MainButton.setParams({
      text: "Pay",
    });

    tg.MainButton.onClick(() => {
      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: account, // The user's active address.
              to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970", // Required except during contract publications.
              value: "0x29a2241af62c0000", // Only required to send ether to the recipient from the initiating external account.
            },
          ],
        })
        .then((txHash: any) => console.log(txHash))
        .catch((error: any) => console.error(error));

      tg.MainButton.offClick(() => navigate("/"));
      tg.MainButton.hide();
      navigate("/");
    });

    tg.MainButton.show();
  }, []);

  return (
    <div className="checkout">
      <h1 className="checkoutTitle">Checkout</h1>
      <div className="checkout-products">
        {cart.map((product, index) => (
          <div key={index} className="checkout-product">
            <h1 className="checkout-product-title">
              {index + 1}. {product.name} - {product.co2Emission} per hour
            </h1>
          </div>
        )) || "No products in cart"}
      </div>

      <div className="checkout-total">
        {/* <h1 className="checkout-total-title">
          Total CO2 Emission: {totalCo2Emission || 0}
        </h1>
        <h1 className="checkout-total-title">
          Total Offset Amount: {totalCo2Emission || 0}
        </h1> */}
      </div>
    </div>
  );
}

export default Checkout;
