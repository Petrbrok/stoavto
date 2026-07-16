"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";
import type { CalculatorOption, SiteContent } from "@/types/site-content";

export function LeadFormModal({
  open,
  onClose,
  copy,
  transports
}: {
  open: boolean;
  onClose: () => void;
  copy?: SiteContent["interface"];
  transports?: CalculatorOption[];
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
          className="modal-backdrop fixed inset-0 z-[90] grid place-items-end bg-black/70 p-4 backdrop-blur-sm backdrop-saturate-[0.92] sm:place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="glass-modal-panel w-full max-w-xl border border-white/12 bg-[#101217] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.04em] text-white">{copy?.leadTitle ?? "Оставить заявку"}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">{copy?.leadText ?? "Опишите автомобиль и задачу. Менеджер свяжется для расчёта."}</p>
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
              <div className="mt-8 border border-[#c43a52]/35 bg-[#9e1f36]/12 p-5">
                <p className="font-bold text-white">{copy?.leadSuccessTitle ?? "Заявка подготовлена."}</p>
                <p className="mt-2 text-sm text-white/62">{copy?.leadSuccessText ?? "Менеджер свяжется с вами в рабочее время."}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-7 grid gap-4">
                <FormField label={copy?.nameLabel ?? "Имя"} name="name" placeholder={copy?.namePlaceholder ?? "Ваше имя"} />
                <FormField label={copy?.phoneLabel ?? "Телефон"} name="phone" placeholder="+7" />
                <label className="grid gap-2 text-sm font-bold text-white/80">
                  {copy?.vehicleTypeLabel ?? "Тип транспорта"}
                  <select
                    name="vehicleType"
                    className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]"
                  >
                    {(transports ?? [
                      { label: "Легковой автомобиль", value: "car" },
                      { label: "Микроавтобус или фургон", value: "van" },
                      { label: "Коммерческий транспорт", value: "commercial" }
                    ]).filter((item) => item.visible !== false).map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </label>
                <FormField
                  label={copy?.serviceRequestLabel ?? "Что нужно сделать"}
                  name="service"
                  placeholder={copy?.serviceRequestPlaceholder ?? "Например: кузовной ремонт и покраска"}
                />
                <button
                  type="submit"
                  className="mt-2 bg-[#9e1f36] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
                >
                  {copy?.leadSubmitLabel ?? "Отправить заявку"}
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
  placeholder
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/80">
      {label}
      <input
        name={name}
        placeholder={placeholder}
        className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52]"
      />
    </label>
  );
}
