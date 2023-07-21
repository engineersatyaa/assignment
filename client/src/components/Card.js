import { Link } from "react-router-dom";

function PizzaCard() {
  return (
    <div className="border bg-white">
      <Link
        href={`/pizza_details/pizzaId`}
        className="  p-2 min-[426px]:shadow-lg flex flex-col items-center justify-center min-[963px]:w-[24%] sm:w-[30%] w-[47%] border border-gray-200 rounded md:hover:border-gray-400 "
      >
        <div>
          <img src="/nopic.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="text-center w-full sm:py-2 sm:px-1">
          <h1 className="min-[965px]:text-xl  md:text-lg font-medium text-sm">
            Sameer Jadaun
          </h1>

          <p className=" !leading-tight text-gray-500 min-[965px]:text-base md:text-sm md:mt-1 text-xs min-[426px]:flex hidden ">
            Lorem ipsum dolor sit amet consectetur doloribus totam ducimus id
            accusantium reprehenderit!
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PizzaCard;
