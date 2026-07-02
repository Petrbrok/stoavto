"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as simpleIcons from "simple-icons";
import { brands } from "@/data/site";
import { AppointmentModal } from "@/components/appointment-modal";
import { LeadFormModal } from "@/components/lead-form-modal";
import { SiteHeader } from "@/components/site-header";
import type { CalculatorContent, ImageTextItem, ReviewContent, SiteContent } from "@/types/site-content";

type SimpleIcon = {
  title: string;
  path: string;
};

const advantageLayouts = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-2",
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
    point: { x: 50, y: 65 },
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

export function ManagedHomePage({ content }: { content: SiteContent }) {
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const openAppointment = () => setIsAppointmentOpen(true);
  const scrollToCalculator = () => {
    document.getElementById("price-calculator")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-[#f5f1f2]">
      <SiteHeader onAppointment={openAppointment} contact={content.contact} />
      <Hero content={content} onCalculate={scrollToCalculator} onAppointment={openAppointment} />
      <InsurancePartnersStrip title={content.insurance.title} partners={content.insurance.partners} />
      <AdvantagesBar advantages={content.advantages} />
      <BrandLogos />
      <PriceCalculator calculator={content.calculator} onLead={() => setIsLeadOpen(true)} />
      <QualityIdeas ideas={content.ideas} onAppointment={openAppointment} />
      <ReviewsSection title={content.reviews.title} subtitle={content.reviews.subtitle} reviews={content.reviews.items} />
      <FacilitySections photos={content.facilityPhotos} />
      <SiteFooter content={content} onAppointment={openAppointment} />
      <LeadFormModal open={isLeadOpen} onClose={() => setIsLeadOpen(false)} />
      <AppointmentModal open={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </main>
  );
}

function Hero({
  content,
  onCalculate,
  onAppointment
}: {
  content: SiteContent;
  onCalculate: () => void;
  onAppointment: () => void;
}) {
  return (
    <>
      <section className="noise relative overflow-hidden border-b border-white/10 bg-[#101217] md:min-h-[700px] xl:min-h-[760px]">
        <div className="absolute inset-0 hidden max-w-none md:block">
          <Image
            src="/images/hero-stoavto-new.png"
            alt="СТОАВТО: легковой автомобиль и микроавтобус в современном автотехцентре"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[52%_48%]"
          />
        </div>
        <div className="hero-mask pointer-events-none absolute inset-0 z-10 hidden md:block" />
        <ServiceHotspots onCalculate={onCalculate} />
        <div className="pointer-events-none relative z-20 flex px-5 pb-8 pt-24 sm:px-8 md:min-h-[700px] md:pb-12 lg:px-10 xl:min-h-[760px]">
          <div className="pointer-events-auto mx-auto flex w-full max-w-[1440px] items-start pb-4 md:items-center md:pb-0">
            <div className="max-w-[620px]">
              <p className="mb-5 w-fit rounded-lg border border-white/18 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                {content.home.eyebrow}
              </p>
              <h1 className="font-display max-w-[640px] text-[clamp(24px,6.35vw,44px)] font-black uppercase leading-[1.04] text-white sm:text-[clamp(30px,5vw,48px)] lg:text-[clamp(38px,3.35vw,50px)]">
                {content.home.titleLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line.includes(content.home.accent) ? (
                      <span className="md:whitespace-nowrap">
                        {line.replace(content.home.accent, "")}
                        <span className="text-[#9e1f36] drop-shadow-[0_0_24px_rgba(158,31,54,0.32)]">{content.home.accent}</span>
                      </span>
                    ) : (
                      line
                    )}
                    {index < content.home.titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-[600px] text-base leading-7 text-white sm:text-lg">{content.home.text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ActionButton onClick={onCalculate} tone="primary">{content.home.primaryButton}</ActionButton>
                <ActionButton onClick={onAppointment} tone="secondary">{content.home.secondaryButton}</ActionButton>
              </div>
              <div className="mt-7 hidden max-w-[620px] grid-cols-1 gap-3 text-sm font-semibold text-white/92 sm:grid sm:grid-cols-2">
                {content.home.heroBenefits.map((benefit) => (
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
      <section className="border-b border-white/10 bg-[#08090b] px-5 pb-8 md:hidden">
        <div className="relative mx-auto aspect-[3/2] max-w-2xl overflow-hidden rounded-lg border border-white/10">
          <Image src={content.home.mobileHeroImage} alt="СТОАВТО" fill sizes="100vw" className="object-cover object-center" />
          <div className="mobile-hero-photo-mask pointer-events-none absolute inset-0 z-10" />
          <ServiceHotspots mode="mobile" onCalculate={onCalculate} />
        </div>
      </section>
    </>
  );
}

function ServiceHotspots({ onCalculate, mode = "desktop" }: { onCalculate: () => void; mode?: "desktop" | "mobile" }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [visibleSpot, setVisibleSpot] = useState<(typeof hotspots)[number] | null>(null);
  const isMobile = mode === "mobile";
  const hoverCloseTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const active = isMobile ? pinned : hovered;
  const activeSpot = hotspots.find((spot) => spot.id === active);

  const clearCloseTimer = () => {
    if (hoverCloseTimer.current !== null) {
      window.clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const closeActive = () => {
    clearCloseTimer();
    setHovered(null);
    setPinned(null);
  };

  const openSpot = (id: string) => {
    if (isMobile) return;
    clearCloseTimer();
    setHovered(id);
  };

  const leaveSpot = (id: string) => {
    if (isMobile) return;
    clearCloseTimer();
    hoverCloseTimer.current = window.setTimeout(() => {
      setHovered((current) => (current === id ? null : current));
      hoverCloseTimer.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (activeSpot) {
      clearCloseTimer();
      setVisibleSpot(activeSpot);
      return;
    }

    hideTimer.current = window.setTimeout(() => {
      setVisibleSpot(null);
      hideTimer.current = null;
    }, 180);
  }, [activeSpot]);

  useEffect(() => {
    if (isMobile || !activeSpot) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (cardRef.current && target && !cardRef.current.contains(target)) {
        clearCloseTimer();
        setHovered(null);
        setPinned(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [activeSpot, isMobile]);

  useEffect(() => {
    return () => clearCloseTimer();
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
              if (!isMobile) return;
              event.preventDefault();
              setPinned((current) => (current === spot.id ? null : spot.id));
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
              <span className="rounded-[6px] border border-white/14 bg-[#0d0e11] px-2 py-1 shadow-[0_8px_18px_rgba(0,0,0,0.28)]">{spot.label}</span>
            </span>
          </button>
        );
      })}
      {visibleSpot && (
        <div
          ref={cardRef}
          className={`${isMobile ? "absolute inset-x-4 bottom-4 z-50 rounded-lg border border-white/16 bg-[#101217]/92 p-4 text-left shadow-[0_24px_80px_rgba(0,0,0,0.58)] backdrop-blur-xl" : "absolute bottom-24 right-10 z-40 w-[300px] rounded-lg border border-white/12 bg-[#101217]/90 p-4 text-left shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl"} pointer-events-auto transition-[opacity,transform] duration-300 ease-out ${activeSpot ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}
          onMouseEnter={() => !isMobile && clearCloseTimer()}
          onMouseLeave={() => !isMobile && leaveSpot(visibleSpot.id)}
        >
          {isMobile && (
            <button type="button" onClick={closeActive} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/16 bg-white/[0.07] text-base font-black leading-none text-white transition hover:border-[#c43a52] hover:bg-white/[0.12]" aria-label="Закрыть">
              X
            </button>
          )}
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">Направление работ</p>
          <h3 className={`mt-2 font-black text-white ${isMobile ? "pr-10 text-lg" : "text-base"}`}>{visibleSpot.label}</h3>
          <p className="mt-2 text-sm leading-5 text-white/82">{visibleSpot.description}</p>
          <div className="mt-4 flex gap-2">
            <Link href={visibleSpot.href} className="rounded-lg border border-white/16 px-3.5 py-2.5 text-xs font-bold text-white transition hover:border-[#c43a52]">Подробнее</Link>
            <button type="button" onClick={onCalculate} className="bg-[#9e1f36] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#b72b43]">Рассчитать</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({ children, onClick, tone }: { children: React.ReactNode; onClick: () => void; tone: "primary" | "secondary" }) {
  const classes = {
    primary: "bg-[#9e1f36] text-white shadow-[0_22px_70px_rgba(158,31,54,0.38)] hover:bg-[#b72b43]",
    secondary: "border border-white/22 bg-white/6 text-white shadow-[0_18px_54px_rgba(255,255,255,0.06)] hover:border-white/40 hover:bg-white/10"
  };

  return (
    <button type="button" onClick={onClick} className={`${classes[tone]} min-h-12 whitespace-nowrap px-6 py-3 text-sm font-extrabold transition duration-300 active:translate-y-px`}>
      {children}
    </button>
  );
}

function InsurancePartnersStrip({ title, partners }: { title: string; partners: SiteContent["insurance"]["partners"] }) {
  const visiblePartners = partners.filter((partner) => partner.visible);
  const marqueeItems = Array.from({ length: 8 }, () => visiblePartners).flat();

  return (
    <section className="border-b border-white/10 bg-[#101217] px-5 py-5 sm:px-8 lg:px-10">
      <h2 className="font-display mb-4 text-left text-xl font-black text-white sm:text-2xl">{title}</h2>
      <div className="partner-marquee overflow-hidden rounded-lg border border-[#5a1a28]/55 bg-[#07080b]">
        <div className="partner-marquee-track flex w-max items-center gap-4 py-4">
          {marqueeItems.map((partner, index) => (
            <a key={`${partner.name}-${index}`} href={partner.url} target="_blank" rel="noreferrer" className="partner-card relative flex h-20 min-w-64 items-center justify-center rounded-lg px-6">
              {partner.logo ? (
                <Image src={partner.logo} alt={partner.name} width={210} height={64} className="partner-logo max-h-12 w-auto max-w-[210px] object-contain" />
              ) : (
                <span className="text-sm font-black uppercase tracking-[0.18em] text-white/64">{partner.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantagesBar({ advantages }: { advantages: string[] }) {
  return (
    <section className="border-b border-white/10 bg-[#0b0c10] px-5 py-6 sm:px-8 md:py-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 md:auto-rows-[112px] md:grid-cols-6">
        {advantages.map((item, index) => (
          <div key={item} className={`advantage-card group relative overflow-hidden rounded-lg border border-white/12 bg-white/[0.045] p-5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-[#c43a52]/70 hover:bg-white/[0.07] ${advantageLayouts[index] ?? "md:col-span-3"}`}>
            <span className="text-[11px] font-black text-[#c43a52]">{String(index + 1).padStart(2, "0")}</span>
            <div className="mt-4 max-w-[19rem] text-[17px] leading-6 md:text-base lg:text-lg">{item}</div>
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
        <h2 className="font-display max-w-2xl text-3xl font-black text-white sm:text-5xl">Обслуживаем популярные марки</h2>
        <div className="mt-9 grid overflow-hidden rounded-lg border border-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/marki/${brand.slug}`} className="group flex h-28 flex-col items-center justify-center gap-3 border-b border-r border-white/10 bg-white/[0.035] px-4 text-center text-white transition hover:bg-white/[0.065]">
              <BrandMark brand={brand} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/82 transition group-hover:text-white">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCalculator({ calculator, onLead }: { calculator: CalculatorContent; onLead: () => void }) {
  const visibleServices = calculator.services.filter((item) => item.visible);
  const visibleToggles = calculator.toggles.filter((item) => item.visible);
  const [transport, setTransport] = useState(calculator.transports[0]?.value ?? "car");
  const [service, setService] = useState(visibleServices[0]?.value ?? "");
  const [size, setSize] = useState(calculator.sizes[1]?.value ?? calculator.sizes[0]?.value ?? "medium");
  const [toggleState, setToggleState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(visibleToggles.map((toggle) => [toggle.value, toggle.defaultChecked]))
  );

  const selected = visibleServices.find((item) => item.value === service) ?? visibleServices[0];
  const transportFactor = calculator.transports.find((item) => item.value === transport)?.factor ?? 1;
  const sizeFactor = calculator.sizes.find((item) => item.value === size)?.factor ?? 1;
  const urgentFactor = toggleState.urgent ? 1.18 : 1;
  const toggleAdd = visibleToggles.reduce((sum, toggle) => sum + (toggleState[toggle.value] ? toggle.amount : 0), 0);
  const low = Math.max(1000, Math.round(((selected?.base ?? 1000) * transportFactor * sizeFactor * urgentFactor + toggleAdd) / 100) * 100);
  const high = Math.round(((selected?.max ?? 5000) * transportFactor * sizeFactor * urgentFactor + Math.max(toggleAdd, 0)) / 100) * 100;

  return (
    <section id="price-calculator" className="scroll-mt-28 border-t border-white/10 bg-[#08090b] px-5 py-18 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="w-fit rounded-lg border border-white/18 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">{calculator.eyebrow}</p>
          <h2 className="font-display mt-5 max-w-2xl text-3xl font-black text-white sm:text-5xl">{calculator.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white">{calculator.text}</p>
          <div className="mt-8 max-w-[560px]">
            <Image src="/images/stoavto-logo-transparent.png" alt="СТОАВТО" width={1759} height={306} sizes="(min-width: 1024px) 420px, 88vw" className="h-auto w-full object-contain drop-shadow-[0_18px_48px_rgba(158,31,54,0.34)]" />
          </div>
        </div>
        <div className="rounded-lg border border-white/12 bg-white/[0.04] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField label="Тип транспорта" value={transport} onChange={setTransport} options={calculator.transports} />
            <SelectField label="Услуга" value={service} onChange={setService} options={visibleServices} />
            <SelectField label="Объём работ" value={size} onChange={setSize} options={calculator.sizes} />
            <div className="grid gap-3 rounded-lg border border-white/12 bg-black/20 p-4">
              {visibleToggles.map((toggle) => (
                <label key={toggle.value} className="flex items-center justify-between gap-4 text-sm font-bold text-white">
                  {toggle.label}
                  <input type="checkbox" checked={Boolean(toggleState[toggle.value])} onChange={(event) => setToggleState((current) => ({ ...current, [toggle.value]: event.target.checked }))} />
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-[#c43a52]/45 bg-[#9e1f36]/14 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/82">{calculator.resultLabel}</p>
            <p className="font-display mt-2 text-4xl font-black text-white">{formatRub(low)} - {formatRub(high)}</p>
            <p className="mt-3 text-sm leading-6 text-white/86">Ориентировочный срок: {selected?.days}. {calculator.resultNote}</p>
            <button type="button" onClick={onLead} className="mt-5 bg-white px-5 py-3 text-sm font-extrabold text-[#111318] transition hover:bg-[#f4d9de]">
              {calculator.submitLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ label: string; value: string }> }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="border border-white/16 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]">
        {options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
    </label>
  );
}

function QualityIdeas({ ideas, onAppointment }: { ideas: ImageTextItem[]; onAppointment: () => void }) {
  return (
    <section className="border-t border-white/10 bg-[#0b0c10] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-5 md:grid-cols-4">
          {ideas.filter((idea) => idea.visible !== false).map((idea) => (
            <article key={idea.title} className="rounded-lg border border-white/12 bg-white/[0.04] p-5">
              <h3 className="font-display text-lg font-black text-white">{idea.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/82">{idea.caption}</p>
            </article>
          ))}
        </div>
        <button type="button" onClick={onAppointment} className="mt-6 bg-[#9e1f36] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#b72b43]">Записаться на удобное время</button>
      </div>
    </section>
  );
}

function ReviewsSection({ title, subtitle, reviews }: { title: string; subtitle: string; reviews: ReviewContent[] }) {
  const visibleReviews = reviews.filter((review) => review.visible);
  if (!visibleReviews.length) return null;

  return (
    <section id="reviews" className="border-t border-white/10 bg-[#101217] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="font-display text-3xl font-black text-white sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">{subtitle}</p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {visibleReviews.map((review) => (
            <article key={`${review.name}-${review.car}`} className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]">
              <div className="relative aspect-[4/3] bg-[#14161c]">
                {review.photo ? (
                  <Image src={review.photo} alt={review.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(158,31,54,0.16)_42%,rgba(255,255,255,0.02))]" />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-black text-white">{review.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#c43a52]">{review.car}</p>
                <p className="mt-4 text-sm leading-6 text-white/82">{review.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilitySections({ photos }: { photos: ImageTextItem[] }) {
  return (
    <section className="border-t border-white/10 bg-[#08090b] px-5 py-18 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-black text-white sm:text-5xl">Места под реальные фотографии мощностей автотехцентра</h2>
          <p className="mt-5 text-base leading-7 text-white">Оборудование, процесс и выполненные работы.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {photos.filter((item) => item.visible !== false).map((item, index) => (
            <article key={`${item.title}-${index}`} className={`group overflow-hidden rounded-lg border border-white/12 bg-white/[0.04] ${index === 0 || index === 2 ? "md:col-span-2" : ""}`}>
              <div className="relative min-h-[250px] overflow-hidden bg-[#14161c]">
                {item.image ? <Image src={item.image} alt={item.title} fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover" /> : <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(158,31,54,0.12)_42%,rgba(255,255,255,0.02))]" />}
                <span className="absolute left-6 top-6 rounded-lg border border-white/14 bg-black/32 px-3 py-1 text-xs font-bold text-white backdrop-blur">Фото компании</span>
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

function SiteFooter({ content, onAppointment }: { content: SiteContent; onAppointment: () => void }) {
  return (
    <footer id="contacts" className="border-t border-white/10 bg-[#050607] px-5 py-10 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <Image src="/images/stoavto-logo-transparent.png" alt="СТОАВТО" width={1759} height={306} className="h-auto w-56 object-contain" />
          <p className="mt-5 max-w-md text-sm leading-6 text-white/68">{content.footer.text}</p>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-white/82">{content.footer.servicesTitle}</h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/66">
            {content.footer.services.filter((item) => item.visible).map((item) => (
              <li key={item.href}><Link href={item.href} className="transition hover:text-white">{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-white/82">{content.footer.contactsTitle}</h2>
          <a href={content.contact.phoneHref} className="mt-4 block text-xl font-black text-white">{content.contact.phone}</a>
          <p className="mt-2 text-sm text-white/66">{content.contact.hours}</p>
          <button type="button" onClick={onAppointment} className="mt-5 bg-[#9e1f36] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#b72b43]">{content.footer.appointmentLabel}</button>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1440px] flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
        <span>{content.footer.copyright}</span>
        <span className="flex items-center gap-3">
          {content.footer.bottomText}
          <Link href="/admin" className="rounded border border-white/10 px-2 py-1 text-[11px] font-bold text-white/40 transition hover:border-[#c43a52]/60 hover:text-white/80">
            Админ
          </Link>
        </span>
      </div>
    </footer>
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
      <svg viewBox="0 0 24 24" role="img" aria-label={brand.name} className="h-9 w-9 text-current transition group-hover:scale-105">
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
