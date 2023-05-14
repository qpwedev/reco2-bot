import { useEffect, useState } from "react";
import MetaMaskSDK from "@metamask/sdk";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";

import { useTelegram } from "./hooks/useTelegram";

import "./App.css";
import { Product } from "./types";
import Checkout from "./components/Checkout";

const options = {
  injectProvider: true,
  forceInjectProvider: true,
  preferDesktop: false,
};

function App() {
  const [totalCo2Emission, setTotalCo2Emission] = useState('0');
  const navigate = useNavigate();
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);
  const [modalOpen, setModalOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const { tg } = useTelegram();
  const close = () => {
    setModalOpen(false);
    updateWallets(["111"]);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setTotalCo2Emission((Number(totalCo2Emission) + Number(product.co2Emission)).toFixed(2));
  };

  const updateWallets = async (accounts: any) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = [];
    try {
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      console.error(error);
    }

    updateWallets(accounts);
  };

  const onMetaMaskConnectClick = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  useEffect(() => {
    tg.ready();
  }, []);

  const connectMetaMaskButtonConfig = {
    text: "Connect MetaMask",
    color: "#f6851b",
  };

  const checkoutButtonConfig = {
    text: "Checkout" + " (" + totalCo2Emission + " " + "CO2)",
    color: "#f6851b",
  };

  function onCheckoutButtonClick() {
    navigate("/checkout");
  }

  useEffect(() => {
    console.log("wallet", wallet);
    if (wallet.accounts.length === 0 && !modalOpen) {
      tg.MainButton.setParams(connectMetaMaskButtonConfig);
      tg.MainButton.onClick(onMetaMaskConnectClick);
      tg.MainButton.show();
    } else if (wallet.accounts.length > 0 && cart.length > 0) {
      tg.MainButton.offClick(onMetaMaskConnectClick);
      tg.MainButton.onClick(onCheckoutButtonClick);
      tg.MainButton.setParams(checkoutButtonConfig);
      tg.MainButton.show();
    } else {
      tg.MainButton.offClick(onMetaMaskConnectClick);
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick(onMetaMaskConnectClick);
      tg.MainButton.offClick(onCheckoutButtonClick);
      tg.MainButton.hide();
    };
  }, [wallet, cart, modalOpen]);

  useEffect(() => {
    new MetaMaskSDK(options);
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          index
          element={
            <ProductList
              cart={cart}
              addToCart={addToCart}
              handleConnect={handleConnect}
              navigate={navigate}
            />
          }
        />
        <Route path={"checkout"} element={<Checkout cart={cart} navigate={navigate} setCart={setCart} account={wallet.accounts[0]} setTotalCO2Emission={setTotalCo2Emission} />} />
      </Routes>
      <AnimatePresence>
        {modalOpen && (
          <Modal
            text="Connect MetaMask"
            handleConnect={handleConnect}
            handleClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
