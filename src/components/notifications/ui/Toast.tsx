import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NotificationData } from "@/components/notifications/core/types";
import { IoClose } from "react-icons/io5";

interface ToastProps {
  notification: NotificationData;
  onDismiss: (id: string) => void;
}

const variants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const typeStyles = {
  success: "border-l-4 border-green-500 bg-white dark:bg-gray-800",
  error: "border-l-4 border-red-500 bg-white dark:bg-gray-800",
  warning: "border-l-4 border-yellow-500 bg-white dark:bg-gray-800",
  info: "border-l-4 border-blue-500 bg-white dark:bg-gray-800",
  loading: "border-l-4 border-gray-400 bg-white dark:bg-gray-800",
  custom: "bg-white dark:bg-gray-800",
};

export const Toast = ({ notification, onDismiss }: ToastProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const {
    id,
    type,
    content,
    duration = 0,
    dismissible,
    pauseOnHover,
    showProgress,
    onClose,
  } = notification;

  useEffect(() => {
    if (duration === 0 || isPaused) return;

    const timer = setTimeout(() => {
      onDismiss(id);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, isPaused, onDismiss, onClose]);

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      onHoverStart={() => pauseOnHover && setIsPaused(true)}
      onHoverEnd={() => pauseOnHover && setIsPaused(false)}
      className={`
        relative w-full max-w-sm rounded-lg shadow-lg pointer-events-auto flex overflow-hidden
        ${typeStyles[type]} ${notification.className || ""}
      `}
      role="alert"
    >
      <div className="flex-1 p-4">
        {typeof content === "string" ? (
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {content}
          </p>
        ) : (
          content
        )}
      </div>

      {dismissible && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(id);
            if (onClose) onClose();
          }}
          className="absolute top-2 right-2 p-1 text-slate-600  dark:text-slate-400 hover:text-red-600 transition-colors rounded-full cursor-pointer"
        >
          <IoClose className="w-5 h-5" />
        </button>
      )}

      {showProgress && duration > 0 && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isPaused ? 1 : 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 w-full bg-current opacity-30 origin-left"
          style={{ color: "inherit" }}
        />
      )}
    </motion.div>
  );
};
