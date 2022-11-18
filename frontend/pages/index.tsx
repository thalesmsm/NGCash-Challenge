import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { compare } from 'bcryptjs';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getUsers, login } from '../fetchs/fetchs';

interface IUser {
  find(arg0: (user: { username: string | undefined; }) => boolean): unknown;
  id?: number;
  username: string;
  password: string;
  accountId: number;
}

const Login: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [userlogged, setuserlogged] = useState<IUser>();

  const router = useRouter();

  useEffect( () => {
    getUsers().then(res => setUsers(res));
  },[setUsers]);
  
  
  const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setUsername(newValue);
  }
  
  const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPassword(newValue);
  }

  const setToken = async (username: string, password: string) => {
    const token = await login(username, password).then((res) => res);
    
    token && localStorage.setItem('token', token);
  }
  
  const handleClickEntrar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const findUser: IUser | undefined = users?.find((user: {
      username: string | undefined, password: string | undefined
    }) => user.username === username);
    
    
    if (findUser && password) {
      const comparePassword = await compare(password, findUser.password);
      localStorage.setItem('username', findUser.username);
      setuserlogged(findUser);
      setToken(findUser.username, password);
      comparePassword && router.push('/account');
    } 
    if (!userlogged) window.alert('Usuário ou senha inválido');

    // ALERT ACIOANDO ANTES DE DAR O PUSH EM /ACCOUNT
  }

  return (
    <div className="font-poppins">
      <Head>
        <title>NG.Cash</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <nav className="container flex justify-between px-4 py-8 mx-auto">
        <div>
        <Image src="/logo-ngcash.svg" width={90} height={90} alt="ng Logo" />
        </div>
        <div className="hidden space-x-8 lg:flex lg:items-center">
          <a
            href="#"
            className="bg-gradient-to-br from-gray-400 to-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gradient-to-br hover:from-gray-500 hover:to-gray-700"
          >
            Sobre Nós
          </a>
          <a
            href="#"
            className="bg-gradient-to-br from-gray-400 to-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gradient-to-br hover:from-gray-500 hover:to-gray-700"
          >
            Contato
          </a>
          <a
            href="#"
            className="bg-gradient-to-br from-gray-400 to-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gradient-to-br hover:from-gray-500 hover:to-gray-700"
          >
            Fale Conosco
          </a>
        </div>
        <div className="flex lg:hidden">
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-white animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-white animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-white animate-pulse"></span>
          </div>
        </div>
      </nav>
      <main>
        <div className="w-full max-w-xs mx-auto md:max-w-none md:flex md:justify-around md:items-center">
          <div className="hidden lg:block md:block md:w-[530px] md:h-[530px]">
            <Image src="/transfer-money.svg" width={530} height={530} alt="ng Logo"/>
          </div>
          <form
            className="flex flex-col justify-center bg-white/60 shadow-md rounded-lg px-8 md:w-[400px] h-[480px]"
            onSubmit={handleClickEntrar}
            >
            <div className="mb-6">
              <label className="block text-gray-900 text-base font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className={` border shadow appearance-none rounded w-full p-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChangeName}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-900 text-base font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                className={`border shadow appearance-none rounded w-full p-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password" 
                type="password"
                placeholder="********"
                onChange={handleChangePassword}
              />
            </div>
            <div className="flex flex-col items-center justify-around h-20">
              <button
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold py-2 px-4 rounded w-52 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700"
                type="submit"
                // onClick={handleClickEntrar}
                >
                Entrar
              </button>           
            </div>
              <p className="text-decoration-none text-center text-white text-sm">Ainda não tem uma conta?<Link href="/register"> <span className="text-black hover:text-gray-700">Crie agora!</span></Link></p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
