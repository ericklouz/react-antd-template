import { FloatButton, Layout } from 'antd';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

import { Footerbar, Navbar, Sidebar } from '../components/layout';
import { NProgress } from '../components/nprogress';
import { RootState } from '../redux/types';

const { Content } = Layout;

function MainLayout() {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebarState);
  const location = useLocation();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Layout className="min-h-screen">
        <Sidebar />
        <Layout
          className={`bg-grey-100 dark:bg-dark-500 transition-all ${isSidebarOpen ? !isMobile && 'ml-[250px]' : !isMobile && 'ml-[80px]'}`}
        >
          <Navbar />
          <Content className="p-6 transition-all min-h-96 relative">
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => setIsLoading(true)}
                  onEntered={() => setIsLoading(false)}
                  timeout={300}
                  classNames={{
                    enter: 'opacity-0',
                    enterActive: 'opacity-100 transition-opacity duration-1000',
                    exit: 'opacity-100',
                    exitActive: 'opacity-0 transition-opacity duration-1000'
                  }}
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef}>
                      <Outlet />
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop type="primary" />
            </div>
          </Content>
          <Footerbar />
        </Layout>
      </Layout>
    </>
  );
}

export default MainLayout;
