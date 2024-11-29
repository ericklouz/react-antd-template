import sendEmailLottieAnimation from '@src/assets/lottie/sendEmailAnimation.json';
import { Logo } from '@src/shared/components/logo';
import { ThemeSwitch } from '@src/shared/components/theme';
import { RootState } from '@src/shared/redux/types';
import { Alert, message } from 'antd';
import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setState } from '../../infrastructure/redux/authSlice';
import { AuthCarousel, PasswordResetForm } from '../components';
import { authCarouselImages } from '../constants';

function PasswordResetPage() {
  const dispatch = useDispatch();
  const { error, message: passwordResetMessage } = useSelector((state: RootState) => state.authState);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (passwordResetMessage) {
      messageApi.open({
        type: 'success',
        content: passwordResetMessage,
        className: 'flex justify-end mr-1',
        duration: 1.2
      });
    }
    // Limpia el estado después de mostrar el mensaje
    dispatch(setState({ error: null, message: null, loading: false, user: null }));
  }, [dispatch, messageApi, passwordResetMessage]);

  return (
    <>
      {contextHolder}
      <div className="flex min-h-screen dark:bg-dark-500">
        <section className="bg-grey-100 dark:bg-dark-500 w-full md:w-[40%] p-8 md:p-12 h-screen flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <Logo titleClassName="text-black dark:text-white m-0" imgSize={{ h: 28, w: 28 }} />
            <ThemeSwitch />
          </div>
          <div>
            <div className="space-y-4 mb-6">
              <p className="text-primary-900 dark:text-secondary-500 text-xl font-semibold">Recuperar contraseña</p>
              <Lottie animationData={sendEmailLottieAnimation} className="w-36 m-auto text-red-500" />
              <Alert
                message="Ingresa tu correo electrónico para restablecer tu contraseña."
                type="warning"
                className="text-yellow-600"
              />
            </div>
            <PasswordResetForm />
            {error && <Alert message={error} type="error" className="text-red-600 mt-4" closable />}
          </div>
        </section>
        <section className="bg-dark-500 w-[60%] hidden md:block rounded-s-3xl overflow-hidden">
          <AuthCarousel arrows fade autoplay autoplaySpeed={5000} images={authCarouselImages} />
        </section>
      </div>
    </>
  );
}

export default PasswordResetPage;
