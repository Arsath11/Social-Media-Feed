import {
  collection,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../database/firebase";
import { TableNames } from "./TableNames";
import SidebarNav from "./SidebarNav";
import { ToastContainer, toast } from "react-toastify";
import { MdThumbUp } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";

const ViewPropertyContent = () => {
  const [id, setID] = useState("");
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const [updatedData, setUpdatedData] = useState({});
  const [comments, setComments] = useState("");
  const [likes, setLikes] = useState(0);
  const [likedBy, setLikedBy] = useState([]);
  const [lists, setLists] = useState([]);
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const filterDatas = collection(db, TableNames.USERS);
    const getDatas = await getDocs(filterDatas);
    const querySnapShot = getDatas?.docs?.map((datas) => ({
      ...datas.data(),
      id: datas?.id,
    }));
    setUsers(querySnapShot);

    const filteredData = collection(db, TableNames.PROPERTY);
    const getPropertyDatas = await getDocs(filteredData);
    const querySnapShotDatas = getPropertyDatas?.docs?.map((datas) => ({
      ...datas.data(),
      id: datas?.id,
    }));
    setLists(querySnapShotDatas);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const docRef = doc(db, TableNames.PROPERTY, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = { ...docSnap.data(), id: docSnap?.id };

        setUpdatedData(data);
        setLikes(data.likes || 0); // Get the like count
        setLikedBy(data.likedBy || []); // Get the array of user IDs who liked
      }
    };

    fetchLikes();
  }, [id]);
  useEffect(() => {
    getData();
  }, []);
  const querys = useQuery();

  const [updateDatas, setUpdateDatas] = useState({});
  const getDatas = async () => {
    const docRef = doc(db, TableNames.PROPERTY, id);
    const getData = await getDoc(docRef);
    const datas = { ...getData?.data(), id: getData?.id };
    setUpdateDatas(datas);
  };

  useEffect(() => {
    setID(querys.get("id"));
    getDatas();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comments?.length == 0) {
      return toast.error("Please Enter Comments");
    } else {
      let arr = [];
      const docRef = doc(db, TableNames.PROPERTY, id);
      const getData = await getDoc(docRef);
      if (getData?.exists()) {
        arr = getData?.data()?.comments || [];
      }
      arr?.push(comments);
      const updateData = await updateDoc(docRef, { comments: arr });
      setComments("");
      toast.success("Comments Added Successfully");
    }
  };
  const incrementLikes = async () => {
    const user = auth.currentUser.uid;
    const currentUser = users?.find((data) => data?.userID == user);
    console.log(updatedData.email, "currentuser");
    if (!currentUser) return; // Ensure the user exists
    if (!likedBy.includes(currentUser.id)) {
      // Check if user already liked
      const newLikes = likes + 1;
      const newLikedBy = [...likedBy, currentUser.id];

      // Update Firestore
      const docRef = doc(db, TableNames.PROPERTY, id);
      await updateDoc(docRef, {
        likes: newLikes,
        likedBy: newLikedBy,
      });

      // Update local state
      setLikes(newLikes);
      setLikedBy(newLikedBy);
      toast.success("Liked Successfully")
    }
  };

  const decrementLikes = async () => {
    const user = auth.currentUser.uid;
    const currentUser = users?.find((data) => data?.userID == user);

    if (currentUser && likedBy.includes(currentUser.id)) {
      const newLikes = likes - 1;
      const newLikedBy = likedBy.filter((userId) => userId !== currentUser.id);

      // Update Firestore
      const docRef = doc(db, TableNames.PROPERTY, id);
      await updateDoc(docRef, {
        likes: newLikes,
        likedBy: newLikedBy,
      });

      // Update local state
      setLikes(newLikes);
      setLikedBy(newLikedBy);
      toast.success("Unliked Successfully")
    }
  };
  return (
    <div>
      <ToastContainer />
      <SidebarNav />

      <div className="p-4 lg:ps-72 w-full ">
        <div className="flex justify-center">
          <img
            class=" w-full ms-3 rounded-t-lg h-96 md:h-auto md:w-60 md:rounded-none md:rounded-s-lg"
            src={updateDatas?.image}
            alt=""
          />
        </div>

        <h5 class="mb-2 text-2xl pt-2 text-center font-bold tracking-tight text-gray-900 dark:text-white">
          {updateDatas?.name}
        </h5>

        <p class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Content:
        </p>
        <p class="mb-3 text-gray-500 text-justify dark:text-gray-400">
          {updateDatas?.content}
        </p>

        <p class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Description:
        </p>
        <p class="mb-3 text-gray-500 text-justify dark:text-gray-400">
          {updateDatas?.description}
        </p>

        <p class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Add Comment:
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              id="userName"
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5
 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Please Enter Comment"
              onChange={(e) => setComments(e.target.value)}
              value={comments}
              required
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <p class="mb-2 text-lg  pt-3 font-bold tracking-tight text-gray-900 dark:text-white">
          Add Likes:
        </p>
        <p class="mb-2 text-lg flex  gap-5 font-bold tracking-tight text-gray-900 dark:text-white">
          {likes}
          <MdThumbUp size={25} onClick={() => incrementLikes()} />
          <MdThumbDown size={25} onClick={decrementLikes} />
        </p>
      </div>
    </div>
  );
};

export default ViewPropertyContent;
