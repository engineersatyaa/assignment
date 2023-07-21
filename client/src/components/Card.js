import { Link } from "react-router-dom";

function Card({ user }) {
  return (
    <Link
      to={`/profile/${user?._id}`}
      className="bg-white p-2 min-[426px]:shadow-lg flex flex-col items-center justify-between min-[963px]:w-[24%] sm:w-[30%] w-[47%] border border-gray-200 rounded md:hover:border-gray-400 "
    >
      <div>
        <img
          src={user?.profilePic ? user.profilePic : "/nopic.png"}
          alt="user"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="text-center w-full h-full sm:py-2 sm:px-1 ">
        <h1 className="min-[965px]:text-xl  md:text-lg font-medium text-sm">
          {user?.username}
        </h1>

        <p className="!leading-tight text-gray-500 min-[965px]:text-base md:text-sm md:mt-1 text-xs min-[426px]:flex hidden ">
          {user?.about}
        </p>
      </div>
    </Link>
  );
}

export default Card;
