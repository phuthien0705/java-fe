import { Dispatch, SetStateAction } from 'react';

export interface ISearchAdminSection {
  value: any;
  setValue: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
}
