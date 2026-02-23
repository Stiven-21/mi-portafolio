"use client";
import { ModalData } from "@/interfaces/modal-data.interface";
import { createContext } from "react";

type LandingContextType = {
  loadingPage: boolean;
  setLoadingPage: (loadingPage: boolean) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  showNotification: boolean;
  setShowNotification: (showNotification: boolean) => void;
  modalData: ModalData | null;
  setModalData: (modalData: ModalData | null) => void;
};

export const LandingContext = createContext<LandingContextType>({
  loadingPage: false,
  setLoadingPage: () => {},
  showModal: false,
  setShowModal: () => {},
  showNotification: false,
  setShowNotification: () => {},
  modalData: null,
  setModalData: () => {},
});
