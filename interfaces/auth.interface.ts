export interface ILoginResponse {
  tokens: {
    access: { expires: string; token: string };
    refresh: { expires: string; token: string };
  };
  user: {
    deletedAt: string | null;
    email: string;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    isEmailVerified: boolean;
    name: string;
    roles: Array<string>;
  };
}
