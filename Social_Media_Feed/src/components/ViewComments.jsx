import React, { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import { TableNames } from "./TableNames";

const ViewComments = () => {
  const [id, setID] = useState("");
  const [updateDatas, setUpdateDatas] = useState({});
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const querys = useQuery();

  useEffect(() => {
    setID(querys.get("id"));
  }, [id]);

  const getDatas = async () => {
    const docRef = doc(db, TableNames.PROPERTY, id);
    const getData = await getDoc(docRef);
    const datas = { ...getData?.data(), id: getData?.id };
    console.log(datas, "datas");
    setUpdateDatas(datas);
  };

  useEffect(() => {
    getDatas();
  }, [id]);
  return (
    <div>
      <SidebarNav />
      <div className="p-4 lg:ps-72 w-full ">
        <h2 class="mb-2 text-2xl pt-2  font-bold tracking-tight text-gray-900 dark:text-white">
          {" "}
          Name : {updateDatas?.name}
        </h2>
        <h2 class="mb-2 text-2xl pt-2  font-bold tracking-tight text-gray-900 dark:text-white">
          {" "}
          Comments :
        </h2>
        <h5 class="mb-2 text-2xl pt-2  font-bold tracking-tight text-gray-900 dark:text-white">
          {updateDatas?.comments?.length > 0 ? (
            updateDatas?.comments?.map((data) => (
              <h1>
                {" "}
                <h2>{data}</h2>
              </h1>
            ))
          ) : (
            <h2>No Comments Available</h2>
          )}
        </h5>
      </div>
    </div>
  );
};

export default ViewComments;
