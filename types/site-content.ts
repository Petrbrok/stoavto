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
  contact: ContactContent;
  home: {
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
    services: FooterService[];
  };
};
