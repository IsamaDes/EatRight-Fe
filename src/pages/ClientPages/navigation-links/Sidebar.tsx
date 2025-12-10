import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiMessageCircle,
  FiUser,
  FiSettings,
  FiHelpCircle
} from "react-icons/fi";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import { AiOutlineWallet } from "react-icons/ai";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    const path = location.pathname;
    setActiveButton(path.slice(1) || "dashboard");
    sessionStorage.setItem("location", path);
  }, [location]);

  const handleButtonClick = (buttonName: string) => {
    const path = buttonName === "dashboard" ? "/client" : `/client/${buttonName}`;
    navigate(path);
    setActiveButton(buttonName);
    sessionStorage.setItem("location", path);
  };

  const renderButton = (
    buttonName: string,
    Icon: React.ElementType,
    label: string
  ) => {
    const isActive = activeButton === buttonName;

    return (
      <button
        className={`flex items-center mb-2 p-3 rounded-lg transition-all duration-200
          ${isActive ? "bg-green-200 text-green-800" : "text-white hover:bg-green-700/40"}
        `}
        onClick={() => handleButtonClick(buttonName)}
      >
        <Icon
          size={22}
          className={`mr-3 ${isActive ? "text-green-800" : "text-white"}`}
        />
        <p
          className={`font-poppins text-[15px] font-medium leading-[15.4px]
            ${isActive ? "text-green-800" : "text-white"}
          `}
        >
          {label}
        </p>
      </button>
    );
  };

  return (
    <div className="text-white p-3 flex flex-col h-screen overflow-y-auto gap-3 sm:bg-transparent">

      {/* Logo */}
      <div className="flex gap-2">
        <img
          src="/eatright.svg"
          alt="EatRight Logo"
          className="mx-auto"
        />
      </div>

      <div className="flex flex-col gap-8 p-2">

        <div className="flex flex-col gap-5">
          <h2 className="text-md mt-4 font-bold font-poppins text-[17px]">Main</h2>

          {renderButton("dashboard", FiHome, "Dashboard")}
          {renderButton("profile", FiUser, "Profile")}
          {renderButton("meal-plan", RiFileList2Line, "Meal Plan")}
          {renderButton("messages", FiMessageCircle, "Messages")}
          {renderButton("analytics", MdOutlineAnalytics, "Analytics")}
          {renderButton("subscription", AiOutlineWallet, "Subscription")}
        </div>

        <div className="flex flex-col gap-8 mt-7">
          <h2 className="text-md font-bold font-poppins text-[17px]">Settings & Help</h2>

          {renderButton("settings", FiSettings, "Settings")}
          {renderButton("support", FiHelpCircle, "Help & Support")}
          {renderButton("about", FiHelpCircle, "About Application")}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


