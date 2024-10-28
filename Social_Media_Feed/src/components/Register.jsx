import React, { useState } from "react";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import socialMediaIcons from "../assets/socialmedia.jpg";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
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

  const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/addProducts")
    setData({
        firstName: "",
        lastName: "",
        dob: "",
        mobileNo: "",
        email: "",
        password: "",
    })
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
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                value={data?.password}
                required
              />
            </div>
          </div>

          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
