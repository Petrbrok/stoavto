"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  CalculatorService,
  CalculatorToggle,
  ContactPhone,
  FooterService,
  ImageTextItem,
  InsurancePartnerContent,
  ReviewContent,
  SiteContent
} from "@/types/site-content";

type TabKey = "home" | "contacts" | "calculator" | "reviews" | "insurance" | "footer" | "photos";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "Главная" },
  { key: "contacts", label: "Контакты" },
  { key: "calculator", label: "Калькулятор" },
  { key: "reviews", label: "Отзывы" },
  { key: "insurance", label: "Страховые" },
  { key: "footer", label: "Футер" },
  { key: "photos", label: "Фото" }
];

export function AdminPanel({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    setSaving(false);
    setStatus(response.ok ? "Сохранено" : "Ошибка сохранения");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="admin-shell min-h-screen bg-[#08090b] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090b]/92 px-4 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c43a52]">СТОАВТО</p>
            <h1 className="mt-1 text-2xl font-black">Админ-панель сайта</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/" target="_blank" className="border border-white/14 px-4 py-2.5 text-sm font-bold text-white/86 transition hover:border-[#c43a52]">
              Открыть сайт
            </a>
            <button type="button" onClick={save} disabled={saving} className="bg-[#9e1f36] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#b72b43] disabled:opacity-60">
              {saving ? "Сохраняю..." : "Сохранить"}
            </button>
            <button type="button" onClick={logout} className="border border-white/14 px-4 py-2.5 text-sm font-bold text-white/70 transition hover:text-white">
              Выйти
            </button>
          </div>
        </div>
        {status && <p className="mx-auto mt-3 max-w-[1440px] text-sm font-bold text-[#c43a52]">{status}</p>}
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-8">
        <nav className="grid h-fit gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-2 md:sticky md:top-28">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-3 text-left text-sm font-bold transition ${
                activeTab === tab.key ? "bg-[#9e1f36] text-white" : "text-white/70 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="grid gap-5">
          {activeTab === "home" && <HomeEditor content={content} setContent={setContent} />}
          {activeTab === "contacts" && <ContactsEditor content={content} setContent={setContent} />}
          {activeTab === "calculator" && <CalculatorEditor content={content} setContent={setContent} />}
          {activeTab === "reviews" && <ReviewsEditor content={content} setContent={setContent} />}
          {activeTab === "insurance" && <InsuranceEditor content={content} setContent={setContent} />}
          {activeTab === "footer" && <FooterEditor content={content} setContent={setContent} />}
          {activeTab === "photos" && <PhotosManager content={content} setContent={setContent} />}
        </section>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#101217] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  textarea = false,
  type = "text"
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
}) {
  const className = "border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52]";
  return (
    <label className="grid gap-2 text-sm font-bold text-white/80">
      {label}
      {textarea ? (
        <textarea value={String(value)} onChange={(event) => onChange(event.target.value)} rows={4} className={`${className} resize-y`} />
      ) : (
        <input type={type} value={String(value)} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/18 px-4 py-3 text-sm font-bold text-white/80">
      {label}
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/80">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]">
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    const form = new FormData();
    form.append("file", file);
    setUploading(true);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);
    if (response.ok) {
      const data = (await response.json()) as { url: string };
      onChange(data.url);
    }
  }

  return (
    <div className="grid gap-2">
      <span className="text-sm font-bold text-white/80">{label}</span>
      {value && (
        <div className="relative aspect-[16/7] overflow-hidden rounded-lg border border-white/10 bg-black/24">
          <Image src={value} alt="" fill sizes="520px" className="object-contain" />
        </div>
      )}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="border border-white/12 bg-black/24 px-4 py-3 text-white outline-none focus:border-[#c43a52]" />
      <div className="flex flex-wrap items-center gap-3">
        <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} className="text-sm text-white/70" />
        {value && (
          <button type="button" onClick={() => onChange("")} className="rounded-lg border border-white/14 px-3 py-2 text-xs font-bold text-white/66 transition hover:border-[#c43a52] hover:text-white">
            Убрать фото
          </button>
        )}
      </div>
      {uploading && <span className="text-sm text-[#c43a52]">Загружаю...</span>}
    </div>
  );
}

function HomeEditor({ content, setContent }: EditorProps) {
  return (
    <Card title="Главная">
      <TextField label="Метка над заголовком" value={content.home.eyebrow} onChange={(value) => setContent({ ...content, home: { ...content.home, eyebrow: value } })} />
      <TextField label="Заголовок, строки через Enter" textarea value={content.home.titleLines.join("\n")} onChange={(value) => setContent({ ...content, home: { ...content.home, titleLines: value.split("\n").filter(Boolean) } })} />
      <TextField label="Акцентное слово" value={content.home.accent} onChange={(value) => setContent({ ...content, home: { ...content.home, accent: value } })} />
      <TextField label="Описание" textarea value={content.home.text} onChange={(value) => setContent({ ...content, home: { ...content.home, text: value } })} />
      <TextField label="Кнопка калькулятора" value={content.home.primaryButton} onChange={(value) => setContent({ ...content, home: { ...content.home, primaryButton: value } })} />
      <TextField label="Кнопка записи" value={content.home.secondaryButton} onChange={(value) => setContent({ ...content, home: { ...content.home, secondaryButton: value } })} />
      <TextField label="Преимущества, каждое с новой строки" textarea value={content.home.heroBenefits.join("\n")} onChange={(value) => setContent({ ...content, home: { ...content.home, heroBenefits: value.split("\n").filter(Boolean) } })} />
      <ImageField label="Фото на компьютере" value={content.home.desktopHeroImage} onChange={(value) => setContent({ ...content, home: { ...content.home, desktopHeroImage: value } })} />
      <ImageField label="Фото на телефоне" value={content.home.mobileHeroImage} onChange={(value) => setContent({ ...content, home: { ...content.home, mobileHeroImage: value } })} />
    </Card>
  );
}

function ContactsEditor({ content, setContent }: EditorProps) {
  const phones = (content.contact.phones?.length
    ? content.contact.phones
    : [{ label: content.contact.phone, href: content.contact.phoneHref, visible: true }]
  ).slice(0, 3);
  const setPhones = (nextPhones: ContactPhone[]) => {
    const firstVisible = nextPhones.find((phone) => phone.visible !== false && phone.label.trim()) ?? nextPhones[0];
    setContent({
      ...content,
      contact: {
        ...content.contact,
        phone: firstVisible?.label || content.contact.phone,
        phoneHref: firstVisible?.href || content.contact.phoneHref,
        phones: nextPhones.slice(0, 3)
      }
    });
  };

  return (
    <Card title="Контакты">
      {phones.map((phone, index) => (
        <PhoneCard
          key={index}
          title={`Телефон ${index + 1}`}
          phone={phone}
          onChange={(next) => {
            const nextPhones = [...phones];
            nextPhones[index] = next;
            setPhones(nextPhones);
          }}
          onRemove={() => setPhones(phones.filter((_, itemIndex) => itemIndex !== index))}
        />
      ))}
      {phones.length < 3 && (
        <button
          type="button"
          onClick={() => setPhones([...phones, { label: "", href: "tel:", visible: true }])}
          className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]"
        >
          Добавить телефон
        </button>
      )}
      <TextField label="Время работы" value={content.contact.hours} onChange={(value) => setContent({ ...content, contact: { ...content.contact, hours: value } })} />
    </Card>
  );
}

function PhoneCard({ title, phone, onChange, onRemove }: { title: string; phone: ContactPhone; onChange: (phone: ContactPhone) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-[1fr_1fr_160px]">
      <TextField label={title} value={phone.label} onChange={(label) => onChange({ ...phone, label })} />
      <TextField label="Ссылка tel:" value={phone.href} onChange={(href) => onChange({ ...phone, href })} />
      <div className="grid content-end gap-3">
        <ToggleField label="Показывать" checked={phone.visible !== false} onChange={(visible) => onChange({ ...phone, visible })} />
        <button type="button" onClick={onRemove} className="rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-[#c43a52] hover:text-white">
          Удалить
        </button>
      </div>
    </div>
  );
}

function CalculatorEditor({ content, setContent }: EditorProps) {
  const calculator = content.calculator;
  const setCalculator = (next: typeof calculator) => setContent({ ...content, calculator: next });

  return (
    <>
      <Card title="Тексты калькулятора">
        <TextField label="Метка" value={calculator.eyebrow} onChange={(value) => setCalculator({ ...calculator, eyebrow: value })} />
        <TextField label="Заголовок" value={calculator.title} onChange={(value) => setCalculator({ ...calculator, title: value })} />
        <TextField label="Описание" textarea value={calculator.text} onChange={(value) => setCalculator({ ...calculator, text: value })} />
        <TextField label="Кнопка" value={calculator.submitLabel} onChange={(value) => setCalculator({ ...calculator, submitLabel: value })} />
      </Card>
      <Card title="Услуги и цены">
        {calculator.services.map((service, index) => (
          <ServicePriceCard
            key={service.value}
            service={service}
            onChange={(next) => {
              const services = [...calculator.services];
              services[index] = next;
              setCalculator({ ...calculator, services });
            }}
            onRemove={() => setCalculator({ ...calculator, services: calculator.services.filter((_, itemIndex) => itemIndex !== index) })}
          />
        ))}
        <button
          type="button"
          onClick={() => setCalculator({ ...calculator, services: [...calculator.services, { label: "Новая услуга", value: `service-${Date.now()}`, base: 1000, max: 5000, days: "1 день", visible: true }] })}
          className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]"
        >
          Добавить услугу
        </button>
      </Card>
      <Card title="Доплаты">
        {calculator.toggles.map((toggle, index) => (
          <TogglePriceCard
            key={toggle.value}
            toggle={toggle}
            onChange={(next) => {
              const toggles = [...calculator.toggles];
              toggles[index] = next;
              setCalculator({ ...calculator, toggles });
            }}
          />
        ))}
      </Card>
    </>
  );
}

function ServicePriceCard({ service, onChange, onRemove }: { service: CalculatorService; onChange: (service: CalculatorService) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-5">
      <TextField label="Название" value={service.label} onChange={(value) => onChange({ ...service, label: value })} />
      <TextField label="Код" value={service.value} onChange={(value) => onChange({ ...service, value })} />
      <TextField label="От" type="number" value={service.base} onChange={(value) => onChange({ ...service, base: Number(value) })} />
      <TextField label="До" type="number" value={service.max} onChange={(value) => onChange({ ...service, max: Number(value) })} />
      <TextField label="Срок" value={service.days} onChange={(value) => onChange({ ...service, days: value })} />
      <ToggleField label="Показывать" checked={service.visible} onChange={(visible) => onChange({ ...service, visible })} />
      <button type="button" onClick={onRemove} className="rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 hover:text-white md:col-span-4">
        Удалить
      </button>
    </div>
  );
}

function TogglePriceCard({ toggle, onChange }: { toggle: CalculatorToggle; onChange: (toggle: CalculatorToggle) => void }) {
  const amountType = toggle.amountType ?? "fixed";

  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-5">
      <TextField label="Название" value={toggle.label} onChange={(value) => onChange({ ...toggle, label: value })} />
      <TextField label="Код" value={toggle.value} onChange={(value) => onChange({ ...toggle, value })} />
      <SelectField
        label="Тип доплаты"
        value={amountType}
        onChange={(value) => onChange({ ...toggle, amountType: value === "percent" ? "percent" : "fixed" })}
        options={[
          { label: "Рубли", value: "fixed" },
          { label: "Процент", value: "percent" }
        ]}
      />
      <TextField label={amountType === "percent" ? "Процент, %" : "Доплата, руб."} type="number" value={toggle.amount} onChange={(value) => onChange({ ...toggle, amount: Number(value) })} />
      <ToggleField label="Показывать" checked={toggle.visible} onChange={(visible) => onChange({ ...toggle, visible })} />
    </div>
  );
}

function ReviewsEditor({ content, setContent }: EditorProps) {
  return (
    <Card title="Отзывы">
      <TextField label="Заголовок блока" value={content.reviews.title} onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, title: value } })} />
      <TextField label="Подзаголовок" value={content.reviews.subtitle} onChange={(value) => setContent({ ...content, reviews: { ...content.reviews, subtitle: value } })} />
      {content.reviews.items.map((review, index) => (
        <ReviewCard
          key={`${review.name}-${index}`}
          review={review}
          onChange={(next) => {
            const items = [...content.reviews.items];
            items[index] = next;
            setContent({ ...content, reviews: { ...content.reviews, items } });
          }}
          onRemove={() => setContent({ ...content, reviews: { ...content.reviews, items: content.reviews.items.filter((_, itemIndex) => itemIndex !== index) } })}
        />
      ))}
      <button type="button" onClick={() => setContent({ ...content, reviews: { ...content.reviews, items: [...content.reviews.items, { name: "Новый клиент", car: "Автомобиль", text: "Текст отзыва", photo: "/images/hero-mobile-stoavto.png", visible: true }] } })} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 hover:border-[#c43a52]">
        Добавить отзыв
      </button>
    </Card>
  );
}

function ReviewCard({ review, onChange, onRemove }: { review: ReviewContent; onChange: (review: ReviewContent) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-4 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-2">
      <TextField label="Имя" value={review.name} onChange={(value) => onChange({ ...review, name: value })} />
      <TextField label="Авто" value={review.car} onChange={(value) => onChange({ ...review, car: value })} />
      <TextField label="Текст" textarea value={review.text} onChange={(value) => onChange({ ...review, text: value })} />
      <ImageField label="Фото" value={review.photo} onChange={(value) => onChange({ ...review, photo: value })} />
      <ToggleField label="Показывать" checked={review.visible} onChange={(visible) => onChange({ ...review, visible })} />
      <button type="button" onClick={onRemove} className="rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 hover:text-white">
        Удалить
      </button>
    </div>
  );
}

function InsuranceEditor({ content, setContent }: EditorProps) {
  return (
    <Card title="Страховые">
      <TextField label="Заголовок блока" value={content.insurance.title} onChange={(value) => setContent({ ...content, insurance: { ...content.insurance, title: value } })} />
      {content.insurance.partners.map((partner, index) => (
        <PartnerCard
          key={`${partner.name}-${index}`}
          partner={partner}
          onChange={(next) => {
            const partners = [...content.insurance.partners];
            partners[index] = next;
            setContent({ ...content, insurance: { ...content.insurance, partners } });
          }}
          onRemove={() => setContent({ ...content, insurance: { ...content.insurance, partners: content.insurance.partners.filter((_, itemIndex) => itemIndex !== index) } })}
        />
      ))}
      <button type="button" onClick={() => setContent({ ...content, insurance: { ...content.insurance, partners: [...content.insurance.partners, { name: "Новая страховая", logo: "/uploads/partner-sogaz-logo.png", url: "#", visible: true }] } })} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 hover:border-[#c43a52]">
        Добавить страховую
      </button>
    </Card>
  );
}

function PartnerCard({ partner, onChange, onRemove }: { partner: InsurancePartnerContent; onChange: (partner: InsurancePartnerContent) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-4 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-2">
      <TextField label="Название" value={partner.name} onChange={(value) => onChange({ ...partner, name: value })} />
      <TextField label="Сайт" value={partner.url} onChange={(value) => onChange({ ...partner, url: value })} />
      <ImageField label="Логотип" value={partner.logo} onChange={(value) => onChange({ ...partner, logo: value })} />
      <div className="grid content-end gap-3">
        <ToggleField label="Показывать" checked={partner.visible} onChange={(visible) => onChange({ ...partner, visible })} />
        <button type="button" onClick={onRemove} className="rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 hover:text-white">
          Удалить
        </button>
      </div>
    </div>
  );
}

function FooterEditor({ content, setContent }: EditorProps) {
  return (
    <Card title="Футер">
      <TextField label="Описание" textarea value={content.footer.text} onChange={(value) => setContent({ ...content, footer: { ...content.footer, text: value } })} />
      <TextField label="Кнопка записи" value={content.footer.appointmentLabel} onChange={(value) => setContent({ ...content, footer: { ...content.footer, appointmentLabel: value } })} />
      {content.footer.services.map((service, index) => (
        <FooterServiceCard
          key={`${service.href}-${index}`}
          service={service}
          onChange={(next) => {
            const services = [...content.footer.services];
            services[index] = next;
            setContent({ ...content, footer: { ...content.footer, services } });
          }}
        />
      ))}
    </Card>
  );
}

function FooterServiceCard({ service, onChange }: { service: FooterService; onChange: (service: FooterService) => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-[1fr_1fr_160px]">
      <TextField label="Название" value={service.label} onChange={(value) => onChange({ ...service, label: value })} />
      <TextField label="Ссылка" value={service.href} onChange={(value) => onChange({ ...service, href: value })} />
      <ToggleField label="Показывать" checked={service.visible} onChange={(visible) => onChange({ ...service, visible })} />
    </div>
  );
}

function PhotosEditor({ content, setContent }: EditorProps) {
  return (
    <Card title="Фото-блоки">
      {content.facilityPhotos.map((photo, index) => (
        <ImageTextCard
          key={`${photo.title}-${index}`}
          item={photo}
          onChange={(next) => {
            const facilityPhotos = [...content.facilityPhotos];
            facilityPhotos[index] = next;
            setContent({ ...content, facilityPhotos });
          }}
        />
      ))}
    </Card>
  );
}

function ImageTextCard({ item, onChange }: { item: ImageTextItem; onChange: (item: ImageTextItem) => void }) {
  return (
    <div className="grid gap-4 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-2">
      <TextField label="Заголовок" value={item.title} onChange={(value) => onChange({ ...item, title: value })} />
      <TextField label="Описание" textarea value={item.caption} onChange={(value) => onChange({ ...item, caption: value })} />
      <ImageField label="Фото" value={item.image || ""} onChange={(value) => onChange({ ...item, image: value })} />
      <ToggleField label="Показывать" checked={item.visible !== false} onChange={(visible) => onChange({ ...item, visible })} />
    </div>
  );
}

function PhotosManager({ content, setContent }: EditorProps) {
  return (
    <Card title="Фото-блоки">
      {content.facilityPhotos.map((photo, index) => (
        <ImageTextManager
          key={`${photo.title}-${index}`}
          item={photo}
          onChange={(next) => {
            const facilityPhotos = [...content.facilityPhotos];
            facilityPhotos[index] = next;
            setContent({ ...content, facilityPhotos });
          }}
          onRemove={() => setContent({ ...content, facilityPhotos: content.facilityPhotos.filter((_, itemIndex) => itemIndex !== index) })}
        />
      ))}
      <button
        type="button"
        onClick={() =>
          setContent({
            ...content,
            facilityPhotos: [
              ...content.facilityPhotos,
              { title: "Новое фото", caption: "Описание фото", image: "", visible: true }
            ]
          })
        }
        className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]"
      >
        Добавить фото
      </button>
    </Card>
  );
}

function ImageTextManager({ item, onChange, onRemove }: { item: ImageTextItem; onChange: (item: ImageTextItem) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-4 rounded-lg border border-white/10 bg-black/18 p-4 md:grid-cols-2">
      <TextField label="Заголовок" value={item.title} onChange={(value) => onChange({ ...item, title: value })} />
      <TextField label="Описание" textarea value={item.caption} onChange={(value) => onChange({ ...item, caption: value })} />
      <ImageField label="Фото" value={item.image || ""} onChange={(value) => onChange({ ...item, image: value })} />
      <ToggleField label="Показывать" checked={item.visible !== false} onChange={(visible) => onChange({ ...item, visible })} />
      <button type="button" onClick={onRemove} className="rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-[#c43a52] hover:text-white md:col-span-2">
        Удалить фото-блок
      </button>
    </div>
  );
}

type EditorProps = {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
};
