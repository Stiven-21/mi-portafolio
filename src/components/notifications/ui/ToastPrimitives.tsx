import React from "react";

export const NotificationHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center justify-between mb-1 font-semibold text-sm ${className}`}
  >
    {children}
  </div>
);

export const NotificationBody = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`text-sm text-gray-600 dark:text-gray-300 ${className}`}>
    {children}
  </div>
);

export const NotificationFooter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`mt-3 flex gap-2 ${className}`}>{children}</div>;
