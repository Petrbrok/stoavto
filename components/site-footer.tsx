"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AppointmentModal } from "@/components/appointment-modal";
import type { SiteContent } from "@/types/site-content";

export function SiteFooter({ content }: { content: SiteContent }) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const phones = (content.contact.phones?.length
    ? content.contact.phones
    : [{ label: content.contact.phone, href: content.contact.phoneHref, visible: true }]
  ).filter((phone) => phone.visible !== false && phone.label.trim() && phone.label.trim() !== "+7");

  return (
    <>
      <footer id="contacts" className="site-footer border-t px-5 py-10 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <Image src="/images/stoavto-logo-transparent.png" alt="СТОАВТО" width={1759} height={306} className="site-logo site-logo-dark h-auto w-56 object-contain" />
            <Image src="/images/stoavto-logo-light.png" alt="СТОАВТО" width={1759} height={306} className="site-logo site-logo-light hidden h-auto w-56 object-contain" />
            <p className="mt-5 max-w-md text-sm leading-6 text-white/68">{content.footer.text}</p>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-white/82">{content.footer.servicesTitle}</h2>
            <ul className="mt-4 grid gap-2 text-sm text-white/66">
              {content.footer.services.filter((item) => item.visible).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-white/82">{content.footer.contactsTitle}</h2>
            <div className="mt-4 grid gap-1">
              {phones.map((phone) => (
                <a key={`${phone.href}-${phone.label}`} href={phone.href} className="block text-xl font-black text-white">
                  {phone.label}
                </a>
              ))}
            </div>
            <p className="mt-2 text-sm text-white/66">{content.contact.hours}</p>
            <button type="button" onClick={() => setAppointmentOpen(true)} className="mt-5 bg-[#9e1f36] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#b72b43]">
              {content.footer.appointmentLabel}
            </button>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1440px] flex-col gap-2 border-t pt-5 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <span>{content.footer.copyright}</span>
          <span className="flex items-center gap-3">
            {content.footer.bottomText}
            <Link href="/admin" className="rounded border border-white/10 px-2 py-1 text-[11px] font-bold text-white/40 transition hover:border-[#c43a52]/60 hover:text-white/80">
              Админ
            </Link>
          </span>
        </div>
      </footer>
      <AppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}
