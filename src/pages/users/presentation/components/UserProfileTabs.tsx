import { Button, Space, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ActivitiesTabContent from './ActivitiesTabContent';
import DocumentsTabContent from './DocumentsTabContent';
import OverviewTabContent from './OverviewTabContent';
import { userProfileTabs } from '../constants';

function renderTabContent(key: string) {
  const tabContents = {
    '1': <OverviewTabContent />,
    '2': <ActivitiesTabContent />,
    '3': <DocumentsTabContent />
  };

  return tabContents[key as keyof typeof tabContents];
}

function UserProfileTabs() {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [showIcons, setShowIcons] = useState(false);

  const userProfileTabItems = useMemo(() => {
    return userProfileTabs.map((type) => ({
      label: showIcons ? type.icon : type.label,
      key: type.key,
      children: <div className="w-full mt-6">{renderTabContent(type.key)}</div>
    }));
  }, [showIcons]);

  useEffect(() => {
    setShowIcons(isMobile);
  }, [isMobile]);

  return (
    <Tabs
      animated
      items={userProfileTabItems}
      renderTabBar={(props) => {
        const { activeKey, onTabClick } = props;
        return (
          <div className="flex justify-between">
            <Space>
              {userProfileTabs.map((type, index) => (
                <div
                  key={index}
                  onClick={(e) => onTabClick(type.key, e)} // Aquí pasamos el evento además de la clave
                  className={`px-4 py-2 cursor-pointer rounded-md font-semibold ${
                    activeKey === type.key
                      ? 'bg-dark-400/50 text-white' // Pestaña activa
                      : 'text-white hover:bg-dark-400/50' // Pestaña inactiva
                  }`}
                >
                  {showIcons ? type.icon : type.label}
                </div>
              ))}
            </Space>
            <Button type="primary" className="bg-green-600 hover:bg-green-700">
              Editar perfil
            </Button>
          </div>
        );
      }}
    />
  );
}

export default UserProfileTabs;
