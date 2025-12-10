import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// React Icons
import { 
  FiHome, 
  FiUser, 
  FiMessageCircle, 
  FiSettings, 
  FiHelpCircle 
} from "react-icons/fi";
import { RiFileList2Line } from "react-icons/ri";
import { MdOutlineAnalytics } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    const path = location.pathname;
    const key = path.split("/").pop() || "dashboard";
    setActiveButton(key);
    sessionStorage.setItem("location", path);
  }, [location]);

  const handleButtonClick = (buttonName: string, link: string) => {
    if (buttonName === "logout") {
      localStorage.removeItem("user_data");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    navigate(link);
    setActiveButton(buttonName);
    sessionStorage.setItem("location", link);
  };

  const renderButton = (
    buttonName: string,
    Icon: React.ElementType,
    label: string,
    link: string
  ) => {
    const isActive = activeButton === buttonName;
    return (
      <div
        onClick={() => handleButtonClick(buttonName, link)}
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
          ${isActive ? "bg-green-200 text-green-800" : "text-white hover:bg-green-700/30"}
        `}
      >
        <Icon size={22} className={`${isActive ? "text-green-800" : "text-white"}`} />
        <span className={`font-poppins text-[15px] font-medium ${isActive ? "text-green-800" : "text-white"}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="text-white p-3 flex flex-col h-screen overflow-y-auto gap-3 sm:bg-transparent">
      <div className="flex gap-2">
        <img src="/eatright.svg" alt="EatRight Logo" className="mx-auto" />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-md font-bold font-poppins text-[17px]">Main</h2>
        {renderButton("dashboard", FiHome, "Overview", "/nutritionist")}
        {renderButton("profile", FiUser, "My Profile", "/nutritionist/profile")}
        {renderButton("clients", FiUser, "Clients", "/nutritionist/clients")}
        {renderButton("messages", FiMessageCircle, "Messages", "/nutritionist/messages")}
        {renderButton("analytics", MdOutlineAnalytics, "Analytics", "/nutritionist/analytics")}
      </div>

      <div className="flex flex-col gap-5 mt-10">
        <h2 className="text-md font-bold font-poppins text-[17px]">Settings & Help</h2>
        {renderButton("settings", FiSettings, "Settings", "/nutritionist/settings")}
        {renderButton("support", FiHelpCircle, "Help & Support", "/nutritionist/support")}
        {renderButton("about", FiHelpCircle, "About", "/nutritionist/about")}
        {renderButton("logout", AiOutlineLogout, "Sign Out", "/nutritionist/logout")}
      </div>
    </div>
  );
}

export default Sidebar;
