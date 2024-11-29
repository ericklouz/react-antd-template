import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormField } from '@src/shared/types';

interface LoginFormFields {
  email: FormField;
  password: FormField;
}

const loginFormFields: LoginFormFields = {
  email: {
    name: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    prefix: <UserOutlined />,
    rules: [
      { required: true, message: 'Por favor ingresa tu correo electrónico' },
      {
        type: 'email',
        message: 'Formato de correo electrónico incorrecto'
      }
    ]
  },
  password: {
    name: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    prefix: <LockOutlined />,
    rules: [{ required: true, message: 'Por favor ingresa tu contraseña' }]
  }
};

export default loginFormFields;
