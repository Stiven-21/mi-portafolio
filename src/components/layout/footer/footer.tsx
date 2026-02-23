"use client";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { HiMiniCommandLine } from "react-icons/hi2";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalCloseButton,
} from "@/components/ui/modal/index";
import { socialLinks } from "@/data/social.data";
import { Social } from "@/interfaces/social.interface";
import { useLanding } from "@/provider/landing.provider";
import ModalTerms from "@/components/modal/modal-terms";
import ModalPrivacy from "@/components/modal/modal-privacy";
import ModalCookie from "@/components/modal/modal-cookie";

export const Footer = () => {
  const { setShowModal, showModal, setModalData, modalData } = useLanding();
  const { t_common, t_footer } = useAppTranslations();

  return (
    <footer className="bg-gray-950 border-t border-t-slate-900 py-8">
      <div className="mx-auto text-center text-sm grid lg:grid-cols-3 space-y-6 lg:space-y-0">
        {/* JAM DEV */}
        <div className="text-lg font-bold italic items-center flex justify-center gap-x-2 text-white">
          <span className="p-2 bg-blue-600 rounded-xl text-white">
            <HiMiniCommandLine className="h-4 w-4" />
          </span>
          {t_common("my_portfolio") + " "}
          <span className="text-xs text-slate-400 mt-1">&copy; 2026</span>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-x-6 text-slate-600 dark:text-slate-700">
          <span
            className="hover:text-blue-500/50 cursor-pointer"
            onClick={() => {
              setModalData({
                title: t_footer("TERMS"),
                body: <ModalTerms />,
                footer: null,
              });
              setShowModal(true);
            }}
          >
            {t_footer("TERMS")}
          </span>
          <span
            className="hover:text-blue-500/50 cursor-pointer"
            onClick={() => {
              setModalData({
                title: t_footer("PRIVACY"),
                body: <ModalPrivacy />,
                footer: null,
              });
              setShowModal(true);
            }}
          >
            {t_footer("PRIVACY")}
          </span>
          <span
            className="hover:text-blue-500/50 cursor-pointer"
            onClick={() => {
              setModalData({
                title: t_footer("COOKIES"),
                body: <ModalCookie />,
                footer: null,
              });
              setShowModal(true);
            }}
          >
            {t_footer("COOKIES")}
          </span>
        </div>

        {/* Redes sociales */}
        <div className="flex items-center justify-center gap-x-6 text-slate-600 dark:text-slate-700 select-none">
          {socialLinks.map((social: Social, index: number) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-1 hover:text-blue-500/50"
            >
              <social.Icon className="w-4 h-4" />
              {social.name}
            </a>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setModalData(null);
        }}
        size="xl"
        position="center"
        backdropClass="backdrop-blur-md"
      >
        <ModalHeader>
          <ModalTitle>{modalData?.title || "Modal"}</ModalTitle>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody className="overflow-y-auto max-h-96">
          {modalData?.body || "Modal body"}
        </ModalBody>

        <ModalFooter>{modalData?.footer || null}</ModalFooter>
      </Modal>
    </footer>
  );
};
