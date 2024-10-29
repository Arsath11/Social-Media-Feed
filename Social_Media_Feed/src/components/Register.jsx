import React, { useState } from "react";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import socialMediaIcons from "../assets/socialmedia.jpg";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../database/firebase";
import { TableNames } from "./TableNames";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("password");
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

const getTomorrowDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Set to tomorrow
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

// Function to get the date 1000 years ago in YYYY-MM-DD format
const getPastDate = (years) => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - years);
    return pastDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};



  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobileNo: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      const addData = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        dob: data?.dob,
        mobileNo: data?.mobileNo,
        email: data?.email,
        password: data?.password,
        userID: createUser?.user?.uid,
      };
      const docRef = collection(db, TableNames.USERS);
      const addDatas = await addDoc(docRef, addData);

      toast.success("Account Created Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500);

      setData({
        firstName: "",
        lastName: "",
        dob: "",
        mobileNo: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already in use. Please use a different email."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
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
      <Card className=" m-2  w-auto">
        <h5 className="text-center text-[15px] font-bold">
          Create Your Account
        </h5>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value="First Name" />
              </div>
              <TextInput
                id="firstName"
                type="text"
                placeholder="Enter First Name"
                onChange={handleChange}
                value={data?.firstName}
                name="firstName"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
                value={data?.lastName}
                name="lastName"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dob" value="DOB" />
              </div>
              <TextInput
                id="dob"
                type="date"
                value={data?.dob}
                onChange={handleChange}
                name="dob"
                min={getPastDate(1000)} 
    max={getTomorrowDate()}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mobileNo" value="Mobile No" />
              </div>
              <TextInput
                id="mobileNo"
                type="number"
                onWheel={(e) => e.target.blur()}
                placeholder="Enter Mobile No"
                name="mobileNo"
                value={data?.mobileNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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

              <TextInput
                id="password1"
                type={text}
                placeholder="Enter Password"
                name="password"
                className="flex"
                onChange={handleChange}
                value={data?.password}
                required
              />
              {data?.password && (
                <span className="flex justify-end relative bottom-7 right-2 z-10">
                  {text == "password" ? (
                    <IoMdEye onClick={() => setText("text")} />
                  ) : (
                    <IoMdEyeOff onClick={() => setText("password")} />
                  )}
                </span>
              )}
            </div>
          </div>

          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
