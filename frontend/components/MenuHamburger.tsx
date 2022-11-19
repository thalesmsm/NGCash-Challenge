import { useState } from "react";

const MenuHamburger = () => {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <div className="md:hidden">
      <div className="flex md:hidden hover:cursor-pointer" onClick={ () => setMenu(!menu)}>
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-white animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-white animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-white animate-pulse"></span>
          </div>
        </div>
            {menu ? 
              <div className="flex flex-col w-32 absolute top-[60px] right-4 bg-white/60 md:hidden">
                <a
                  href="#"
                  className="h-10 p-2 border-b-[1px] border-black"
                >
                  Sobre Nós
                </a>
                <a
                  href="#"
                  className="h-10 p-2 border-b-[1px] border-black"
                >
                  Contato
                </a>
                <a
                  href="#"
                  className="h-10 p-2 border-b-[1px] border-black"
                >
                  Fale Conosco
                </a>
              </div> : <></>
            }
    </div>
  )
}

export default MenuHamburger