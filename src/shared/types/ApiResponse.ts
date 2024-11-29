interface ApiResponse<T> {
  status: string;
  data: T | null;
  message?: string;
  error?: {
    type: string;
    message: string;
  };
}

export default ApiResponse;
