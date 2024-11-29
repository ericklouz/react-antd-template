import { BranchesOutlined, PieChartOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

import { PATH_DASHBOARD, PATH_PAYMENTS_AND_CHARGES } from '../routes';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
};

const sidebarItems: MenuProps['items'] = [
  getItem('Dashboards', 'dashboards', <PieChartOutlined />, [
    getItem(<Link to={PATH_DASHBOARD.reservations}>Reservaciones</Link>, 'default', null),
    getItem(<Link to={PATH_DASHBOARD.customers}>Clientes</Link>, 'projects', null),
    getItem(<Link to={PATH_DASHBOARD.workshops}>Talleres</Link>, 'ecommerce', null),
    getItem(<Link to={PATH_DASHBOARD.transfers}>Traslados</Link>, 'marketing', null)
  ]),

  getItem('Pages', 'pages', null, [], 'group'),

  getItem(<Link to={PATH_PAYMENTS_AND_CHARGES.root}>Sitemap</Link>, 'sitemap', <BranchesOutlined />)
];

export default sidebarItems;
