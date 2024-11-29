class ErrorHandler {
  static validate(error: unknown): string {
    if (error instanceof TypeError) return 'Error de conexión a internet';
    if (error instanceof Error) return error.message;
    return 'Error inesperado';
  }
}

export default ErrorHandler;
