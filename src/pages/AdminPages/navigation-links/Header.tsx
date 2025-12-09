import { useState, useEffect } from 'react';
import { Avatar, Popover } from 'antd';
import AdminOverviewCard from './UserOverviewCard';
import { getCurrentUser } from '../../../services/userService';
import eng from "./SideImages/eng.svg"
import frs from "./SideImages/frs.svg"
import userpicture from "./SideImages/userPicture.svg"

interface UserProfile {

}

// Update the User interface to match your API response
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: null; // Can be null for admin
}

interface UserResponse {
  status: string;
  user: User;
}

const Headerbar = () => {
  const [notificationDrop, setNotificationDrop] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userAccountDrop, setUserAccountDrop] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState('En');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setIsLanguageDropdownOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: UserResponse = await getCurrentUser();
        console.log('User data:', response);
        
        if (response.status === 'success' && response.user) {
          setUser(response.user);
          localStorage.setItem('user_data', JSON.stringify(response.user));
        }
      } catch (err) {
        console.error('User fetch failed:', err);
      }
    };
    fetchUserData();
  }, []);

  // Determine which overview card to show based on role
  const renderOverviewCard = () => {
    if (user?.role === 'ADMIN') {
      return <AdminOverviewCard user={user} />;
    }

  };

  

  return (
    <div className="flex items-center justify-between h-[80px] px-4">

      {/* Welcome */}
      <div className="font-poppins text-sm sm:text-base lg:text-lg font-medium text-gray-800">
        Welcome {user?.name || 'User'} 👋🏼
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Search */}
        <div className="relative hidden sm:block bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-[180px] md:w-[218px] pl-10 pr-4 py-2 rounded-md border bg-lightblue border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <img
            src="/searchicon.svg"
            alt="Search"
            className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Language */}
          <div className="relative">
            <div
              className="flex items-center h-9 sm:h-10 px-2 sm:px-3 bg-[#F3FFED] rounded cursor-pointer hover:bg-[#E8F5D8]"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              {language === 'En' ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <img src={eng} alt="English" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm hidden sm:inline">Eng(US)</span>
                  <span className="text-xs sm:hidden">En</span>
                  <img src="/vangle.svg" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm">French</span>
                  <img src="/vangle.svg" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              )}
            </div>

            {isLanguageDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-20 min-w-[100px] sm:min-w-[120px]">
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleLanguageChange('En')}
                >
                  <img src={eng} alt="English" className="w-4 h-4" />
                  <span className="hidden sm:inline">Eng(US)</span>
                  <span className="sm:hidden">En</span>
                </div>
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleLanguageChange('Fr')}
                >
                   <img src={frs} alt="French" className="w-4 h-4" />
                   <span className="hidden sm:inline">French</span>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationDrop(!notificationDrop)}
              className="bg-[#DBFFC3] p-2 rounded-full hover:bg-[#C8F2A8] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
            >
              <img src="/bell.svg" alt="Notifications" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {notificationDrop && (
              <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 p-4 bg-white border shadow-lg rounded-md z-20">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-sm">No new notifications</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map((note, i) => (
                      <div key={i} className="mb-2 text-sm text-gray-700 border-b pb-2">
                        {/* {note.message} */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Popover */}
          <Popover
            placement="bottomRight"
            content={renderOverviewCard()}
            trigger="click"
            open={userAccountDrop}
            onOpenChange={(visible) => setUserAccountDrop(visible)}
          >
            <button className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-lg">
              {/* Show crown icon for admin */}
              {user?.role === 'ADMIN' ? (
                <div className="relative">
                  <Avatar 
                    size={40} 
                    src={userpicture}
                    alt={user?.name}
                    style={{ backgroundColor: '#3b82f6' }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  {/* Crown badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-3 h-3 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <Avatar 
                  size={40} 
                  src={userpicture}
                  alt={user?.name}
                  style={{ backgroundColor: '#10b981' }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              )}
              
              <div className="hidden sm:flex flex-col text-left">
                <p className="font-semibold text-gray-900 text-sm truncate max-w-[120px]">
                  {user?.name || 'User'}
                </p>
              
              </div>
              <img src="/vangle.svg" alt="" className="w-4 h-4 hidden sm:block" />
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Headerbar;