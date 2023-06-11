export interface IEachPostData {
  author: {
    deletedAt: string | null;
    email: string;
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    isEmailVerified: boolean;
    name: string;
    roles: Array<string>;
  };
  content: string;
  id: number;
  title: string;
  updateBy: string;
  updateDate: string;
  createBy: string;
  createDate: string;
}
