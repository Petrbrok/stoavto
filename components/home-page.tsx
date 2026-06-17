"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

const advantageLayouts = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-3",
  "md:col-span-3"
];

const hotspotLabelStyles = {
  body: {
    wrap: "right-2 top-1/2 -translate-y-1/2 flex-row-reverse",
    line: "h-px w-5 bg-gradient-to-l from-white/72 to-white/18"
  },
  paint: {
    wrap: "left-2 top-1/2 -translate-y-1/2",
    line: "h-px w-5 bg-gradient-to-r from-white/72 to-white/18"
  },
  diagnostics: {
    wrap: "right-2 top-1/2 -translate-y-1/2 flex-row-reverse",
    line: "h-px w-4 bg-gradient-to-l from-white/72 to-white/18"
  },
  alignment: {
    wrap: "bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse",
    line: "h-4 w-px bg-gradient-to-t from-white/72 to-white/18"
  },
  commercial: {
    wrap: "left-1/2 top-4 -translate-x-1/2 flex-col",
    line: "h-4 w-px bg-gradient-to-b from-white/72 to-white/18"
  }
} as const;

const hotspots = [
  {
    id: "body",
    label: "Кузовной ремонт",
    point: { x: 50, y:65 },
    mobilePoint: { x: 21, y: 55 },
    href: "/uslugi/kuzovnoy-remont",
    description: "Дефектовка, восстановление геометрии и подготовка кузова к окраске."
  },
  {
    id: "paint",
    label: "Покраска",
    point: { x: 72, y: 58 },
    mobilePoint: { x: 57, y: 47 },
    href: "/uslugi/pokraska-avto",
    description: "Локальная и полная окраска с подбором цвета и контролем результата."
  },
  {
    id: "diagnostics",
    label: "Диагностика",
    point: { x: 92, y: 55.5 },
    mobilePoint: { x: 85, y: 47 },
    href: "/uslugi/diagnostika",
    description: "Компьютерная проверка, осмотр систем и понятный план работ."
  },
  {
    id: "alignment",
    label: "Развал-схождение",
    point: { x: 60, y: 78 },
    mobilePoint: { x: 35.5, y: 67 },
    href: "/uslugi/razval-shozhdenie",
    description: "Контроль геометрии колес после ремонта и обслуживания."
  },
  {
    id: "commercial",
    label: "Коммерческий транспорт",
    point: { x: 71, y: 34 },
    mobilePoint: { x: 65, y: 32 },
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

  const openLead = () => setIsLeadOpen(true);
  const openAppointment = () => setIsAppointmentOpen(true);
  const scrollToCalculator = () => {
    document.getElementById("price-calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-[#f5f1f2]">
      <SiteHeader onAppointment={openAppointment} />
      <section className="noise relative overflow-hidden border-b border-white/10 bg-[#08090b] md:min-h-[100dvh]">
        <div className="absolute inset-0 hidden max-w-none md:block">
          <Image
            src="/images/hero-industrial-stoavto.png"
            alt="СТОАВТО: легковой автомобиль и микроавтобус в современном автотехцентре"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[63%_50%] md:object-center"
          />
        </div>
        <div className="hero-mask pointer-events-none absolute inset-0 z-10 hidden md:block" />
        <ServiceHotspots onCalculate={scrollToCalculator} />

        <div className="pointer-events-none relative z-20 flex px-5 pb-8 pt-28 sm:px-8 md:min-h-[100dvh] md:pb-16 lg:px-10">
          <div
            className="pointer-events-auto mx-auto flex w-full max-w-[1440px] items-start pb-4 md:items-center md:pb-0"
          >
            <div className="max-w-[620px]">
            <p className="mb-5 w-fit rounded-lg border border-white/18 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              СТОАВТО / полный цикл
            </p>
            <h1 className="font-display max-w-[620px] text-[clamp(24px,6.35vw,44px)] font-black uppercase leading-[1.04] text-white sm:text-[clamp(30px,5vw,48px)] lg:text-[clamp(38px,3.35vw,50px)]">
              Полный цикл
              <br />
              ремонта авто
              <br />
              <span className="md:whitespace-nowrap">
                и <span className="text-[#9e1f36] drop-shadow-[0_0_24px_rgba(158,31,54,0.32)]">коммерческого</span>
              </span>
              <br />
              транспорта
            </h1>
            <p className="mt-6 max-w-[600px] text-base leading-7 text-white sm:text-lg">
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
            <div className="mt-7 hidden max-w-[620px] grid-cols-1 gap-3 text-sm font-semibold text-white/92 sm:grid sm:grid-cols-2">
              {heroBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#c43a52]">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      <MobileHeroImage onCalculate={scrollToCalculator} />
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

function ServiceHotspots({ onCalculate, mode = "desktop" }: { onCalculate: () => void; mode?: "desktop" | "mobile" }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const isMobile = mode === "mobile";
  const hoverCloseTimer = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const active = isMobile ? pinned : hovered;
  const activeSpot = hotspots.find((spot) => spot.id === active);

  const clearCloseTimer = () => {
    if (hoverCloseTimer.current !== null) {
      window.clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  const closeActive = () => {
    clearCloseTimer();
    setHovered(null);
    setPinned(null);
  };

  const openSpot = (id: string) => {
    if (isMobile) {
      return;
    }

    clearCloseTimer();
    setHovered(id);
  };

  const leaveSpot = (id: string) => {
    if (isMobile) {
      return;
    }

    clearCloseTimer();
    hoverCloseTimer.current = window.setTimeout(() => {
      setHovered((current) => (current === id ? null : current));
      hoverCloseTimer.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (isMobile || !activeSpot) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (cardRef.current && target && !cardRef.current.contains(target)) {
        if (hoverCloseTimer.current !== null) {
          window.clearTimeout(hoverCloseTimer.current);
          hoverCloseTimer.current = null;
        }
        setHovered(null);
        setPinned(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [activeSpot, isMobile]);

  useEffect(() => {
    return () => {
      if (hoverCloseTimer.current !== null) {
        window.clearTimeout(hoverCloseTimer.current);
      }
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 z-30 ${isMobile ? "block" : "hidden md:block"}`}>
      {hotspots.map((spot) => {
        const isActive = active === spot.id;
        const point = isMobile ? spot.mobilePoint : spot.point;
        const labelStyle = hotspotLabelStyles[spot.id as keyof typeof hotspotLabelStyles];

        return (
          <button
            key={spot.id}
            type="button"
            className={`group pointer-events-auto absolute z-40 block h-3.5 w-3.5 !rounded-full border p-0 transition duration-300 active:scale-95 md:h-5 md:w-5 md:-translate-x-[3px] md:-translate-y-[3px] ${isActive ? "scale-110 border-white bg-white shadow-[0_0_30px_rgba(255,255,255,0.5)]" : "border-white/80 bg-[#c43a52] shadow-[0_0_20px_rgba(196,58,82,0.58)] hover:scale-110 hover:border-white hover:shadow-[0_0_28px_rgba(196,58,82,0.82)]"}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onMouseEnter={() => openSpot(spot.id)}
            onMouseLeave={() => leaveSpot(spot.id)}
            onPointerDown={(event) => {
              if (!isMobile) {
                return;
              }
              event.preventDefault();
              setPinned((current) => (current === spot.id ? null : spot.id));
            }}
            onClick={() => {
              if (!isMobile) {
                return;
              }
            }}
            onFocus={() => openSpot(spot.id)}
            onBlur={() => leaveSpot(spot.id)}
            aria-label={spot.label}
            aria-expanded={isActive}
          >
            <span className={`absolute inset-0 !rounded-full bg-[#c43a52]/25 blur-[2px] transition duration-300 md:blur-[3px] ${isActive ? "scale-[2.8] opacity-80" : "scale-[1.9] opacity-35 group-hover:opacity-65 md:scale-[2.15]"}`} />
            <span className="absolute inset-[4px] !rounded-full bg-[#9e1f36] transition duration-300 md:inset-[5px]" />
            <span className={`pointer-events-none absolute hidden items-center gap-1.5 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.16em] text-white/96 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:flex ${labelStyle.wrap}`}>
              <span className={labelStyle.line} />
              <span className="rounded-[6px] border border-white/14 bg-[#0d0e11] px-2 py-1 shadow-[0_8px_18px_rgba(0,0,0,0.28)]">
                {spot.label}
              </span>
            </span>
          </button>
        );
      })}
      <AnimatePresence>
        {activeSpot && (
          <motion.div
            key={activeSpot.id}
            ref={cardRef}
            initial={isMobile ? { opacity: 0, y: 18, scale: 0.96 } : { opacity: 0, x: 20, scale: 0.96 }}
            animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, x: 0, scale: 1 }}
            exit={isMobile ? { opacity: 0, y: 18, scale: 0.96 } : { opacity: 0, x: 20, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={
              isMobile
                ? "pointer-events-auto absolute inset-x-4 bottom-4 z-50 rounded-lg border border-white/16 bg-[#101217]/92 p-4 text-left shadow-[0_24px_80px_rgba(0,0,0,0.58)] backdrop-blur-xl"
                : "pointer-events-auto absolute bottom-14 right-10 z-40 w-[300px] rounded-lg border border-white/12 bg-[#101217]/90 p-4 text-left shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl"
            }
            onMouseEnter={() => {
              if (isMobile) {
                return;
              }
              clearCloseTimer();
            }}
            onMouseLeave={() => {
              if (isMobile) {
                return;
              }
              leaveSpot(activeSpot.id);
            }}
          >
            {isMobile && (
              <button
                type="button"
                onClick={closeActive}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/16 bg-white/[0.07] text-base font-black leading-none text-white transition hover:border-[#c43a52] hover:bg-white/[0.12]"
                aria-label="Close card"
              >
                X
              </button>
            )}
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">{"\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0440\u0430\u0431\u043e\u0442"}</p>
            <h3 className={`mt-2 font-black text-white ${isMobile ? "pr-10 text-lg" : "text-base"}`}>{activeSpot.label}</h3>
            <p className="mt-2 text-sm leading-5 text-white/82">{activeSpot.description}</p>
            <div className="mt-4 flex gap-2">
              <Link
                href={activeSpot.href}
                className="rounded-lg border border-white/16 px-3.5 py-2.5 text-xs font-bold text-white transition hover:border-[#c43a52]"
              >
                {"\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435"}
              </Link>
              <button
                type="button"
                onClick={onCalculate}
                className="bg-[#9e1f36] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#b72b43]"
              >
                {"\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044c"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileHeroImage({ onCalculate }: { onCalculate: () => void }) {
  return (
    <section className="border-b border-white/10 bg-[#08090b] px-5 pb-8 md:hidden">
      <div className="relative mx-auto aspect-[3/2] max-w-2xl overflow-hidden rounded-lg border border-white/10">
        <Image
          src="/images/hero-mobile-stoavto.png"
          alt={"\u0421\u0422\u041e\u0410\u0412\u0422\u041e: \u043b\u0435\u0433\u043a\u043e\u0432\u043e\u0439 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c \u0438 \u043c\u0438\u043a\u0440\u043e\u0430\u0432\u0442\u043e\u0431\u0443\u0441"}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="mobile-hero-photo-mask pointer-events-none absolute inset-0 z-10" />
        <ServiceHotspots mode="mobile" onCalculate={onCalculate} />
      </div>
    </section>
  );
}
function AdvantagesBar() {
  return (
    <section className="border-b border-white/10 bg-[#0b0c10] px-5 py-6 sm:px-8 md:py-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 md:auto-rows-[112px] md:grid-cols-6">
        {advantages.map((item, index) => (
          <div
            key={item}
            className={`advantage-card group relative overflow-hidden rounded-lg border border-white/12 bg-white/[0.045] p-5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-[#c43a52]/70 hover:bg-white/[0.07] ${advantageLayouts[index]}`}
          >
            <span className="text-[11px] font-black text-[#c43a52]">{String(index + 1).padStart(2, "0")}</span>
            <div className="mt-4 max-w-[19rem] text-[17px] leading-6 md:text-base lg:text-lg">
              {item}
            </div>
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
