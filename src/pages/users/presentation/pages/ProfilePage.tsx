import { GlobalOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

import { UserProfileTabs } from '../components';

function ProfilePage() {
  return (
    <>
      <section className="absolute top-0 left-0 h-[445px] lg:h-80 w-full">
        <div className="absolute w-full h-full bg-primary-500/60" />
        <img src="/images/carousel-img-1.jpg" alt="" className="object-cover h-full w-full" />
      </section>

      <section className="relative flex flex-col lg:flex-row pb-4 mb-4 text-white space-y-6 md:space-y-0">
        <div className="md:pr-4">
          <Avatar size={96} icon={<UserOutlined />} className="bg-dark-400 border-4 border-white" />
        </div>
        <div className="md:px-4 py-2 flex-1">
          <h3 className="mb-1 text-xl font-semibold">Erick Yael Lozano Ruiz</h3>
          <p className="opacity-75 mb-4">Administrador</p>
          <Space size="large" className="opacity-75">
            <Space>
              <GlobalOutlined />
              <p>erick.lozano@wundertec.com</p>
            </Space>
            <Space>
              <HomeOutlined />
              <p>Pantitlan</p>
            </Space>
          </Space>
        </div>
        <div>
          <Space size="large" className="text-center">
            <Space direction="vertical" size="small">
              <p className="text-xl font-semibold">2.3K</p>
              <p className="opacity-75">reservaciones</p>
            </Space>
            <Space direction="vertical" size="small">
              <p className="text-xl font-semibold">1.1K</p>
              <p className="opacity-75">contratos</p>
            </Space>
          </Space>
        </div>
      </section>

      <section className="relative">
        <UserProfileTabs />
      </section>
    </>
  );
}

export default ProfilePage;
