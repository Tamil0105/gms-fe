import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { onErrorResponseInterceptor, RequestInterceptor } from './axios-request-interceptor.ts';
const queryClient = new QueryClient();
axios.interceptors.request.use((config: InternalAxiosRequestConfig) =>
	RequestInterceptor(config),
);

axios.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => onErrorResponseInterceptor(error),
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
