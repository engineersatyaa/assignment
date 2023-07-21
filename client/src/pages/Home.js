import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { publicRequest } from "../utils/requestMethod";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Home() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const limit = 8;

  useEffect(() => {
    try {
      const getUsers = async () => {
        const res = await publicRequest.get(
          `/users?page=${currentPage}&limit=${limit}`
        );
        setUsers(res.data.usersList);

        // Number of total fetched items
        const totalFetchedItems = res.data.totalDocuments;
        setPageCount(Math.ceil(totalFetchedItems / limit));
      };

      getUsers();
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, limit]);

  return (
    <>
      <Header />

      <Wrapper className="min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-70px)]">
        <div className=" flex flex-wrap min-[1265px]:gap-4 gap-3 justify-center my-5  min-[426px]:my-7">
          {users.map((user) => (
            <Card key={user._id} user={user} />
          ))}
        </div>
      </Wrapper>

      <ReactPaginate
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        breakLabel="..."
        nextLabel={
          <span className="w-7 h-7 min-[500px]:w-10 min-[500px]:h-10 rounded text-white min-[500px]:text-[22px] bg-red-600 flex items-center justify-center border ">
            <FiChevronRight />
          </span>
        }
        previousLabel={
          <span className="w-7 h-7 min-[500px]:w-10 min-[500px]:h-10 rounded text-white min-[500px]:text-[22px] bg-red-600 flex items-center justify-center ">
            <FiChevronLeft />
          </span>
        }
        containerClassName="flex justify-center items-center gap-3 lg:gap-5 w-full my-10 "
        activeClassName="bg-red-600 text-white border-red-700"
        pageClassName="w-7 h-7 min-[500px]:w-10 min-[500px]:h-10 border border-gray-400 rounded md:hover:bg-red-600 md:hover:text-white md:hover:border-red-700 overflow-hidden"
        pageLinkClassName="w-full h-full flex items-center justify-center text-sm min-[500px]:text-base"
      />
    </>
  );
}

export default Home;
