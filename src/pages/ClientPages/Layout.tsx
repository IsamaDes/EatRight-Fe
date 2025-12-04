// app/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from './navigation-links/Header';
import Sidebar from './navigation-links/Sidebar';
import { Layout, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";


const { Sider, Content } = Layout;

const ClientLayout = () => {
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

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Small screens (360-599dp): Full-width content with drawer
  if (isSmallScreen) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#F3FFED' }}>
        <Drawer
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          width={280}
          styles={{
            body: { backgroundColor: '#001529', padding: '0 10px' },
          }}
        >
          <Sidebar />
        </Drawer>

        <Layout style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              style={{
                fontSize: '18px',
                width: '40px',
                height: '40px',
              }}
            />
            <div style={{ flex: 1 }}>
              <Header />
            </div>
          </div>

          <Content
            style={{
              borderRadius: '8px',
              overflow: 'auto',
              flex: 1,
            }}
          >
          <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }

  // Medium screens (600-1239dp): Sidebar becomes bottom nav or stays as drawer
  if (isMediumScreen) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#F3FFED' }}>
        <Drawer
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          width={320}
          styles={{
            body: { backgroundColor: '#001529', padding: '0, 10px' },
          }}
        >
          <Sidebar />
        </Drawer>

        <Layout style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              style={{
                fontSize: '18px',
                width: '40px',
                height: '40px',
              }}
            />
            <div style={{ flex: 1 }}>
              <Header />
            </div>
          </div>

          <Content
            style={{
              borderRadius: '8px',
              overflow: 'auto',
              flex: 1,
            }}
          >
          <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }

  // Large screens (1240dp+): Traditional sidebar layout
  return (
    <Layout style={{ minHeight: '100vh', background: '#F3FFED' }}>
      <Sider
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          padding: '0 10px',
        }}
      >
        <Sidebar />
      </Sider>

      <Layout style={{ padding: '0 16px' }}>
        <Header />

        <Content
          style={{
            borderRadius: '8px',
            overflow: 'auto',
            flex: 1,
          }}
        >
        <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
