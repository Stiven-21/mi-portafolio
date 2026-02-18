"use client";
import { createContext } from "react";

type LandingContextType = {
  loadingPage: boolean;
  setLoadingPage: (loadingPage: boolean) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;
};

export const LandingContext = createContext<LandingContextType>({
  loadingPage: false,
  setLoadingPage: () => {},
  showModal: false,
  setShowModal: () => {},
  showNotification: false,
  setShowNotification: () => {},
});
