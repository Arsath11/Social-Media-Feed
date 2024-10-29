import React from "react";
import { db } from "../database/firebase";
import { TableNames } from "./TableNames";
import { deleteDoc, doc } from "firebase/firestore";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const PropertyTable = ({ list, setData, setModalOpen, setList }) => {
  const handleEdit = (datas) => {
    setModalOpen(true);

    setData(datas);
  };

  const handleDelete = async (row) => {
    const docRef = doc(db, TableNames.PROPERTY, row?.id);
    await deleteDoc(docRef);
    const filterDatas = list?.filter((datas) => datas?.id !== row?.id);
    setList(filterDatas);
    toast.success("Deleted Successfully");
  };
  const truncateText = (text, length) => {
    if (text.length > length) {
      return `${text.substring(0, length)}...`;
    }
    return text;
  };

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Property name
              </th>
              <th scope="col" class="px-6 py-3">
                Content
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Created By
              </th>

              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.map((data) => {
              return (
                <tr
                  key={data?.id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.name}
                  </th>
                  <td class="px-6 py-4 truncate">
                    {truncateText(data?.content, 20)}
                  </td>
                  <td class="px-6 py-4 truncate">
                    {truncateText(data?.description, 20)}
                  </td>
                  <td class="px-6 py-4">{data?.userName}</td>
                  <td class="px-6 py-4 gap-2 flex">
                    <p onClick={() => handleEdit(data)}>
                      <CiEdit size={25} />
                    </p>
                    <p onClick={() => handleDelete(data)}>
                      <MdOutlineDeleteOutline size={25} />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyTable;
