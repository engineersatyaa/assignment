import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { publicRequest } from "../utils/requestMethod";

function Home() {
  const [userdata, setUserData] = useState([]);

  console.log(userdata);

  // fetching all users
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get("/users");

        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <Header />

      <Wrapper className="border-2 min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-70px)]">
        <div className=" flex flex-wrap min-[1265px]:gap-4 gap-3 justify-center my-5  min-[426px]:my-7 ">
          {userdata.map((user) => (
            <Card key={user._id} user={user} />
          ))}
        </div>

        {/* add pagination */}
      </Wrapper>

      {/* Footer */}
    </>
  );
}

export default Home;
