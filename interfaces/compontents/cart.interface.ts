import { Dispatch, SetStateAction } from 'react';
import { IEachAddressOfUserData } from '../address.interface';

export interface IEachCartData {
  bookId: string;
  imageUrl: string;
  checked: boolean;
  name: string;
  price: number;
  priceDiscount: number;
  quantity: number;
  totalPrice: number;
}

export interface ICartResponse {
  items: IEachCartData[];
  user: {
    email: string;
    id: number;
    name: string;
    roles: Array<string>;
    username: string;
  };
}

export interface ICartSection {
  data: IEachCartData[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}
export interface IItemTable {
  items: IEachCartData[];
  handleIncreaseQuantity?: Function;
  handleDecreaseQuantity?: Function;
  handleDelete?: Function;
  checkItem?: Function;
  checkAllItem?: Function;
  clearCart?: Function;
  addressMode?: boolean;
}

export interface IItemTableMobile {
  items: IEachCartData[];
  handleIncreaseQuantity?: Function;
  handleDecreaseQuantity?: Function;
  handleDelete?: Function;
  checkItem?: Function;
  checkAllItem?: Function;
  clearCart?: Function;
  addressMode?: boolean;
}
export interface IOrderSummary {
  items: any;
}
export interface IProductAdded {
  amount: string | number;
}
export interface ISubmitCart {
  userId: number;
  currentIndex: number;
  setCurrentIndex: Function;
  items: IEachCartData[];
  refetchListCart: () => void;
}
export interface IPaymentTab {
  data: any;
  listAddress: IEachAddressOfUserData[];
  refetchAddress: () => void;
  isLoading: boolean;
}

export interface IOrderTable {
  items: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: any;
}
