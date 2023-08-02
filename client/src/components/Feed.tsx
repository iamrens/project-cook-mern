import { sampleData } from "../assets/sampledata"

const Feed = () => {

  return (
    <div className="mt-10 bg-red-500 grid grid-cols-4 gap-4">
      
      {sampleData.map(recipe => (
        <div
          key={recipe.id}
          className="max-w-[280px] h-[350px] bg-purple-500"
        >
          <div>
            <img src={recipe.image} alt={recipe.title} className="" />
          </div>

          <div>
            Hello
          </div>

        </div>
      ))}


    </div>
    // <div className="mt-10 flex gap-5 flex-row flex-wrap justify-center bg-red-500">
      
    //   {sampleData.map(recipe => (
    //     <div
    //       key={recipe.id}
    //       className="flex flex-col flex-auto max-w-[280px] h-[400px] bg-purple-500"
    //     >
    //       <div>
    //         <img src={recipe.image} alt={recipe.title} className="" />
    //       </div>

    //       <div>
    //         Hello
    //       </div>

    //     </div>
    //   ))}


    // </div>
  )
}

export default Feed