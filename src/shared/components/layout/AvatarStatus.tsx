import { Avatar, AvatarProps } from 'antd';
import classNames from 'classnames';

interface AvatarStatusProps extends AvatarProps {
  initials: string;
  title: string;
  subtitle?: string;
  classNameDetails?: string;
}

function AvatarStatus({ initials, title, subtitle, classNameDetails, ...others }: AvatarStatusProps) {
  return (
    <div className="flex items-center">
      <Avatar {...others}>{initials}</Avatar>
      <div className={classNames('ml-2 md:flex md:flex-col md:leading-5', classNameDetails)}>
        <h4 className="font-semibold">{title}</h4>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

export default AvatarStatus;
