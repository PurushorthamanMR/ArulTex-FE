import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../InitialPage/Sidebar/Header";
import Sidebar from "../InitialPage/Sidebar/Sidebar";
import { pagesRoute, posRoutes, publicRoutes } from "./router.link";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../feature-module/loader/loader";

const AllRoutes = () => {
  const data = useSelector((state) => state.toggle_header);
  const HeaderLayout = () => (
    <div className={`main-wrapper ${data ? "header-collapse" : ""}`}>
      <Header />
      <Sidebar />
      <Outlet />
      <Loader />
    </div>
  );

  const Authpages = () => (
    <div className={data ? "header-collapse" : ""}>
      <Outlet />
      <Loader />
    </div>
  );

  const Pospages = () => (
    <div>
      <Outlet />
      <Loader />
    </div>
  );

  console.log(publicRoutes, "dashboard");

  // return (
  //   <div>
  //     <Routes>
  //       <Route path="/pos" element={<Pospages />}>
  //         {posRoutes.map((route, id) => (
  //           <Route path={route.path} element={route.element} key={id} />
  //         ))}
  //       </Route>
  //       <Route path={"/"} element={<HeaderLayout />}>
  //         {publicRoutes.map((route, id) => (
  //           <Route path={route.path} element={route.element} key={id} />
  //         ))}
  //       </Route>

  //       <Route path={"/"} element={<Authpages />}>
  //         {pagesRoute.map((route, id) => (
  //           <Route path={route.path} element={route.element} key={id} />
  //         ))}
  //       </Route>
  //     </Routes>
  //   </div>
  // );

// Inside the AllRoutes component's return statement
return (
  <div>
    <Routes>
      {/* Redirect root to sign-in */}
      <Route path="/" element={<Navigate to="/signin" replace />} />
      
      {/* POS Routes */}
      <Route path="/pos" element={<Pospages />}>
        {posRoutes.map((route, id) => (
          <Route path={route.path} element={route.element} key={id} />
        ))}
      </Route>
      
      {/* Protected Routes (Dashboard and others) */}
      <Route path={"/"} element={<HeaderLayout />}>
        {publicRoutes.map((route, id) => (
          <Route path={route.path} element={route.element} key={id} />
        ))}
      </Route>
      
      {/* Authentication Routes (Sign-in, Register, etc.) */}
      <Route path={"/"} element={<Authpages />}>
        {pagesRoute.map((route, id) => (
          <Route path={route.path} element={route.element} key={id} />
        ))}
      </Route>
    </Routes>
  </div>
);

};
export default AllRoutes;
