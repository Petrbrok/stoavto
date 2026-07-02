import type { SiteContent } from "@/types/site-content";

const defaultFacilityPhotos = [
  {
    title: "Подъёмники для коммерческого транспорта",
    caption: "Отдельная зона для микроавтобусов, фургонов и рабочих автомобилей."
  },
  {
    title: "Стенд развал-схождения",
    caption: "Точная настройка геометрии подвески после ремонта и обслуживания."
  },
  {
    title: "Кузовной цех",
    caption: "Стапельные, арматурные и восстановительные работы в одном контуре."
  },
  {
    title: "Малярный участок",
    caption: "Подготовка, подбор цвета и окраска с контролем результата."
  },
  {
    title: "Зона диагностики",
    caption: "Компьютерная проверка, слесарная дефектовка и прозрачная смета."
  },
  {
    title: "Рабочий процесс",
    caption: "Фотоотчёт по этапам, согласование скрытых работ и понятные сроки."
  },
  {
    title: "Фотографии выполненных работ",
    caption: "Крупные кейсы до и после ремонта без декоративных заменителей."
  },
  {
    title: "Коммерческий транспорт в ремонте",
    caption: "Показываем реальные фургоны и микроавтобусы на постах сервиса."
  }
];

export const defaultSiteContent: SiteContent = {
  contact: {
    phone: "+7 (900) 000-00-00",
    phoneHref: "tel:+79000000000",
    hours: "Ежедневно с 10:00 до 21:00"
  },
  home: {
    eyebrow: "СТОАВТО / полный цикл",
    titleLines: ["Полный цикл", "ремонта авто", "и коммерческого", "транспорта"],
    accent: "коммерческого",
    text: "Кузовной ремонт, покраска, диагностика, развал-схождение и слесарные работы в одном автотехцентре.",
    primaryButton: "Рассчитать стоимость",
    secondaryButton: "Записаться на ремонт",
    heroBenefits: [
      "Собственный кузовной и малярный цех",
      "Работаем с микроавтобусами и фургонами",
      "Фотоотчёт по этапам ремонта",
      "Гарантия на выполненные работы"
    ],
    mobileHeroImage: "/images/hero-mobile-stoavto.png"
  },
  insurance: {
    title: "Сотрудничаем со страховыми компаниями",
    partners: [
      { name: "Росгосстрах", logo: "/images/partner-rosgosstrakh-logo.png", url: "https://www.rgs.ru/", visible: true },
      { name: "Ингосстрах", logo: "/images/partner-ingosstrakh-logo.png", url: "https://www.ingos.ru/", visible: true },
      { name: "ВСК", logo: "/images/partner-vsk-logo.png", url: "https://www.vsk.ru/", visible: true },
      { name: "Ренессанс", logo: "/images/partner-renins-logo.png", url: "https://www.renins.ru/", visible: true },
      {
        name: "СОГАЗ",
        logo: "/uploads/partner-sogaz-logo.png",
        url: "https://www.sogaz.ru/",
        visible: true
      }
    ]
  },
  advantages: [
    "Собственный кузовной цех",
    "Малярный участок",
    "Работаем с коммерческим транспортом",
    "Фотоотчёт по ремонту",
    "Гарантия на работы"
  ],
  calculator: {
    eyebrow: "Предварительный расчёт",
    title: "Узнайте порядок цены до визита в техцентр",
    text: "Калькулятор даёт ориентир. Точная стоимость фиксируется после осмотра, дефектовки и согласования сметы.",
    resultLabel: "Примерная стоимость",
    resultNote: "Включаем дефектовку, согласование работ и понятный список этапов.",
    submitLabel: "Отправить расчёт",
    transports: [
      { label: "Легковой автомобиль", value: "car", factor: 1 },
      { label: "Микроавтобус / фургон", value: "van", factor: 1.18 },
      { label: "Коммерческий транспорт", value: "commercial", factor: 1.35 }
    ],
    sizes: [
      { label: "Небольшой", value: "small", factor: 0.72 },
      { label: "Средний", value: "medium", factor: 1 },
      { label: "Крупный", value: "large", factor: 1.55 }
    ],
    services: [
      { label: "Диагностика", value: "diagnostics", base: 1500, max: 3500, days: "1-2 часа", visible: true },
      { label: "Кузовной ремонт", value: "body", base: 2500, max: 18000, days: "1-3 дня", visible: true },
      { label: "Покраска", value: "paint", base: 3000, max: 22000, days: "2-5 дней", visible: true },
      { label: "Развал-схождение", value: "alignment", base: 2000, max: 4500, days: "1-2 часа", visible: true },
      { label: "Слесарные работы", value: "mechanic", base: 2500, max: 16000, days: "1-2 дня", visible: true },
      { label: "Коммерческий транспорт", value: "commercial", base: 4500, max: 30000, days: "2-6 дней", visible: true }
    ],
    toggles: [
      { label: "Нужна покраска", value: "paint", amount: 3500, defaultChecked: true, visible: true },
      { label: "Срочно", value: "urgent", amount: 0, defaultChecked: false, visible: true },
      { label: "Фотоотчёт", value: "report", amount: 0, defaultChecked: true, visible: true }
    ]
  },
  ideas: [
    {
      title: "Как считается цена",
      caption: "Повреждение, деталь, покраска, тип транспорта: всё видно до старта.",
      visible: true
    },
    {
      title: "До начала работ",
      caption: "Фотофиксация, дефектовка, смета и согласование скрытых работ.",
      visible: true
    },
    {
      title: "Свободные окна",
      caption: "Быстрая запись на ближайшее удобное время без лишних звонков.",
      visible: true
    },
    {
      title: "Коммерческий транспорт без простоя",
      caption: "Приоритет сроков, понятные этапы и фотоотчёт для рабочих машин.",
      visible: true
    }
  ],
  facilityPhotos: defaultFacilityPhotos.map((item) => ({ ...item, visible: true })),
  reviews: {
    title: "Отзывы клиентов",
    subtitle: "Фото, автомобили и тексты можно менять из админ-панели.",
    items: [
      {
        name: "Алексей",
        car: "Mercedes-Benz Sprinter",
        text: "Согласовали смету, прислали фото по этапам и вернули фургон в срок.",
        photo: "/images/hero-mobile-stoavto.png",
        visible: true
      },
      {
        name: "Ирина",
        car: "Audi A6",
        text: "После покраски цвет попал точно, зазоры выставили аккуратно.",
        photo: "/images/hero-stoavto-new.png",
        visible: true
      },
      {
        name: "Дмитрий",
        car: "BMW 5 Series",
        text: "Диагностика понятная, без навязанных работ. Всё показали на месте.",
        photo: "/images/hero-desktop-stoavto.png",
        visible: true
      }
    ]
  },
  footer: {
    text: "Автотехцентр полного цикла для легковых автомобилей и коммерческого транспорта.",
    servicesTitle: "Услуги",
    contactsTitle: "Контакты",
    appointmentLabel: "Записаться на удобное время",
    copyright: "© СТОАВТО",
    bottomText: "Кузовной ремонт, покраска и обслуживание транспорта",
    services: [
      { label: "Кузовной ремонт", href: "/uslugi/kuzovnoy-remont", visible: true },
      { label: "Покраска", href: "/uslugi/pokraska-avto", visible: true },
      { label: "Диагностика", href: "/uslugi/diagnostika", visible: true },
      { label: "Развал-схождение", href: "/uslugi/razval-shozhdenie", visible: true },
      { label: "Слесарные работы", href: "/uslugi/slesarnye-raboty", visible: true }
    ]
  }
};
