"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import * as simpleIcons from "simple-icons";
import { brands, facilityPhotos } from "@/data/site";
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
    x: "63%",
    y: "64%",
    href: "/uslugi/kuzovnoy-remont",
    description: "Дефектовка, восстановление геометрии и подготовка кузова к окраске."
  },
  {
    id: "paint",
    label: "Покраска",
    x: "72%",
    y: "54%",
    href: "/uslugi/pokraska-avto",
    description: "Локальная и полная окраска с подбором цвета и контролем результата."
  },
  {
    id: "detail",
    label: "Детейлинг",
    x: "80%",
    y: "67%",
    href: "/uslugi/deteyling",
    description: "Полировка, защита кузова и подготовка автомобиля к выдаче."
  },
  {
    id: "diagnostics",
    label: "Диагностика",
    x: "85%",
    y: "58%",
    href: "/uslugi/diagnostika",
    description: "Компьютерная проверка, осмотр систем и понятный план работ.",
    align: "right"
  },
  {
    id: "alignment",
    label: "Развал-схождение",
    x: "67%",
    y: "77%",
    href: "/uslugi/razval-shozhdenie",
    description: "Контроль геометрии колес после ремонта и обслуживания."
  },
  {
    id: "commercial",
    label: "Коммерческий транспорт",
    x: "87%",
    y: "43%",
    href: "/kommercheskiy-transport",
    description: "Отдельное направление для микроавтобусов, фургонов и рабочих авто.",
    align: "right"
  }
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

  const openLead = () => setIsLeadOpen(true);

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-[#f5f1f2]">
      <SiteHeader onLead={openLead} />
      <section className="noise relative overflow-hidden border-b border-white/10 bg-[#08090b] md:min-h-[100dvh]">
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/hero-stoavto.png"
            alt="Современный автотехцентр СТОАВТО с легковым автомобилем и микроавтобусом"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="hero-mask pointer-events-none absolute inset-0" />
          <ServiceHotspots onLead={openLead} />
        </div>

        <div className="pointer-events-none relative z-10 mx-auto flex max-w-[1440px] items-end px-5 pb-10 pt-28 sm:px-8 md:min-h-[100dvh] md:items-center md:pb-16 lg:px-10">
          <motion.div {...fadeUp} className="pointer-events-auto max-w-[920px] pb-6 md:pb-0">
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
              <ActionButton onClick={openLead} tone="primary">
                Рассчитать стоимость
              </ActionButton>
              <ActionButton onClick={openLead} tone="secondary">
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

      <MobileHeroImage />
      <AdvantagesBar />
      <BrandLogos />
      <FacilitySections />
      <LeadFormModal open={isLeadOpen} onClose={() => setIsLeadOpen(false)} />
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

function ServiceHotspots({ onLead }: { onLead: () => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = pinned ?? hovered;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
      {hotspots.map((spot, index) => {
        const isActive = active === spot.id;
        const alignRight = spot.align === "right";

        return (
          <motion.div
            key={spot.id}
            className="pointer-events-auto absolute"
            style={{ left: spot.x, top: spot.y }}
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + index * 0.08, duration: 0.5 }}
            onMouseEnter={() => setHovered(spot.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <button
              type="button"
              className="relative block h-5 w-5"
              onClick={() => setPinned(pinned === spot.id ? null : spot.id)}
              onFocus={() => setHovered(spot.id)}
              aria-label={spot.label}
              aria-expanded={isActive}
            >
              <span className="absolute inset-0 animate-ping bg-[#c43a52]/40" />
              <span className="absolute inset-0 border border-white/70 bg-[#c43a52] shadow-[0_0_35px_rgba(196,58,82,0.72)] transition group-hover:scale-110" />
            </button>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                  className={`absolute top-[-18px] w-72 border border-white/12 bg-[#101217]/92 p-4 text-left shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl ${
                    alignRight ? "right-7" : "left-7"
                  }`}
                >
                  <h3 className="text-sm font-black text-white">{spot.label}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/58">{spot.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={spot.href}
                      className="border border-white/12 px-3 py-2 text-xs font-bold text-white/74 transition hover:border-[#c43a52] hover:text-white"
                    >
                      Подробнее
                    </Link>
                    <button
                      type="button"
                      onClick={onLead}
                      className="bg-[#9e1f36] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#b72b43]"
                    >
                      Рассчитать
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function MobileHeroImage() {
  return (
    <section className="border-b border-white/10 bg-[#08090b] px-5 pb-8 md:hidden">
      <div className="relative mx-auto aspect-[3/2] max-w-2xl overflow-hidden border border-white/10">
        <Image
          src="/images/hero-stoavto.png"
          alt="Легковой автомобиль и микроавтобус в автотехцентре СТОАВТО"
          fill
          sizes="100vw"
          className="object-cover object-[68%_50%]"
        />
      </div>
    </section>
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
            <Link
              key={brand.slug}
              href={`/marki/${brand.slug}`}
              className="group flex h-28 flex-col items-center justify-center gap-3 border-b border-r border-white/10 bg-white/[0.018] px-4 text-center text-white/68 transition hover:bg-white/[0.045] hover:text-white"
            >
              <BrandMark brand={brand} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/42 transition group-hover:text-white/70">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
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
    <span className="grid h-12 min-w-16 place-items-center border border-white/14 px-4 text-base font-black tracking-[-0.04em] text-white/82 transition group-hover:border-[#c43a52]/60 group-hover:text-white">
      {brand.fallbackLabel ?? brand.name}
    </span>
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
