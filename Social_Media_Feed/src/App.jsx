import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import AddProducts from "./components/AddProducts";


function App() {

  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}>
    
      </Route>
      <Route path="/addProducts" element={<AddProducts />}>
    
      </Route>
    </Routes>
  </BrowserRouter>
  
  </>;
}

export default App;
