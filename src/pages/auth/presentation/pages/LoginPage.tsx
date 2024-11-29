import { Logo } from '@src/shared/components/logo';
import { ThemeSwitch } from '@src/shared/components/theme';
import { RootState } from '@src/shared/redux/types';
import { Alert } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setState } from '../../infrastructure/redux/authSlice';
import { AuthCarousel, LoginForm } from '../components';
import { authCarouselImages } from '../constants';

function LoginPage() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.authState);

  useEffect(() => {
    dispatch(setState({ error: null, message: null, loading: false, user: null }));
  }, [dispatch]);

  return (
    <div className="flex min-h-screen dark:bg-dark-500">
      <section className="bg-grey-100 dark:bg-dark-500 w-full md:w-[40%] p-8 md:p-12 h-screen flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <Logo titleClassName="text-black dark:text-white m-0" imgSize={{ h: 28, w: 28 }} />
          <ThemeSwitch />
        </div>
        <div className="space-y-2">
          <p className="text-primary-900 dark:text-secondary-500 text-xl font-semibold">¡Bienvenido!</p>
          <p className="text-grey-400 dark:text-grey-200">Ingresa tus credenciales</p>
        </div>
        <LoginForm />
        {error && <Alert message={error} type="error" className="text-red-600" closable />}
      </section>
      <section className="bg-dark-800 w-[60%] hidden md:block rounded-s-3xl overflow-hidden">
        <AuthCarousel arrows fade autoplay autoplaySpeed={5000} images={authCarouselImages} />
      </section>
    </div>
  );
}

export default LoginPage;
