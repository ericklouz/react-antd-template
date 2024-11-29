import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Collapse, Dropdown, List, MenuProps, Progress, Skeleton, Space, Timeline } from 'antd';
import { useEffect, useState } from 'react';

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Ver',
    icon: <EyeOutlined />
  },
  {
    key: '2',
    label: 'Editar',
    icon: <EditOutlined />
  },
  {
    key: '3',
    label: 'Eliminar',
    icon: <DeleteOutlined />,
    danger: true
  }
];

function OverviewTabContent() {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.results);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col w-full 2xl:w-[25%] gap-6">
        <div className="bg-white dark:bg-dark-800 p-4 rounded-lg space-y-6 shadow-md">
          <p className="text-lg font-medium text-black/70 dark:text-white/80">Completa tu perfil</p>
          <Progress percent={100} percentPosition={{ align: 'center', type: 'inner' }} size={['100%', 15]} />
        </div>

        <div className="bg-white dark:bg-dark-800 p-4 rounded-lg space-y-6 shadow-md">
          <p className="text-lg font-medium text-black/70 dark:text-white/80">Información personal</p>
          <Space size="middle" direction="vertical">
            <Space size="small">
              <p className="font-semibold dark:text-white/80">Nombre:</p>
              <p className="text-black/70 dark:text-white/80 break-all">Erick Yael Lozano Ruiz</p>
            </Space>
            <Space size="small">
              <p className="font-semibold dark:text-white/80">Teléfono:</p>
              <p className="text-black/70 dark:text-white/80 break-all">+(52) 56 1439 7613</p>
            </Space>
            <Space size="small">
              <p className="font-semibold dark:text-white/80">Correo:</p>
              <p className="text-black/70 dark:text-white/80 break-all">erick.lozano@wundertec.com</p>
            </Space>
            <Space size="small">
              <p className="font-semibold  dark:text-white/80">Sucursal:</p>
              <p className="text-black/70 dark:text-white/80 break-all">Pantitlán</p>
            </Space>
            <Space size="small">
              <p className="font-semibold dark:text-white/80">Fecha de ingreso:</p>
              <p className="text-black/70 dark:text-white/80 break-all">24 Nov 2021</p>
            </Space>
          </Space>
        </div>

        <div className="bg-white p-4 dark:bg-dark-800 rounded-lg space-y-6 shadow-md">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-black/70 dark:text-white/80">Personal a cargo</p>
            <Dropdown menu={{ items }} trigger={['click']}>
              <MoreOutlined className="text-lg text-black/80 dark:text-white/80 cursor-pointer" />
            </Dropdown>
          </div>
          <List
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item actions={[<Button type="default" icon={<SearchOutlined />} />]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name?.last}</a>}
                    description="Puesto"
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 items-start gap-6">
        <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-md w-full">
          <p className="text-lg font-medium text-black/70 dark:text-white/80 mb-4">Acerca de</p>
          <p>
            Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person,
            it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is
            European languages are members of the same family. You always want to make sure that your fonts work well
            together and try to limit the number of fonts you use to three or less. Experiment and play around with the
            fonts that you already have in the software you’re working with reputable font websites. This may be the
            most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use
            different fonts in one design, but do not over-exaggerate and go overboard.
          </p>
          <div className="grid lg:grid-cols-3 mt-10">
            <Space size="middle">
              <Avatar icon={<UserOutlined />} />
              <div>
                <p className="font-semibold">Puesto:</p>
                <p>Gerente General</p>
              </div>
            </Space>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-4 rounded-lg shadow-md w-full">
          <div className="mb-8">
            <p className="text-lg font-medium text-black/70 dark:text-white/80">Actividad reciente</p>
          </div>
          <div className="ml-3">
            <Timeline
              items={[
                {
                  dot: <Avatar icon={<UserOutlined />} className="bg-red-500" />,
                  children: (
                    <Collapse
                      className="p-0"
                      items={[
                        {
                          key: '1',
                          label: (
                            <div className="-mt-2 ml-4">
                              <p className="text-black/80 font-semibold">Erick Ruiz</p>
                              <p className="text-xs text-black/50 font-medium">Creación de reservación - Ayer</p>
                            </div>
                          ),
                          children: <p>hola</p>,
                          showArrow: false,
                          className: 'p-0',
                          headerClass: 'p-0'
                        }
                      ]}
                      defaultActiveKey={['1']}
                      ghost
                    />
                  )
                },
                {
                  children: 'Solve initial network problems 2015-09-01'
                },
                {
                  dot: <ClockCircleOutlined className="timeline-clock-icon" />,
                  color: 'red',
                  children: 'Technical testing 2015-09-01'
                },
                {
                  children: 'Network problems being solved 2015-09-01'
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTabContent;
