import Feed from "../components/Feed"


const Home = () => {

  return (
    <div className="">

      <div className="pt-5 text-center">
        <h1 className="font-open text-5xl font-extrabold leading-[1.15] sm:text-6xl text-titleLight">
          Unveil & Unlock
        </h1>
        <h1 className="bg-gradient-to-r from-[#F90B0B] from-[20%] to-[#F89234] to-[80%] bg-clip-text text-transparent font-open text-5xl font-extrabold leading-[1.15] sm:text-6xl">
          The Secret of Flavors
        </h1>
        
        <p className="text-lg text-gray-600 sm:text-xl max-w-2xl mt-5 mx-auto">
          Unlock the essence of extraordinary flavors as Secret Spice takes you on a journey of culinary enchantment.
        </p>

      </div>

      <Feed />

    </div>
  )
}

export default Home