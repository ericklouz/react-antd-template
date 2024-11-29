import { LoginDto } from '@src/pages/auth/domain/dtos';
import { login } from '@src/pages/auth/infrastructure/redux/authSlice';
import { MyForm } from '@src/shared/components/form';
import { PATH_AUTH } from '@src/shared/constants/routes';
import { AppDispatch, RootState } from '@src/shared/redux/types';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginFormFields } from '../constants';

function LoginForm() {
  const { loading } = useSelector((state: RootState) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  async function handleFinish(fields: LoginDto) {
    dispatch(login(fields));
  }

  return (
    <MyForm
      showClearButton={false}
      showCancelButton={false}
      confirmButtonText="Ingresar"
      onFinish={handleFinish}
      loading={loading}
    >
      <Form.Item
        name={loginFormFields.email.name}
        label={loginFormFields.email.label}
        rules={loginFormFields.email.rules}
      >
        <Input size="large" prefix={loginFormFields.email.prefix} placeholder={loginFormFields.email.placeholder} />
      </Form.Item>

      <Form.Item
        name={loginFormFields.password.name}
        label={loginFormFields.password.label}
        rules={loginFormFields.password.rules}
      >
        <Input.Password
          size="large"
          prefix={loginFormFields.password.prefix}
          placeholder={loginFormFields.password.placeholder}
        />
      </Form.Item>

      <div className="w-full flex justify-between">
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Recordar usuario</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button className="p-0" type="link" block onClick={() => navigate(PATH_AUTH.passwordReset)}>
            ¿Olvidaste tu contraseña?
          </Button>
        </Form.Item>
      </div>
    </MyForm>
  );
}

export default LoginForm;
