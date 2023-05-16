import { Dispatch, SetStateAction } from 'react';

export interface ICartSection {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}
export interface IItemTable {
  items: any;
  handleIncreaseQuantity?: Function;
  handleDecreaseQuantity?: Function;
  handleDelete?: Function;
  checkItem?: Function;
  checkAllItem?: Function;
  clearCart?: Function;
  addressMode?: boolean;
}

export interface IItemTableMobile {
  items: any;
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
  currentIndex: number;
  setCurrentIndex: Function;
  items: any;
  listAddress: any;
  refetchListCart: () => void;
}
export interface IPaymentTab {
  data: any;
  listAddress: any;
  refetchAddress: () => void;
}

export interface IOrderTable {
  items: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: any;
}
