import { FormProps } from 'antd';
import { ReactNode } from 'react';

interface MyFormProps extends FormProps {
  children?: ReactNode;
  cancelButtonText?: string;
  confirmButtonText?: string;
  showClearButton?: boolean;
  disabledClearButton?: boolean;
  showCancelButton?: boolean;
  disabledCancelButton?: boolean;
  showConfirmButton?: boolean;
  disabledConfirmButton?: boolean;
  loading?: boolean;
}

export default MyFormProps;
