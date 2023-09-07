import Feed from "../components/Feed";
import Spice from "../assets/spice.jpg";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"
import axios from "axios";

const dbApi: string = import.meta.env.VITE_DB_API as string;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm) return;
    console.log(searchTerm)
    try {
      const response = await axios.get(`${dbApi}/recipes/search/${searchTerm}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className="relative">
      {/* <img src={Spice} alt="spice" className="object-cover h-[100vh] w-full" /> */}
      <div className="text-center px-[6%] py-10">
        <h1 className="font-open text-5xl font-extrabold leading-[1.15] sm:text-6xl text-titleLight">
          Unveil & Unlock
        </h1>
        <h1 className="bg-gradient-to-r from-[#F90B0B] from-[20%] to-[#F89234] to-[80%] bg-clip-text text-transparent font-open text-5xl font-extrabold leading-[1.15] sm:text-6xl">
          The Secret of Flavors
        </h1>

        <p className="text-lg text-gray-600 sm:text-xl max-w-2xl mt-5 mx-auto">
          Unlock the essence of extraordinary flavors as Secret Spice takes you
          on a journey of culinary enchantment.
        </p>

        {/* Search field */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex justify-center items-center relative w-[500px] mx-auto"
        >
          <input
            type="text"
            placeholder="Find your recipe"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-4 outline-none w-full rounded-md"
          />
          <button type="submit" className="text-red-500 cursor-pointer absolute right-2">
            <FaSearch  size={28} />
          </button>
        </form>
      </div>

      {/* <Feed /> */}
    </div>
  );
};

export default Home;
