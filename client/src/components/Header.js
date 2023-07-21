import { useState } from "react";
import { IoSearch, IoHome } from "react-icons/io5";
import { FaSearchPlus, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";

const menuData = [
  {
    name: "Home",
    icon: <IoHome size={20} />,
    url: "/",
  },
  {
    name: "Profile",
    icon: <FaUserCircle size={20} />,
    url: "/profile/userId",
  },
  {
    name: "Search",
    icon: <FaSearchPlus size={20} />,
    url: "/search",
  },
];

function Header() {
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  showPhoneMenu
    ? typeof document !== "undefined" &&
      (document.body.style.overflowY = "hidden")
    : typeof document !== "undefined" &&
      (document.body.style.overflowY = "auto");

  return (
    <header className="w-full h-[50px] md:h-[70px] bg-red-600 flex items-center justify-between sticky top-0 z-10 transition-transform duration-300 ">
      <Wrapper className="flex items-center gap-6 justify-between h-[50px] md:h-[70px]  relative">
        {/* Logo block start */}

        <h1 className="text-[22px] md:text-[35px] min-[321px]:text-[28px] text-white font-bold min-w-max">
          <Link
            href="/"
            className="flex md:hover:text-black md:drop-shadow-[5px_5px_2px_rgba(0,0,0,0.3)]"
            onClick={() => setShowPhoneMenu(false)}
          >
            Digi Sidekick
          </Link>
        </h1>

        {/* Logo block end */}

        {/* Navbar block start */}

        <nav>
          <ul className="hidden md:flex items-center gap-7 text-lg font-medium text-white">
            {menuData.map((menu, index) => (
              <li key={index}>
                <Link
                  href={menu.url}
                  className="flex items-center justify-center gap-2 hover:text-black"
                >
                  {menu.icon}
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navbar block end */}

        {/* Phone menu block start  */}

        <ul
          className={`list-none md:hidden absolute top-[50px] left-0 h-[calc(100vh-50px)] w-full bg-black/95 overflow-y-auto transition-all duration-100 ease-in-out ${
            showPhoneMenu ? "scale-100" : "scale-0"
          }  origin-top-right text-white`}
        >
          {menuData.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.url}
                onClick={() => setShowPhoneMenu(false)}
                className={`flex items-center gap-4 p-3 font-medium text-sm  border-t border-white/10 ${
                  menu.name === "Home" && "border-t-0"
                } `}
              >
                {menu.icon}
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Phone menu block end  */}

        <div className="flex items-center justify-center gap-5 ">
          {/* Profile pic block start */}

          <div className="w-8 h-8 ml-1 md:w-11 md:h-11 md:mr-[2px] rounded-full overflow-hidden">
            <Link
              href="/user_profile/userId"
              className="flex"
              onClick={() => setShowPhoneMenu(false)}
            >
              <img
                src="/nopic.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          {/* Profile pic block end */}

          {/* Hamburger block for phone start */}

          <div
            className="w-8 h-[26px] flex flex-col justify-between md:hidden"
            onClick={() => {
              setShowPhoneMenu(!showPhoneMenu);
            }}
          >
            <span
              className={`bg-white w-full h-1 transition-all origin-right ${
                showPhoneMenu && "-rotate-45"
              }`}
            ></span>

            <span
              className={`bg-white w-full h-1 transition-all ${
                showPhoneMenu && "opacity-0"
              }`}
            ></span>

            <span
              className={`bg-white w-full h-1 transition-all origin-right ${
                showPhoneMenu && "rotate-45"
              }`}
            ></span>
          </div>

          {/* Hamburger block for phone end */}
        </div>
      </Wrapper>
    </header>
  );
}

export default Header;
