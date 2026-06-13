"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import * as simpleIcons from "simple-icons";
import { brands, facilityPhotos } from "@/data/site";
import { AppointmentModal } from "@/components/appointment-modal";
import { LeadFormModal } from "@/components/lead-form-modal";
import { SiteHeader } from "@/components/site-header";

type SimpleIcon = {
  title: string;
  path: string;
};

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
  {
    id: "body",
    label: "Кузовной ремонт",
    point: { x: 67, y:62 },
    href: "/uslugi/kuzovnoy-remont",
    description: "Дефектовка, восстановление геометрии и подготовка кузова к окраске."
  },
  {
    id: "paint",
    label: "Покраска",
    point: { x: 82, y: 58 },
    href: "/uslugi/pokraska-avto",
    description: "Локальная и полная окраска с подбором цвета и контролем результата."
  },
  {
    id: "diagnostics",
    label: "Диагностика",
    point: { x: 92, y: 55.5 },
    href: "/uslugi/diagnostika",
    description: "Компьютерная проверка, осмотр систем и понятный план работ."
  },
  {
    id: "alignment",
    label: "Развал-схождение",
    point: { x: 73.7, y: 71 },
    href: "/uslugi/razval-shozhdenie",
    description: "Контроль геометрии колес после ремонта и обслуживания."
  },
  {
    id: "commercial",
    label: "Коммерческий транспорт",
    point: { x: 81, y: 43 },
    href: "/kommercheskiy-transport",
    description: "Отдельное направление для микроавтобусов, фургонов и рабочих авто."
  }
];

const servicePrices = [
  { label: "Диагностика", value: "diagnostics", base: 1500, max: 3500, days: "1-2 часа" },
  { label: "Кузовной ремонт", value: "body", base: 2500, max: 18000, days: "1-3 дня" },
  { label: "Покраска", value: "paint", base: 3000, max: 22000, days: "2-5 дней" },
  { label: "Детейлинг", value: "detail", base: 3500, max: 16000, days: "1 день" },
  { label: "Развал-схождение", value: "alignment", base: 2000, max: 4500, days: "1-2 часа" },
  { label: "Коммерческий транспорт", value: "commercial", base: 4500, max: 30000, days: "2-6 дней" }
];

export function HomePage() {
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const fadeUp = useMemo(
    () => ({
      initial: reduceMotion ? false : { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.75, ease: "easeOut" as const }
    }),
    [reduceMotion]
  );

  const openLead = () => setIsLeadOpen(true);
  const openAppointment = () => setIsAppointmentOpen(true);
  const scrollToCalculator = () => {
    document.getElementById("price-calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-[#f5f1f2]">
      <SiteHeader onAppointment={openAppointment} />
      <section className="noise relative overflow-hidden border-b border-white/10 bg-[#08090b] md:min-h-[100dvh]">
        <div className="absolute inset-x-0 inset-y-0 hidden max-w-none md:block">
          <Image
            src="/images/hero-desktop-stoavto.png"
            alt="СТОАВТО: легковой автомобиль и микроавтобус в современном автотехцентре"
            fill
            priority
            sizes="100vw"
            className="object-contain object-right-bottom"
          />
          <ServiceHotspots onCalculate={scrollToCalculator} />
        </div>
        <div className="hero-mask pointer-events-none absolute inset-0 z-10 hidden md:block" />

        <div className="pointer-events-none relative z-20 px-5 pb-10 pt-28 sm:px-8 md:min-h-[100dvh] md:pb-16 lg:px-10">
          <motion.div
            {...fadeUp}
            className="pointer-events-auto mx-auto flex max-w-[1440px] items-end pb-6 md:min-h-[calc(100dvh-184px)] md:items-center md:pb-0"
          >
            <div className="max-w-[920px]">
            <p className="mb-5 w-fit rounded-lg border border-white/18 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              СТОАВТО / полный цикл
            </p>
            <h1 className="font-display max-w-[840px] text-[clamp(31px,4.65vw,66px)] font-black uppercase leading-[0.98] text-white">
              Полный цикл
              <br />
              ремонта авто
              <br />
              <span className="whitespace-nowrap">
                и <span className="text-[#9e1f36] drop-shadow-[0_0_24px_rgba(158,31,54,0.32)]">коммерческого</span>
              </span>
              <br />
              транспорта
            </h1>
            <p className="mt-7 max-w-[620px] text-base leading-7 text-white sm:text-lg">
              Кузовной ремонт, покраска, детейлинг, диагностика, развал-схождение и слесарные работы в одном автотехцентре.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionButton onClick={scrollToCalculator} tone="primary">
                Рассчитать стоимость
              </ActionButton>
              <ActionButton onClick={openAppointment} tone="secondary">
                Записаться на ремонт
              </ActionButton>
            </div>
            <div className="mt-8 grid max-w-[680px] grid-cols-1 gap-3 text-sm font-semibold text-white sm:grid-cols-2">
              {heroBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#c43a52]">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MobileHeroImage />
      <MobilePriceCards />
      <AdvantagesBar />
      <BrandLogos />
      <PriceCalculator onLead={openLead} />
      <QualityIdeas onAppointment={openAppointment} />
      <FacilitySections />
      <LeadFormModal open={isLeadOpen} onClose={() => setIsLeadOpen(false)} />
      <AppointmentModal open={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </main>
  );
}

function ActionButton({
  children,
  onClick,
  tone
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone: "primary" | "secondary";
}) {
  const classes = {
    primary:
      "bg-[#9e1f36] text-white shadow-[0_22px_70px_rgba(158,31,54,0.38)] hover:bg-[#b72b43]",
    secondary:
      "border border-white/16 bg-white/[0.04] text-white hover:border-white/36 hover:bg-white/[0.08]"
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

function ServiceHotspots({ onCalculate }: { onCalculate: () => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = pinned ?? hovered;
  const activeSpot = hotspots.find((spot) => spot.id === active);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
      {hotspots.map((spot, index) => {
        const isActive = active === spot.id;

        return (
          <motion.button
            key={spot.id}
            type="button"
            className="pointer-events-auto absolute z-40 block h-5 w-5"
            style={{ left: `${spot.point.x}%`, top: `${spot.point.y}%` }}
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + index * 0.08, duration: 0.5 }}
            onMouseEnter={() => setHovered(spot.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setPinned(pinned === spot.id ? null : spot.id)}
            onFocus={() => setHovered(spot.id)}
            onBlur={() => setHovered(null)}
            aria-label={spot.label}
            aria-expanded={isActive}
          >
            <span className={`absolute inset-0 rounded-full bg-[#c43a52]/35 transition ${isActive ? "scale-[2.25] opacity-60" : "scale-100 opacity-0"}`} />
            <span className="absolute inset-0 rounded-full border border-white/75 bg-[#c43a52] shadow-[0_0_24px_rgba(196,58,82,0.52)] transition" />
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />
          </motion.button>
        );
      })}
      <AnimatePresence>
        {activeSpot && (
          <motion.div
            key={activeSpot.id}
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto absolute bottom-14 right-10 z-40 w-[300px] rounded-lg border border-white/12 bg-[#101217]/90 p-4 text-left shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">Направление работ</p>
            <h3 className="mt-2 text-base font-black text-white">{activeSpot.label}</h3>
            <p className="mt-2 text-sm leading-5 text-white/82">{activeSpot.description}</p>
            <div className="mt-4 flex gap-2">
              <Link
                href={activeSpot.href}
                className="rounded-lg border border-white/16 px-3.5 py-2.5 text-xs font-bold text-white transition hover:border-[#c43a52]"
              >
                Подробнее
              </Link>
              <button
                type="button"
                onClick={onCalculate}
                className="bg-[#9e1f36] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#b72b43]"
              >
                Рассчитать
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobilePriceCards() {
  return (
    <section className="border-b border-white/10 bg-[#08090b] px-5 pb-10 md:hidden">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3">
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            className="rounded-lg border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(158,31,54,0.12))] p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-white">{spot.label}</h3>
                <p className="mt-1 text-xs leading-5 text-white/82">{spot.description}</p>
              </div>
              <Link href={spot.href} className="shrink-0 text-xs font-black uppercase tracking-[0.12em] text-[#f09aac]">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileHeroImage() {
  return (
    <section className="border-b border-white/10 bg-[#08090b] px-5 pb-8 md:hidden">
      <div className="relative mx-auto aspect-[3/2] max-w-2xl overflow-hidden rounded-lg border border-white/10">
        <Image
          src="/images/hero-mobile-stoavto.png"
          alt="СТОАВТО: легковой автомобиль и микроавтобус"
          fill
          sizes="100vw"
          className="object-cover object-[58%_50%]"
        />
      </div>
    </section>
  );
}

function AdvantagesBar() {
  return (
    <section className="border-b border-white/10 bg-[#0b0c10] px-5 py-5 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 overflow-hidden rounded-lg border border-white/12 bg-white/[0.04] md:grid-cols-5 md:divide-x md:divide-white/10">
        {advantages.map((item) => (
          <div key={item} className="border-b border-white/10 px-5 py-5 text-sm font-bold text-white last:border-b-0 md:border-b-0">
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
        <h2 className="font-display max-w-2xl text-3xl font-black text-white sm:text-5xl">
          Обслуживаем популярные марки
        </h2>
        <div className="mt-9 grid overflow-hidden rounded-lg border border-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/marki/${brand.slug}`}
              className="group flex h-28 flex-col items-center justify-center gap-3 border-b border-r border-white/10 bg-white/[0.035] px-4 text-center text-white transition hover:bg-white/[0.065]"
            >
              <BrandMark brand={brand} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/82 transition group-hover:text-white">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCalculator({ onLead }: { onLead: () => void }) {
  const [transport, setTransport] = useState("car");
  const [service, setService] = useState("body");
  const [size, setSize] = useState("medium");
  const [urgent, setUrgent] = useState(false);
  const [paint, setPaint] = useState(true);
  const [report, setReport] = useState(true);

  const selected = servicePrices.find((item) => item.value === service) ?? servicePrices[0];
  const transportFactor = transport === "commercial" ? 1.35 : transport === "van" ? 1.18 : 1;
  const sizeFactor = size === "small" ? 0.72 : size === "large" ? 1.55 : 1;
  const urgentFactor = urgent ? 1.18 : 1;
  const paintAdd = paint ? 3500 : 0;
  const reportAdd = report ? 0 : -500;
  const low = Math.max(1500, Math.round((selected.base * transportFactor * sizeFactor * urgentFactor + paintAdd + reportAdd) / 100) * 100);
  const high = Math.round((selected.max * transportFactor * sizeFactor * urgentFactor + paintAdd + Math.max(reportAdd, 0)) / 100) * 100;

  return (
    <section id="price-calculator" className="scroll-mt-28 border-t border-white/10 bg-[#08090b] px-5 py-18 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="w-fit rounded-lg border border-white/18 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            Предварительный расчёт
          </p>
          <h2 className="font-display mt-5 max-w-2xl text-3xl font-black text-white sm:text-5xl">
            Узнайте порядок цены до визита в техцентр
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white">
            Калькулятор даёт ориентир. Точная стоимость фиксируется после осмотра, дефектовки и согласования сметы.
          </p>
          <div className="mt-8 max-w-[560px]">
            <Image
              src="/images/stoavto-logo-transparent.png"
              alt="СТОАВТО"
              width={1759}
              height={306}
              sizes="(min-width: 1024px) 420px, 88vw"
              className="h-auto w-full object-contain drop-shadow-[0_18px_48px_rgba(158,31,54,0.34)]"
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/12 bg-white/[0.04] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-white">
              Тип транспорта
              <select value={transport} onChange={(event) => setTransport(event.target.value)} className="border border-white/16 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]">
                <option value="car">Легковой автомобиль</option>
                <option value="van">Микроавтобус / фургон</option>
                <option value="commercial">Коммерческий транспорт</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-white">
              Услуга
              <select value={service} onChange={(event) => setService(event.target.value)} className="border border-white/16 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]">
                {servicePrices.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-white">
              Объём работ
              <select value={size} onChange={(event) => setSize(event.target.value)} className="border border-white/16 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]">
                <option value="small">Небольшой</option>
                <option value="medium">Средний</option>
                <option value="large">Крупный</option>
              </select>
            </label>
            <div className="grid gap-3 rounded-lg border border-white/12 bg-black/20 p-4">
              <label className="flex items-center justify-between gap-4 text-sm font-bold text-white">
                Нужна покраска
                <input type="checkbox" checked={paint} onChange={(event) => setPaint(event.target.checked)} />
              </label>
              <label className="flex items-center justify-between gap-4 text-sm font-bold text-white">
                Срочно
                <input type="checkbox" checked={urgent} onChange={(event) => setUrgent(event.target.checked)} />
              </label>
              <label className="flex items-center justify-between gap-4 text-sm font-bold text-white">
                Фотоотчёт
                <input type="checkbox" checked={report} onChange={(event) => setReport(event.target.checked)} />
              </label>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-[#c43a52]/45 bg-[#9e1f36]/14 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/82">Примерная стоимость</p>
            <p className="font-display mt-2 text-4xl font-black text-white">
              {formatRub(low)} - {formatRub(high)}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/86">
              Ориентировочный срок: {selected.days}. Включаем дефектовку, согласование работ и понятный список этапов.
            </p>
            <button
              type="button"
              onClick={onLead}
              className="mt-5 bg-white px-5 py-3 text-sm font-extrabold text-[#111318] transition hover:bg-[#f4d9de]"
            >
              Отправить расчёт
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function QualityIdeas({ onAppointment }: { onAppointment: () => void }) {
  const ideas = [
    ["Как считается цена", "Повреждение, деталь, покраска, тип транспорта — всё видно до старта."],
    ["До начала работ", "Фотофиксация, дефектовка, смета и согласование скрытых работ."],
    ["Свободные окна", "Быстрая запись на ближайшее удобное время без лишних звонков."],
    ["Коммерческий транспорт без простоя", "Приоритет сроков, понятные этапы и фотоотчёт для рабочих машин."]
  ];

  return (
    <section className="border-t border-white/10 bg-[#0b0c10] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-5 md:grid-cols-4">
          {ideas.map(([title, text]) => (
            <article key={title} className="rounded-lg border border-white/12 bg-white/[0.04] p-5">
              <h3 className="font-display text-lg font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/82">{text}</p>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={onAppointment}
          className="mt-6 bg-[#9e1f36] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
        >
          Записаться на удобное время
        </button>
      </div>
    </section>
  );
}

function formatRub(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function BrandMark({ brand }: { brand: (typeof brands)[number] }) {
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;
  const icon = brand.icon ? icons[brand.icon] : undefined;

  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={brand.name}
        className="h-9 w-9 text-current transition group-hover:scale-105"
      >
        <path fill="currentColor" d={icon.path} />
      </svg>
    );
  }

  return (
    <span className="grid h-12 min-w-16 place-items-center rounded-lg border border-white/14 px-4 text-base font-black tracking-[-0.04em] text-white transition group-hover:border-[#c43a52]/60">
      {brand.fallbackLabel ?? brand.name}
    </span>
  );
}

function FacilitySections() {
  return (
    <section className="border-t border-white/10 bg-[#08090b] px-5 py-18 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-black text-white sm:text-5xl">
            Места под реальные фотографии мощностей автотехцентра
          </h2>
          <p className="mt-5 text-base leading-7 text-white">
            Блоки подготовлены под крупные фото компании: посты, оборудование, процесс и выполненные работы.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {facilityPhotos.map((item, index) => (
            <article
              key={item.title}
              className={`group overflow-hidden rounded-lg border border-white/12 bg-white/[0.04] ${
                index === 0 || index === 2 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative min-h-[250px] overflow-hidden bg-[#14161c]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(158,31,54,0.12)_42%,rgba(255,255,255,0.02))]" />
                <div className="absolute inset-x-6 bottom-6 h-px bg-white/16" />
                <span className="absolute left-6 top-6 rounded-lg border border-white/14 bg-black/32 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  Фото компании
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/82">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
