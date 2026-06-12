"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { CONTACT, brands, facilityPhotos } from "@/data/site";

const navItems = [
  { label: "Услуги ▼", href: "/uslugi" },
  { label: "Марки ▼", href: "/marki" },
  { label: "Коммерческий транспорт", href: "/kommercheskiy-transport" },
  { label: "Наши работы", href: "/raboty" },
  { label: "Отзывы", href: "/#reviews" },
  { label: "Контакты", href: "/#contacts" }
];

const heroBenefits = [
  "Собственный кузовной и малярный цех",
  "Работаем с микроавтобусами и фургонами",
  "Фотоотчёт по этапам ремонта",
  "Гарантия на выполненные работы"
];

const advantages = [
  "Собственный кузовной цех",
  "Малярный участок",
  "Работаем с коммерческим транспортом",
  "Фотоотчёт по ремонту",
  "Гарантия на работы"
];

const hotspots = [
  { id: "body", label: "Кузовной ремонт", x: "44%", y: "62%" },
  { id: "paint", label: "Покраска", x: "58%", y: "44%" },
  { id: "detail", label: "Детейлинг", x: "70%", y: "56%" },
  { id: "diagnostics", label: "Диагностика", x: "78%", y: "48%" },
  { id: "alignment", label: "Развал-схождение", x: "36%", y: "74%" },
  { id: "commercial", label: "Коммерческий транспорт", x: "79%", y: "30%" }
];

export function HomePage() {
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const fadeUp = useMemo(
    () => ({
      initial: reduceMotion ? false : { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.75, ease: "easeOut" as const }
    }),
    [reduceMotion]
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-[#f5f1f2]">
      <Header onLead={() => setIsLeadOpen(true)} />
      <section className="noise relative min-h-[100dvh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 md:left-[34%]">
          <Image
            src="/images/hero-stoavto.png"
            alt="Легковой автомобиль и микроавтобус в автотехцентре СТОАВТО"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_50%] md:object-[58%_50%]"
          />
          <div className="hero-mask absolute inset-0" />
          <ServiceHotspots />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] items-end px-5 pb-10 pt-28 sm:px-8 md:items-center md:pb-16 lg:px-10">
          <motion.div
            {...fadeUp}
            className="max-w-[920px] pb-6 md:pb-0"
          >
            <p className="mb-5 w-fit border border-white/14 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-md">
              СТОАВТО / полный цикл
            </p>
            <h1 className="max-w-[900px] text-[clamp(34px,5.35vw,76px)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-white">
              Полный цикл
              <br />
              ремонта авто
              <br />
              <span className="whitespace-nowrap">
                и <span className="text-[#c43a52]">коммерческого</span>
              </span>
              <br />
              транспорта
            </h1>
            <p className="mt-7 max-w-[620px] text-base leading-7 text-white/72 sm:text-lg">
              Кузовной ремонт, покраска, детейлинг, диагностика, развал-схождение и слесарные работы в одном автотехцентре.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionButton onClick={() => setIsLeadOpen(true)} tone="primary">
                Рассчитать стоимость
              </ActionButton>
              <ActionButton onClick={() => setIsLeadOpen(true)} tone="secondary">
                Записаться на ремонт
              </ActionButton>
            </div>
            <div className="mt-8 grid max-w-[680px] grid-cols-1 gap-3 text-sm text-white/72 sm:grid-cols-2">
              {heroBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#c43a52]">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AdvantagesBar />
      <BrandLogos />
      <FacilitySections />
      <LeadFormModal open={isLeadOpen} onClose={() => setIsLeadOpen(false)} />
    </main>
  );
}

function Header({ onLead }: { onLead: () => void }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#08090b]/72 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <a href="#" className="flex shrink-0 items-center gap-3">
          <span className="grid h-11 w-11 place-items-center bg-[#9e1f36] text-sm font-black tracking-[-0.05em] text-white">
            СА
          </span>
          <span>
            <span className="block text-lg font-black tracking-[-0.04em] text-white">СТОАВТО</span>
            <span className="hidden text-xs text-white/52 sm:block">Автотехцентр полного цикла</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-medium text-white/68 xl:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <div className="text-right">
            <a href={CONTACT.phoneHref} className="block text-sm font-bold text-white">
              {CONTACT.phone}
            </a>
            <span className="text-xs text-white/52">{CONTACT.hours}</span>
          </div>
          <ActionButton onClick={onLead} tone="small">
            Оставить заявку
          </ActionButton>
        </div>

        <button
          type="button"
          onClick={onLead}
          className="border border-white/14 px-4 py-2 text-sm font-bold text-white transition hover:border-[#c43a52] hover:text-[#f4b7c0] lg:hidden"
        >
          Заявка
        </button>
      </div>
    </header>
  );
}

function ActionButton({
  children,
  onClick,
  tone
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone: "primary" | "secondary" | "small";
}) {
  const classes = {
    primary:
      "bg-[#9e1f36] text-white shadow-[0_22px_70px_rgba(158,31,54,0.38)] hover:bg-[#b72b43]",
    secondary:
      "border border-white/16 bg-white/[0.04] text-white hover:border-white/36 hover:bg-white/[0.08]",
    small:
      "bg-white text-[#111318] hover:bg-[#f4d9de]"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${classes[tone]} min-h-12 whitespace-nowrap px-6 py-3 text-sm font-extrabold transition duration-300 active:translate-y-px`}
    >
      {children}
    </button>
  );
}

function ServiceHotspots() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
      {hotspots.map((spot, index) => (
        <motion.button
          key={spot.id}
          type="button"
          className="pointer-events-auto absolute"
          style={{ left: spot.x, top: spot.y }}
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 + index * 0.08, duration: 0.5 }}
          onMouseEnter={() => setActive(spot.id)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(spot.id)}
          onBlur={() => setActive(null)}
          aria-label={spot.label}
        >
          <span className="relative block h-4 w-4">
            <span className="absolute inset-0 animate-ping bg-[#c43a52]/40" />
            <span className="absolute inset-0 border border-white/70 bg-[#c43a52] shadow-[0_0_35px_rgba(196,58,82,0.72)]" />
          </span>
          <AnimatePresence>
            {active === spot.id && (
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="absolute left-5 top-[-14px] whitespace-nowrap border border-white/12 bg-[#101217]/88 px-4 py-2 text-xs font-bold text-white shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl"
              >
                {spot.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}

function AdvantagesBar() {
  return (
    <section className="border-b border-white/10 bg-[#0b0c10] px-5 py-5 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-white/10 border border-white/10 bg-white/[0.025] md:grid-cols-5 md:divide-x md:divide-y-0">
        {advantages.map((item) => (
          <div key={item} className="px-5 py-5 text-sm font-bold text-white/82">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function BrandLogos() {
  return (
    <section className="bg-[#0b0c10] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="max-w-2xl text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
          Обслуживаем популярные марки
        </h2>
        <div className="mt-9 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <div
              key={brand.slug}
              className="flex h-24 items-center justify-center border-b border-r border-white/10 bg-white/[0.018] px-4 text-center text-sm font-extrabold uppercase tracking-[0.08em] text-white/68 transition hover:bg-white/[0.045] hover:text-white"
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilitySections() {
  return (
    <section className="border-t border-white/10 bg-[#08090b] px-5 py-18 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            Места под реальные фотографии мощностей автотехцентра
          </h2>
          <p className="mt-5 text-base leading-7 text-white/62">
            Блоки подготовлены под крупные фото компании: посты, оборудование, процесс и выполненные работы.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {facilityPhotos.map((item, index) => (
            <article
              key={item.title}
              className={`group overflow-hidden border border-white/10 bg-white/[0.025] ${
                index === 0 || index === 2 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative min-h-[250px] overflow-hidden bg-[#14161c]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(158,31,54,0.12)_42%,rgba(255,255,255,0.02))]" />
                <div className="absolute inset-x-6 bottom-6 h-px bg-white/16" />
                <span className="absolute left-6 top-6 border border-white/12 bg-black/28 px-3 py-1 text-xs font-bold text-white/64 backdrop-blur">
                  Фото компании
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-4 backdrop-blur-sm sm:place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="w-full max-w-xl border border-white/12 bg-[#101217] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.04em] text-white">Оставить заявку</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Опишите автомобиль и задачу. Менеджер свяжется для расчёта.
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
              <div className="mt-8 border border-[#c43a52]/35 bg-[#9e1f36]/12 p-5">
                <p className="font-bold text-white">Заявка подготовлена.</p>
                <p className="mt-2 text-sm text-white/62">Для production подключается CRM, почта или Telegram-уведомление.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-7 grid gap-4">
                <FormField label="Имя" name="name" placeholder="Ваше имя" />
                <FormField label="Телефон" name="phone" placeholder="+7" />
                <label className="grid gap-2 text-sm font-bold text-white/80">
                  Тип транспорта
                  <select name="vehicleType" className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]">
                    <option>Легковой автомобиль</option>
                    <option>Микроавтобус или фургон</option>
                    <option>Коммерческий транспорт</option>
                  </select>
                </label>
                <FormField label="Что нужно сделать" name="service" placeholder="Например: кузовной ремонт и покраска" />
                <button type="submit" className="mt-2 bg-[#9e1f36] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#b72b43]">
                  Отправить заявку
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
