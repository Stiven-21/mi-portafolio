"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../icons";
import ScrollAnimator from "@/utils/ScrollAnimator";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: { scale: 1, opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white rounded-lg shadow-xl w-full max-w-2xl relative border border-slate-400 dark:border-slate-900"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center uppercase p-4 border-b border-slate-400 dark:border-slate-900">
              {title && (
                <h2 className="text-xl font-semibold ">
                  <ScrollAnimator
                    direction="down"
                    delay={0.2}
                  >
                    {title}
                  </ScrollAnimator>
                </h2>
              )}
              <button
                onClick={onClose}
                className="text-slate-400 dark:text-slate-600 hover:text-slate-500 cursor-pointer outline-none transition"
                aria-label="Cerrar modal"
              >
                <Icons.x className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 text-slate-300">
              <ScrollAnimator
                direction="up"
                delay={0.2}
              >
                {children}
              </ScrollAnimator>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
