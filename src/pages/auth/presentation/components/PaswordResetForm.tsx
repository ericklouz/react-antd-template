import { MyForm } from '@src/shared/components/form';
import { PATH_AUTH } from '@src/shared/constants/routes';
import { AppDispatch, RootState } from '@src/shared/redux/types';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { passwordReset, setState } from '../../infrastructure/redux/authSlice';
import { loginFormFields } from '../constants';

function PasswordResetForm() {
  const { loading, lastPasswordResetRequest } = useSelector((state: RootState) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [countdown, setCountdown] = useState<number>(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  async function handlePasswordReset(fields: { email: string }) {
    dispatch(passwordReset(fields.email)).then(({ payload }) => {
      if (payload.status === 200) return dispatch(setState({ passwordChangeRequestAvailable: true }));
    });
  }

  function handleFinish(fields: { email: string }) {
    const timeSinceLastReset = Date.now() - lastPasswordResetRequest!;
    const remainingTime = 2 * 60 * 1000 - timeSinceLastReset; // 2 minutes to milliseconds

    if (remainingTime > 0) return setIsButtonEnabled(false);

    handlePasswordReset(fields);
  }

  useEffect(() => {
    if (lastPasswordResetRequest) {
      setIsButtonEnabled(true);
      const interval = setInterval(() => {
        const timeSinceLastReset = Date.now() - lastPasswordResetRequest;
        const remainingTime = 1 * 60 * 1000 - timeSinceLastReset; // 2 minutes to milliseconds

        if (remainingTime > 0) {
          setCountdown(Math.floor(remainingTime / 1000)); // Update countdown in seconds
        } else {
          clearInterval(interval); // Clear the interval when the countdown is completed
          setCountdown(0); // Reset the counter
          setIsButtonEnabled(false);
          dispatch(setState({ lastPasswordResetRequest: null }));
        }
      }, 1000);

      return () => clearInterval(interval); // Clear the interval when the component is disassembled
    }
  }, [dispatch, lastPasswordResetRequest]);

  return (
    <>
      <MyForm
        disabledConfirmButton={isButtonEnabled}
        showClearButton={false}
        showCancelButton={false}
        confirmButtonText="Enviar"
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

        <div className="w-full flex justify-end">
          <Form.Item>
            <Button className="p-0" type="link" block onClick={() => navigate(PATH_AUTH.login)}>
              ¿Recordaste tu contraseña?
            </Button>
          </Form.Item>
        </div>
      </MyForm>
      {isButtonEnabled && (
        <p className="mt-4 text-red-500 text-center">Padrás realizar otra solicitud en {countdown} segundos.</p>
      )}
    </>
  );
}

export default PasswordResetForm;
