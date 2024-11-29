import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { setIsSidebarOpen } from '@src/shared/redux/slices/layout/sidebarSlice';
import { AppDispatch, RootState } from '@src/shared/redux/types';
import { Button, Flex, Input, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeSwitch } from '../theme';
import Clock from './Clock';
import NotificationsCard from './NotificationsCard';
import ProfileMenu from './ProfileMenu';

const { Header } = Layout;

function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebarState);
  const [navFill, setNavFill] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5) return setNavFill(true);
      return setNavFill(false);
    });
  }, []);

  return (
    <Header
      className={`pr-4 pl-0 flex items-center justify-between bg-transparent top-0 z-10 sticky gap-2 transition-all ${
        navFill
          ? 'shadow-md bg-grey-100/50 dark:bg-dark-500/50 backdrop-blur-[8px]'
          : 'shadow-none bg-grey-100 dark:bg-dark-500 backdrop-blur-none'
      }`}
    >
      <Flex align="center">
        <Button
          type="text"
          icon={isSidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />
        <Input.Search placeholder="Buscar" size="middle" />
      </Flex>
      <Clock className="text-2xl text-primary-900 dark:text-secondary-500 hidden md:block" />
      <Flex align="center" gap={24}>
        <ThemeSwitch className="hidden md:block" />
        <NotificationsCard />
        <ProfileMenu />
      </Flex>
    </Header>
  );
}

export default Navbar;
