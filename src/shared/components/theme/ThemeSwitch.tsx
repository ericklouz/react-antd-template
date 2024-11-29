import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { toggleTheme } from '@src/shared/redux/slices/theme/themeSlice';
import { RootState } from '@src/shared/redux/types';
import { Switch, SwitchProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function ThemeSwitch({ ...others }: SwitchProps) {
  const dispatch = useDispatch();
  const { mytheme } = useSelector((state: RootState) => state.themeState);
  return (
    <Switch
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
      checked={mytheme === 'light' ? true : false}
      onClick={() => dispatch(toggleTheme())}
      {...others}
    />
  );
}

export default ThemeSwitch;
