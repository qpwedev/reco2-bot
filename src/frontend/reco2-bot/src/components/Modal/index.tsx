import { motion } from "framer-motion";

function Backdrop({ children, onClick }: { children: any; onClick: any }) {
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
}

function Modal({
  handleClose,
  handleConnect,
  text,
}: {
  handleClose: () => void;
  handleConnect: () => void;
  text: string;
}) {
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
        <button onClick={handleConnect}>connect</button>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
}

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
    },
  },
};

export default Modal;
