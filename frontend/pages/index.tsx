import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Login {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>();
  const [isPasswordValid, setisPasswordValid] = useState<boolean>();
  
  const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setUsername(newValue);
  }

  const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setPassword(newValue);
  }

  return (
    <div>
      <Head>
        <title>NG.Cash</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="container flex justify-between px-4 py-8 mx-auto">
        <div>
        <Image src="/logo-ngcash.svg" width={80} height={80} alt="ng Logo" className="lg:w-28 lg:h-28"/>
        </div>
        <div className="hidden space-x-8 lg:flex lg:items-center">
          <a href="#">Menu 1</a>
          <a href="#">Menu 2</a>
          <a href="#">Menu 3</a>
          <a href="#">Menu 4</a>
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
          <form className="flex flex-col justify-center bg-white/60 shadow-md rounded-lg px-8 md:w-[400px] h-[480px]">
            <div className="mb-6">
              <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className={`${isUsernameValid ? "border-transparent" : "border-red-500"} border shadow appearance-none rounded w-full p-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChangeName}
              />
              <p className={`${isUsernameValid ? "text-transparent" : "text-red-500"} text-xs italic`}>Por favor confira seu Username.</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                className={`${isPasswordValid ? "border-transparent" : "border-red-500"} border shadow appearance-none rounded w-full p-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password" 
                type="password"
                placeholder="********"
                onChange={handleChangePassword}
              />
              <p className={`${isPasswordValid ? "text-transparent" : "text-red-500"} text-xs italic`}>Por favor confira sua senha.</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-28 md:w-36"
                type="button"
                >
                Entrar
              </button>
              <Link href="/register">
                <button
                  className="bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-28 md:w-36"
                  type="button"
                  >
                  Cadastrar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
