"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useNotifications } from "../core/NotificationContext";
import { Toast } from "./Toast";
import { AnimatePresence } from "framer-motion";

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
};

export const ToastContainer = () => {
  const { state, dismiss } = useNotifications();

  const notificationsByPosition = state.notifications.reduce(
    (acc, note) => {
      const pos = note.position || "top-right";
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(note);
      return acc;
    },
    {} as Record<string, typeof state.notifications>,
  );

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      {Object.entries(notificationsByPosition).map(([pos, toasts]) => (
        <div
          key={pos}
          className={`fixed z-9999 p-4 flex flex-col gap-2 w-full max-w-sm pointer-events-none ${positionClasses[pos as keyof typeof positionClasses]}`}
        >
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                notification={toast}
                onDismiss={dismiss}
              />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </>,
    document.body,
  );
};
