import { useEffect, useState } from "react";

import Header from "./components/Header";
import ProductList from "./components/ProductList";

import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const { tg } = useTelegram();
  const close = () => {
    setModalOpen(false);
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
    text: "Checkout",
    color: "#f6851b",
  };

  const [wallet, setWallet] = useState(undefined);

  useEffect(() => {
    console.log("wallet", wallet);
    if (wallet === undefined && !modalOpen) {
      tg.MainButton.setParams(connectMetaMaskButtonConfig);
      tg.MainButton.onClick(onMetaMaskConnectClick);
      tg.MainButton.show();
    } else if (wallet !== undefined && cart.length !== 0) {
      tg.MainButton.offClick(onMetaMaskConnectClick);
      tg.MainButton.setParams(checkoutButtonConfig);
      tg.MainButton.show();
    } else {
      tg.MainButton.offClick(onMetaMaskConnectClick);
    }

    return () => {
      tg.MainButton.offClick(onMetaMaskConnectClick);
      tg.MainButton.hide();
    };
  }, [wallet, cart, modalOpen]);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route index element={<ProductList cart={cart} />} />
        {/* <Route path={"form"} element={<Checkout />} /> */}
      </Routes>
      <AnimatePresence>
        {modalOpen && <Modal text="Hello, world!" handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}

const Backdrop = ({ children, onClick }: { children: any; onClick: any }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const Modal = ({
  handleClose,
  text,
}: {
  handleClose: () => void;
  text: string;
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{text}</p>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  },
};

export default App;
