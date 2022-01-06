import { Button } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.scss';
import { AUTH_TOKEN } from '@/constants/ApiConstant';
import { useRecoilState } from 'recoil';
import { userDetail } from '@/store/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [_, setUser] = useRecoilState(userDetail);
  const handleClick = () => {
    Cookies.remove(AUTH_TOKEN);
    setUser({ isAuth: false });
    navigate('/');
  };
  return (
    <div className="navbar__layout">
      <Link to="/main">Main</Link>
      <Link to="math">Math</Link>
      <Button onClick={handleClick} type="link">
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
