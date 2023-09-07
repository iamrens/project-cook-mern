import { useTheme } from 'next-themes'
import { HiSun, HiMoon } from "react-icons/hi2"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

  return (
    <div className="py-3 flex items-center justify-between bg-gray-200 px-[6%] z-50 sticky">
        
        <h1 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-[#F90B0B] from-[20%] to-[#F89234] to-[80%] bg-clip-text text-transparent font-poppins font-bold text-[30px] cursor-pointer"
        >
            SecretSpice
        </h1>

        <div className='flex items-center justify-center gap-5'>  
            <button
                onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
                className=''
            >
                {theme === 'light' ?
                        <HiMoon size={24} className="hover:animate-bounce"/> 
                    :
                        <HiSun size={28} className="hover:animate-spin-3s"/>
                    }  
            </button>

            <button
                onClick={() => navigate("signin")}
                className="bg-gradient-to-b from-[#F90B0B] to-[#F89234] font-poppins text-white px-4 py-2 rounded-full text-sm"
            >
                Sign In
            </button>

        </div>

    </div>
  )
}

export default Navbar