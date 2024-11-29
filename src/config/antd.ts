import { theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

import COLORS from './Colors';

const darkThemeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: COLORS.secondary[500],
    colorBgBase: COLORS.dark[500],
    colorTextBase: COLORS.dark[50]
  },
  components: {
    Menu: {
      itemBg: 'none',
      itemHoverBg: COLORS.secondary[500],
      darkItemBg: 'none',
      darkSubMenuItemBg: 'none',
      darkPopupBg: 'none'
    },
    Layout: {
      siderBg: COLORS.dark[800],
      colorText: COLORS.dark[100]
    },
    Timeline: {
      dotBg: 'none'
    }
  }
};

const lightThemeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: COLORS.primary[900]
    // colorBgBase: COLORS.grey[50]
  },
  components: {
    Menu: {
      itemBg: 'none',
      itemHoverBg: COLORS.primary[500],
      itemHoverColor: 'white',
      itemColor: COLORS.grey[100],
      subMenuItemBg: '#000C17',
      groupTitleColor: COLORS.grey[400],
      popupBg: COLORS.dark[800]
    }
  }
};

export { darkThemeConfig, lightThemeConfig };
