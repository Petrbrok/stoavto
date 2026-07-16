export type ContactPhone = {
  label: string;
  href: string;
  visible: boolean;
};

export type ContactContent = {
  phone: string;
  phoneHref: string;
  phones?: ContactPhone[];
  hours: string;
};

export type ImageTextItem = {
  title: string;
  caption: string;
  image?: string;
  visible?: boolean;
};

export type SeoContent = {
  title: string;
  description: string;
};

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
};

export type PageCardContent = ImageTextItem;

export type ServicePageContent = {
  slug: string;
  name: string;
  visible: boolean;
  seo: SeoContent;
  hero: PageHeroContent;
  sectionTitle: string;
  features: PageCardContent[];
};

export type BrandPageContent = {
  slug: string;
  name: string;
  icon?: string;
  fallbackLabel?: string;
  visible: boolean;
  seo: SeoContent;
  hero: PageHeroContent;
  sectionTitle: string;
  cards: PageCardContent[];
};

export type InsurancePartnerContent = {
  name: string;
  logo: string;
  url: string;
  visible: boolean;
};

export type ReviewContent = {
  name: string;
  car: string;
  text: string;
  photo: string;
  visible: boolean;
};

export type CalculatorOption = {
  label: string;
  value: string;
  factor?: number;
  visible?: boolean;
};

export type CalculatorService = {
  label: string;
  value: string;
  base: number;
  max: number;
  days: string;
  visible: boolean;
};

export type CalculatorToggle = {
  label: string;
  value: string;
  amountType?: "fixed" | "percent";
  amount: number;
  defaultChecked: boolean;
  visible: boolean;
};

export type CalculatorContent = {
  eyebrow: string;
  title: string;
  text: string;
  resultLabel: string;
  resultNote: string;
  submitLabel: string;
  transports: CalculatorOption[];
  sizes: CalculatorOption[];
  services: CalculatorService[];
  toggles: CalculatorToggle[];
};

export type FooterService = {
  label: string;
  href: string;
  visible: boolean;
};

export type SiteContent = {
  header: {
    servicesLabel: string;
    allServicesLabel: string;
    brandsLabel: string;
    allBrandsLabel: string;
    commercialLabel: string;
    worksLabel: string;
    reviewsLabel: string;
    contactsLabel: string;
    appointmentLabel: string;
  };
  contact: ContactContent;
  home: {
    seo: SeoContent;
    eyebrow: string;
    titleLines: string[];
    accent: string;
    text: string;
    primaryButton: string;
    secondaryButton: string;
    heroBenefits: string[];
    desktopHeroImage: string;
    mobileHeroImage: string;
  };
  insurance: {
    title: string;
    partners: InsurancePartnerContent[];
  };
  advantages: string[];
  calculator: CalculatorContent;
  ideas: ImageTextItem[];
  facilityPhotos: ImageTextItem[];
  reviews: {
    title: string;
    subtitle: string;
    items: ReviewContent[];
  };
  footer: {
    text: string;
    servicesTitle: string;
    contactsTitle: string;
    appointmentLabel: string;
    copyright: string;
    bottomText: string;
    adminLabel: string;
    services: FooterService[];
  };
  pages: {
    services: {
      seo: SeoContent;
      hero: PageHeroContent;
      servicesTitle: string;
      capabilitiesTitle: string;
      items: ServicePageContent[];
    };
    brands: {
      seo: SeoContent;
      hero: PageHeroContent;
      cardCaption: string;
      capabilitiesTitle: string;
      items: BrandPageContent[];
    };
    commercial: {
      seo: SeoContent;
      hero: PageHeroContent;
      cards: PageCardContent[];
    };
    works: {
      seo: SeoContent;
      hero: PageHeroContent;
      cards: PageCardContent[];
    };
  };
  interface: {
    brandSectionTitle: string;
    facilityTitle: string;
    facilityText: string;
    facilityPhotoLabel: string;
    calculatorTransportLabel: string;
    calculatorServiceLabel: string;
    calculatorSizeLabel: string;
    calculatorTermPrefix: string;
    detailsLabel: string;
    calculateLabel: string;
    directionLabel: string;
    bookingChoiceEyebrow: string;
    bookingChoiceTitle: string;
    bookingChoiceText: string;
    callbackLabel: string;
    callbackHint: string;
    appointmentHint: string;
    callbackTitle: string;
    callbackText: string;
    callbackSuccessTitle: string;
    callbackSuccessText: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    callbackSubmitLabel: string;
    appointmentEyebrow: string;
    appointmentTitle: string;
    appointmentText: string;
    appointmentSuccessTitle: string;
    appointmentSuccessText: string;
    dateLabel: string;
    timeLabel: string;
    problemLabel: string;
    problemPlaceholder: string;
    appointmentSubmitLabel: string;
    leadTitle: string;
    leadText: string;
    leadSuccessTitle: string;
    leadSuccessText: string;
    vehicleTypeLabel: string;
    serviceRequestLabel: string;
    serviceRequestPlaceholder: string;
    leadSubmitLabel: string;
  };
};
