import { Rule } from 'antd/es/form';
import { ReactElement } from 'react';

interface FormField {
  name: string;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
  prefix?: ReactElement;
}

export default FormField;
