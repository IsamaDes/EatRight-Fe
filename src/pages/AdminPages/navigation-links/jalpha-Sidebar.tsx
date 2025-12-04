import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import dashboard from "./sideimages/dashboard.svg"
import dashboardblue from "./sideimages/dashboardblue.svg"
import jalphalogo from "./sideimages/jalphalogo.svg"
import departmentlogo from "./sideimages/departmentwhite.svg"
import departmentblue from "./sideimages/departmentblue.svg"
import employees from "./sideimages/employees.svg"
import employeeblue from "./sideimages/employeeblue.svg"
import inventory from "./sideimages/inventory.svg"
import hospitalfacility from "./sideimages/hospitalfacility.svg"
import hospitalfacilityblue from "./sideimages/hospitalfacilityblue.svg"
import analytics from "./sideimages/analytics.svg"
import analyticsblue from "./sideimages/analyticsblue.svg"
import notifications from "./sideimages/notifications.svg"
import notificationsblue from "./sideimages/notificationsblue.svg"
import settingsIcon from "./sideimages/settings.svg"
import settingsblue from "./sideimages/settingsblue.svg"
import helpsupport from "./sideimages/helpsupport.svg"
import helpsupportblue from "./sideimages/helpsupportblue.svg"
import about from "./sideimages/about.svg"
import aboutappblue from "./sideimages/aboutapplicationblue.svg"
import anglebutton from "./sideimages/anglebuttonwhite.svg"
import anglebuttonblue from "./sideimages/anglebuttonblue.svg"

const SideLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const path = location.pathname

    setActiveButton(path.slice(1) || "dashboard")

    sessionStorage.setItem("location", path)
  }, [location])

  const handleButtonClick = (buttonName: string) => {
    if (buttonName === "employees") {
      navigate("employee/list")
      setActiveButton(buttonName)
      setOpenDropdown(openDropdown === buttonName ? null : buttonName)
    } else if (buttonName === "inventory") {
      setOpenDropdown(openDropdown === buttonName ? null : buttonName)
    } else {
      const path = buttonName === "dashboard" ? "/" : `/${buttonName}`
      navigate(path)
      setActiveButton(buttonName)
      sessionStorage.setItem("location", path)
      setOpenDropdown(null)
    }
  };

  const renderDropdownContent = (buttonName: string) => {
    if (buttonName === "employees") {
     
      return (
       
        <div className='flex flex-col gap-2 ml-4 mt-2 border-l-2 border-gray-300 pl-4'>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/employee/list")}
          >
            <p className='font-poppins text-[12px] text-left'>List</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/employees/attendance")}
          >
            <p className='font-poppins text-[12px] text-left'>Attendance & Leave Requests</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/reports")}
          >
            <p className='font-poppins text-[12px] text-left'>Hospital Reports</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/employees/payrolls")}
          >
            <p className='font-poppins text-[12px] text-left'>Payrolls</p>
          </button>
        </div>
      )
    } else if (buttonName === "inventory") {
      return (
        <div className='flex flex-col gap-2 ml-4 mt-2 border-l-2 border-gray-300 pl-4'>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/inventory/supplies")}
          >
            <p className='font-poppins text-[12px] text-left'>Inventory Items</p>
          </button>
          <button
            className='py-2 px-4 text-left text-sm hover:bg-gray-200 rounded'
            onClick={() => navigate("/inventory/purchase-orders")}
          >
            <p className='font-poppins text-[12px] text-left'>Purchase Orders</p>
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
    <div className="fixed w-[250px] text-white p-2  bg-lightblue flex flex-col gap-6 sidebar h-screen">
      <div className="flex items-center mt-10 ml-10">
        <img src={jalphalogo} alt="Logo" className=" mr-2" />
      </div>
      <div className="flex flex-col ml-12 gap-8 ">

        <div className="flex flex-col gap-8 mt-10 ">
          <div>
            <h2 className="text-md mt-4 font-bold mb-2 font-poppins text-[17px] leading-[15.4px] text-left">Main</h2>
          </div>
          {renderButton("dashboard", dashboard, dashboardblue, "Dashboard")}
          {renderButton("departments", departmentlogo, departmentblue, "Departments")}
          {renderButton("employees", employees, employeeblue, "Employees", true)}
          {renderButton("inventory", inventory, inventory, "Inventory", true)}
          {renderButton("hospitalfacility",hospitalfacility,hospitalfacilityblue,"Hospital Facility",)}
          {renderButton("analytics", analytics, analyticsblue, "Analytics")}
          {renderButton("notifications", notifications, notificationsblue, "Notifications")}
        </div>
        <div className="flex flex-col gap-8 mt-7">
          <div>
            <h2 className="text-md font-bold font-poppins text-[17px] leading-[15.4px] text-left">Settings & Help</h2>
          </div>
          {renderButton('settings', settingsIcon, settingsblue, 'Settings')}
          {renderButton('help_and_support', helpsupport, helpsupportblue, 'Help & Support')}
          {renderButton('about', about, aboutappblue, 'About Application')}
        </div>
      </div>
    </div>
  );
};

export default SideLayout;