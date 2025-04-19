"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { TextArea } from "../ui/textArea";
import ScrollAnimator from "@/utils/ScrollAnimator";
import NotificationBanner from "@/components/ui/notificationBanner";
import { Translations } from "@/common/Translations/translations";

const ContactFormSection = () => {
  const { t_contact, t_common } = Translations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [notification, setNotification] = useState<{
    message: string;
    status: "success" | "error" | null;
  }>({
    message: "",
    status: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (notification.status === "success" || notification.status === "error") {
      setIsSubmitting(false);
    }
  }, [notification]);

  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORM_SPREE_ENDPOINT!;

  const temporaryEmailDomains = [
    "mailinator.com",
    "temp-mail.org",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com",
    "throwawaymail.com",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      setNotification({
        message: t_common("complete_fields"),
        status: "error",
      });
      setIsSubmitting(false);
      return;
    }

    const emailDomain = formData.email.split("@")[1];
    if (temporaryEmailDomains.some((domain) => emailDomain?.endsWith(domain))) {
      setNotification({
        message: t_common("temporary_email"),
        status: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({
          message: t_contact("success"),
          status: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        const errorMessage =
          data.errors
            ?.map((err: { message: string }) => err.message)
            .join(", ") || "Ocurrió un error al enviar el mensaje.";
        console.error("Error submitting form:", errorMessage);
        setNotification({ message: t_contact("error"), status: "error" });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setNotification({
        message: t_common("error_network"),
        status: "error",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-8 md:py-16 px-4"
    >
      <div className="container mx-auto max-w-3xl">
        <ScrollAnimator>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {t_contact("title")}
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-5">
            {t_contact("description")}
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              label={t_contact("name")}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="false"
              required
              disabled={isSubmitting}
            />
            <Input
              label={t_contact("email")}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="false"
              required
              disabled={isSubmitting}
            />
            <TextArea
              label={t_contact("message")}
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <div className="flex justify-center px-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto cursor-pointer outline-none px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-300 hover:text-slate-50 dark:hover:text-slate-900"
              >
                {isSubmitting ? t_contact("sending") : t_contact("send")}
              </button>
            </div>
          </form>
        </ScrollAnimator>
      </div>
      {notification.status && (
        <NotificationBanner
          message={notification.message}
          status={notification.status}
          onClose={() => setNotification({ message: "", status: null })}
        />
      )}
    </section>
  );
};

export default ContactFormSection;
