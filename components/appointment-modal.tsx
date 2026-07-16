"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import type { SiteContent } from "@/types/site-content";

const timeSlots = ["09:30", "11:00", "13:30", "16:00", "18:30"];

export function AppointmentModal({
  open,
  onClose,
  copy
}: {
  open: boolean;
  onClose: () => void;
  copy?: SiteContent["interface"];
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop fixed inset-0 z-[90] grid place-items-end bg-black/72 p-2 backdrop-blur-sm backdrop-saturate-[0.92] sm:place-items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="glass-modal-panel max-h-[calc(100dvh-16px)] w-full max-w-3xl overflow-y-auto border border-white/12 bg-[#101217] shadow-[0_30px_100px_rgba(0,0,0,0.58)]"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 p-3 sm:gap-4 sm:p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c43a52] sm:text-[11px]">
                  {copy?.appointmentEyebrow ?? "Онлайн-запись"}
                </p>
                <h2 className="mt-1.5 text-[24px] font-black leading-[1.03] tracking-[-0.04em] text-white sm:mt-2 sm:text-2xl">
                  {copy?.appointmentTitle ?? "Выберите удобное время"}
                </h2>
                <p className="mt-2 max-w-xl text-xs leading-5 text-white/60 sm:text-sm sm:leading-6">
                  {copy?.appointmentText ?? "Оставьте дату, время и проблему. Менеджер подтвердит запись после проверки загрузки цеха."}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center border border-white/12 text-white/70 transition hover:text-white sm:h-10 sm:w-10"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            {sent ? (
              <div className="m-4 border border-[#c43a52]/35 bg-[#9e1f36]/12 p-5 sm:m-6 sm:p-6">
                <p className="text-lg font-black text-white">{copy?.appointmentSuccessTitle ?? "Запись подготовлена."}</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  {copy?.appointmentSuccessText ?? "Мы свяжемся для подтверждения времени и уточнения задачи."}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3 p-3 sm:gap-5 sm:p-6">
                <div className="grid gap-2.5 md:grid-cols-2 md:gap-4">
                  <FormField label={copy?.dateLabel ?? "Дата"} name="date" type="date" />
                  <label className="grid gap-2 text-sm font-bold text-white/80">
                    {copy?.timeLabel ?? "Время"}
                    <select
                      name="time"
                      className="border border-white/12 bg-black/24 px-3 py-2.5 text-white outline-none transition focus:border-[#c43a52] sm:px-4 sm:py-3"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </label>
                  <FormField label={copy?.nameLabel ?? "Имя"} name="name" placeholder={copy?.namePlaceholder ?? "Ваше имя"} />
                  <FormField label={copy?.phoneLabel ?? "Телефон"} name="phone" placeholder="+7" />
                </div>
                <label className="grid gap-2 text-sm font-bold text-white/80">
                  {copy?.problemLabel ?? "Что случилось"}
                  <textarea
                    name="problem"
                    rows={2}
                    placeholder={copy?.problemPlaceholder ?? "Например: нужна диагностика, покраска двери или ремонт фургона"}
                    className="resize-none border border-white/12 bg-black/24 px-3 py-2.5 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52] sm:px-4 sm:py-3"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-[#9e1f36] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#b72b43] sm:py-3.5"
                >
                  {copy?.appointmentSubmitLabel ?? "Записаться на удобное время"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-white/80 sm:gap-2">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="border border-white/12 bg-black/24 px-3 py-2.5 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52] sm:px-4 sm:py-3"
      />
    </label>
  );
}
