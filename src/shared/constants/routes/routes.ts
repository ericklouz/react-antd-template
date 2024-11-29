function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_LANDING = '/';
const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_PAYMENTS_AND_CHARGES = '/payments-and-charges';
const ROOTS_USERS = '/users';
const ROOTS_PROFILE = '/user-profile';

export const PATH_LANDING = {
  root: ROOTS_LANDING,
  why: '/why-us',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact'
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
  passwordConfirm: path(ROOTS_AUTH, '/password-confirmation'),
  welcome: path(ROOTS_AUTH, '/welcome'),
  verifyEmail: path(ROOTS_AUTH, '/verify-email'),
  accountDelete: path(ROOTS_AUTH, '/account-delete')
};

export const PATH_USERS = {
  root: ROOTS_USERS,
  list: path(ROOTS_USERS, '/list'),
  create: path(ROOTS_USERS, '/create'),
  edit: path(ROOTS_USERS, '/edit')
};

export const PATH_USER_PROFILE = {
  root: ROOTS_PROFILE,
  details: path(ROOTS_PROFILE, '/details'),
  preferences: path(ROOTS_PROFILE, '/preferences'),
  personalInformation: path(ROOTS_PROFILE, '/personal-information'),
  security: path(ROOTS_PROFILE, '/security'),
  activity: path(ROOTS_PROFILE, '/activity'),
  action: path(ROOTS_PROFILE, '/actions'),
  help: path(ROOTS_PROFILE, '/help'),
  feedback: path(ROOTS_PROFILE, '/feedback')
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  reservations: path(ROOTS_DASHBOARD, '/reservations'),
  customers: path(ROOTS_DASHBOARD, '/customers'),
  workshops: path(ROOTS_DASHBOARD, '/workshops'),
  transfers: path(ROOTS_DASHBOARD, '/transfers')
};

export const PATH_PAYMENTS_AND_CHARGES = {
  root: ROOTS_PAYMENTS_AND_CHARGES
};
