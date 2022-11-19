import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCashInTransactions,
  getCashOutTransactions,
  getTransactions,
  getUsers,
  postTransaction
} from "../fetchs/fetchs";
import ITransaction from "../interfaces/ITransaction";
import IUser from "../interfaces/IUser";

const Transactions = () => {
  const [allUSers, setallUSers] = useState<IUser[]>();
  const [username, setUsername] = useState<string>();
  const [userLogged, setUserLogged] = useState<IUser>();
  const [transactions, setTransactions] = useState<ITransaction[]>();
  const [credited, setCredited] = useState<string>();
  const [creditedValue, setCreditedValue] = useState<number>();
  
  useEffect(() => {
    getUsers().then((res) => setallUSers(res))
    const setUsers = async () => {
      const allUsers = await getUsers();
      const findUser: IUser | undefined = allUsers.find((user: { username: string | undefined; }) => user.username === username);
      setUserLogged(findUser);
    }
    setUsers();
  
    const localUsername = localStorage.getItem('username');   
    localUsername && setUsername(localUsername)
  
  }, [username]);
  
  useEffect(() => {  
    const token = localStorage.getItem('token');
  
    if (userLogged && token)
      getTransactions(userLogged.accountId, token).then((res) => setTransactions(res));
  },[userLogged]);
  
  const logOut = async () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
  
  const handleSelectTransactions = (e: React.FormEvent<HTMLSelectElement>) => {
    const token = localStorage.getItem('token');
    if (userLogged && token) {
      if (e.currentTarget.value === 'todas') {
        getTransactions(userLogged.accountId, token).then((res) => setTransactions(res));
      }
      if (e.currentTarget.value === 'cashIn') {
        getCashInTransactions(userLogged.accountId, token).then((res) => setTransactions(res));
      }
      if (e.currentTarget.value === 'cashOut') {
        getCashOutTransactions(userLogged.accountId, token).then((res) => setTransactions(res));
      }
    }
  }

  const handleSelectCredited = (e: React.FormEvent<HTMLSelectElement>) => {
    setCredited(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem('token');
    const creditedAccount = allUSers?.find((user) => user.username === credited);

    if (!creditedAccount) {
      e.preventDefault();
      return window.alert('Por favor, selecione alguém para fazer a transaferência!')
    }
    
    if (creditedValue && userLogged && creditedValue > userLogged?.account.balance) {
      return window.alert('Saldo insuficiente')
    }

    if (creditedValue === 0 || creditedValue === undefined) {
      e.preventDefault();
      return window.alert('O valor da transferência não pode ser 0');
    }
    
    if (userLogged && creditedAccount && creditedValue && token) {
      postTransaction(userLogged?.accountId, creditedAccount?.accountId, creditedValue, token);
      return window.alert('Transferência realizada com succeso!')
    }
  }

  return (
    <div>
      <header className="flex justify-between items-center border-b-[1px] py-4 px-4">
        {/* <div> */}
          <p className="text-lg">Olá, {userLogged?.username}!</p>
          <Image src="/logo-ngcash.svg" width={90} height={90} alt="ng Logo" />
          <div className="flex flex-col justify-between items-center h-14">
            <p>Saldo: <span>R$ {userLogged && userLogged.account.balance.toFixed(2)}</span></p>
            <Link href="/">
              <button
                className="ml-4 bg-gradient-to-br from-gray-400 to-gray-600 text-white font-bold px-4 rounded hover:bg-gradient-to-br hover:from-gray-500 hover:to-gray-700"
                onClick={logOut}
              >
                Sair
              </button>
            </Link>
          </div>
      </header>
      <main className="md:flex md:justify-around">
        <section className="flex flex-col items-center mt-5">
          <div className="flex justify-between items-center w-[100vw] mb-5 md:justify-center md:w-[350px] lg:w-[450px] lg:max-w-xl">
            <h1 className="text-xl align-middle font-bold md:mr-12">Transaferências</h1>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-400 focus:border-zinc-500 block p-2.5"
              onChange={handleSelectTransactions}
            >
              <option value="todas">Todas</option>
              <option value="cashIn">Cash in</option>
              <option value="cashOut">Cash out</option>
            </select>
            <div>
              <label htmlFor="diaa"></label>
              <input
                type="date"
                id="diaa"
                // onChange={handleDate}
              />
            </div>
          </div>
          {transactions?.length === 0 ? 
            <p className="text-gray-200">Nenhuma transação foi esfetuada até o momento!</p> :
            <table className="border-collapse w-[100vw] text-center md:w-[350px] lg:w-[450px] lg:max-w-xl">
            <thead>
              <tr className="border-b-2 bg-gradient-to-b from-gray-400/30 to-gray-600/30 text-lg">
                <th className="border-r-[1px] p-2">Transação</th>
                <th className="border-r-[1px] p-2">Valor</th>
                <th className="p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b-[1px] hover:bg-gray-500 text-gray-200"
                >
                  <td className="border-r-[1px] font-bold p-2">
                    {userLogged?.accountId === transaction.debitedAccountId ? 'Cash out' : 'Cash in'}
                  </td>
                  <td className={`${userLogged?.accountId === transaction.debitedAccountId ? 'text-red-500' : 'text-green-500'} border-r-[1px] text-lg font-bold p-2`}>
                    {`${userLogged?.accountId === transaction.debitedAccountId ?
                        ` R$ ${transaction.value.toFixed(2)}` :
                        ` R$ ${transaction.value.toFixed(2)}`}`}
                  </td>
                  <td className="p-2 font-bold">
                    {(transaction.createdAt.slice(0, 10).split('-').reverse().join('/'))}
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          }
          
        </section>
        <section>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between items-center w-[100vw] mb-5 md:w-[350px] lg:w-[450px]">
              <h1 className="text-xl align-middle font-bold my-5">Realizar Transferência</h1>
              <div className="flex w-full max-w-xl">
                <div className="flex flex-col items-center w-1/2">
                  <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="valor">
                    Valor
                  </label>
                  <input
                    id="valor"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-400 focus:border-zinc-500 p-3 w-40"
                    type="number"
                    onChange={
                      (e: React.FormEvent<HTMLInputElement>) =>
                        setCreditedValue(Number(e.currentTarget.value))
                    }
                  />
                </div>
                <div className="flex flex-col items-center w-1/2">
                  <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="para">
                    Para:
                  </label>
                  <select
                    id="para"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-400 focus:border-zinc-500 block p-3 w-40"
                    onChange={handleSelectCredited}
                    >
                    <option></option>
                    {
                      allUSers?.map((user) => {
                        if (user.accountId !== userLogged?.accountId)
                          return <option key={user.accountId}>{user.username}</option>;
                      })
                    }
                  </select>
                </div>
              </div>
              <button
              className="bg-gradient-to-br from-gray-400 to-gray-600 text-white font-bold px-4 py-2 rounded hover:bg-gradient-to-br hover:from-gray-500 hover:to-gray-700 my-5 w-24"
              type="submit"
              >
                Ok
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Transactions;