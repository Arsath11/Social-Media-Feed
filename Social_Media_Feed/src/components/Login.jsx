import React, { useEffect, useState } from "react";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import socialMediaIcons from "../assets/socialmedia.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/firebase";
import { TableNames } from "./TableNames";
import { toast, ToastContainer } from "react-toastify";

const Login = ({ setLoginStatus }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [text, setText] = useState("password");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const [list, setList] = useState([]);
  const getDatas = async () => {
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
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredData = query(
      collection(db, TableNames.USERS),
      where("email", "==", data?.email),
      where("password", "==", data?.password)
    );
    const getDatas = await getDocs(filteredData);
    const querySnapShot = getDatas?.docs?.map((datas) => ({
      ...datas.data(),
      id: datas?.id,
    }));
    if (querySnapShot?.length > 0) {
      toast.success("Login Successfully");
      setLoginStatus("true");
      setTimeout(() => {
        navigate("/view-property");
      }, 1500);
    } else {
      return toast.error("Email and Password Not Matched");
    }
  };
  return (
    <div
      className="flex justify-center flex-col items-center min-h-screen"
      style={{
        backgroundImage: `url(${socialMediaIcons})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />
      <Card className=" m-2  w-96">
        <h5 className="text-center text-[15px] font-bold">
          Sign in to Social Media Feed
        </h5>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="Enter Email Address"
              onChange={handleChange}
              name="email"
              value={data?.email}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            {data?.password && (
              <span className="flex justify-end relative top-7 right-2 z-10">
                {text == "password" ? (
                  <IoMdEye onClick={() => setText("text")} />
                ) : (
                  <IoMdEyeOff onClick={() => setText("password")} />
                )}
              </span>
            )}
            <TextInput
              id="password1"
              type={text}
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              value={data?.password}
              required
            />
          </div>

          <Button type="submit">Login</Button>
        </form>
        <div className="flex justify-end">
          <h6>
            Don't have an account ?{" "}
            
            <span className="text-blue-600 cursor-pointer">
              <Link to="/register">Sign Up now</Link>
            </span>
          </h6>
        </div>
      </Card>
    </div>
  );
};

export default Login;
