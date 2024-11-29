class Envs {
  static get apiUrl(): string {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('VITE_API_URL no está definida en las variables de entorno.');
    }
    return apiUrl;
  }
}

export default Envs;
