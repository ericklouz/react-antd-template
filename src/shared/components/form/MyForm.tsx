import { MyFormProps } from '@src/shared/types';
import { Button, Form } from 'antd';

function MyForm({
  children,
  cancelButtonText = 'Cancelar',
  confirmButtonText = 'Guardar',
  showClearButton = true,
  disabledClearButton = false,
  showCancelButton = true,
  disabledCancelButton = false,
  showConfirmButton = true,
  disabledConfirmButton = false,
  loading = false,
  ...props
}: MyFormProps) {
  return (
    <Form {...props} layout="vertical" autoComplete="off" scrollToFirstError>
      {children}
      <Form.Item className="m-0">
        <div className={`flex ${showClearButton ? 'flex justify-between' : 'justify-end'}`}>
          {showClearButton && (
            <Button size="large" htmlType="reset" disabled={disabledClearButton}>
              Limpiar
            </Button>
          )}
          <div className={`${!showClearButton && !showCancelButton && 'w-full'}`}>
            {showCancelButton && (
              <Button size="large" type="text" danger disabled={disabledCancelButton} className="mr-4">
                {cancelButtonText}
              </Button>
            )}
            {showConfirmButton && (
              <Button
                className={`${!showClearButton && !showCancelButton && 'w-full'}`}
                size="large"
                type="primary"
                htmlType="submit"
                disabled={disabledConfirmButton}
                loading={loading}
              >
                {confirmButtonText}
              </Button>
            )}
          </div>
        </div>
      </Form.Item>
    </Form>
  );
}

export default MyForm;
