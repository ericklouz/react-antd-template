import { Layout, Space } from 'antd';

const { Footer } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

function Footerbar({ className, ...others }: FooterNavProps) {
  return (
    <Footer
      {...others}
      className={`px-8 flex md:flex-row flex-col justify-between space-y-4 md:space-y-0 items-center bg-transparent ${className}`}
    >
      <Space direction="vertical" className="text-grey-500">
        <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        <p>
          Developed by{' '}
          <strong>
            <a href="" className="text-black dark:text-grey-200">
              Development Company
            </a>
          </strong>
        </p>
      </Space>
      <Space size="middle" className="font-medium">
        <a href="" className="text-grey-500 hover:text-grey-400">
          Acerca de nostros
        </a>
        <a href="" className="text-grey-500 hover:text-grey-400">
          Licencia
        </a>
      </Space>
    </Footer>
  );
}

export default Footerbar;
