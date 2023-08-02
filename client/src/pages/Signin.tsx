import Forms from "../components/Forms"


const Signin = () => {
  return (
    <div className="">
      <div className="bg-neutral-300 dark:bg-neutral-800 mx-auto max-w-[500px] p-8 rounded-xl">
        <h1 className="text-center font-poppins font-bold text-2xl">
            Welcome to Secret Spice
        </h1>

        <Forms />
      </div>
    </div>
  )
}

export default Signin