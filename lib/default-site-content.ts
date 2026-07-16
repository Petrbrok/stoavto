import type { SiteContent } from "@/types/site-content";
import { brands, mainPages, services } from "@/data/site";

const pageMeta = (path: string) => mainPages.find((item) => item.path === path)!;

const serviceFeatureCaptions: Record<string, string> = {
  "Дефектовка повреждений": "Осматриваем повреждённые детали и определяем объём восстановления до расчёта сметы.",
  "Стапельные работы": "Восстанавливаем геометрию кузова после серьёзных повреждений.",
  "Арматурный ремонт": "Снимаем и устанавливаем детали, которые мешают ремонту кузова или окраске.",
  "Подготовка к окраске": "Выравниваем поверхность и готовим её к нанесению краски.",
  "Подбор цвета": "Подбираем оттенок под автомобиль, чтобы отремонтированная деталь не выбивалась из кузова.",
  "Локальная окраска": "Окрашиваем повреждённый участок без полной перекраски автомобиля.",
  "Полная окраска": "Готовим и окрашиваем весь кузов, когда локального ремонта недостаточно.",
  "Полировка после работ": "Финишно обрабатываем окрашенную поверхность перед выдачей автомобиля.",
  "Компьютерная диагностика": "Считываем ошибки электронных систем перед составлением списка работ.",
  "Проверка подвески": "Проверяем элементы подвески и отмечаем детали, требующие ремонта или замены.",
  "Осмотр электрики": "Проверяем электрические цепи и оборудование, связанные с неисправностью.",
  "Смета ремонта": "Фиксируем найденные неисправности и стоимость согласованных работ.",
  "Проверка геометрии": "Измеряем углы установки колёс до регулировки.",
  "Регулировка углов": "Настраиваем углы установки колёс по результатам измерения.",
  "Контроль после ДТП": "Проверяем геометрию колёс после кузовного ремонта или удара.",
  "Отчет по результату": "Показываем результаты проверки и выполненной регулировки.",
  "Ремонт подвески": "Меняем или восстанавливаем согласованные элементы подвески.",
  "Тормозная система": "Проверяем и ремонтируем элементы, от которых зависит торможение автомобиля.",
  "Плановое ТО": "Меняем расходные материалы по согласованному перечню.",
  "Согласование запчастей": "До заказа обсуждаем детали и их стоимость."
};

const brandCardCaptions: Record<string, string> = {
  "Диагностика": "Компьютерная проверка, осмотр подвески и электрики перед ремонтом.",
  "Кузовной ремонт и покраска": "Дефектовка, восстановление кузова, подбор цвета и окраска.",
  "Слесарное обслуживание": "Ремонт подвески и тормозной системы, плановое ТО и согласование запчастей."
};

const commercialCardCaptions: Record<string, string> = {
  "Микроавтобусы": "Диагностика, кузовной ремонт, окраска и слесарные работы для пассажирских и грузовых микроавтобусов.",
  "Фургоны": "Ремонт кузова, окраска, диагностика и обслуживание рабочих фургонов.",
  "Рабочие автомобили": "Согласовываем смету и присылаем фотографии этапов, чтобы владелец контролировал ремонт автомобиля."
};

const workCardCaptions: Record<string, string> = {
  "Кузовной ремонт после ДТП": "Дефектовка, восстановление геометрии, арматурные работы и подготовка к окраске.",
  "Покраска элементов": "Подбор цвета, подготовка поверхности, окраска и финишная полировка.",
  "Коммерческий транспорт в ремонте": "Кузовные и слесарные работы для микроавтобусов, фургонов и рабочих автомобилей.",
  "Диагностика и слесарные работы": "Проверка систем автомобиля, ремонт подвески и тормозной системы.",
  "Развал-схождение после ремонта": "Проверка геометрии колёс и регулировка углов после работ с кузовом или подвеской.",
  "Выдача автомобиля клиенту": "Показываем выполненные работы и результат перед передачей автомобиля."
};

const defaultFacilityPhotos = [
  {
    title: "Подъёмники для коммерческого транспорта",
    caption: "На отдельном участке принимаем микроавтобусы, фургоны и рабочие автомобили."
  },
  {
    title: "Стенд развал-схождения",
    caption: "Проверяем и регулируем углы установки колёс после ремонта кузова или подвески."
  },
  {
    title: "Кузовной цех",
    caption: "Здесь выполняем стапельные, арматурные и восстановительные работы."
  },
  {
    title: "Малярный участок",
    caption: "Готовим поверхность, подбираем цвет и окрашиваем отдельные элементы или весь кузов."
  },
  {
    title: "Зона диагностики",
    caption: "Проверяем электронные системы и подвеску перед составлением сметы."
  },
  {
    title: "Рабочий процесс",
    caption: "Фиксируем этапы на фото и согласовываем дополнительные работы до их выполнения."
  },
  {
    title: "Фотографии выполненных работ",
    caption: "Показываем состояние автомобиля до ремонта, основные этапы и результат."
  },
  {
    title: "Коммерческий транспорт в ремонте",
    caption: "Показываем, какие работы выполняются с фургонами и микроавтобусами."
  }
];

export const defaultSiteContent: SiteContent = {
  header: {
    servicesLabel: "Услуги",
    allServicesLabel: "Все услуги",
    brandsLabel: "Марки",
    allBrandsLabel: "Все марки",
    commercialLabel: "Коммерческий транспорт",
    worksLabel: "Наши работы",
    reviewsLabel: "Отзывы",
    contactsLabel: "Контакты",
    appointmentLabel: "Записаться на удобное время"
  },
  contact: {
    phone: "+7 (900) 000-00-00",
    phoneHref: "tel:+79000000000",
    phones: [
      { label: "+7 (900) 000-00-00", href: "tel:+79000000000", visible: true }
    ],
    hours: "Ежедневно с 10:00 до 21:00"
  },
  home: {
    seo: {
      title: "СТОАВТО | Ремонт легковых автомобилей и фургонов",
      description: "Кузовной ремонт, покраска, диагностика, развал-схождение и слесарные работы для легковых автомобилей и коммерческого транспорта."
    },
    eyebrow: "СТОАВТО / кузовной и слесарный ремонт",
    titleLines: ["Полный цикл", "ремонта авто", "и коммерческого", "транспорта"],
    accent: "коммерческого",
    text: "Кузовной ремонт, покраска, диагностика, развал-схождение и слесарные работы в одном автотехцентре.",
    primaryButton: "Рассчитать стоимость",
    secondaryButton: "Записаться на ремонт",
    heroBenefits: [
      "Кузовной и малярный участки в одном техцентре",
      "Принимаем микроавтобусы и фургоны",
      "Присылаем фотографии этапов ремонта",
      "Согласовываем смету до начала работ"
    ],
    desktopHeroImage: "/images/hero-stoavto-new.png",
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
    "Стапельный и арматурный ремонт кузова",
    "Подбор цвета и окраска",
    "Ремонт микроавтобусов и фургонов",
    "Фотографии этапов ремонта",
    "Смета до начала работ"
  ],
  calculator: {
    eyebrow: "Предварительный расчёт",
    title: "Рассчитайте ориентировочную стоимость",
    text: "Выберите автомобиль, услугу и объём работ. Окончательную сумму назовём после осмотра и дефектовки.",
    resultLabel: "Примерная стоимость",
    resultNote: "После осмотра перечислим необходимые работы и согласуем смету.",
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
      { label: "Нужна покраска", value: "paint", amountType: "fixed", amount: 3500, defaultChecked: true, visible: true },
      { label: "Срочно", value: "urgent", amountType: "percent", amount: 18, defaultChecked: false, visible: true },
      { label: "Фотоотчёт", value: "report", amountType: "fixed", amount: 0, defaultChecked: true, visible: true }
    ]
  },
  ideas: [
    {
      title: "Как считается цена",
      caption: "На сумму влияют повреждённые детали, объём подготовки, окраска и тип автомобиля.",
      visible: true
    },
    {
      title: "До начала работ",
      caption: "Осматриваем автомобиль, фиксируем повреждения и согласовываем смету.",
      visible: true
    },
    {
      title: "Запись на ремонт",
      caption: "Выберите дату и время. Менеджер проверит загрузку и подтвердит запись.",
      visible: true
    },
    {
      title: "Ремонт рабочего транспорта",
      caption: "Для фургонов и микроавтобусов согласовываем этапы и присылаем фотографии ремонта.",
      visible: true
    }
  ],
  facilityPhotos: defaultFacilityPhotos.map((item) => ({ ...item, visible: true })),
  reviews: {
    title: "Отзывы клиентов",
    subtitle: "Что клиенты говорят о смете, ходе работ и результате ремонта.",
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
    text: "Кузовной ремонт, покраска, диагностика и слесарные работы для легковых автомобилей, микроавтобусов и фургонов.",
    servicesTitle: "Услуги",
    contactsTitle: "Контакты",
    appointmentLabel: "Записаться на удобное время",
    copyright: "© СТОАВТО",
    bottomText: "Кузовной ремонт, покраска и обслуживание транспорта",
    adminLabel: "Админ",
    services: [
      { label: "Кузовной ремонт", href: "/uslugi/kuzovnoy-remont", visible: true },
      { label: "Покраска", href: "/uslugi/pokraska-avto", visible: true },
      { label: "Диагностика", href: "/uslugi/diagnostika", visible: true },
      { label: "Развал-схождение", href: "/uslugi/razval-shozhdenie", visible: true },
      { label: "Слесарные работы", href: "/uslugi/slesarnye-raboty", visible: true }
    ]
  },
  pages: {
    services: {
      seo: pageMeta("/uslugi"),
      hero: {
        eyebrow: "Услуги СТОАВТО",
        title: "Кузовной, малярный и слесарный ремонт",
        text: "Кузовной ремонт, покраска, диагностика, развал-схождение и слесарные работы для легковых автомобилей и коммерческого транспорта.",
        image: "/images/hero-stoavto-new.png"
      },
      servicesTitle: "Основные услуги",
      capabilitiesTitle: "Участки и оборудование",
      items: services.map((service) => ({
        slug: service.slug,
        name: service.name,
        visible: true,
        seo: { title: service.title, description: service.description },
        hero: { eyebrow: "Услуга СТОАВТО", title: service.h1, text: service.summary, image: "/images/hero-stoavto-new.png" },
        sectionTitle: "Что входит в услугу",
        features: service.features.map((title) => ({ title, caption: serviceFeatureCaptions[title], image: "", visible: true }))
      }))
    },
    brands: {
      seo: pageMeta("/marki"),
      hero: {
        eyebrow: "Марки автомобилей",
        title: "Какие марки принимаем в ремонт",
        text: "Для каждой марки доступны диагностика, кузовной ремонт, покраска и слесарные работы.",
        image: "/images/hero-desktop-stoavto.png"
      },
      cardCaption: "Ремонт и обслуживание",
      capabilitiesTitle: "Участки и оборудование",
      items: brands.map((brand) => ({
        ...brand,
        visible: true,
        seo: { title: `Ремонт ${brand.name} в СТОАВТО`, description: `Обслуживание и ремонт ${brand.name}: диагностика, кузовной ремонт, покраска и слесарные работы.` },
        hero: { eyebrow: "Марка автомобиля", title: `Ремонт и обслуживание ${brand.name}`, text: `Для ${brand.name} выполняем диагностику, кузовной ремонт, покраску и слесарные работы.`, image: "/images/hero-desktop-stoavto.png" },
        sectionTitle: `Какие работы выполняем для ${brand.name}`,
        cards: ["Диагностика", "Кузовной ремонт и покраска", "Слесарное обслуживание"].map((title) => ({ title, caption: brandCardCaptions[title], image: "", visible: true }))
      }))
    },
    commercial: {
      seo: pageMeta("/kommercheskiy-transport"),
      hero: { eyebrow: "Коммерческий транспорт", title: "Ремонт микроавтобусов, фургонов и рабочих автомобилей", text: "Выполняем диагностику, кузовной и слесарный ремонт, подготовку и окраску. Этапы фиксируем на фото.", image: "/images/hero-industrial-stoavto.png" },
      cards: ["Микроавтобусы", "Фургоны", "Рабочие автомобили"].map((title) => ({ title, caption: commercialCardCaptions[title], image: "", visible: true }))
    },
    works: {
      seo: pageMeta("/raboty"),
      hero: { eyebrow: "Выполненные работы", title: "Кузовной ремонт, окраска и обслуживание", text: "Для каждого направления показываем состав работ: от дефектовки до проверки результата перед выдачей автомобиля.", image: "/images/hero-stoavto-new.png" },
      cards: ["Кузовной ремонт после ДТП", "Покраска элементов", "Коммерческий транспорт в ремонте", "Диагностика и слесарные работы", "Развал-схождение после ремонта", "Выдача автомобиля клиенту"].map((title) => ({ title, caption: workCardCaptions[title], image: "", visible: true }))
    }
  },
  interface: {
    brandSectionTitle: "Обслуживаем популярные марки",
    facilityTitle: "Участки, оборудование и ход ремонта",
    facilityText: "Показываем, где и как выполняются кузовные, малярные, диагностические и слесарные работы.",
    facilityPhotoLabel: "СТОАВТО",
    calculatorTransportLabel: "Тип транспорта", calculatorServiceLabel: "Услуга", calculatorSizeLabel: "Объём работ", calculatorTermPrefix: "Ориентировочный срок:",
    detailsLabel: "Подробнее", calculateLabel: "Рассчитать", directionLabel: "Направление работ",
    bookingChoiceEyebrow: "Онлайн-консультация", bookingChoiceTitle: "Что удобнее?", bookingChoiceText: "Можно выбрать точную дату и время или оставить контакты для обратного звонка.",
    callbackLabel: "Получить обратный звонок", callbackHint: "Только имя и телефон.", appointmentHint: "Дата и время в форме записи.",
    callbackTitle: "Заказать обратный звонок", callbackText: "Оставьте имя и номер. Менеджер уточнит автомобиль и задачу, чтобы понять, нужен ли осмотр.", callbackSuccessTitle: "Форма заполнена.", callbackSuccessText: "Автоматическая отправка пока не подключена. Позвоните по номеру в шапке сайта.",
    nameLabel: "Имя", namePlaceholder: "Ваше имя", phoneLabel: "Телефон", callbackSubmitLabel: "Заказать обратный звонок",
    appointmentEyebrow: "Запись на ремонт", appointmentTitle: "Выберите дату и время", appointmentText: "Укажите дату, время и неисправность. Запись нужно подтвердить после проверки загрузки техцентра.", appointmentSuccessTitle: "Форма заполнена.", appointmentSuccessText: "Автоматическая отправка пока не подключена. Позвоните по номеру в шапке сайта.", dateLabel: "Дата", timeLabel: "Время", problemLabel: "Что нужно проверить или отремонтировать", problemPlaceholder: "Например: диагностика, покраска двери или ремонт фургона", appointmentSubmitLabel: "Записаться на удобное время",
    leadTitle: "Запросить расчёт", leadText: "Укажите тип автомобиля и необходимые работы. Точную стоимость можно назвать после осмотра.", leadSuccessTitle: "Форма заполнена.", leadSuccessText: "Автоматическая отправка пока не подключена. Позвоните по номеру в шапке сайта.", vehicleTypeLabel: "Тип транспорта", serviceRequestLabel: "Что нужно сделать", serviceRequestPlaceholder: "Например: кузовной ремонт и покраска", leadSubmitLabel: "Запросить расчёт"
  }
};
