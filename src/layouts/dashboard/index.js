import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return <>
  
  <div>App Layout</div>
  <Outlet />
  
  </>;
};

export default DashboardLayout;
