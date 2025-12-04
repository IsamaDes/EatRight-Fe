import { useState, useEffect } from 'react';
import Header from './navigation-links/Header';
import Sidebar from './navigation-links/Sidebar';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width <= 599);
      setIsMediumScreen(width >= 600 && width <= 1239);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const closeDrawer = () => setDrawerVisible(false);

  // Small and Medium screens: Drawer sidebar
  if (isSmallScreen || isMediumScreen) {
    const drawerWidth = isSmallScreen ? 280 : 320;

    return (
      <div className="min-h-screen bg-green-50 flex flex-col">
        {/* Drawer Sidebar */}
        <Drawer
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          width={drawerWidth}
          bodyStyle={{ backgroundColor: 'white', padding: '0.5rem' }}
        >
          <Sidebar />
        </Drawer>

        {/* Header + Content */}
        <div className="flex flex-col flex-1 px-4">
          <div className="flex items-center gap-3 mt-4">
            <button
              className="text-gray-700 text-xl w-10 h-10 flex items-center justify-center"
              onClick={toggleDrawer}
            >
              <MenuOutlined />
            </button>
            <div className="flex-1">
              <Header />
            </div>
          </div>

          <main className="flex-1 mt-4 rounded-lg overflow-auto bg-white p-4">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  // Large screens: Sidebar layout
  return (
    <div className="min-h-screen flex bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-2 hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4">
        <Header />
        <main className="flex-1 mt-4 rounded-lg overflow-auto bg-white p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
