"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  CalculatorOption,
  CalculatorService,
  CalculatorToggle,
  ContactPhone,
  FooterService,
  ImageTextItem,
  InsurancePartnerContent,
  PageHeroContent,
  ReviewContent,
  SeoContent,
  SiteContent
} from "@/types/site-content";

type TabKey = "home" | "services" | "brands" | "commercial" | "works" | "reviews" | "contacts" | "general";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "Главная" },
  { key: "services", label: "Услуги" },
  { key: "brands", label: "Марки" },
  { key: "commercial", label: "Коммерческий транспорт" },
  { key: "works", label: "Наши работы" },
  { key: "reviews", label: "Отзывы" },
  { key: "contacts", label: "Контакты" },
  { key: "general", label: "Общее" }
];

const previewUrls: Record<TabKey, string> = {
  home: "/", services: "/uslugi", brands: "/marki", commercial: "/kommercheskiy-transport",
  works: "/raboty", reviews: "/#reviews", contacts: "/#contacts", general: "/"
};

export function AdminPanel({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialContent));
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const isDirty = JSON.stringify(content) !== savedSnapshot;

  useEffect(() => {
    const warnBeforeLeave = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warnBeforeLeave);
    return () => window.removeEventListener("beforeunload", warnBeforeLeave);
  }, [isDirty]);

  async function save() {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    if (response.ok) {
      const saved = (await response.json()) as SiteContent;
      setContent(saved);
      setSavedSnapshot(JSON.stringify(saved));
      setStatus("Сохранено");
    } else {
      setStatus("Ошибка сохранения");
    }
    setSaving(false);
  }

  async function logout() {
    if (isDirty && !window.confirm("Есть несохранённые изменения. Выйти без сохранения?")) return;
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
            <span className={`self-center text-sm font-bold ${isDirty ? "text-[#f0a2b0]" : "text-white/55"}`}>
              {isDirty ? "Есть несохранённые изменения" : "Всё сохранено"}
            </span>
            <a href={previewUrls[activeTab]} target="_blank" className="border border-white/14 px-4 py-2.5 text-sm font-bold text-white/86 transition hover:border-[#c43a52]">
              Предпросмотр
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

      <div className="mx-auto grid min-w-0 max-w-[1440px] gap-6 px-4 py-6 lg:grid-cols-[240px_1fr] md:px-8">
        <nav className="relative z-20 grid min-w-0 h-fit gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-2 sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`min-h-11 rounded-lg px-4 py-3 text-left text-sm font-bold leading-snug transition ${
                activeTab === tab.key ? "bg-[#9e1f36] text-white" : "text-white/70 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <section className="grid min-w-0 gap-5">
          {activeTab === "home" && <HomeSectionEditor content={content} setContent={setContent} />}
          {activeTab === "services" && <ServicesEditor content={content} setContent={setContent} />}
          {activeTab === "brands" && <BrandsEditor content={content} setContent={setContent} />}
          {activeTab === "commercial" && <SimplePageEditor pageKey="commercial" title="Коммерческий транспорт" content={content} setContent={setContent} />}
          {activeTab === "works" && <SimplePageEditor pageKey="works" title="Наши работы" content={content} setContent={setContent} />}
          {activeTab === "reviews" && <ReviewsEditor content={content} setContent={setContent} />}
          {activeTab === "contacts" && <ContactsEditor content={content} setContent={setContent} />}
          {activeTab === "general" && <GeneralEditor content={content} setContent={setContent} />}
        </section>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-lg border border-white/10 bg-[#101217] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-5 grid min-w-0 gap-4">{children}</div>
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
  const className = "min-w-0 border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition placeholder:text-white/34 focus:border-[#c43a52]";
  return (
    <label className="grid min-w-0 gap-2 text-sm font-bold text-white/80">
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
    <label className="flex min-h-11 items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/18 px-4 py-3 text-sm font-bold leading-snug text-white/80">
      <span className="min-w-0 break-words">{label}</span>
      <input className="h-5 w-5 shrink-0" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
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
    <label className="grid min-w-0 gap-2 text-sm font-bold text-white/80">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 border border-white/12 bg-black/24 px-4 py-3 text-white outline-none transition focus:border-[#c43a52]">
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
        <div className="pointer-events-none relative aspect-[16/7] overflow-hidden rounded-lg border border-white/10 bg-black/24">
          <Image src={value} alt="" fill sizes="520px" style={{ pointerEvents: "none" }} className="object-contain" />
        </div>
      )}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 border border-white/12 bg-black/24 px-4 py-3 text-white outline-none focus:border-[#c43a52]" />
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

function HomeSectionEditor(props: EditorProps) {
  return (
    <>
      <HomeEditor {...props} />
      <InsuranceEditor {...props} />
      <CalculatorEditor {...props} />
      <IdeasEditor {...props} />
      <PhotosManager {...props} />
    </>
  );
}

function HomeEditor({ content, setContent }: EditorProps) {
  return (
    <Card title="Главная">
      <SeoEditor seo={content.home.seo} onChange={(seo) => setContent({ ...content, home: { ...content.home, seo } })} />
      <TextField label="Метка над заголовком" value={content.home.eyebrow} onChange={(value) => setContent({ ...content, home: { ...content.home, eyebrow: value } })} />
      <TextField label="Заголовок, строки через Enter" textarea value={content.home.titleLines.join("\n")} onChange={(value) => setContent({ ...content, home: { ...content.home, titleLines: value.split("\n").filter(Boolean) } })} />
      <TextField label="Акцентное слово" value={content.home.accent} onChange={(value) => setContent({ ...content, home: { ...content.home, accent: value } })} />
      <TextField label="Описание" textarea value={content.home.text} onChange={(value) => setContent({ ...content, home: { ...content.home, text: value } })} />
      <TextField label="Кнопка калькулятора" value={content.home.primaryButton} onChange={(value) => setContent({ ...content, home: { ...content.home, primaryButton: value } })} />
      <TextField label="Кнопка записи" value={content.home.secondaryButton} onChange={(value) => setContent({ ...content, home: { ...content.home, secondaryButton: value } })} />
      <TextField label="Преимущества, каждое с новой строки" textarea value={content.home.heroBenefits.join("\n")} onChange={(value) => setContent({ ...content, home: { ...content.home, heroBenefits: value.split("\n").filter(Boolean) } })} />
      <TextField label="Полоса преимуществ, каждое с новой строки" textarea value={content.advantages.join("\n")} onChange={(value) => setContent({ ...content, advantages: value.split("\n").filter(Boolean) })} />
      <ImageField label="Фото на компьютере" value={content.home.desktopHeroImage} onChange={(value) => setContent({ ...content, home: { ...content.home, desktopHeroImage: value } })} />
      <ImageField label="Фото на телефоне" value={content.home.mobileHeroImage} onChange={(value) => setContent({ ...content, home: { ...content.home, mobileHeroImage: value } })} />
    </Card>
  );
}

function ContactsEditor({ content, setContent }: EditorProps) {
  const phones = (content.contact.phones?.length
    ? content.contact.phones
    : [{ label: content.contact.phone, href: content.contact.phoneHref, visible: true }]
  );
  const setPhones = (nextPhones: ContactPhone[]) => {
    const firstVisible = nextPhones.find((phone) => phone.visible !== false && phone.label.trim()) ?? nextPhones[0];
    setContent({
      ...content,
      contact: {
        ...content.contact,
        phone: firstVisible?.label || content.contact.phone,
        phoneHref: firstVisible?.href || content.contact.phoneHref,
        phones: nextPhones
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
      <button
          type="button"
          onClick={() => setPhones([...phones, { label: "", href: "tel:", visible: true }])}
          className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]"
        >
          Добавить телефон
      </button>
      <TextField label="Время работы" value={content.contact.hours} onChange={(value) => setContent({ ...content, contact: { ...content.contact, hours: value } })} />
    </Card>
  );
}

function PhoneCard({ title, phone, onChange, onRemove }: { title: string; phone: ContactPhone; onChange: (phone: ContactPhone) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 xl:grid-cols-[1fr_1fr_160px]">
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
        <TextField label="Подпись результа" value={calculator.resultLabel} onChange={(value) => setCalculator({ ...calculator, resultLabel: value })} />
        <TextField label="Примечание к результату" textarea value={calculator.resultNote} onChange={(value) => setCalculator({ ...calculator, resultNote: value })} />
        <TextField label="Кнопка" value={calculator.submitLabel} onChange={(value) => setCalculator({ ...calculator, submitLabel: value })} />
      </Card>
      <Card title="Параметры расчета">
        <h3 className="text-base font-black">Типы транспорта</h3>
        {calculator.transports.map((option, index) => (
          <CalculatorOptionCard
            key={`${option.value}-${index}`}
            option={option}
            onChange={(next) => {
              const transports = [...calculator.transports];
              transports[index] = next;
              setCalculator({ ...calculator, transports });
            }}
            onRemove={() => setCalculator({ ...calculator, transports: calculator.transports.filter((_, itemIndex) => itemIndex !== index) })}
          />
        ))}
        <button type="button" onClick={() => setCalculator({ ...calculator, transports: [...calculator.transports, { label: "Новый транспорт", value: `transport-${Date.now()}`, factor: 1 }] })} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]">
          Добавить транспорт
        </button>
        <h3 className="pt-3 text-base font-black">Объемы работ</h3>
        {calculator.sizes.map((option, index) => (
          <CalculatorOptionCard
            key={`${option.value}-${index}`}
            option={option}
            onChange={(next) => {
              const sizes = [...calculator.sizes];
              sizes[index] = next;
              setCalculator({ ...calculator, sizes });
            }}
            onRemove={() => setCalculator({ ...calculator, sizes: calculator.sizes.filter((_, itemIndex) => itemIndex !== index) })}
          />
        ))}
        <button type="button" onClick={() => setCalculator({ ...calculator, sizes: [...calculator.sizes, { label: "Новый объем", value: `size-${Date.now()}`, factor: 1 }] })} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]">
          Добавить объем
        </button>
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
            onRemove={() => setCalculator({ ...calculator, toggles: calculator.toggles.filter((_, itemIndex) => itemIndex !== index) })}
          />
        ))}
        <button type="button" onClick={() => setCalculator({ ...calculator, toggles: [...calculator.toggles, { label: "Новая доплата", value: `toggle-${Date.now()}`, amountType: "fixed", amount: 0, defaultChecked: false, visible: true }] })} className="min-h-11 border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]">
          Добавить доплату
        </button>
      </Card>
    </>
  );
}

function CalculatorOptionCard({ option, onChange, onRemove }: { option: CalculatorOption; onChange: (option: CalculatorOption) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 xl:grid-cols-[1fr_1fr_160px_160px]">
      <TextField label="Название" value={option.label} onChange={(label) => onChange({ ...option, label })} />
      <TextField label="Код" value={option.value} onChange={(value) => onChange({ ...option, value })} />
      <TextField label="Коэффициент" type="number" value={option.factor ?? 1} onChange={(value) => onChange({ ...option, factor: Number(value) })} />
      <button type="button" onClick={onRemove} className="self-end rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-[#c43a52] hover:text-white">
        Удалить
      </button>
    </div>
  );
}
function ServicePriceCard({ service, onChange, onRemove }: { service: CalculatorService; onChange: (service: CalculatorService) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 xl:grid-cols-5">
      <TextField label="Название" value={service.label} onChange={(value) => onChange({ ...service, label: value })} />
      <TextField label="Код" value={service.value} onChange={(value) => onChange({ ...service, value })} />
      <TextField label="От" type="number" value={service.base} onChange={(value) => onChange({ ...service, base: Number(value) })} />
      <TextField label="До" type="number" value={service.max} onChange={(value) => onChange({ ...service, max: Number(value) })} />
      <TextField label="Срок" value={service.days} onChange={(value) => onChange({ ...service, days: value })} />
      <ToggleField label="Показывать" checked={service.visible} onChange={(visible) => onChange({ ...service, visible })} />
      <button type="button" onClick={onRemove} className="min-h-11 rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 hover:text-white xl:col-span-4">
        Удалить
      </button>
    </div>
  );
}

function TogglePriceCard({ toggle, onChange, onRemove }: { toggle: CalculatorToggle; onChange: (toggle: CalculatorToggle) => void; onRemove: () => void }) {
  const amountType = toggle.amountType ?? "fixed";

  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 xl:grid-cols-5">
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
      <button type="button" onClick={onRemove} className="min-h-11 rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-[#c43a52] hover:text-white xl:col-span-5">
        Удалить
      </button>
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
      <TextField label="Заголовок услуг" value={content.footer.servicesTitle} onChange={(value) => setContent({ ...content, footer: { ...content.footer, servicesTitle: value } })} />
      <TextField label="Заголовок контактов" value={content.footer.contactsTitle} onChange={(value) => setContent({ ...content, footer: { ...content.footer, contactsTitle: value } })} />
      <TextField label="Кнопка записи" value={content.footer.appointmentLabel} onChange={(value) => setContent({ ...content, footer: { ...content.footer, appointmentLabel: value } })} />
      <TextField label="Копирайт" value={content.footer.copyright} onChange={(value) => setContent({ ...content, footer: { ...content.footer, copyright: value } })} />
      <TextField label="Нижняя строка" value={content.footer.bottomText} onChange={(value) => setContent({ ...content, footer: { ...content.footer, bottomText: value } })} />
      <TextField label="Подпись ссылки в админку" value={content.footer.adminLabel} onChange={(value) => setContent({ ...content, footer: { ...content.footer, adminLabel: value } })} />
      {content.footer.services.map((service, index) => (
        <FooterServiceCard
          key={`${service.href}-${index}`}
          service={service}
          onChange={(next) => {
            const services = [...content.footer.services];
            services[index] = next;
            setContent({ ...content, footer: { ...content.footer, services } });
          }}
          onRemove={() => setContent({ ...content, footer: { ...content.footer, services: content.footer.services.filter((_, itemIndex) => itemIndex !== index) } })}
        />
      ))}
    </Card>
  );
}

function FooterServiceCard({ service, onChange, onRemove }: { service: FooterService; onChange: (service: FooterService) => void; onRemove: () => void }) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/18 p-4 xl:grid-cols-[1fr_1fr_160px]">
      <TextField label="Название" value={service.label} onChange={(value) => onChange({ ...service, label: value })} />
      <TextField label="Ссылка" value={service.href} onChange={(value) => onChange({ ...service, href: value })} />
      <ToggleField label="Показывать" checked={service.visible} onChange={(visible) => onChange({ ...service, visible })} />
      <button type="button" onClick={onRemove} className="min-h-11 rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-[#c43a52] hover:text-white xl:col-span-3">
        Удалить
      </button>
    </div>
  );
}

function IdeasEditor({ content, setContent }: EditorProps) {
  return (
    <Card title="Информационные карточки">
      {content.ideas.map((idea, index) => (
        <ImageTextManager
          key={`${idea.title}-${index}`}
          item={idea}
          onChange={(next) => {
            const ideas = [...content.ideas];
            ideas[index] = next;
            setContent({ ...content, ideas });
          }}
          onRemove={() => setContent({ ...content, ideas: content.ideas.filter((_, itemIndex) => itemIndex !== index) })}
        />
      ))}
      <button type="button" onClick={() => setContent({ ...content, ideas: [...content.ideas, { title: "Новая карточка", caption: "Описание", image: "", visible: true }] })} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 transition hover:border-[#c43a52]">
        Добавить карточку
      </button>
    </Card>
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
      <button type="button" onClick={onRemove} className="min-h-11 rounded-lg border border-white/14 px-4 py-3 text-sm font-bold text-white/70 transition hover:border-[#c43a52] hover:text-white md:col-span-2">
        Удалить фото-блок
      </button>
    </div>
  );
}

function SeoEditor({ seo, onChange }: { seo: SeoContent; onChange: (seo: SeoContent) => void }) {
  return (
    <div className="grid gap-4 rounded-lg bg-black/18 p-4 md:grid-cols-2">
      <TextField label="SEO title" value={seo.title} onChange={(title) => onChange({ ...seo, title })} />
      <TextField label="SEO description" textarea value={seo.description} onChange={(description) => onChange({ ...seo, description })} />
    </div>
  );
}

function PageHeroEditor({ hero, onChange }: { hero: PageHeroContent; onChange: (hero: PageHeroContent) => void }) {
  return (
    <div className="grid gap-4 rounded-lg bg-black/18 p-4 md:grid-cols-2">
      <TextField label="Метка" value={hero.eyebrow} onChange={(eyebrow) => onChange({ ...hero, eyebrow })} />
      <TextField label="Заголовок" value={hero.title} onChange={(title) => onChange({ ...hero, title })} />
      <TextField label="Описание" textarea value={hero.text} onChange={(text) => onChange({ ...hero, text })} />
      <ImageField label="Обложка" value={hero.image} onChange={(image) => onChange({ ...hero, image })} />
    </div>
  );
}

function ServicesEditor({ content, setContent }: EditorProps) {
  const page = content.pages.services;
  const setPage = (next: typeof page) => setContent({ ...content, pages: { ...content.pages, services: next } });
  return (
    <>
      <Card title="Общая страница услуг">
        <SeoEditor seo={page.seo} onChange={(seo) => setPage({ ...page, seo })} />
        <PageHeroEditor hero={page.hero} onChange={(hero) => setPage({ ...page, hero })} />
        <TextField label="Заголовок списка услуг" value={page.servicesTitle} onChange={(servicesTitle) => setPage({ ...page, servicesTitle })} />
        <TextField label="Заголовок мощностей" value={page.capabilitiesTitle} onChange={(capabilitiesTitle) => setPage({ ...page, capabilitiesTitle })} />
      </Card>
      {page.items.map((service, index) => (
        <Card key={service.slug} title={service.name}>
          <p className="text-xs font-bold text-white/45">URL: /uslugi/{service.slug}</p>
          <ToggleField label="Показывать на сайте" checked={service.visible} onChange={(visible) => {
            const items = [...page.items]; items[index] = { ...service, visible }; setPage({ ...page, items });
          }} />
          <TextField label="Название" value={service.name} onChange={(name) => {
            const items = [...page.items]; items[index] = { ...service, name }; setPage({ ...page, items });
          }} />
          <SeoEditor seo={service.seo} onChange={(seo) => {
            const items = [...page.items]; items[index] = { ...service, seo }; setPage({ ...page, items });
          }} />
          <PageHeroEditor hero={service.hero} onChange={(hero) => {
            const items = [...page.items]; items[index] = { ...service, hero }; setPage({ ...page, items });
          }} />
          <TextField label="Заголовок карточек" value={service.sectionTitle} onChange={(sectionTitle) => {
            const items = [...page.items]; items[index] = { ...service, sectionTitle }; setPage({ ...page, items });
          }} />
          {service.features.map((feature, featureIndex) => (
            <ImageTextManager key={`${feature.title}-${featureIndex}`} item={feature} onChange={(next) => {
              const features = [...service.features]; features[featureIndex] = next;
              const items = [...page.items]; items[index] = { ...service, features }; setPage({ ...page, items });
            }} onRemove={() => {
              const features = service.features.filter((_, itemIndex) => itemIndex !== featureIndex);
              const items = [...page.items]; items[index] = { ...service, features }; setPage({ ...page, items });
            }} />
          ))}
          <button type="button" onClick={() => {
            const items = [...page.items]; items[index] = { ...service, features: [...service.features, { title: "Новая работа", caption: "Описание", image: "", visible: true }] }; setPage({ ...page, items });
          }} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 hover:border-[#c43a52]">Добавить карточку</button>
        </Card>
      ))}
    </>
  );
}

function BrandsEditor({ content, setContent }: EditorProps) {
  const page = content.pages.brands;
  const setPage = (next: typeof page) => setContent({ ...content, pages: { ...content.pages, brands: next } });
  return (
    <>
      <Card title="Общая страница марок">
        <SeoEditor seo={page.seo} onChange={(seo) => setPage({ ...page, seo })} />
        <PageHeroEditor hero={page.hero} onChange={(hero) => setPage({ ...page, hero })} />
        <TextField label="Подпись карточки" value={page.cardCaption} onChange={(cardCaption) => setPage({ ...page, cardCaption })} />
        <TextField label="Заголовок мощностей" value={page.capabilitiesTitle} onChange={(capabilitiesTitle) => setPage({ ...page, capabilitiesTitle })} />
      </Card>
      {page.items.map((brand, index) => (
        <Card key={brand.slug} title={brand.name}>
          <p className="text-xs font-bold text-white/45">URL: /marki/{brand.slug}</p>
          <ToggleField label="Показывать на сайте" checked={brand.visible} onChange={(visible) => {
            const items = [...page.items]; items[index] = { ...brand, visible }; setPage({ ...page, items });
          }} />
          <TextField label="Название" value={brand.name} onChange={(name) => {
            const items = [...page.items]; items[index] = { ...brand, name }; setPage({ ...page, items });
          }} />
          <SeoEditor seo={brand.seo} onChange={(seo) => {
            const items = [...page.items]; items[index] = { ...brand, seo }; setPage({ ...page, items });
          }} />
          <PageHeroEditor hero={brand.hero} onChange={(hero) => {
            const items = [...page.items]; items[index] = { ...brand, hero }; setPage({ ...page, items });
          }} />
          <TextField label="Заголовок карточек" value={brand.sectionTitle} onChange={(sectionTitle) => {
            const items = [...page.items]; items[index] = { ...brand, sectionTitle }; setPage({ ...page, items });
          }} />
          {brand.cards.map((card, cardIndex) => (
            <ImageTextManager key={`${card.title}-${cardIndex}`} item={card} onChange={(next) => {
              const cards = [...brand.cards]; cards[cardIndex] = next;
              const items = [...page.items]; items[index] = { ...brand, cards }; setPage({ ...page, items });
            }} onRemove={() => {
              const cards = brand.cards.filter((_, itemIndex) => itemIndex !== cardIndex);
              const items = [...page.items]; items[index] = { ...brand, cards }; setPage({ ...page, items });
            }} />
          ))}
          <button type="button" onClick={() => {
            const items = [...page.items]; items[index] = { ...brand, cards: [...brand.cards, { title: "Новая работа", caption: "Описание", image: "", visible: true }] }; setPage({ ...page, items });
          }} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 hover:border-[#c43a52]">Добавить карточку</button>
        </Card>
      ))}
    </>
  );
}

function SimplePageEditor({ pageKey, title, content, setContent }: EditorProps & { pageKey: "commercial" | "works"; title: string }) {
  const page = content.pages[pageKey];
  const setPage = (next: typeof page) => setContent({ ...content, pages: { ...content.pages, [pageKey]: next } });
  return (
    <Card title={title}>
      <SeoEditor seo={page.seo} onChange={(seo) => setPage({ ...page, seo })} />
      <PageHeroEditor hero={page.hero} onChange={(hero) => setPage({ ...page, hero })} />
      {page.cards.map((card, index) => (
        <ImageTextManager key={`${card.title}-${index}`} item={card} onChange={(next) => {
          const cards = [...page.cards]; cards[index] = next; setPage({ ...page, cards });
        }} onRemove={() => setPage({ ...page, cards: page.cards.filter((_, itemIndex) => itemIndex !== index) })} />
      ))}
      <button type="button" onClick={() => setPage({ ...page, cards: [...page.cards, { title: "Новая карточка", caption: "Описание", image: "", visible: true }] })} className="border border-white/14 px-4 py-3 text-sm font-bold text-white/80 hover:border-[#c43a52]">
        Добавить карточку
      </button>
    </Card>
  );
}

const headerFields: Array<[keyof SiteContent["header"], string]> = [
  ["servicesLabel", "Меню: Услуги"], ["allServicesLabel", "Меню: Все услуги"],
  ["brandsLabel", "Меню: Марки"], ["allBrandsLabel", "Меню: Все марки"],
  ["commercialLabel", "Меню: Коммерческий транспорт"], ["worksLabel", "Меню: Наши работы"],
  ["reviewsLabel", "Меню: Отзывы"], ["contactsLabel", "Меню: Контакты"], ["appointmentLabel", "Кнопка записи"]
];

const interfaceFields: Array<[keyof SiteContent["interface"], string, boolean?]> = [
  ["brandSectionTitle", "Заголовок блока марок"], ["facilityTitle", "Заголовок фотогалереи"], ["facilityText", "Описание фотогалереи", true], ["facilityPhotoLabel", "Подпись на фото"],
  ["calculatorTransportLabel", "Калькулятор: тип транспорта"], ["calculatorServiceLabel", "Калькулятор: услуга"], ["calculatorSizeLabel", "Калькулятор: объём"], ["calculatorTermPrefix", "Калькулятор: срок"],
  ["detailsLabel", "Кнопка Подробнее"], ["calculateLabel", "Кнопка Рассчитать"], ["directionLabel", "Метка направления"],
  ["bookingChoiceEyebrow", "Выбор записи: метка"], ["bookingChoiceTitle", "Выбор записи: заголовок"], ["bookingChoiceText", "Выбор записи: текст", true], ["callbackLabel", "Обратный звонок: кнопка"], ["callbackHint", "Обратный звонок: подсказка"], ["appointmentHint", "Запись: подсказка"],
  ["callbackTitle", "Заголовок обратного звонка"], ["callbackText", "Текст обратного звонка", true], ["callbackSuccessTitle", "Звонок: успех"], ["callbackSuccessText", "Звонок: текст успеха", true], ["nameLabel", "Поле: имя"], ["namePlaceholder", "Подсказка имени"], ["phoneLabel", "Поле: телефон"], ["callbackSubmitLabel", "Кнопка обратного звонка"],
  ["appointmentEyebrow", "Запись: метка"], ["appointmentTitle", "Запись: заголовок"], ["appointmentText", "Запись: текст", true], ["appointmentSuccessTitle", "Запись: успех"], ["appointmentSuccessText", "Запись: текст успеха", true], ["dateLabel", "Поле: дата"], ["timeLabel", "Поле: время"], ["problemLabel", "Поле: проблема"], ["problemPlaceholder", "Подсказка проблемы", true], ["appointmentSubmitLabel", "Кнопка записи"],
  ["leadTitle", "Заявка: заголовок"], ["leadText", "Заявка: текст", true], ["leadSuccessTitle", "Заявка: успех"], ["leadSuccessText", "Заявка: текст успеха", true], ["vehicleTypeLabel", "Поле: тип транспорта"], ["serviceRequestLabel", "Поле: услуга"], ["serviceRequestPlaceholder", "Подсказка услуги", true], ["leadSubmitLabel", "Кнопка заявки"]
];

function GeneralEditor({ content, setContent }: EditorProps) {
  return (
    <>
      <Card title="Хедер и меню">
        {headerFields.map(([key, label]) => <TextField key={key} label={label} value={content.header[key]} onChange={(value) => setContent({ ...content, header: { ...content.header, [key]: value } })} />)}
      </Card>
      <FooterEditor content={content} setContent={setContent} />
      <Card title="Формы и общие подписи">
        {interfaceFields.map(([key, label, textarea]) => <TextField key={key} label={label} textarea={textarea} value={content.interface[key]} onChange={(value) => setContent({ ...content, interface: { ...content.interface, [key]: value } })} />)}
      </Card>
    </>
  );
}

type EditorProps = {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
};
