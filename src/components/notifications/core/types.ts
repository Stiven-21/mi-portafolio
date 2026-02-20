import { ReactNode } from "react";

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "custom";
export type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface NotificationOptions {
  duration?: number; // ms, 0 for infinite
  position?: NotificationPosition;
  dismissible?: boolean; // Click to dismiss
  pauseOnHover?: boolean;
  showProgress?: boolean;
  icon?: ReactNode;
  onClose?: () => void;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string; // CSS classes
}

export interface NotificationData extends NotificationOptions {
  id: string;
  type: NotificationType;
  content: ReactNode; // The content of the notification
  createdAt: number;
}

export interface NotificationState {
  notifications: NotificationData[];
  position: NotificationPosition;
  limit: number;
}
