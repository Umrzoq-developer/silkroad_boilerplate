import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.scss';

const Layout: React.FC = () => {
  return (
    <div className="main__layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
