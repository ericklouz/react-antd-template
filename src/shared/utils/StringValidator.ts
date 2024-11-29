import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/regex';

class StringValidator {
  static isValidEmail(emial: string): boolean {
    return EMAIL_REGEX.test(emial);
  }

  static isValidPassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
  }

  static validatePassword(password: string) {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    };
  }
}

export default StringValidator;
