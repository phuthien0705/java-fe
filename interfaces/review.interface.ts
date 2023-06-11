export interface IReviewItem {
  rating: number;
  comment: string;
  user: string;
}
export interface IEachReviewData {
  user: null | string;
  bookId: string;
  rating: number;
  comment: string;
  createAt: string;
  id: string;
}
