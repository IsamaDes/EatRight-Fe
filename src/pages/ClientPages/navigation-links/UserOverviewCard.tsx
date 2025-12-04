import userpicture from "./SideImages/userPicture.svg";
import { Avatar } from "antd";


import React, { useEffect, useState } from 'react';

const UserOverviewCard = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('User');
  const [bloodGroup, setBloodGroup] = useState<string>('N/A');
  const [weight, setWeight] = useState<string>('N/A');
  const [height, setHeight] = useState<string>('N/A');
  const [summary, setSummary] = useState<string>('No summary available');

  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if(userData){
      const user =  JSON.parse(userData);
      setUserName(user.first_name + ' ' + user.last_name);
      setUserImage(user.profile_picture || null);
      setBloodGroup(user.blood_group || 'N/A');
      setWeight(user.weight || 'N/A');
      setHeight(user.height || 'N/A');
      setSummary(user.summary || 'No summary available');
}
  }, []);

    const imageToUse = userImage?.trim()
      ? userImage
      : '/userpicture.svg';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Client&rsquo;s Overview</h2>

      <div className="flex flex-col items-center mb-6">
        {/* Profile Picture */}
        <div className=" bg-red-500 rounded-full mb-2 flex items-center justify-center">
          {userImage ?  <Avatar size={40} src={userImage} /> : <img src={userpicture} className='h-10 w-10' />}
        </div>
        <h3 className="text-lg font-semibold">{userName}</h3>
      </div>

      <div className="flex justify-around text-center mb-6">
        <div>
          <p className="text-gray-500">Blood</p>
          <p className="font-semibold">{bloodGroup}</p>
        </div>
        <div>
          <p className="text-gray-500">Weight</p>
          <p className="font-semibold">{weight}</p>
        </div>
        <div>
          <p className="text-gray-500">Height</p>
          <p className="font-semibold">{height}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 text-center text-gray-500 mb-2 font-medium">
        <p>Summary</p>
        <p>Conditions</p>
        <p>Note</p>
      </div>

      <p className="text-gray-600 mt-2 text-sm">
       {summary}
      </p>
    </div>
  );
};

export default UserOverviewCard;
