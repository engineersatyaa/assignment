import { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { publicRequest } from "../utils/requestMethod";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";

const listItems = [
  { id: 1, name: "User Details" },
  { id: 2, name: "Favorite Posts" },
  { id: 3, name: "Friends" },
];

function Profile() {
  const [listItemClicked, setListItemClicked] = useState("User Details");
  const [showForm, setShowForm] = useState(false);
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState({});

  // getting user ID from url
  const { userId } = useParams();
  const navigate = useNavigate();

  // fetching user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get(`/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [userId]);

  // getting data from form
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // update user data
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.put("/users/" + userId, formData);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete user data
  const deleteUser = async () => {
    try {
      const res = await publicRequest.delete("/users/" + userId);
      alert(res.data.msg);
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <Wrapper className="py-3 min-[426px]:py-5 min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-70px)] ">
        {/* Banner and DP block start */}

        <div className="relative h-[90px] sm:h-[120px] md:h-[150px] lg:h-[180px]">
          {/* Banner block start */}

          <div className="overflow-hidden h-full">
            <img
              src="/banner.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded absolute bottom-[6px] right-[6px] sm:bottom-2 sm:right-2 shadow-[0px_0px_5px_4px_rgba(0,0,0,0.3)]">
            <label className="flex items-center justify-center gap-[6px] md:gap-2 py-1 px-2 font-bold md:font-semibold text-xs sm:text-sm md:text-base  text-red-600 md:cursor-pointer">
              {false ? (
                <ImSpinner9 className="animate-spin text-sm sm:text-base md:text-lg lg:text-xl" />
              ) : (
                <BsCameraFill className="text-sm sm:text-base md:text-lg lg:text-xl" />
              )}
              <input type="file" className="hidden" />
              Edit
            </label>
          </div>
          {/* Banner block end */}

          {/* DP block start */}

          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 p-1">
            <div className="relative w-[85px] h-[85px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] mx-auto border-2 border-red-600 rounded-full">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={user?.profilePic ? user.profilePic : "/nopic.png"}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              </div>

              <label className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 md:bottom-2 md:right-2 lg:bottom-[10px] bg-white p-1 lg:p-[6px] border border-red-600 rounded-full text-red-600 text-sm sm:text-base md:text-lg lg:text-xl  md:cursor-pointer">
                <input type="file" className="hidden" />

                {false ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <BsCameraFill />
                )}
              </label>
            </div>

            <h2 className="min-w-max mx-auto text-lg text-center sm:text-xl md:text-2xl lg:text-[26px] lg:font-bold font-semibold mt-1 md:mt-[6px] lg:mt-2">
              {user?.username}
            </h2>
          </div>

          {/* DP block end */}
        </div>

        {/* Banner and DP block end */}

        <hr className="border-t sm:border-t-2  mt-20 sm:mt-24 md:mt-28 lg:mt-32" />

        {/* User details block start */}

        <div className="flex flex-col md:flex-row gap-5 mt-5">
          {/* Sidebar list start */}

          <aside className="md:flex-[1_0_0%] md:border border-gray-200 rounded-sm overflow-hidden md:h-max md:sticky md:top-[90px]">
            <ul className="list-none text-[15px] md:text-base font-medium flex items-center justify-center flex-wrap gap-1 md:flex-col md:items-start md:justify-normal">
              {listItems.map((listItem) => (
                <li
                  key={listItem.id}
                  onClick={(e) => setListItemClicked(e.target.textContent)}
                  className={`min-w-max mx-1 md:mx-0 md:p-[6px] lg:p-2 md:w-full md:cursor-pointer transition-all  ${
                    listItem.name === listItemClicked &&
                    "text-red-600 underline underline-offset-[1.5px] decoration-1 md:no-underline md:border-l-4 md:border-red-400 md:bg-gradient-to-r from-white via-red-100 to-red-200"
                  }`}
                >
                  {listItem.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* Sidebar list end */}

          {/* Right details block start */}

          <section className="md:flex-[3_0_0%] border border-gray-200 rounded-sm h-auto p-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
              <h3 className="text-base font-semibold md:text-xl lg:text-[22px]">
                {listItemClicked}
              </h3>

              {/* Edit and Delete icons start */}

              {listItemClicked === "User Details" && (
                <div className="flex items-center justify-center gap-[15px]">
                  <button
                    title="Edit"
                    onClick={() => setShowForm(true)}
                    className="border-none text-lg md:text-xl text-red-600 md:cursor-pointer md:hover:text-black"
                  >
                    <FiEdit />
                  </button>

                  <button
                    title="Delete"
                    onClick={() => setShowWarningMsg(true)}
                    className="border-none text-[22px] md:text-2xl text-red-600 md:cursor-pointer md:hover:text-black"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              )}

              {/* Edit and Delete icons end */}
            </div>

            {listItemClicked === "User Details" ? (
              <div className="text-sm md:text-[15px] lg:text-base text-gray-600 flex flex-col gap-3">
                <p>
                  <b>Name :</b> <span>{user?.username}</span>
                </p>
                <p>
                  <b>Email :</b> <span>{user?.email}</span>
                </p>
                <p>
                  <b>Address :</b> <span>{user?.address}</span>
                </p>
                <p>
                  <b>About :</b> <span>{user?.about}</span>
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-7">
                <img
                  src="/emptyCart.png"
                  alt=""
                  className="mt-2 w-52 lg:w-64"
                />

                <h1 className="text-[15px] md:text-base lg:text-lg font-medium text-gray-600">
                  You don't have {listItemClicked} yet.
                </h1>
              </div>
            )}
          </section>

          {/* Right details block end */}
        </div>

        {/* User details block end */}
      </Wrapper>

      {/* ---------------------------------------------------------------- */}

      {/* Update form block start */}

      <div
        className={`fixed top-0 z-50 w-screen h-screen bg-black/80 backdrop-blur-[5px] flex items-center justify-center origin-center transition-transform ease-out ${
          showForm ? "scale-100" : "scale-0"
        }`}
      >
        {/* Transparent form border start */}

        <div className="relative border rounded-md border-white/10 w-[85%] min-[500px]:w-[410px] sm:w-[450px] md:w-[500px] lg:w-[600px] p-3 sm:p-4  bg-white/10 shadow-[0px_0px_5px_8px_rgba(0,0,0,0.1)] ">
          {/* Form close button start */}

          <button
            title="Close"
            onClick={() => setShowForm(false)}
            className="absolute -top-10 sm:-top-11 lg:-top-[50px] right-0 md:-right-10 lg:-right-[50px] flex items-center justify-center shadow-[0px_0px_5px_4px_rgba(0,0,0,0.1)] rounded-full text-red-600 md:hover:text-white/90 md:cursor-pointer"
          >
            <AiOutlineCloseCircle className="text-[28px] sm:text-[32px] md:text-4xl lg:text-[40px]" />
          </button>

          {/* Form close button end */}

          {/* White background form wrapper start */}

          <div className="bg-white/80 p-3 sm:p-4 rounded-md ">
            {/* Form start */}

            <form
              onSubmit={(e) => updateUser(e)}
              className="flex flex-col gap-2 sm:gap-[10px]"
            >
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                autoComplete="off"
                onChange={(e) => handleFormData(e)}
                className="border border-gray-400 rounded outline-none text-[15px] lg:text-base px-[6px] py-1 sm:px-[10px] sm:py-2"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="off"
                onChange={(e) => handleFormData(e)}
                className="border border-gray-400 rounded outline-none text-[15px] lg:text-base px-[6px] py-1 sm:px-[10px] sm:py-2 "
              />

              <input
                type="text"
                name="address"
                placeholder="Your Address"
                autoComplete="off"
                onChange={(e) => handleFormData(e)}
                className="border border-gray-400 rounded outline-none text-[15px] lg:text-base px-[6px] py-1 sm:px-[10px] sm:py-2 "
              />

              <input
                type="text"
                name="about"
                placeholder="About You"
                onChange={(e) => handleFormData(e)}
                className="border border-gray-400 rounded outline-none text-[15px] lg:text-base px-[6px] py-1 sm:px-[10px] sm:py-2"
              />

              {false && (
                <span className="text-center text-[15px] lg:text-base text-red-600">
                  Error Messages
                </span>
              )}

              <button
                type="submit"
                className="bg-red-600 text-white rounded sm:p-2 active:scale-95 transition-transform duration-75 ease-linear flex items-center justify-center min-h-[34px] sm:min-h-[40px] md:hover:bg-black/95 md:cursor-pointer lg:text-lg lg:min-h-[44px] mt-[2px]"
              >
                {false ? (
                  <ImSpinner9 className="animate-spin text-xl md:text-2xl" />
                ) : (
                  "Update"
                )}
              </button>
            </form>

            {/* Form end */}
          </div>

          {/* White background form wrapper end */}
        </div>

        {/* Transparent form border end */}
      </div>

      {/* Update form block end */}

      {/* ---------------------------------------------------------------- */}

      {/* Delete warning card start */}

      <div
        className={` bg-black/80 backdrop-blur-[5px]  fixed top-0 w-screen h-screen flex items-center justify-center origin-center transition-transform ease-out ${
          showWarningMsg ? "scale-100" : "scale-0"
        }`}
      >
        <div className="bg-white w-[85%] sm:w-[60%] lg:w-[45%] text-sm sm:text-base lg:text-lg h-auto p-3 py-5 shadow-2xl rounded border border-black text-center">
          <p className="font-semibold mb-3 px-2">
            <span className="text-red-700 font-bold">Warning</span> : Do you
            really want to delete ?
          </p>

          <div className="flex items-center justify-center gap-5 lg:gap-8 p-2 text-white">
            <button
              onClick={() => setShowWarningMsg(false)}
              className="bg-green-600 py-[6px] px-5 rounded border-none md:hover:bg-green-700"
            >
              Cancel
            </button>

            <button
              onClick={deleteUser}
              className="bg-red-600 py-[6px] px-5 rounded border-none md:hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete warning card end */}
    </>
  );
}

export default Profile;
