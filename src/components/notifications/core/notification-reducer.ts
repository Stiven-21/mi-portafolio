import { NotificationData } from "@/components/notifications/core/types";
import { ReactNode } from "react";

type Action =
  | { type: "ADD_NOTIFICATION"; payload: NotificationData }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "UPDATE_NOTIFICATION"; payload: { id: string; content: ReactNode } }
  | { type: "CLEAR_ALL" };

export const notificationReducer = (
  state: { notifications: NotificationData[] },
  action: Action,
) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };
    case "UPDATE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload.id
            ? { ...n, content: action.payload.content }
            : n,
        ),
      };
    case "CLEAR_ALL":
      return { ...state, notifications: [] };
    default:
      return state;
  }
};
