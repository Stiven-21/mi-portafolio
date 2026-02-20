"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { useToast } from "../notifications/hooks/useNotifications";
import { NotificationBody } from "@/components/notifications/ui/ToastPrimitives";
import { ContactForm } from "@/interfaces/contact.-form.interface";
import { validateEmail } from "@/common/validations/email.validations";
import ScrollAnimator from "@/utils/ScrollAnimator";
import { MdEmail } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { FaCode, FaLink } from "react-icons/fa6";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { t_contact } = useAppTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({ mode: "onSubmit" });

  const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORM_SPREE_ENDPOINT!;

  const submitHandler = useCallback(
    async (data: ContactForm) => {
      if (isSubmitting) return;

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

        if (!response.ok) throw new Error();

        toast.success(
          <NotificationBody>
            {t_contact("CONTACT_FORM_SUCCESS")}
          </NotificationBody>,
          {
            duration: 3000,
            position: "top-right" as const,
            dismissible: false,
            pauseOnHover: false,
          },
        );

        reset();
      } catch (error) {
        console.error("Error submitting form:", error);

        toast.error(
          <NotificationBody>
            {t_contact("CONTACT_FORM_ERROR")}
          </NotificationBody>,
          {
            duration: 3000,
            position: "top-right" as const,
            dismissible: false,
            pauseOnHover: false,
          },
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, reset, FORMSPREE_ENDPOINT, t_contact, toast],
  );

  const onSubmit = useMemo(
    () => handleSubmit(submitHandler),
    [handleSubmit, submitHandler],
  );

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
                      required
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
                      type="email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "CONTACT_FORM_EMAIL_REQUIRED",
                        },
                        validate: validateEmail,
                      })}
                      placeholder="john@example.com"
                      className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      required
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
                    required
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
