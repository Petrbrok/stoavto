import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { ImageTextItem, PageHeroContent, SiteContent } from "@/types/site-content";

export function InnerHeader({ content }: { content: SiteContent }) {
  return <SiteHeader content={content} />;
}

export function InnerFooter({ content }: { content: SiteContent }) {
  return <SiteFooter content={content} />;
}

export function InnerHero({ hero }: { hero: PageHeroContent }) {
  return (
    <section className="inner-hero relative overflow-hidden border-b border-white/10 bg-[#0b0c10] px-5 pb-16 pt-28 sm:px-8 lg:px-10">
      {hero.image && (
        <>
          <Image src={hero.image} alt={hero.title} fill priority sizes="100vw" className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,16,0.97),rgba(11,12,16,0.76)_55%,rgba(11,12,16,0.34))]" />
        </>
      )}
      <div className="relative mx-auto max-w-[1440px]">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">{hero.eyebrow}</p>
        <h1 className="max-w-5xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">{hero.title}</h1>
        <p className="mt-7 max-w-3xl text-base leading-7 text-white/78 sm:text-lg">{hero.text}</p>
      </div>
    </section>
  );
}

export function PhotoCapabilityGrid({ title, photos }: { title: string; photos: ImageTextItem[] }) {
  const visiblePhotos = photos.filter((item) => item.visible !== false).slice(0, 4);
  if (!visiblePhotos.length) return null;

  return (
    <section className="px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-white">{title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visiblePhotos.map((item) => (
            <article key={item.title} className="overflow-hidden border border-white/10 bg-white/[0.025]">
              {item.image && (
                <div className="relative min-h-[190px]">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceLinks({ content }: { content: SiteContent }) {
  const services = content.pages.services.items.filter((service) => service.visible);
  if (!services.length) return null;

  return (
    <section className="border-t border-white/10 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-white">{content.pages.services.servicesTitle}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/uslugi/${service.slug}`} className="border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#c43a52]/60 hover:bg-white/[0.045]">
              <h3 className="text-xl font-black tracking-[-0.035em] text-white">{service.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/68">{service.seo.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContentCardGrid({ cards }: { cards: ImageTextItem[] }) {
  const visibleCards = cards.filter((card) => card.visible !== false);
  if (!visibleCards.length) return null;

  return (
    <section className="px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleCards.map((card, index) => (
          <article key={`${card.title}-${index}`} className="overflow-hidden border border-white/10 bg-white/[0.025]">
            {card.image && (
              <div className="relative min-h-[240px]">
                <Image src={card.image} alt={card.title} fill sizes="(min-width: 1280px) 33vw, 50vw" className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-black tracking-[-0.035em] text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/68">{card.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
