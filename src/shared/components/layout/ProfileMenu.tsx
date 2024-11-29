import { LogoutOutlined, QuestionOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '@src/pages/auth/infrastructure/redux/authSlice';
import { AuthState } from '@src/pages/auth/types';
import { AppDispatch, RootState } from '@src/shared/redux/types';
import { Dropdown, MenuProps, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import AvatarStatus from './AvatarStatus';
import { ThemeSwitch } from '../theme';

function ProfileMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const { user }: AuthState = useSelector((state: RootState) => state.authState);
  const [avatarSize, setAvatarSize] = useState<'default' | 'large'>('default');
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState<boolean | undefined>(undefined);

  const profileMenuItems: MenuProps['items'] = useMemo(() => {
    async function onLogout() {
      dispatch(logout());
    }

    const mobileItems: MenuProps['items'] = isMobile
      ? [
          {
            key: '1',
            label: (
              <AvatarStatus
                size={64}
                className="text-3xl"
                initials={`${user?.names.charAt(0)}${user?.paternal_surname.charAt(0)}`}
                title={`${user?.names} ${user?.paternal_surname} ${user?.maternal_surname ?? ''}`}
                subtitle="Administrador"
              />
            )
          },
          { type: 'divider', key: 'divider-1' }
        ]
      : [];

    return [
      ...mobileItems,
      {
        type: 'group',
        label: 'Cuenta',
        key: 'group-1',
        children: [
          {
            key: '2',
            label: 'Mi perfil',
            icon: <UserOutlined />,
            onClick: () => navigate('users/user-profile')
          }
        ]
      },
      { type: 'divider', key: 'divider-2' },
      {
        type: 'group',
        label: 'Settings',
        key: 'group-2',
        children: [
          {
            key: '3',
            label: 'Settings',
            icon: <SettingOutlined />
          },
          {
            key: '4',
            label: 'Help Center',
            icon: <QuestionOutlined />
          },
          ...(isMobile
            ? [
                {
                  key: '5',
                  label: 'Tema',
                  icon: <ThemeSwitch />
                }
              ]
            : [])
        ]
      },
      { type: 'divider', key: 'divider-3' },
      {
        key: '6',
        label: 'Cerrar sesión',
        icon: <LogoutOutlined />,
        danger: true,
        onClick: async () => await onLogout()
      }
    ];
  }, [isMobile, user, dispatch, navigate]);

  useEffect(() => {
    setAvatarSize(isMobile ? 'default' : 'large');
  }, [isMobile]);

  return (
    <Dropdown
      menu={{
        items: profileMenuItems,
        onClick: (info) => setIsProfileDropDownOpen(info.key === '5' ? true : undefined),
        onMouseLeave: () => setIsProfileDropDownOpen(undefined)
      }}
      trigger={['click']}
      overlayClassName="fixed top-16 w-full md:w-auto left-0 md:left-auto"
      className="flex items-center cursor-pointer bg-transparent"
      placement="bottomRight"
      open={isProfileDropDownOpen}
      getPopupContainer={() => document.body}
    >
      <Space>
        <AvatarStatus
          size={avatarSize}
          className="flex text-lg"
          classNameDetails="hidden md:flex"
          initials={`${user?.names.charAt(0)}${user?.paternal_surname.charAt(0)}`}
          title={`${user?.names} ${user?.paternal_surname} ${user?.maternal_surname ?? ''}`}
          subtitle="Administrador"
        />
      </Space>
    </Dropdown>
  );
}

export default ProfileMenu;
