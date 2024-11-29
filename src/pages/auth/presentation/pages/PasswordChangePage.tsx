import { WarningOutlined } from '@ant-design/icons';
import { Logo } from '@src/shared/components/logo';
import { ThemeSwitch } from '@src/shared/components/theme';
import { PATH_LANDING } from '@src/shared/constants/routes';
import { RootState } from '@src/shared/redux/types';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthCarousel, PasswordChangeForm } from '../components';
import { authCarouselImages } from '../constants';

function PasswordChangePage() {
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.authState);
  const { passwordChangeRequestAvailable } = useSelector((state: RootState) => state.authState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!passwordChangeRequestAvailable) return navigate(PATH_LANDING.root);
  }, [passwordChangeRequestAvailable, navigate]);

  return (
    <>
      <div className="flex min-h-screen dark:bg-dark-500">
        <section className="bg-dark-500 w-[60%] hidden md:block rounded-e-3xl overflow-hidden">
          <AuthCarousel arrows fade autoplay autoplaySpeed={5000} images={authCarouselImages} />
        </section>
        <section className="bg-grey-100 dark:bg-dark-500 w-full md:w-[40%] p-4 md:p-12 h-screen flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <Logo titleClassName="text-black dark:text-white m-0" imgSize={{ h: 28, w: 28 }} />
            <ThemeSwitch />
          </div>
          <div>
            <div className="space-y-4 mb-6">
              <p className="text-primary-900 dark:text-secondary-500 text-xl font-semibold">Cambiar contraseña</p>
              <p className="text-grey-400 dark:text-grey-200">
                Su nueva contraseña debe ser diferente de la contraseña utilizada anteriormente.
              </p>
            </div>
            <PasswordChangeForm />
          </div>
        </section>
      </div>
      <Modal centered open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <div className="text-center text-6xl mb-4">
          <WarningOutlined />
        </div>
        <p className="text-center mb-4">{error}.</p>
      </Modal>
    </>
  );
}

export default PasswordChangePage;
