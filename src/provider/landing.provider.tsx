"use client";
import { LandingContext } from "@/context/landing.context";
import { useContext, useState } from "react";

export const useLanding = () => {
  const context = useContext(LandingContext);
  if (!context) {
    throw new Error("useLanding must be used within LandingProvider");
  }
  return context;
};

export const LandingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  return (
    <LandingContext.Provider
      value={{
        loadingPage,
        setLoadingPage,
        showModal,
        setShowModal,
        showNotification,
        setShowNotification,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
};
