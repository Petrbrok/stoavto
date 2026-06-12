"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT, brands, services } from "@/data/site";
import { LeadFormModal } from "@/components/lead-form-modal";

const staticLinks = [
  { label: "Коммерческий транспорт", href: "/kommercheskiy-transport" },
  { label: "Наши работы", href: "/raboty" },
  { label: "Отзывы", href: "/#reviews" },
  { label: "Контакты", href: "/#contacts" }
];

type MenuKey = "services" | "brands";

export function SiteHeader({ onLead }: { onLead?: () => void }) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("services");
  const [fallbackLeadOpen, setFallbackLeadOpen] = useState(false);

  const lead = onLead ?? (() => setFallbackLeadOpen(true));

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
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex shrink-0 items-center gap-3" onClick={closeMobile}>
            <span className="grid h-11 w-11 place-items-center bg-[#9e1f36] text-sm font-black tracking-[-0.05em] text-white">
              СА
            </span>
            <span>
              <span className="block text-lg font-black tracking-[-0.04em] text-white">СТОАВТО</span>
              <span className="hidden text-xs text-white/52 sm:block">Автотехцентр полного цикла</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-white/68 xl:flex">
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
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <div className="text-right">
              <a href={CONTACT.phoneHref} className="block text-sm font-bold text-white">
                {CONTACT.phone}
              </a>
              <span className="text-xs text-white/52">{CONTACT.hours}</span>
            </div>
            <button
              type="button"
              onClick={lead}
              className="min-h-12 whitespace-nowrap bg-white px-6 py-3 text-sm font-extrabold text-[#111318] transition duration-300 hover:bg-[#f4d9de] active:translate-y-px"
            >
              Оставить заявку
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="grid h-12 w-12 place-items-center border border-white/14 text-white transition hover:border-[#c43a52] xl:hidden"
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
              className="fixed bottom-0 right-0 top-[76px] z-50 w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0b0c10] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.58)] xl:hidden"
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
                    className="border border-white/10 bg-white/[0.025] px-4 py-4 text-base font-bold text-white/82"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 border border-white/10 bg-white/[0.025] p-5">
                <a href={CONTACT.phoneHref} className="block text-lg font-black text-white">
                  {CONTACT.phone}
                </a>
                <p className="mt-1 text-sm text-white/52">{CONTACT.hours}</p>
                <button
                  type="button"
                  onClick={() => {
                    closeMobile();
                    lead();
                  }}
                  className="mt-5 w-full bg-[#9e1f36] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#b72b43]"
                >
                  Оставить заявку
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {!onLead && <LeadFormModal open={fallbackLeadOpen} onClose={() => setFallbackLeadOpen(false)} />}
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
        className="flex items-center gap-1 py-7 transition hover:text-white"
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
            className="absolute left-0 top-[68px] grid min-w-72 gap-1 border border-white/10 bg-[#101217]/96 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-sm font-bold text-white/70 transition hover:bg-white/[0.055] hover:text-white"
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
    <div className="border border-white/10 bg-white/[0.025]">
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
                  className="px-3 py-3 text-sm font-bold text-white/64"
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
