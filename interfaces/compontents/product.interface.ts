import { IPaginationResponse } from '../general.interface';
import { IEachGenreData } from '../genre.interface';

export interface IProductInfo {
  data: any;
  isLoading: boolean;
}
export interface IProductSlides {
  slideData: IPaginationResponse<IEachProductData> | undefined;
  detailData: IEachProductData | undefined;
  isSlideLoading: boolean;
  isSlideFetching: boolean;
}

export interface IEachProductData {
  authors: Array<{
    bio: null | string;
    birthDate: null | string;
    deathDate: null | string;
    id: number;
    name: string;
  }>;
  genres: Array<IEachGenreData>;
  availableQuantity: number;
  description: string;
  id: number;
  images: Array<{
    imageType: string;
    key: string | number | null;
    url: string;
  }>;
  isbn: string;
  language: string;
  name: string;
  price: number;
  priceDiscount: number;
  publishedDate: string;
  publisher: {
    address: null | string;
    booksCount: number;
    email: null | string;
    id: number;
    name: string;
    phone: null | string;
  };
  totalPages: number;
  rating: number;
  ratingCount: number;
}
