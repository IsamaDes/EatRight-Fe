import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import dashboard from "./SideImages/dashboard.svg"
import dashboardblue from "./SideImages/dashboardblue.svg"
import departmentlogo from "./SideImages/departmentwhite.svg"
import departmentblue from "./SideImages/departmentblue.svg"
import inventory from "./SideImages/inventory.svg"
import notifications from "./SideImages/notifications.svg"
import notificationsblue from "./SideImages/notificationsblue.svg"
import settingsIcon from "./SideImages/settings.svg"
import settingsblue from "./SideImages/settingsblue.svg"
import helpsupport from "./SideImages/helpsupport.svg"
import helpsupportblue from "./SideImages/helpsupportblue.svg"
import about from "./SideImages/about.svg"
import aboutappblue from "./SideImages/aboutapplicationblue.svg"
 
function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);
 

   useEffect(() => {
      const path = location.pathname
  
      setActiveButton(path.slice(1) || "dashboard")
  
      sessionStorage.setItem("location", path)
    }, [location])

 

  const handleButtonClick = (buttonName: string) => {
   
      const path = buttonName === "dashboard" ? "/admin" : buttonName
      navigate(path)
      setActiveButton(buttonName)
      sessionStorage.setItem("location", path)
    
    
  };


    const renderButton = (
      buttonName: string,
      icon: string,
      activeIcon: string,
      label: string,
      hasDropdown: boolean = false,
    ) => (
      <>
        <button
          className={`flex items-center mb-2 p-2 rounded-lg ${activeButton === buttonName ? "bg-white" : ""}`}
          onClick={() => handleButtonClick(buttonName)}
        >
          <img
            src={activeButton === buttonName ? activeIcon : icon}
            alt={`${label} Logo`}
            className='h-8 w-8 mr-2'
          />
          <div className='flex gap-4 items-center '>
            <p
              className={`${activeButton === buttonName ? "text-lightblue" : ""} font-poppins text-[15px] font-medium leading-[15.4px] text-left`}
            >
              {label}
            </p>
          
          </div>
        </button>
       
      </>
    )



  return (
    <div className="text-white p-3 flex flex-col h-screen overflow-y-auto gap-3  sm:bg-transparent">

      {/* Logo area */}
      <div className="flex gap-2 ">
        <img
          src="/eatright.svg"
          alt="Keep Me Fit Logo"
          className="mx-auto"
        />
       
      </div>

      {/* Menu area */}
       <div className="flex flex-col gap-8 p-2 ">
      
              <div className="flex flex-col gap-5 ">
                <div>
                  <h2 className="text-md mt-4 font-bold mb-2 font-poppins text-[17px] leading-[15.4px] text-left">Main</h2>
                </div>
                {renderButton("dashboard", dashboard, dashboardblue, "Dashboard")}
                {renderButton("messages", departmentlogo, departmentblue, "Messages")}
                {renderButton("shop", inventory, inventory, "Shop", true)}
                {renderButton("notifications", notifications, notificationsblue, "Notifications")}
              </div>
              <div className="flex flex-col gap-8 mt-7">
                <div>
                  <h2 className="text-md font-bold font-poppins text-[17px] leading-[15.4px] text-left">Settings & Help</h2>
                </div>
                {renderButton('settings', settingsIcon, settingsblue, 'Settings')}
                {renderButton('support', helpsupport, helpsupportblue, 'Help & Support')}
                {renderButton('about', about, aboutappblue, 'About Application')}
              </div>
            </div>  
    </div>
  );
}

export default Sidebar;
