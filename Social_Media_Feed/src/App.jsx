import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import SidebarNav from "./components/SidebarNav";


function App() {

  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}>
    
      </Route>
      <Route path="/addProducts" element={<SidebarNav />}>
    
      </Route>
    </Routes>
  </BrowserRouter>
  
  </>;
}

export default App;
