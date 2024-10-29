import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import AddProperty from "./components/AddProperty";
import ViewProperty from "./components/ViewProperty";
import ViewPropertyContent from "./components/ViewPropertyContent";
import ViewComments from "./components/ViewComments";
import PageNotFound from "./components/PageNotFound";

function App() {
  // const [loginStatus, setLoginStatus] = useState(false);

  const [loginStatus, setLoginStatus] = useState(() => {
    // Check local storage for login status on initial load
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // Update local storage when login status changes
    localStorage.setItem('isLoggedIn', loginStatus);
  }, [loginStatus]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login setLoginStatus={setLoginStatus} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/add-property"
            element={loginStatus ? <AddProperty /> : <Navigate to={"/"} />}
          ></Route>
          <Route
            path="/view-property"
            element={loginStatus ? <ViewProperty /> : <Navigate to={"/"} />}
          ></Route>
          <Route
            path="/view-propertyContent"
            element={
              loginStatus ? <ViewPropertyContent /> : <Navigate to={"/"} />
            }
          ></Route>
          <Route
            path="/view-comments"
            element={loginStatus ? <ViewComments /> : <Navigate to={"/"} />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
