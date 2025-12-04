import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import dashboard from "./SideImages/dashboard.svg"
import dashboardblue from "./SideImages/dashboardblue.svg"
import departmentlogo from "./SideImages/departmentwhite.svg"
import departmentblue from "./SideImages/departmentblue.svg"
import employees from "./SideImages/employees.svg"
import employeeblue from "./SideImages/employeeblue.svg"
import hospitalfacility from "./SideImages/hospitalfacility.svg"
import hospitalfacilityblue from "./SideImages/hospitalfacilityblue.svg"
import inventory from "./SideImages/inventory.svg"
import analytics from "./SideImages/analytics.svg"
import analyticsblue from "./SideImages/analyticsblue.svg"
import notifications from "./SideImages/notifications.svg"
import notificationsblue from "./SideImages/notificationsblue.svg"
import settingsIcon from "./SideImages/settings.svg"
import settingsblue from "./SideImages/settingsblue.svg"
import helpsupport from "./SideImages/helpsupport.svg"
import helpsupportblue from "./SideImages/helpsupportblue.svg"
import about from "./SideImages/about.svg"
import aboutappblue from "./SideImages/aboutapplicationblue.svg"
import anglebutton from "./SideImages/anglebuttonwhite.svg"
import anglebuttonblue from "./SideImages/anglebuttonblue.svg"
 
function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

   useEffect(() => {
      const path = location.pathname
  
      setActiveButton(path.slice(1) || "dashboard")
  
      sessionStorage.setItem("location", path)
    }, [location])

 

  const handleButtonClick = (buttonName: string) => {
    if (buttonName === "shop") {
      navigate("/admin/shop/view-products")
      setActiveButton(buttonName)
      setOpenDropdown(openDropdown === buttonName ? null : buttonName)
    } else if (buttonName === "employees") {
      navigate("/admin/employees/create-role&permissions")
      setActiveButton(buttonName)
      setOpenDropdown(openDropdown === buttonName ? null : buttonName)
    } else {
      const path = buttonName === "dashboard" ? "/admin" : buttonName
      navigate(path)
      setActiveButton(buttonName)
      sessionStorage.setItem("location", path)
      setOpenDropdown(null)
    }
  };


 const renderDropdownContent = (buttonName: string) => {
    if (buttonName === "shop") {
     
      return (
       
        <div className='flex flex-col gap-2 ml-4 mt-2 border-l-2 border-gray-300 pl-4'>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/admin/shop/view-products")}
          >
            <p className='font-poppins text-[12px] text-left'>List</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/admin/shop/create-category")}
          >
            <p className='font-poppins text-[12px] text-left'>Create Product Category</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/admin/shop/create-product")}
          >
            <p className='font-poppins text-[12px] text-left'>Create Product</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/admin/shop/edit-products")}
          >
            <p className='font-poppins text-[12px] text-left'>Edit Products</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/admin/shop/purchase-orders")}
          >
            <p className='font-poppins text-[12px] text-left'>Purchase Orders</p>
          </button>
        </div>
      )
    }else if(buttonName === "employees"){
      return (
        <div className='bg-red-500 flex flex-col gap-2 ml-4 mt-2 border-l-2 border-gray-300 pl-4'>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/admin/employees/create-role&permissions")}
          >
            <p className='font-poppins text-[12px] text-left'>Create Role And Permissions</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/admin/employees/assign-role&permissions")}
          >
            <p className='font-poppins text-[12px] text-left'>Assign Role And Permissions</p>
          </button>
        </div>
      )
    }
    return null
  }
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
            {hasDropdown && (
              <img
                src={openDropdown === buttonName ? anglebuttonblue : anglebutton}
                alt='Angle Button'
                className={`h-5 w-5 transition-transform duration-300 ${openDropdown === buttonName ? "rotate-180" : ""}`}
              />
            )}
          </div>
        </button>
        {openDropdown === buttonName && renderDropdownContent(buttonName)}
      </>
    )



  return (
    <div className="text-white p-3 flex flex-col h-screen overflow-y-auto gap-3  sm:bg-transparent">

      {/* Logo area */}
       <div className="flex  gap-2 ">
        <img
          src="/eatright.svg"
          alt="Keep Me Fit Logo"
          className="mx-auto"
        />
      </div>

      {/* Menu area */}
       <div className="flex bg-emerald-600 flex-col gap-8 p-2 ">
      
              <div className="flex flex-col gap-5 ">
                <div>
                  <h2 className="text-md mt-4 font-bold mb-2 font-poppins text-[17px] leading-[15.4px] text-left">Main</h2>
                </div>
                {renderButton("dashboard", dashboard, dashboardblue, "Dashboard")}
                {renderButton("departments", departmentlogo, departmentblue, "Departments")}
                {renderButton("clients", departmentlogo, departmentblue, "Clients")}
                {renderButton("employees", employees, employeeblue, "Employees", true)}
                 {renderButton("shop", inventory, inventory, "Shop", true)}
                {renderButton("eatrightrestaurant", hospitalfacility,hospitalfacilityblue,"EatRight-Facility",)}
                {renderButton("analytics", analytics, analyticsblue, "Analytics")}
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
   
        {/* <div className="flex flex-col gap-2 bg-[#FFFFFF] h-[450px]">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <div
                onClick={() => handleButtonClick(index)}
                className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer h-[44px] text-[15px] font-500 font-poppins ${
                  activeButton === index ? "bg-blue-500 text-white" : "text-[#637A63]"
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


        </div> */}
    
    </div>
  );
}

export default Sidebar;
