import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { darkThemeConfig, lightThemeConfig } from './config';
import { RootState } from './shared/redux/types';
import { appRoutes } from './shared/routes';

function App() {
  const { mytheme } = useSelector((state: RootState) => state.themeState);
  const themeConfig = mytheme === 'dark' ? darkThemeConfig : lightThemeConfig;

  return (
    <HelmetProvider>
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={appRoutes} />
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
