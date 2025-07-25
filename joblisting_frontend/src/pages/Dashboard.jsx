import React, { useEffect } from "react";
import authStore from "../store/authStore.js";
import Sidebar from "../components/Sidebar.jsx";
import TopSearchBar from "../components/TopSearchBar.jsx"
import themeStore from "../store/themeStore.js";


const Dashboard = () => {
  const { isLoggedIn, role } = authStore((state) => state);
  const { theme } = themeStore((state) => state);


    return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } h-screen w-screen flex`}
    >
      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <div className="flex flex-col w-full">

        <TopSearchBar/>
        

        <div className="flex flex-wrap gap-6 p-6 justify-center">

          <p>Centre Content</p>
        </div>

        

        
      </div>
    </div>
  );
};

export default Dashboard;
