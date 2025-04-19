import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../icons";

interface NotificationBannerProps {
  message: string;
  status: "success" | "error";
  onClose: () => void;
}

const NotificationBanner = ({
  message,
  status,
  onClose,
}: NotificationBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const bannerVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 z-50 rounded-md shadow-lg overflow-hidden ${
            status === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
          variants={bannerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="ml-3 text-md font-medium">{message}</div>
            <div className="flex-shrink-0">
              <button
                className="ml-2 cursor-pointer outline-none flex items-center justify-center rounded-md text-gray-300 hover:text-white  transition"
                onClick={handleClose}
              >
                <span className="sr-only">Cerrar</span>
                <Icons.x
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;
