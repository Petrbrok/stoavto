"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT, brands, services } from "@/data/site";
import { AppointmentModal } from "@/components/appointment-modal";

type BusinessTime = { hour: number; minute: number };
type MenuKey = "services" | "brands";

const OPEN_FROM: BusinessTime = { hour: 10, minute: 0 };
const OPEN_TO: BusinessTime = { hour: 21, minute: 0 };

const staticLinks = [
  { label: "Коммерческий транспорт", href: "/kommercheskiy-transport" },
  { label: "Наши работы", href: "/raboty" },
  { label: "Отзывы", href: "/#reviews" },
  { label: "Контакты", href: "/#contacts" }
];

function formatTime(hours: number, minutes: number) {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getOpenStatus(openFrom = OPEN_FROM, openTo = OPEN_TO) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openFrom.hour * 60 + openFrom.minute;
  const closeMinutes = openTo.hour * 60 + openTo.minute;
  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    label: isOpen
      ? `Открыто до ${formatTime(openTo.hour, openTo.minute)}`
      : `Откроемся в ${formatTime(openFrom.hour, openFrom.minute)}`
  };
}

function useOpenStatus(openFrom = OPEN_FROM, openTo = OPEN_TO) {
  const [status, setStatus] = useState(() => ({
    isOpen: false,
    label: `Откроемся в ${formatTime(openFrom.hour, openFrom.minute)}`
  }));
  const openFromHour = openFrom.hour;
  const openFromMinute = openFrom.minute;
  const openToHour = openTo.hour;
  const openToMinute = openTo.minute;

  useEffect(() => {
    const currentOpenFrom = { hour: openFromHour, minute: openFromMinute };
    const currentOpenTo = { hour: openToHour, minute: openToMinute };
    const tick = () => setStatus(getOpenStatus(currentOpenFrom, currentOpenTo));
    tick();
    const id = window.setInterval(tick, 60_000);

    return () => window.clearInterval(id);
  }, [openFromHour, openFromMinute, openToHour, openToMinute]);

  return status;
}

function OpenStatusBadge({
  openFrom = OPEN_FROM,
  openTo = OPEN_TO,
  className = ""
}: {
  openFrom?: BusinessTime;
  openTo?: BusinessTime;
  className?: string;
}) {
  const status = useOpenStatus(openFrom, openTo);

  return (
    <span
      className={["open-status", status.isOpen ? "is-open" : "is-closed", className].filter(Boolean).join(" ")}
      aria-label={status.label}
      title={status.label}
    >
      {status.label}
    </span>
  );
}

export function SiteHeader({ onAppointment }: { onAppointment?: () => void }) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("services");
  const [fallbackAppointmentOpen, setFallbackAppointmentOpen] = useState(false);

  const appointment = onAppointment ?? (() => setFallbackAppointmentOpen(true));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
    setOpenMenu(null);
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#08090b]/78 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] w-full max-w-none items-center gap-3 px-3 sm:px-6 lg:px-8 xl:h-[72px] xl:px-4 2xl:px-5">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMobile} aria-label="СТОАВТО">
            <Image
              src="/images/stoavto-logo-transparent.png"
              alt="СТОАВТО"
              width={1759}
              height={306}
              priority
              className="h-7 w-auto object-contain drop-shadow-[0_8px_24px_rgba(158,31,54,0.24)] sm:h-8 xl:h-9 2xl:h-10"
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 text-[12px] font-bold text-white xl:flex 2xl:gap-5 2xl:text-[13px]">
            <DropdownMenu
              label="Услуги"
              active={openMenu === "services"}
              onOpen={() => setOpenMenu("services")}
              onClose={() => setOpenMenu(null)}
              items={[
                { label: "Все услуги", href: "/uslugi" },
                ...services.map((service) => ({
                  label: service.name,
                  href: `/uslugi/${service.slug}`
                }))
              ]}
            />
            <DropdownMenu
              label="Марки"
              active={openMenu === "brands"}
              onOpen={() => setOpenMenu("brands")}
              onClose={() => setOpenMenu(null)}
              items={[
                { label: "Все марки", href: "/marki" },
                ...brands.map((brand) => ({
                  label: brand.name,
                  href: `/marki/${brand.slug}`
                }))
              ]}
            />
            {staticLinks.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
            <OpenStatusBadge />
            <div className="min-w-max text-right">
              <a href={CONTACT.phoneHref} className="block whitespace-nowrap text-[13px] font-bold text-white 2xl:text-sm">
                {CONTACT.phone}
              </a>
              <span className="text-xs text-white/78">{CONTACT.hours}</span>
            </div>
            <button
              type="button"
              onClick={appointment}
              className="min-h-11 whitespace-nowrap bg-[#9e1f36] px-3.5 py-3 text-[12px] font-extrabold text-white transition duration-300 hover:bg-[#b72b43] active:translate-y-px 2xl:px-5 2xl:text-[13px]"
            >
              Записаться на удобное время
            </button>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 xl:hidden">
            <OpenStatusBadge className="header-open-status" />
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center border border-white/20 text-white transition hover:border-[#c43a52]"
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileOpen}
            >
              <span className="relative block h-5 w-6">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition ${
                    mobileOpen ? "top-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition ${
                    mobileOpen ? "top-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Закрыть меню"
              className="fixed inset-0 z-40 bg-black/62 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.aside
              className="fixed bottom-0 right-0 top-[68px] z-50 w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0b0c10] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.58)] xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.34, ease: "easeOut" }}
            >
              <div className="grid gap-3">
                <MobileAccordion
                  label="Услуги"
                  open={mobileSection === "services"}
                  onToggle={() => setMobileSection(mobileSection === "services" ? null : "services")}
                  items={[
                    { label: "Все услуги", href: "/uslugi" },
                    ...services.map((service) => ({
                      label: service.name,
                      href: `/uslugi/${service.slug}`
                    }))
                  ]}
                  onNavigate={closeMobile}
                />
                <MobileAccordion
                  label="Марки"
                  open={mobileSection === "brands"}
                  onToggle={() => setMobileSection(mobileSection === "brands" ? null : "brands")}
                  items={[
                    { label: "Все марки", href: "/marki" },
                    ...brands.map((brand) => ({
                      label: brand.name,
                      href: `/marki/${brand.slug}`
                    }))
                  ]}
                  onNavigate={closeMobile}
                />
                {staticLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className="rounded-lg border border-white/12 bg-white/[0.04] px-4 py-4 text-base font-bold text-white transition hover:border-[#c43a52]/60"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-white/12 bg-white/[0.04] p-5">
                <a href={CONTACT.phoneHref} className="block whitespace-nowrap text-lg font-black text-white">
                  {CONTACT.phone}
                </a>
                <p className="mt-1 text-sm text-white/78">{CONTACT.hours}</p>
                <button
                  type="button"
                  onClick={() => {
                    closeMobile();
                    appointment();
                  }}
                  className="mt-5 w-full bg-[#9e1f36] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
                >
                  Записаться на удобное время
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {!onAppointment && (
        <AppointmentModal open={fallbackAppointmentOpen} onClose={() => setFallbackAppointmentOpen(false)} />
      )}
    </>
  );
}

function DropdownMenu({
  label,
  active,
  onOpen,
  onClose,
  items
}: {
  label: string;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap py-6 transition hover:text-white"
        onClick={onOpen}
        onFocus={onOpen}
        aria-expanded={active}
      >
        {label}
        <span className="text-[#c43a52]">▾</span>
      </button>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[64px] grid min-w-72 gap-1 rounded-lg border border-white/12 bg-[#101217]/96 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-4 py-3 text-sm font-bold text-white transition hover:bg-white/[0.07]"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileAccordion({
  label,
  open,
  onToggle,
  items,
  onNavigate
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: Array<{ label: string; href: string }>;
  onNavigate: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-black text-white"
        onClick={onToggle}
        aria-expanded={open}
      >
        {label}
        <span className={`text-[#c43a52] transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="overflow-hidden"
          >
            <div className="grid gap-1 border-t border-white/10 p-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="rounded-md px-3 py-3 text-sm font-bold text-white/86 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
