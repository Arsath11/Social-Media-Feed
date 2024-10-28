import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SidebarNav = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Products");
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="">
      <Sidebar className="h-[100vh] sidenav bg-gray-50" >
        <Sidebar.Items className="">
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
              className={`${
                activeItem === "Products" ? "bg-blue-500 text-white" : "text-gray-600"
              } hover:bg-blue-500 hover:text-white cursor-pointer`}
              onClick={() => handleItemClick("Products")}
            >
            Products
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
           

              className={`${
                activeItem === "Kanban" ? "bg-blue-500 text-white" : "text-gray-600"
              } hover:bg-blue-500 hover:text-white cursor-pointer`}
              onClick={() => handleItemClick("Kanban")}
            >
              Kanban
            </Sidebar.Item>
           <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item> 
            <Sidebar.Item  icon={HiTable} 
               className={`${
                activeItem === "SignUp" ? "bg-blue-500 text-white" : "text-gray-600"
              } hover:bg-blue-500 hover:text-white cursor-pointer`}
              onClick={() =>{ handleItemClick("SignUp"),navigate("/")}}
            >
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarNav;
