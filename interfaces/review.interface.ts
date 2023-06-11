export interface IReviewItem {
  rating: number;
  comment: string;
  user: string;
}
export interface IEachReviewData {
  createDate: null | string;
  updateDate: null | string;
  createBy: null | string;
  updateBy: null | string;
  id: number;
  content: string;
  rating: number;
  bookId: number;
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
    roles: Array<{ id: number; name: string }>;
  };
}
