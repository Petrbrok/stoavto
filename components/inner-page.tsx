import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { facilityPhotos, services } from "@/data/site";
import { getSiteContent } from "@/lib/content-store";

export function InnerHeader() {
  return <SiteHeader />;
}

export function InnerFooter() {
  return <SiteFooter content={getSiteContent()} />;
}

export function InnerHero({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="border-b border-white/10 bg-[#0b0c10] px-5 pb-16 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-5 w-fit border border-white/14 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/64">
          {eyebrow}
        </p>
        <h1 className="max-w-5xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-7 text-white/66 sm:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function PhotoCapabilityGrid() {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-white">Мощности автотехцентра</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {facilityPhotos.slice(0, 4).map((item) => (
            <article key={item.title} className="border border-white/10 bg-white/[0.025]">
              <div className="min-h-[190px] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(158,31,54,0.14),rgba(255,255,255,0.02))]" />
              <div className="p-5">
                <h3 className="font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceLinks() {
  return (
    <section className="border-t border-white/10 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-white">Основные услуги</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/uslugi/${service.slug}`}
              className="border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#c43a52]/60 hover:bg-white/[0.045]"
            >
              <h3 className="text-xl font-black tracking-[-0.035em] text-white">{service.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
