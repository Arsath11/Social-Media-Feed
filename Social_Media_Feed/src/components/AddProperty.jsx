import React, { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { db, storage } from "../database/firebase";
import PropertyTable from "./PropertyTable";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TableNames } from "./TableNames";
import { toast, ToastContainer } from "react-toastify";

const AddProperty = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userName: "",
    name: "",
    content: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const [list, setList] = useState([]);
  const [updatedVal, setUpdatedVal] = useState({});

  const getDatas = async () => {
    const docRef = doc(db, TableNames.PROPERTY, data?.id);
    const getData = await getDoc(docRef);
    const datas = { ...getData?.data(), id: getData?.id };
    setImage(datas?.image);
  };

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
    getDatas();
    getPropertyDatas();
  }, [data]);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Check if a file was selected
    if (!file) return;

    // Check the file type
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PNG or JPG image.");
      return;
    }

    // If the file type is valid, proceed with the upload
    handleUpload(file);
  };

  const handleUpload = (file) => {
    if (!file) return;

    // Set loading to true at the beginning of the upload
    setLoading(true);

    // Create a storage reference
    const storageRef = ref(storage, `images/${file.name}`); // You can customize the path

    // Upload the file
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        // Get the download URL after the upload completes
        return getDownloadURL(snapshot.ref); // Correctly call getDownloadURL on snapshot.ref
      })
      .then((downloadURL) => {
        setImage(downloadURL); // Store the download URL
        // Optionally, save the download URL to your database here
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const convertImage = (imageUrl) => {
    return imageUrl || ""; // Return an empty string if no URL is provided
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addData = {
        userName: data?.userName,
        name: data?.name,
        content: data?.content,
        description: data?.description,
        image: image,
      };

      const docRef = collection(db, TableNames.PROPERTY);
      const addVal = await addDoc(docRef, addData);
      const newData = { ...addData, id: addVal?.id };
      setList((listData) => [...listData, newData]);
      setModalOpen(false);
      setData({
        userName: "",
        name: "",
        content: "",
        description: "",
      });
      setImage("");
      toast.success("Added Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateDatas = {
      userName: data?.userName,
      name: data?.name,
      content: data?.content,
      description: data?.description,
      image: image,
    };
    const docRef = doc(db, TableNames.PROPERTY, data?.id);
    const updateData = await updateDoc(docRef, updateDatas);
    setList((datas) =>
      datas?.map((item) =>
        item?.id === data?.id ? { ...item, ...updateDatas } : item
      )
    );
    setModalOpen(false);
    toast.success("Updated Successfully");
  };

  return (
    <>
      <SidebarNav />
      <ToastContainer />
      <div className="p-4 lg:ps-72">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              setModalOpen(true);
              setImage("");
              setData({
                userName: "",
                name: "",
                content: "",
                description: "",
              });
            }}
          >
            Add Property
          </button>
        </div>
        <div className="pt-6">
          <PropertyTable
            list={list}
            setData={setData}
            setModalOpen={setModalOpen}
            setList={setList}
          />
        </div>
      </div>

      {modalOpen && (
        <>
          <div
            id="static-modal"
            // data-modal-backdrop="static"
            tabindex="-1"
            aria-hidden="true"
            class="lg:ps-72 lg:pt-20 pt-14 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class=" p-4 w-full  max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {data?.id ? "Edit" : "Add"} Property
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="static-modal"
                    onClick={() => {
                      setModalOpen(false);
                      setData({
                        userName: "",
                        name: "",
                        content: "",
                        description: "",
                      });
                      setImage("");
                    }}
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <form onSubmit={data?.id ? handleUpdate : handleSubmit}>
                  <div class="p-4 md:p-5 space-y-4">
                    <div className="">
                      <div>
                        <label
                          for="userName"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          id="userName"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Please Enter User Name"
                          name="userName"
                          required
                          value={data?.userName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="pt-2">
                        <label
                          for="text"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Please Enter Name"
                          required
                          onChange={handleChange}
                          value={data?.name}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div>
                        <label
                          for="userName"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Content
                        </label>
                        <textarea
                          type="text"
                          rows={6}
                          value={data?.content}
                          id="content"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Please Enter Content"
                          name="content"
                          required
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div>
                        <label
                          for="description"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <textarea
                          type="text"
                          rows={6}
                          id="description"
                          value={data?.description}
                          name="description"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Please Enter Description"
                          required
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      {data?.id ? (
                        <img
                          src={convertImage(data?.image)}
                          className="w-72 h-72"
                        />
                      ) : (
                        <div>
                          <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="file_input"
                          >
                            Upload file
                          </label>
                          <input
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            required
                            onChange={handleImageUpload}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      {data?.id ? (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                          type="submit"
                        >
                          {loading ? "Loading..." : "Update"}
                        </button>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                          type="submit"
                        >
                          {loading ? "Loading..." : "Submit"}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProperty;
