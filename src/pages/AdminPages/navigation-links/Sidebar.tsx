
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Heroicons
import {
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  UsersIcon as UsersIconSolid,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  InformationCircleIcon as InformationCircleIconSolid,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Map routes to button names
  const routeMap: Record<string, string> = {
    "/admin": "dashboard",
    "/admin/profile": "profile",
    "/admin/nutritionists": "nutritionists",
    "/admin/clients": "clients",
    "/admin/messages": "messages",
    "/admin/settings": "settings",
    "/admin/about": "about",
  };

  useEffect(() => {
    const current = routeMap[location.pathname];
    if (current) {
      setActiveButton(current);
    }
  }, [location.pathname]);

  const handleButtonClick = (buttonName: string) => {
    const path =
      buttonName === "dashboard"
        ? "/admin"
        : `/admin/${buttonName}`;

    navigate(path);
    setActiveButton(buttonName);
    setOpenDropdown(null);
  };

  const renderButton = (
    buttonName: string,
    outlineIcon: React.ElementType,
    solidIcon: React.ElementType,
    label: string,
    hasDropdown: boolean = false
  ) => {
    const isActive = activeButton === buttonName;
    const Icon = isActive ? solidIcon : outlineIcon;

    return (
      <>
        <button
          className={`
            flex items-center mb-2 p-2 rounded-lg w-full transition
            ${isActive ? "bg-emerald-100 text-emerald-700" : "text-white"}
          `}
          onClick={() => handleButtonClick(buttonName)}
        >
          <Icon
            className={`
              h-7 w-7 mr-3 transition
              ${isActive ? "text-emerald-700" : "text-white"}
            `}
          />

          <div className="flex items-center gap-4">
            <p
              className={`
                font-poppins text-[15px] font-medium transition
                ${isActive ? "text-emerald-700" : "text-white"}
              `}
            >
              {label}
            </p>

            {hasDropdown && (
              <ChevronDownIcon
                className={`
                  h-5 w-5 transition-transform duration-300
                  ${openDropdown === buttonName ? "rotate-180" : ""}
                  ${isActive ? "text-emerald-700" : "text-white"}
                `}
              />
            )}
          </div>
        </button>
      </>
    );
  };

  return (
    <div className="text-white p-3 flex flex-col h-screen overflow-y-auto gap-3">

      <div className="flex gap-2">
        <img src="/eatright.svg" alt="EatRight Logo" className="mx-auto" />
      </div>

      <div className="flex bg-emerald-600 flex-col gap-8 p-2 rounded-lg">

        <div className="flex flex-col gap-5">
          <h2 className="text-md mt-4 font-bold font-poppins text-[17px]">Main</h2>

          {renderButton("dashboard", HomeIcon, HomeIconSolid, "Dashboard")}
          {renderButton("profile", UserCircleIcon, UserCircleIconSolid, "Profile")}
          {renderButton("nutritionists", UsersIcon, UsersIconSolid, "Nutritionists")}
          {renderButton("clients", UsersIcon, UsersIconSolid, "Clients")}
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-md font-bold font-poppins text-[17px]">Settings & Help</h2>

          {renderButton("settings", Cog6ToothIcon, Cog6ToothIconSolid, "Settings")}
          {renderButton("about", InformationCircleIcon, InformationCircleIconSolid, "About")}
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
