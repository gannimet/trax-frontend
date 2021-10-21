import axios, { AxiosInstance } from 'axios';

class HttpClientService {
  private static clientInstance?: AxiosInstance;

  static getClientInstance(): AxiosInstance {
    if (!HttpClientService.clientInstance) {
      HttpClientService.clientInstance = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      HttpClientService.setupInterceptor();
    }

    return HttpClientService.clientInstance;
  }

  private static setupInterceptor() {
    HttpClientService.clientInstance?.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }
}

export default HttpClientService;
