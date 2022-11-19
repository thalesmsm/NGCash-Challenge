import { getUsers, postUser } from "../fetchs/fetchs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

interface IUser {
  find(arg0: (user: { username: string | undefined; }) => boolean): unknown;
  id?: number;
  username: string;
  password: string;
  accountId: number;
}

const Register = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isPasswordValid, setisPasswordValid] = useState<boolean>(true);
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const validPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const conflictUser = users?.some((user) => user.username === username);

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

  function validateUsername(): boolean {
    if (username && username.length >= 3 && !conflictUser) {
      return true;
    }
    window.alert('Username já está sendo utilizado');
    return false;
  };
  
  function validatePassword(): boolean {
    if (password) {
      return validPassword.test(password);
    }
    return false;
  }

  const handleClickCadastrar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password && validateUsername() && validatePassword()) {
      postUser(username, password);
      // window.alert('Usuário criado com sucesso!');
      setUserCreated(true);
    }
    username && username.length >= 3 ? setIsUsernameValid(true) : setIsUsernameValid(false);
    password && validPassword.test(password) ? setisPasswordValid(true) : setisPasswordValid(false);
  }

  return (
    <div className="font-poppins h-[100vh] flex flex-col justify-between">
      <Head>
        <title>NG.Cash</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="container flex justify-between px-4 py-8 mx-auto">
        <div>
        <Image src="/logo-ngcash.svg" width={90} height={90} alt="ng Logo"/>
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
            <Image src="/register-img.svg" width={530} height={530} alt="ng Logo"/>
          </div>
          <form
            className="flex flex-col justify-center bg-white/60 shadow-md rounded-lg px-8 max-w-md md:w-[400px] h-[480px]"
            onSubmit={handleClickCadastrar}
            >
            {!userCreated ? 
             <div>
              <div className="mb-6">
                <label className="block text-gray-900 text-base font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className={`${isUsernameValid ? "border-transparent" : "border-red-500"} border shadow appearance-none rounded w-full p-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={handleChangeName}
                />
                <p className={`${isUsernameValid ? "text-transparent" : "text-red-500"} text-xs italic`}>Seu Username deve conter pelo menos 3 caracteres.</p>
              </div>
              <div className="mb-6">
                <label className="block text-gray-900 text-base font-bold mb-2" htmlFor="password">
                  Senha
                </label>
                <input
                  className={`${isPasswordValid ? "border-transparent" : "border-red-500"} border shadow appearance-none rounded w-full p-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={handleChangePassword}
                />
                <p className={`${isPasswordValid ? "text-transparent" : "text-red-500"} text-xs italic`}>Sua senha deve conter: no mínimo 8 caracteres, um número e uma letra maiúscula.</p>
                </div>
                <div className="flex flex-col items-center justify-around h-20">
                <button
                  className="bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold py-2 px-4 rounded w-52 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700"
                  type="submit"
                  >
                  Cadastrar
                </button>
                </div>
              </div> : 
              <div className="flex flex-col justify-around items-center h-52">
                <h1 className="text-2xl">Cadastro realizado com sucesso!</h1>
                <p>Volte para página de login para acessar sua conta.</p>
                <Link href="/">
                  <button className="bg-gradient-to-br from-gray-900 to-gray-800 text-white font-bold py-2 px-4 rounded w-52 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700">
                    Fazer login
                  </button>
                </Link>
              </div>
            }
              <Link href="/">
                <p className={`${userCreated && 'hidden'} text-decoration-none text-center text-sm text-black hover:text-gray-700`}>Já tenho cadastro</p>
              </Link>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
