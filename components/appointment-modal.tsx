"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";

const timeSlots = ["09:30", "11:00", "13:30", "16:00", "18:30"];

export function AppointmentModal({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
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
          className="fixed inset-0 z-[90] grid place-items-end bg-black/72 p-4 backdrop-blur-sm sm:place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="w-full max-w-3xl border border-white/12 bg-[#101217] shadow-[0_30px_100px_rgba(0,0,0,0.58)]"
          >
            <div className="flex items-start justify-between gap-5 border-b border-white/10 p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">
                  Онлайн-запись
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
                  Выберите удобное время
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                  Оставьте дату, время и проблему. Менеджер подтвердит запись после проверки загрузки цеха.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center border border-white/12 text-white/70 transition hover:text-white"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            {sent ? (
              <div className="m-6 border border-[#c43a52]/35 bg-[#9e1f36]/12 p-6">
                <p className="text-lg font-black text-white">Запись подготовлена.</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Мы свяжемся для подтверждения времени и уточнения задачи.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Дата" name="date" type="date" />
                  <label className="grid gap-2 text-sm font-bold text-white/80">
                    Время
                    <select
                      name="time"
                      className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </label>
                  <FormField label="Имя" name="name" placeholder="Ваше имя" />
                  <FormField label="Телефон" name="phone" placeholder="+7" />
                </div>
                <label className="grid gap-2 text-sm font-bold text-white/80">
                  Что случилось
                  <textarea
                    name="problem"
                    rows={4}
                    placeholder="Например: нужна диагностика после удара, покраска двери, ремонт фургона"
                    className="resize-none border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52]"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-[#9e1f36] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
                >
                  Записаться на ремонт
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
    <label className="grid gap-2 text-sm font-bold text-white/80">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52]"
      />
    </label>
  );
}
