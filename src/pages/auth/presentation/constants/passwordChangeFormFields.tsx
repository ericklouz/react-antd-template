import { LockOutlined } from '@ant-design/icons';
import { PASSWORD_REGEX } from '@src/shared/constants/regex';
import { FormField } from '@src/shared/types';
import { StringValidator } from '@src/shared/utils';

interface PasswordChangeFormFields {
  password: FormField;
  confirmedPassword: FormField;
}

const passwordChangeFormFields: PasswordChangeFormFields = {
  password: {
    name: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    prefix: <LockOutlined />,
    rules: [
      { required: true, message: 'Por favor ingresa tu contraseña' },
      {
        pattern: PASSWORD_REGEX,
        message: 'La contraseña no cumple con las características solicitadas'
      }
    ]
  },
  confirmedPassword: {
    name: 'confirmed_password',
    label: 'Confirma tu contraseña',
    placeholder: 'Confirma tu contraseña',
    prefix: <LockOutlined />,
    rules: [
      { required: true, message: 'Por favor confirma tu contraseña' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value && !StringValidator.isValidPassword(value))
            return Promise.reject(new Error('La contraseña no cumple con las características solicitadas'));
          if (!value || getFieldValue('password') === value) return Promise.resolve();

          return Promise.reject(new Error('Las contraseñas no coinciden'));
        }
      })
    ]
  }
};

export default passwordChangeFormFields;
