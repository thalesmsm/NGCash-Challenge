export default interface ITransaction {
  id: number,
  value: number,
  debitedAccountId: number,
  creditedAccountId: number,
  createdAt: string,
  debitedAccount: {
    balance: number
  },
  creditedAccount: {
    balance: number
  }
}