import React, { useState } from "react";
import { Link } from "react-router-dom";
 

function Sidebar() {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const menuItems = [ 
   { name: "Overview", icon: "/overview.svg", whiteIcon: "/whiteoverview.svg", link: "/nutritionist" },
   { name: "My Profile", icon: "/myprofile.svg", whiteIcon: "/whitemyprofile.svg", link: "/nutritionist/profile" },
   { name: "Consultation", icon: "/myprofile.svg", whiteIcon: "/whitemyprofile.svg", link: "/nutritionist/consultation" },
   { name: "Clients", icon: "/myprofile.svg", whiteIcon: "/whitemyprofile.svg", link: "/nutritionist/clients" },
   { name: "Messages", icon: "/mymessages.svg", whiteIcon: "/whitemessage.svg", link: "/nutritionist/messages" },
   { name: "Sign Out", icon: "/signout.svg", whiteIcon: "/whitesignout.svg", link: "/nutritionist/signout" }
  ];

  const handleButtonClick = (index: number) => {
    setActiveButton(index === activeButton ? null : index);
  };

  return (
    <div className="text-white p-3 flex flex-col h-screen overflow-y-auto gap-3 md:bg-white sm:bg-transparent">

      {/* Logo area */}
      <div className="flex gap-2">
        <img
          src="/eatright.svg"
          alt="Keep Me Fit Logo"
          className="mx-auto"
        />

      </div>

      {/* Menu area */}
   
        <div className="flex flex-col gap-2 bg-[#FFFFFF] h-[450px]">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <div
                onClick={() => handleButtonClick(index)}
                className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer h-[44px] text-[15px] font-500 font-poppins ${
                  activeButton === index ? "text-white" : "text-[#637A63]"
                }`}
                style={
                  activeButton === index
                    ? {
                        background:
                          "linear-gradient(249deg, #ABD27B 9.4%, #39B54A 89.96%)"
                      }
                    : {}
                }
              >
                <img
                  src={activeButton === index ? item.whiteIcon : item.icon}
                  alt={item.name}
                  className="w-[24px] h-[24px]"
                />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
    
    </div>
  );
}

export default Sidebar;
