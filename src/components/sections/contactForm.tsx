"use client";

import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { FaCode, FaLink } from "react-icons/fa6";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import ScrollAnimator from "@/utils/ScrollAnimator";
import { useForm } from "react-hook-form";
import { ContactForm } from "@/interfaces/contact.-form.interface";
import { useToast } from "../notifications/hooks/useNotifications";
import { NotificationBody } from "@/components/notifications/ui/ToastPrimitives";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    mode: "onSubmit",
  });
  const { t_contact } = useAppTranslations();
  const temporaryEmailDomains = [
    "mailinator.com",
    "temp-mail.org",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com",
    "throwawaymail.com",
  ];

  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORM_SPREE_ENDPOINT!;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          <>
            <NotificationBody>
              ¡Tu mensaje ha sido enviado con exito!
            </NotificationBody>
          </>,
          {
            duration: 3000,
            position: "top-right",
            dismissible: false,
            pauseOnHover: false,
          },
        );
        reset();
      } else {
        const data = await response.json();
        const errorMessage =
          data.errors
            ?.map((err: { message: string }) => err.message)
            .join(", ") || "Ocurrió un error al enviar el mensaje.";
        console.error("Error submitting form:", errorMessage);
        toast.error(
          <>
            <NotificationBody>
              Ha ocurrido un error al enviar el mensaje.
            </NotificationBody>
          </>,
          {
            duration: 3000,
            position: "top-right",
            dismissible: false,
            pauseOnHover: false,
          },
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        <>
          <NotificationBody>
            Ha ocurrido un error al enviar el mensaje.
          </NotificationBody>
        </>,
        {
          duration: 3000,
          position: "top-right",
          dismissible: false,
          pauseOnHover: false,
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <ScrollAnimator direction="up">
      <section className="w-full py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border bg-slate-100 dark:border-slate-800 border-slate-200 dark:bg-slate-900/60 backdrop-blur-md shadow-2xl">
          <div className="grid lg:grid-cols-3 md:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="bg-linear-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 py-12 px-8 text-white flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold leading-tight">
                  {t_contact("CONTACT_PRESENTATION")}
                </h2>

                <p className="text-blue-100 leading-relaxed max-w-md">
                  {t_contact("CONTACT_DESCRIPTION")}
                </p>
              </div>

              <div className="space-y-6 mt-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <MdEmail className="w-5 h-5" />
                  </div>
                  <span>ing.jamescordoba@gmail.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <PiMapPinFill className="w-5 h-5" />
                  </div>
                  <span>Mocoa, Colombia</span>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
                    <FaLink className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
                    <FaCode className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div className="p-12 lg:col-span-2 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
              <form
                className="space-y-8"
                onSubmit={onSubmit}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      {t_contact("CONTACT_FORM_NAME")}
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "CONTACT_FORM_NAME_REQUIRED",
                        },
                      })}
                      placeholder="John Doe"
                      className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.name && errors.name.message && (
                      <span className="text-xs ml-1 text-red-500 italic font-semibold">
                        {t_contact(errors.name.message)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      {t_contact("CONTACT_FORM_EMAIL")}
                    </label>
                    <input
                      type="text"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "CONTACT_FORM_EMAIL_REQUIRED",
                        },
                        validate: (value) => {
                          const atCount = (value.match(/@/g) || []).length;
                          if (atCount !== 1)
                            return "CONTACT_FORM_EMAIL_REQUIRED";

                          const emailRegex =
                            /^(?!\.)[A-Za-z0-9._%+-]+(?<!\.)@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

                          if (!emailRegex.test(value))
                            return "CONTACT_FORM_EMAIL_NOT_TEMPORARY";

                          const domain = value.split("@")[1].toLowerCase();

                          if (
                            temporaryEmailDomains.some(
                              (d) => domain === d || domain.endsWith("." + d),
                            )
                          )
                            return "CONTACT_FORM_EMAIL_NOT_TEMPORARY";

                          return true;
                        },
                      })}
                      placeholder="john@example.com"
                      className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.email && errors.email.message && (
                      <span className="text-xs ml-1 text-red-500 italic font-semibold">
                        {t_contact(errors.email.message)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-slate-600 dark:text-slate-400">
                    {t_contact("CONTACT_FORM_MESSAGE")}
                  </label>
                  <textarea
                    rows={5}
                    {...register("message", {
                      required: {
                        value: true,
                        message: "CONTACT_FORM_MESSAGE_REQUIRED",
                      },
                    })}
                    placeholder={t_contact("CONTACT_FORM_MESSAGE_PLACEHOLDER")}
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-950 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  {errors.message && errors.message.message && (
                    <span className="text-xs ml-1 text-red-500 italic font-semibold">
                      {t_contact(errors.message.message)}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-600 transition text-white font-semibold shadow-lg hover:shadow-blue-500/40 ${isSubmitting ? "cursor-progress" : "cursor-pointer"}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t_contact("CONTACT_FORM_SENDING")
                    : t_contact("CONTACT_FORM_SEND")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimator>
  );
}
// "use client";

// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { TextArea } from "../ui/textArea";
// import ScrollAnimator from "@/utils/ScrollAnimator";
// import NotificationBanner from "@/components/ui/notificationBanner";
// import { Translations } from "@/common/Translations/translations";

// const ContactFormSection = () => {
//   const { t_contact, t_common } = Translations();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [notification, setNotification] = useState<{
//     message: string;
//     status: "success" | "error" | null;
//   }>({
//     message: "",
//     status: null,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (notification.status === "success" || notification.status === "error") {
//       setIsSubmitting(false);
//     }
//   }, [notification]);

//   const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORM_SPREE_ENDPOINT!;

//   const temporaryEmailDomains = [
//     "mailinator.com",
//     "temp-mail.org",
//     "10minutemail.com",
//     "guerrillamail.com",
//     "yopmail.com",
//     "throwawaymail.com",
//   ];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.name || !formData.email || !formData.message) {
//       setNotification({
//         message: t_common("complete_fields"),
//         status: "error",
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const emailDomain = formData.email.split("@")[1];
//     if (temporaryEmailDomains.some((domain) => emailDomain?.endsWith(domain))) {
//       setNotification({
//         message: t_common("temporary_email"),
//         status: "error",
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await fetch(FORMSPREE_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setNotification({
//           message: t_contact("success"),
//           status: "success",
//         });
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         const data = await response.json();
//         const errorMessage =
//           data.errors
//             ?.map((err: { message: string }) => err.message)
//             .join(", ") || "Ocurrió un error al enviar el mensaje.";
//         console.error("Error submitting form:", errorMessage);
//         setNotification({ message: t_contact("error"), status: "error" });
//       }
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       setNotification({
//         message: t_common("error_network"),
//         status: "error",
//       });
//     }
//   };

//   return (
//     <section
//       id="contact"
//       className="py-8 md:py-16 px-4"
//     >
//       <div className="container mx-auto max-w-3xl">
//         <ScrollAnimator>
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
//             {t_contact("title")}
//           </h2>
//           <p className="text-center text-gray-500 dark:text-gray-400 mb-5">
//             {t_contact("description")}
//           </p>
//         </ScrollAnimator>

//         <ScrollAnimator delay={0.2}>
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6"
//           >
//             <Input
//               label={t_contact("name")}
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               autoComplete="false"
//               required
//               disabled={isSubmitting}
//             />
//             <Input
//               label={t_contact("email")}
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               autoComplete="false"
//               required
//               disabled={isSubmitting}
//             />
//             <TextArea
//               label={t_contact("message")}
//               name="message"
//               rows={5}
//               value={formData.message}
//               onChange={handleChange}
//               required
//               disabled={isSubmitting}
//             />

//             <div className="flex justify-center px-2">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full md:w-auto cursor-pointer outline-none px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-300 hover:text-slate-50 dark:hover:text-slate-900"
//               >
//                 {isSubmitting ? t_contact("sending") : t_contact("send")}
//               </button>
//             </div>
//           </form>
//         </ScrollAnimator>
//       </div>
//       {notification.status && (
//         <NotificationBanner
//           message={notification.message}
//           status={notification.status}
//           onClose={() => setNotification({ message: "", status: null })}
//         />
//       )}
//     </section>
//   );
// };

// export default ContactFormSection;
