"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FormEvent, type MouseEvent, useEffect, useState } from "react";
import { CONTACT, brands, services } from "@/data/site";
import { AppointmentModal } from "@/components/appointment-modal";
import type { SiteContent } from "@/types/site-content";

type BusinessTime = { hour: number; minute: number };
type MenuKey = "services" | "brands";
type ThemeMode = "light" | "dark";

const OPEN_FROM: BusinessTime = { hour: 10, minute: 0 };
const OPEN_TO: BusinessTime = { hour: 21, minute: 0 };

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
      <span className="open-status-icon" aria-hidden="true" />
      {status.label}
    </span>
  );
}

export function SiteHeader({ onAppointment, content }: { onAppointment?: () => void; content?: Pick<SiteContent, "contact" | "header" | "interface" | "pages"> }) {
  const contact: SiteContent["contact"] = content?.contact ?? { ...CONTACT, phones: [{ label: CONTACT.phone, href: CONTACT.phoneHref, visible: true }] };
  const header = content?.header ?? {
    servicesLabel: "Услуги", allServicesLabel: "Все услуги", brandsLabel: "Марки", allBrandsLabel: "Все марки",
    commercialLabel: "Коммерческий транспорт", worksLabel: "Наши работы", reviewsLabel: "Отзывы", contactsLabel: "Контакты", appointmentLabel: "Записаться на удобное время"
  };
  const staticLinks = [
    { label: header.commercialLabel, href: "/kommercheskiy-transport" },
    { label: header.worksLabel, href: "/raboty" },
    { label: header.reviewsLabel, href: "/#reviews" },
    { label: header.contactsLabel, href: "/#contacts" }
  ];
  const serviceItems = content?.pages.services.items ?? services.map((service) => ({ ...service, visible: true }));
  const brandItems = content?.pages.brands.items ?? brands.map((brand) => ({ ...brand, visible: true }));
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("services");
  const [fallbackAppointmentOpen, setFallbackAppointmentOpen] = useState(false);
  const [bookingChoiceOpen, setBookingChoiceOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  const appointment = onAppointment ?? (() => setFallbackAppointmentOpen(true));
  const headerPhones = (contact.phones?.length
    ? contact.phones
    : [{ label: contact.phone, href: contact.phoneHref, visible: true }]
  ).filter((phone) => phone.visible !== false && phone.label.trim() && phone.label.trim() !== "+7");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-theme") as ThemeMode | null;
    const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const nextTheme = saved === "light" || saved === "dark" ? saved : systemLight ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    const timer = window.setTimeout(() => setThemeMode(nextTheme), 0);
    return () => window.clearTimeout(timer);
  }, []);

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

  function toggleTheme() {
    const nextTheme: ThemeMode = themeMode === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("site-theme", nextTheme);
    setThemeMode(nextTheme);
  }

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    closeMobile();
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    if (window.scrollY <= 8) {
      window.location.reload();
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#08090b]/78 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] w-full max-w-none items-center gap-3 px-3 sm:px-6 lg:px-8 xl:h-[72px] xl:px-4 2xl:px-5">
          <Link href="/" className="flex shrink-0 items-center" onClick={handleLogoClick} aria-label="СТОАВТО">
            <Image src="/images/stoavto-logo-transparent.png" alt="СТОАВТО" width={1759} height={306} priority className="site-logo site-logo-dark h-7 w-auto object-contain drop-shadow-[0_8px_24px_rgba(158,31,54,0.24)] sm:h-8 xl:h-9 2xl:h-10" />
            <Image src="/images/stoavto-logo-light.png" alt="СТОАВТО" width={1759} height={306} priority className="site-logo site-logo-light hidden h-7 w-auto object-contain drop-shadow-[0_8px_24px_rgba(158,31,54,0.16)] sm:h-8 xl:h-9 2xl:h-10" />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 text-[12px] font-bold text-white xl:flex 2xl:gap-5 2xl:text-[13px]">
            <DropdownMenu
              label={header.servicesLabel}
              active={openMenu === "services"}
              onOpen={() => setOpenMenu("services")}
              onClose={() => setOpenMenu(null)}
              items={[
                { label: header.allServicesLabel, href: "/uslugi" },
                ...serviceItems.filter((service) => service.visible).map((service) => ({
                  label: service.name,
                  href: `/uslugi/${service.slug}`
                }))
              ]}
            />
            <DropdownMenu
              label={header.brandsLabel}
              active={openMenu === "brands"}
              onOpen={() => setOpenMenu("brands")}
              onClose={() => setOpenMenu(null)}
              items={[
                { label: header.allBrandsLabel, href: "/marki" },
                ...brandItems.filter((brand) => brand.visible).map((brand) => ({
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
            <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={themeMode === "light" ? "Включить темную тему" : "Включить светлую тему"} title={themeMode === "light" ? "Темная тема" : "Светлая тема"}>
              <span className="theme-toggle-glyph" aria-hidden="true">{themeMode === "light" ? "☾" : "☀︎"}</span>
            </button>
            <div className="grid min-w-max gap-0.5 text-right">
              {headerPhones.map((phone) => (
                <a key={`${phone.href}-${phone.label}`} href={phone.href} className="block whitespace-nowrap text-[12px] font-bold text-white 2xl:text-sm">
                  {phone.label}
                </a>
              ))}
              <span className="text-xs text-white/78">{contact.hours}</span>
            </div>
            <button
              type="button"
              onClick={() => setBookingChoiceOpen(true)}
              className="min-h-11 whitespace-nowrap bg-[#9e1f36] px-3.5 py-3 text-[12px] font-extrabold text-white transition duration-300 hover:bg-[#b72b43] active:translate-y-px 2xl:px-5 2xl:text-[13px]"
            >
              {header.appointmentLabel}
            </button>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 xl:hidden">
            <OpenStatusBadge className="header-open-status" />
            <button type="button" onClick={toggleTheme} className="theme-toggle mobile-header-theme-toggle h-11 w-11" aria-label={themeMode === "light" ? "Включить темную тему" : "Включить светлую тему"}>
              <span className="theme-toggle-glyph" aria-hidden="true">{themeMode === "light" ? "☾" : "☀︎"}</span>
            </button>
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
              className="fixed bottom-0 right-0 top-[68px] z-50 w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0b0c10] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.58)] xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.34, ease: "easeOut" }}
            >
              <div className="mb-3 rounded-lg border border-white/12 bg-white/[0.04] p-4">
                <div className="grid gap-1">
                  {headerPhones.map((phone) => (
                    <a key={`${phone.href}-${phone.label}`} href={phone.href} className="block whitespace-nowrap text-lg font-black text-white">
                      {phone.label}
                    </a>
                  ))}
                </div>
                <p className="mt-1 text-sm text-white/78">{contact.hours}</p>
                <button
                  type="button"
                  onClick={() => {
                    closeMobile();
                    setBookingChoiceOpen(true);
                  }}
                  className="mt-3 w-full bg-[#9e1f36] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
                >
                  {header.appointmentLabel}
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="mobile-theme-button mt-2 flex w-full items-center justify-between rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-left text-sm font-bold text-white transition hover:border-[#c43a52]/60"
                >
                  <span>{themeMode === "light" ? "Включить темную тему" : "Включить светлую тему"}</span>
                  <span className="theme-toggle-glyph" aria-hidden="true">{themeMode === "light" ? "☾" : "☀︎"}</span>
                </button>
              </div>

              <div className="grid gap-2">
                <MobileAccordion
                  label={header.servicesLabel}
                  open={mobileSection === "services"}
                  onToggle={() => setMobileSection(mobileSection === "services" ? null : "services")}
                  items={[
                    { label: header.allServicesLabel, href: "/uslugi" },
                    ...serviceItems.filter((service) => service.visible).map((service) => ({
                      label: service.name,
                      href: `/uslugi/${service.slug}`
                    }))
                  ]}
                  onNavigate={closeMobile}
                />
                <MobileAccordion
                  label={header.brandsLabel}
                  open={mobileSection === "brands"}
                  onToggle={() => setMobileSection(mobileSection === "brands" ? null : "brands")}
                  items={[
                    { label: header.allBrandsLabel, href: "/marki" },
                    ...brandItems.filter((brand) => brand.visible).map((brand) => ({
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
                    className="rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white transition hover:border-[#c43a52]/60"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <BookingChoiceModal
        open={bookingChoiceOpen}
        onClose={() => setBookingChoiceOpen(false)}
        onAppointment={() => {
          setBookingChoiceOpen(false);
          appointment();
        }}
        onCallback={() => {
          setBookingChoiceOpen(false);
          setCallbackOpen(true);
        }}
        copy={content?.interface}
      />
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} copy={content?.interface} />

      {!onAppointment && (
        <AppointmentModal open={fallbackAppointmentOpen} onClose={() => setFallbackAppointmentOpen(false)} copy={content?.interface} />
      )}
    </>
  );
}

function BookingChoiceModal({
  open,
  onClose,
  onAppointment,
  onCallback,
  copy
}: {
  open: boolean;
  onClose: () => void;
  onAppointment: () => void;
  onCallback: () => void;
  copy?: SiteContent["interface"];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop fixed inset-0 z-[90] grid place-items-end bg-black/72 p-2 backdrop-blur-sm backdrop-saturate-[0.92] sm:place-items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="glass-modal-panel w-full max-w-xl border border-white/12 bg-[#101217] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.58)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">
                  {copy?.bookingChoiceEyebrow ?? "Онлайн-консультация"}
                </p>
                <h2 className="mt-2 text-2xl font-black leading-tight text-white">{copy?.bookingChoiceTitle ?? "Что удобнее?"}</h2>
                <p className="mt-2 text-sm leading-6 text-white/64">
                  {copy?.bookingChoiceText ?? "Можно выбрать точную дату и время или оставить контакты для обратного звонка."}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center border border-white/12 text-white/70 transition hover:text-white"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onAppointment}
                className="booking-choice booking-choice-primary rounded-lg border border-[#c43a52]/50 bg-[#9e1f36] px-5 py-4 text-left text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
              >
                {copy?.appointmentSubmitLabel ?? "Записаться на удобное время"}
                <span className="booking-choice-hint mt-2 block text-xs font-semibold leading-5 text-white/72">{copy?.appointmentHint ?? "Дата и время в форме записи."}</span>
              </button>
              <button
                type="button"
                onClick={onCallback}
                className="booking-choice booking-choice-secondary rounded-lg border border-white/14 bg-white/[0.05] px-5 py-4 text-left text-sm font-extrabold text-white transition hover:border-[#c43a52]/60 hover:bg-white/[0.08]"
              >
                {copy?.callbackLabel ?? "Получить обратный звонок"}
                <span className="booking-choice-hint mt-2 block text-xs font-semibold leading-5 text-white/72">{copy?.callbackHint ?? "Только имя и телефон."}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CallbackModal({ open, onClose, copy }: { open: boolean; onClose: () => void; copy?: SiteContent["interface"] }) {
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
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="glass-modal-panel w-full max-w-xl border border-white/12 bg-[#101217] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.58)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">
                  Обратный звонок
                </p>
                <h2 className="mt-2 text-2xl font-black leading-tight text-white">{copy?.callbackTitle ?? "Получить онлайн-консультацию"}</h2>
                <p className="mt-2 text-sm leading-6 text-white/64">
                  {copy?.callbackText ?? "Оставьте имя и номер. Менеджер перезвонит и подскажет по ремонту."}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center border border-white/12 text-white/70 transition hover:text-white"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            {sent ? (
              <div className="mt-6 rounded-lg border border-[#c43a52]/35 bg-[#9e1f36]/12 p-5">
                <p className="text-lg font-black text-white">{copy?.callbackSuccessTitle ?? "Заявка на звонок отправлена."}</p>
                <p className="mt-2 text-sm leading-6 text-white/64">{copy?.callbackSuccessText ?? "Мы свяжемся с вами в рабочее время."}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <label className="grid gap-2 text-sm font-bold text-white/80">
                  {copy?.nameLabel ?? "Имя"}
                  <input
                    name="name"
                    placeholder={copy?.namePlaceholder ?? "Ваше имя"}
                    className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52]"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-white/80">
                  {copy?.phoneLabel ?? "Телефон"}
                  <input
                    name="phone"
                    placeholder="+7"
                    className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52]"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-[#9e1f36] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
                >
                  {copy?.callbackSubmitLabel ?? "Заказать обратный звонок"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
        className="nav-dropdown-trigger flex items-center gap-1 whitespace-nowrap py-6 transition hover:text-white"
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
            className="nav-dropdown absolute left-0 top-[64px] grid min-w-72 gap-1 rounded-lg border border-white/12 bg-[#101217]/96 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-[1.12]"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-dropdown-item rounded-md px-4 py-3 text-sm font-bold text-white transition hover:bg-white/[0.07]"
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
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-black text-white"
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
