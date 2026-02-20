"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  NotificationData,
  NotificationOptions,
  NotificationType,
} from "@/components/notifications/core/types";
import { notificationReducer } from "@/components/notifications/core/notification-reducer";

const initialState = {
  notifications: [],
};

interface NotificationContextProps {
  state: { notifications: NotificationData[] };
  notify: (
    content: ReactNode,
    type?: NotificationType,
    options?: NotificationOptions,
  ) => string;
  dismiss: (id: string) => void;
  update: (id: string, content: ReactNode) => void;
  clear: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const notify = useCallback(
    (
      content: ReactNode,
      type: NotificationType = "info",
      options: NotificationOptions = {},
    ) => {
      const id = uuidv4();
      const newNotification: NotificationData = {
        id,
        type,
        content,
        createdAt: Date.now(),
        position: options.position || "top-right",
        duration: options.duration ?? 5000,
        dismissible: options.dismissible ?? true,
        pauseOnHover: options.pauseOnHover ?? true,
        showProgress: options.showProgress ?? true,
        ...options,
      };

      dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
      return id;
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  }, []);

  const update = useCallback((id: string, content: ReactNode) => {
    dispatch({ type: "UPDATE_NOTIFICATION", payload: { id, content } });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR_ALL" });
  }, []);

  return (
    <NotificationContext.Provider
      value={{ state, notify, dismiss, update, clear }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  return context;
};
