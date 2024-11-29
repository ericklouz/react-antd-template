import { Flex, FlexProps, Typography } from 'antd';
import { Link } from 'react-router-dom';

type LogoProps = {
  titleClassName?: string;
  showTitle?: boolean;
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
} & Partial<FlexProps>;

function Logo(props: LogoProps) {
  const {
    asLink,
    href = '#',
    imgSize = {
      h: 48,
      w: 48
    },
    titleClassName,
    showTitle = true,
    ...others
  } = props;

  return asLink ? (
    <Link to={href} className="no-underline hover:underline focus:underline">
      <Flex gap={others.gap || 'small'} align="center" {...others}>
        <img
          src="https://www.ceupe.com/images/easyblog_articles/3325/b2ap3_thumbnail_isotipo-bmw.png"
          alt="logo"
          height={imgSize?.h}
        />
        {showTitle && (
          <Typography.Title level={5} type="secondary" className={`m-0 py-1 px-2 text-white ${titleClassName}`}>
            Company
          </Typography.Title>
        )}
      </Flex>
    </Link>
  ) : (
    <Flex gap={others.gap || 'small'} align="center" {...others}>
      <img
        src="https://www.ceupe.com/images/easyblog_articles/3325/b2ap3_thumbnail_isotipo-bmw.png"
        alt="logo"
        height={imgSize?.h}
      />
      {showTitle && (
        <Typography.Title level={4} type="secondary" className={titleClassName}>
          Company
        </Typography.Title>
      )}
    </Flex>
  );
}

export default Logo;
