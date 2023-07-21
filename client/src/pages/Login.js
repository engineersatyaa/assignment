import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";
import { IoHome } from "react-icons/io5";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../utils/requestMethod";
import {
  fetchingFailure,
  fetchingStart,
  fetchingSuccess,
} from "../redux/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const { error, isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // To clear persisted error data in userSlice's initialState on refresh page.
  useEffect(() => {
    dispatch(fetchingFailure(null));
  }, [dispatch]);

  // getting data from form
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // fetching user data on login
  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchUser = async () => {
      dispatch(fetchingStart());
      try {
        const res = await publicRequest.post("/users/login", formData);

        dispatch(fetchingSuccess(res.data));
        navigate("/");
      } catch (error) {
        dispatch(fetchingFailure(error.response.data));
      }
    };

    fetchUser();
  };

  return (
    <div
      style={{ backgroundImage: "url('/bg.jpg')" }}
      className="w-screen h-screen bg-cover bg-no-repeat bg-center relative"
    >
      <div className="absolute top-0 w-full h-full bg-black/[0.12] backdrop-blur-[5px] ">
        <Wrapper className="text-white h-full flex flex-col justify-between items-center">
          {/* Header block start */}

          <header className="bg-white/10 w-screen border-b border-white/10 shadow-[0px_2px_5px_5px_rgba(0,0,0,0.2)]">
            <Wrapper className="flex items-center justify-between py-[6px]">
              <Link
                to={"/"}
                className="text-2xl sm:text-3xl font-bold md:cursor-pointer"
              >
                Digi Sidekick
              </Link>

              <Link
                to={"/"}
                title="Home Page"
                className="sm:border sm:border-white sm:p-1 sm:rounded md:hover:bg-black/30 md:cursor-pointer "
              >
                <IoHome className="w-[22px] h-[22px] sm:w-6 sm:h-6" />
              </Link>
            </Wrapper>
          </header>

          {/* Header block end */}

          {/* Login Form block start */}

          <div className="border rounded-md border-white/10 w-[95%] min-[500px]:w-[410px] sm:w-[450px] md:w-[500px] lg:w-[600px] p-3 sm:p-4  bg-white/10 shadow-[0px_0px_5px_8px_rgba(0,0,0,0.1)] text-black">
            {/* White background form wrapper start */}

            <div className="bg-white/80 p-3 sm:p-4 rounded-md ">
              {/* Form top block start */}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 sm:gap-[10px]"
              >
                <div className="flex items-center border border-gray-400 rounded overflow-hidden bg-white min-h-[34px]">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    autoComplete="off"
                    onChange={(e) => handleFormData(e)}
                    className="w-full outline-none text-[15px] lg:text-base px-[6px] py-1 sm:px-[10px] sm:py-2 "
                  />
                </div>

                <div className="flex items-center border border-gray-400 rounded overflow-hidden bg-white min-h-[34px]">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => handleFormData(e)}
                    className="w-full outline-none text-[15px] lg:text-base px-[6px] py-1 sm:px-[10px] sm:py-2"
                  />

                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-[2px] mr-1 sm:mr-2 md:cursor-pointer"
                  >
                    {showPassword ? (
                      <IoMdEye className="md:text-lg lg:text-xl" />
                    ) : (
                      <IoMdEyeOff className="md:text-lg lg:text-xl" />
                    )}
                  </div>
                </div>

                {error && (
                  <span className="text-center text-[15px] lg:text-base text-red-600">
                    {error.message}
                  </span>
                )}

                <button
                  type="submit"
                  className="bg-black/95 text-white rounded sm:p-2 active:scale-95 transition-transform duration-75 ease-linear flex items-center justify-center min-h-[34px] sm:min-h-[40px] md:hover:bg-red-600 md:cursor-pointer lg:text-lg lg:min-h-[44px] mt-[2px]"
                >
                  {isFetching ? (
                    <ImSpinner9 className="animate-spin text-xl md:text-2xl" />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* Form top block end */}

              {/* Form bottom block start */}

              <div className="flex flex-col items-center gap-[10px] mt-3 sm:mt-4">
                <Link
                  to="#"
                  className="text-center text-[15px] lg:text-base text-red-600 md:hover:underline decoration-1 underline-offset-2  md:cursor-pointer"
                >
                  Forgotten Password ?
                </Link>

                <p className="text-center text-xs -mt-1 lg:text-[13px]">
                  By logging in or creating an account, you agree with our
                  <span className="text-red-600 mx-1">Terms & Conditions</span>
                  and
                  <span className="text-red-600 mx-1">Privacy Statement. </span>
                </p>

                <hr className="border-t border-t-black/20 w-full" />

                <Link
                  to="/register"
                  className="w-full bg-red-600 text-white rounded sm:p-2 active:scale-95 transition-transform duration-75 ease-linear flex items-center  justify-center min-h-[34px] md:hover:bg-black/95 md:cursor-pointer lg:text-lg mt-[2px]"
                >
                  Create New Account
                </Link>
              </div>

              {/* Form bottom block end */}
            </div>

            {/* White background form wrapper end */}
          </div>

          {/* Login Form block end */}

          {/* Footer block start */}

          <footer className="text-xs mb-2 text-center">
            Copyright &#169; {new Date().getFullYear()} Digi Sidekick&#8482;.
            All rights reserved.
          </footer>

          {/* Footer block end */}
        </Wrapper>
      </div>
    </div>
  );
}

export default Login;
