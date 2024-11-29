import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface PasswordRequirementsProps {
  requirements: {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

function PasswordRequirements({ requirements }: PasswordRequirementsProps) {
  return (
    <ul className="list-none">
      <li className={`${requirements.minLength ? 'text-green-500' : 'text-red-500'}`}>
        {requirements.minLength ? <CheckOutlined /> : <CloseOutlined />} Mínimo 8 caracteres
      </li>
      <li className={`${requirements.hasUpperCase ? 'text-green-500' : 'text-red-500'}`}>
        {requirements.hasUpperCase ? <CheckOutlined /> : <CloseOutlined />} Al menos una letra mayúscula
      </li>
      <li className={`${requirements.hasLowerCase ? 'text-green-500' : 'text-red-500'}`}>
        {requirements.hasLowerCase ? <CheckOutlined /> : <CloseOutlined />} Al menos una letra minúscula
      </li>
      <li className={`${requirements.hasNumber ? 'text-green-500' : 'text-red-500'}`}>
        {requirements.hasNumber ? <CheckOutlined /> : <CloseOutlined />} Al menos un número
      </li>
      <li className={`${requirements.hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
        {requirements.hasSpecialChar ? <CheckOutlined /> : <CloseOutlined />} Al menos un carácter especial
      </li>
    </ul>
  );
}

export default PasswordRequirements;
