export interface Product {
  id: string;
  name: string;
  price: number;
  currency: 'USD' | 'EUR' | 'COP';
  images: {
    main: string;
    hover?: string;
    gallery: string[];
    miniBanner?: string;
    url_img: string;
  };
  variants: Variant[];
  category: string;
  description: string;
  benefits?: string[];
  benefitsGroups?: ProductBenefitGroup[];
  faqs?: ProductFaq[];
  extraSections?: ProductExtraSection[];
  icons: ProductIcon[];
  alsoInterestedIds: string[];
  shorts?: string[];
}

export interface ProductExtraSection {
    title: string;
    content: string;
}

export interface ProductFaq {
    question: string;
    answer: string;
}

export interface ProductBenefitGroup {
    title: string;
    items: string[];
}

export interface Variant {
  sku: string;
  name: string;
  size?: string;
  price?: number;
}

export interface ProductIcon {
  icon: string;
  description: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
}

export interface HeroSlide {
  id: string;
  images: {
    desktop: string;
    mobile: string;
    square?: string;
  };
  title: string;
  subtitle?: string;
  link: string;
}

export interface CartItem {
  id: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface CheckoutData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  document: string;
  typeDocument: string;
  address: string;
  city: string;
  department: string;
  departmentId: string;
  notes?: string;
}