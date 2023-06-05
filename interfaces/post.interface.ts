export interface IEachPostData {
  author: {
    deletedAt: string | null;
    email: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    isEmailVerified: boolean;
    name: string;
    roles: Array<string>;
  };
  content: string;
  _id: string;
  images: Array<{ key: string; url: string; _id: string }>;
  title: string;
  createdAt: string;
  updatedAt: string;
}
