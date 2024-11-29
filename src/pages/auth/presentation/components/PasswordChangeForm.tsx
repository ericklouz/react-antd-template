import { MyForm } from '@src/shared/components/form';
import { PATH_AUTH } from '@src/shared/constants/routes';
import { AppDispatch, RootState } from '@src/shared/redux/types';
import { StringValidator } from '@src/shared/utils';
import { Alert, Button, Form, Input, message } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { passwordChangeFormFields } from '../constants';
import PasswordRequirements from './PasswordRequirements';
import { PasswordChangeDto } from '../../domain/dtos';
import { passwordChange, setState } from '../../infrastructure/redux/authSlice';

function PasswordChangeForm() {
  const { loading } = useSelector((state: RootState) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  async function handleFinish(fields: PasswordChangeDto) {
    dispatch(passwordChange(fields)).then(({ payload }) => {
      if (payload.status === 200) return dispatch(setState({ passwordChangeRequestAvailable: false }));
    });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target.value;
    const validation = StringValidator.validatePassword(password);
    setPasswordRequirements(validation);
  }

  const handlePasteCopy = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>, action: string) => {
      e.preventDefault();
      messageApi.warning(`No es posible ${action} la contraseña`);
    },
    [messageApi]
  );

  return (
    <>
      {contextHolder}
      <MyForm
        showClearButton={false}
        showCancelButton={false}
        confirmButtonText="Actualizar"
        onFinish={handleFinish}
        loading={loading}
      >
        <Form.Item
          name={passwordChangeFormFields.password.name}
          label={passwordChangeFormFields.password.label}
          rules={passwordChangeFormFields.password.rules}
        >
          <Input.Password
            size="large"
            prefix={passwordChangeFormFields.password.prefix}
            placeholder={passwordChangeFormFields.password.placeholder}
            onChange={handlePasswordChange}
            onPaste={(e) => handlePasteCopy(e, 'pegar')}
            onCopy={(e) => handlePasteCopy(e, 'copiar')}
          />
        </Form.Item>
        <div className="my-4">
          <Alert
            type="info"
            message="La contraseña debe contener"
            description={<PasswordRequirements requirements={passwordRequirements} />}
          />
        </div>
        <Form.Item
          name={passwordChangeFormFields.confirmedPassword.name}
          label={passwordChangeFormFields.confirmedPassword.label}
          rules={passwordChangeFormFields.confirmedPassword.rules}
        >
          <Input.Password
            size="large"
            prefix={passwordChangeFormFields.confirmedPassword.prefix}
            placeholder={passwordChangeFormFields.confirmedPassword.placeholder}
            onPaste={(e) => handlePasteCopy(e, 'pegar')}
            onCopy={(e) => handlePasteCopy(e, 'copiar')}
          />
        </Form.Item>

        <div className="w-full flex justify-end">
          <Form.Item>
            <Button className="p-0" type="link" block onClick={() => navigate(PATH_AUTH.login)}>
              ¿Recordaste tu contraseña?
            </Button>
          </Form.Item>
        </div>
      </MyForm>
    </>
  );
}

export default PasswordChangeForm;
