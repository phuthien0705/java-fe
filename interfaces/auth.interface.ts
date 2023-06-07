export interface ILoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
    roles: Array<string>;
    username: string;
  };
}
