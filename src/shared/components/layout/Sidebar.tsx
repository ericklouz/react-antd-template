import { setIsSidebarOpen } from '@src/shared/redux/slices/layout/sidebarSlice';
import { RootState } from '@src/shared/redux/types';
import { Layout, Menu, SiderProps, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';

import { sidebarItems } from '../../constants/menu';
import { PATH_LANDING } from '../../constants/routes';
import { Logo } from '../logo';

const { Sider } = Layout;

const rootSubmenuKeys = ['dashboards'];

function Sidebar({ ...others }: SiderProps) {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebarState);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');
  const [collapsedWidth, setCollapsedWidth] = useState('80');
  const [sidebarWidth, setSidebarWidth] = useState('250px');

  function onClick(event: any) {
    console.log(event);
  }

  function onOpenChange(keys: any) {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  useEffect(() => {
    if (isMobile) {
      setCollapsedWidth('0');
      setSidebarWidth('80%');
      dispatch(setIsSidebarOpen(false)); // Close sidebar by default on mobile
      return;
    }
    setCollapsedWidth('80');
    setSidebarWidth('250px');
    dispatch(setIsSidebarOpen(true)); // Open sidebar by default on larger screens
  }, [isMobile, dispatch]);

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  const sidebarContent = (
    <>
      <Logo
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        className="py-4 px-2"
        titleClassName={`m-0 py-1 px-2 text-white transition-all duration-300 ease-in-out transform ${!isSidebarOpen ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100 relative'}`}
      />
      <Menu
        mode="inline"
        items={sidebarItems}
        onClick={onClick}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[current]}
      />
    </>
  );

  return isMobile ? (
    <Drawer
      placement="left"
      closable={false}
      onClose={() => dispatch(setIsSidebarOpen(false))}
      open={isSidebarOpen}
      width={sidebarWidth}
      classNames={{ body: 'p-0' }}
      rootClassName="p-0"
      className="bg-[#001529] dark:bg-dark-900"
    >
      {sidebarContent}
    </Drawer>
  ) : (
    <Sider
      trigger={null}
      width={sidebarWidth}
      collapsed={!isSidebarOpen}
      collapsedWidth={collapsedWidth}
      className="overflow-auto fixed left-0 top-0 bottom-0 transition-all"
      {...others}
    >
      {sidebarContent}
    </Sider>
  );
}

export default Sidebar;
