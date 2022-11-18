export default interface IUser {
  find(arg0: (user: { username: string | undefined; }) => boolean): unknown;
  id?: number;
  username: string;
  password: string;
  accountId: number;
  account: {balance: number};
}
