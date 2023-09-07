import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../main";

const Feed = () => {
  const dbApi: string = import.meta.env.VITE_DB_API as string;
  const token = useSelector((state: RootState) => state.token);

  // const getAllRecipe = async () => {
  //   try {
  //     const response = await axios.get
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  return (
    <div className="mt-10 bg-red-500 grid grid-cols-4 gap-4">
      Hello
    </div>
  )
}

export default Feed