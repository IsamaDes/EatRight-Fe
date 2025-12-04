import userpicture from "./SideImages/userPicture.svg";
import { Avatar } from "antd";
import React, { useEffect, useState } from 'react';

const AdminOverviewCard = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Admin');
  const [role, setRole] = useState<string>('N/A');
  const [department, setDepartment] = useState<string>('N/A');
  const [email, setEmail] = useState<string>('N/A');
  const [employeeId, setEmployeeId] = useState<string>('N/A');

  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if(userData){
      const user = JSON.parse(userData);
      setUserName(user.first_name + ' ' + user.last_name);
      setUserImage(user.profile_picture || null);
      setRole(user.role || 'N/A');
      setDepartment(user.department || 'N/A');
      setEmail(user.email || 'N/A');
      setEmployeeId(user.employee_id || 'N/A');
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Admin Overview</h2>

      <div className="flex flex-col items-center mb-6">
        {/* Profile Picture */}
        <div className="rounded-full mb-2 flex items-center justify-center">
          {userImage ? 
            <Avatar size={80} src={userImage} /> : 
            <img src={userpicture} className='h-20 w-20' />
          }
        </div>
        <h3 className="text-lg font-semibold">{userName}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-500 text-sm">Employee ID</p>
          <p className="font-semibold">{employeeId}</p>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-500 text-sm">Role</p>
          <p className="font-semibold">{role}</p>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <p className="text-gray-500 text-sm">Department</p>
          <p className="font-semibold">{department}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition text-sm">
          View Profile
        </button>
        <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition text-sm">
          Settings
        </button>
      </div>
    </div>
  );
};

export default AdminOverviewCard;