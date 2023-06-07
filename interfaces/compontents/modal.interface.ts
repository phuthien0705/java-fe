import { Breakpoint } from '@mui/system';
import { IEachAddressOfUserData } from '../address.interface';

export interface IModal {
  handleClose: Function;
  open: boolean;
  currentProduct: any;
  refetchAfterClose?: Function;
}
export interface IConfirmModal {
  open: boolean;
  handleClose: Function;
  handleConfirm: Function;
  contentHeader?: string;
  textContent?: string;
  confirmContent?: string;
  cancelContent?: string;
}
export interface ICustomModal {
  children: React.ReactNode;
  handleClose: Function;
  open: boolean;
  title: string;
  maxWidth?: false | Breakpoint | undefined;
}
export interface IBookModal extends IModal {
  authors: any[];
  genres: any[];
  publishers: any[];
  findAuthor: Function;
  findGenre: Function;
  findPublisher: Function;
}
export interface IAddressModal {
  open: boolean;
  handleClose: () => void;
  listAddress: IEachAddressOfUserData[];

  refetchAddress: () => void;
}

export interface IReviewModal {
  open: boolean;
  handleClose: () => void;
  book: any;
  refetchReviews: () => void;
}
