import { PATH_AUTH, PATH_LANDING, PATH_DASHBOARD, PATH_PAYMENTS_AND_CHARGES } from './routes';

const AUTHENTICATION_ITEMS = [
  { title: 'login', path: PATH_AUTH.login },
  { title: 'sign up', path: PATH_AUTH.signup },
  { title: 'welcome', path: PATH_AUTH.welcome },
  { title: 'verify email', path: PATH_AUTH.verifyEmail },
  { title: 'password reset', path: PATH_AUTH.passwordReset },
  { title: 'account deleted', path: PATH_AUTH.accountDelete }
];

export { PATH_AUTH, PATH_LANDING, PATH_DASHBOARD, PATH_PAYMENTS_AND_CHARGES, AUTHENTICATION_ITEMS };
