import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import './index.css';
import App from './App';

// Sentry 초기화 (DSN이 있을 때만)
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      if (event.request?.url?.includes('password')) {
        return null;
      }
      return event;
    },
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Error Boundary로 App 감싸기 (Sentry가 초기화된 경우에만)
root.render(
  <React.StrictMode>
    {import.meta.env.VITE_SENTRY_DSN ? (
      <Sentry.ErrorBoundary fallback={<div>문제가 발생했습니다. 잠시 후 다시 시도해주세요.</div>}>
        <App />
      </Sentry.ErrorBoundary>
    ) : (
      <App />
    )}
  </React.StrictMode>
);

