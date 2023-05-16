export interface IProductCard {
  product: any;
  slideMode?: boolean;
  isLoading?: boolean;
  index: number;
}
export interface IProductCardItem {
  product: any;
  index: number;
}
export interface IProductCardItems {
  data: any;
  title?: string;
  titleIcon?: any;
  titleBackground?: string;
  isLoading?: boolean;
  slideToShow?: number;
  genreId?: number | null;
}

export interface IProductCardItemsByGenre {
  title?: string;
  titleIcon?: any;
  titleBackground?: string;
  slideToShow?: number;
  genreId?: number | null;
}
export interface IProductCardSkeleton {
  slideMode?: boolean;
}
export interface IMainCard {
  border?: boolean;
  boxShadow?: boolean;
  children: any;
  content?: boolean;
  contentClass?: string;
  contentSX?: any;
  darkTitle?: boolean;
  secondary?: any;
  shadow?: string;
  sx?: any;
  title?: any;
  [others: string]: unknown;
  elevation?: number;
}
export interface ISubCard {
  children: React.ReactNode;
  content: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary: any;
  sx?: any;
  contentSX?: any;
  title: any;
  [others: string]: unknown;
}
