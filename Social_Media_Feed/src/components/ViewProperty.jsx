import React, { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/firebase";
import { TableNames } from "./TableNames";
import { useNavigate } from "react-router-dom";

const ViewProperty = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState("");
  const getPropertyDatas = async () => {
    const docRef = collection(db, TableNames.PROPERTY);

    const datas = await getDocs(docRef);
    const querySnapShot = datas?.docs?.map((datas) => ({
      ...datas.data(),
      id: datas?.id,
    }));
    setList(querySnapShot);
  };
  useEffect(() => {
    getPropertyDatas();
  }, []);

  const truncateText = (text, length) => {
    if (text.length > length) {
      return `${text.substring(0, length)}...`;
    }
    return text;
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    const docRef = query(
      collection(db, TableNames.PROPERTY),
      where("likes", "==", Number(filterData))
    );
    const datas = await getDocs(docRef);
    const querySnapShot = datas?.docs?.map((datas) => ({
      ...datas.data(),
      id: datas?.id,
    }));
    if (querySnapShot?.length > 0) {
      setList(querySnapShot);
    }
    else{
        setList([])
    }
  };

  const handleReset = () => {
    setFilterData("");
    getPropertyDatas();
  };
  return (
    <div>
      <SidebarNav />
      <div className="p-4 lg:ps-72 w-full">
        <form onSubmit={handleFilter}>
          <label
            for="userName"
            class="block mb-2 font-bold text-lg text-gray-900 dark:text-white"
          >
            Search
          </label>
          <div className="flex lg:flex-row flex-col lg:justify-start justify-center items-center lg:items-start gap-3">
            <input
              type="search"
              id="userName"
              onChange={(e) => setFilterData(e.target.value)}
              class="bg-gray-50 border border-gray-300 lg:w-60 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Please Enter User Name"
              name="userName"
              required
              value={filterData}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 w-60  lg:w-24 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 w-60  lg:w-24 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        <div className=" lg:grid lg:grid-cols-2 lg:gap-3">
          {list?.length > 0 ? list?.map((datas) => {
            return (
              <a
                href="#"
                class="flex flex-col items-center gap-5 mt-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  class=" w-full ms-3 rounded-t-lg h-96 md:h-auto md:w-60 md:rounded-none md:rounded-s-lg"
                  src={datas?.image}
                  alt=""
                />
                <div class="flex flex-col justify-between p-4 leading-normal">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {datas?.name}
                  </h5>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {truncateText(datas?.content, 52)}
                  </p>
                  <div className="flex justify-between">
                    <p
                      className="text-start text-blue-700"
                      onClick={() => navigate(`/view-comments?id=${datas?.id}`)}
                    >
                      View Comments
                    </p>
                    <p
                      className="text-end text-blue-700"
                      onClick={() =>
                        navigate(`/view-propertyContent?id=${datas?.id}`)
                      }
                    >
                      Read More
                    </p>
                  </div>
                </div>
              </a>
            );
          }) : (
            <a
            href="#"
            class="flex flex-col items-center gap-5 mt-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
        
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            No Data Available
              </h5>

              </div>
           
          </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProperty;
