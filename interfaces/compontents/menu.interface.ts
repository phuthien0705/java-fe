export interface IMenuActionAdmin {
  id: number | string;
  deleteCallback: Function;
  editCallback: Function;
  userMode?: boolean;
}
