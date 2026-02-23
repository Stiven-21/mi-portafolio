import { useNotifications } from "@/components/notifications/core/NotificationContext";

export const useToast = () => {
  const { notify, dismiss, clear } = useNotifications();

  return {
    success: (msg: string | React.ReactNode, opts = {}) =>
      notify(msg, "success", opts),
    error: (msg: string | React.ReactNode, opts = {}) =>
      notify(msg, "error", opts),
    warning: (msg: string | React.ReactNode, opts = {}) =>
      notify(msg, "warning", opts),
    info: (msg: string | React.ReactNode, opts = {}) =>
      notify(msg, "info", opts),
    custom: (content: React.ReactNode, opts = {}) =>
      notify(content, "custom", opts),
    dismiss,
    clear,
  };
};
