import { BellFilled, BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, List, Space, Tabs, Tag } from 'antd';
import { useMemo } from 'react';

interface Notification {
  id: number;
  type: string;
  content: string;
  time: string;
}

const notificationTabs = [
  { key: '0', label: 'All' },
  { key: '1', label: 'Message' },
  { key: '2', label: 'Alert' }
];

const notifications: Notification[] | [] = [
  { id: 1, type: '1', content: 'You have received 20 new messages in the conversation', time: '2 hrs ago' },
  { id: 2, type: '2', content: 'Maureen Gibson: We talked about a project on LinkedIn.', time: '4 hrs ago' },
  { id: 3, type: '1', content: 'You received a new promotion!', time: '1 day ago' },
  { id: 4, type: '2', content: 'System will be down for maintenance tomorrow.', time: '3 hrs ago' },
  { id: 5, type: '1', content: 'Check out the latest updates on your dashboard.', time: '2 days ago' },
  { id: 6, type: '2', content: 'New feature has been added!', time: '1 week ago' }
];

const filterNotifications = (type: string) =>
  type === '0' ? notifications : notifications.filter((notification) => notification.type === type);

function NotificationsCard() {
  const newNotificationsCount = 4;

  const notificationTabItems = useMemo(() => {
    const emptyNotificationText = (
      <Space direction="vertical" size="middle">
        <BellFilled className="text-4xl" />
        <Space direction="vertical" size="small">
          <p className="text-base font-bold">Aún no hay notificaciones</p>
          <p className="font-semibold">Aquí se mostrarán las notificaciones que recibas.</p>
        </Space>
      </Space>
    );

    return notificationTabs.map((type) => ({
      label: `${type.label} (${filterNotifications(type.key).length})`,
      key: type.key,
      children: (
        <div className="max-h-72 px-5 overflow-y-auto">
          <List
            dataSource={filterNotifications(type.key)}
            locale={{ emptyText: emptyNotificationText }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://via.placeholder.com/32" />}
                  title={item.content}
                  description={item.time}
                />
              </List.Item>
            )}
          />
        </div>
      )
    }));
  }, []);

  const notificationDropdown = (
    <div className="w-full md:w-96 bg-white dark:bg-dark-400 rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 bg-primary-500 dark:bg-secondary-500 text-white">
        <h4 className="text-lg font-medium">Notificaciones</h4>
        <Tag color="#f50">{`${newNotificationsCount} nuevos`}</Tag>
      </div>
      <Tabs
        type="card"
        renderTabBar={(props) => {
          const { activeKey, onTabClick } = props;
          return (
            <div className="flex bg-primary-500 dark:bg-secondary-500 px-2">
              {notificationTabs.map((type, index) => (
                <div
                  key={index}
                  onClick={(e) => onTabClick(type.key, e)} // Aquí pasamos el evento además de la clave
                  className={`px-4 py-2 cursor-pointer rounded-t-md ${
                    activeKey === type.key
                      ? 'bg-white dark:bg-dark-400 text-primary-500 dark:text-secondary-500' // Pestaña activa
                      : 'bg-primary-500 dark:bg-secondary-500 text-white' // Pestaña inactiva
                  }`}
                >
                  {`${type.label} (${filterNotifications(type.key).length})`}
                </div>
              ))}
            </div>
          );
        }}
        animated
        defaultActiveKey="all"
        items={notificationTabItems}
      />
      <div className="p-4">
        <Button type="link" className="text-primary-900 dark:text-secondary-500">
          Ver historial notificaciones →
        </Button>
      </div>
    </div>
  );

  return (
    <Badge count={newNotificationsCount} size="default">
      <Dropdown
        className="relative"
        dropdownRender={() => notificationDropdown}
        trigger={['click']}
        overlayClassName="fixed top-16 w-full md:w-auto left-0 md:left-auto"
        placement="bottomRight"
        getPopupContainer={() => document.body}
      >
        <BellOutlined className="text-xl cursor-pointer" />
      </Dropdown>
    </Badge>
  );
}

export default NotificationsCard;
