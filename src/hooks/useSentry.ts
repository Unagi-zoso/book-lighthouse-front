import * as Sentry from '@sentry/react';

export const useSentry = () => {
  // 사용자 정보 설정
  const setUser = (user: { id: string; email?: string; username?: string }) => {
    Sentry.setUser(user);
  };

  // 커스텀 태그 설정
  const setTag = (key: string, value: string) => {
    Sentry.setTag(key, value);
  };

  // 추가 컨텍스트 설정
  const setContext = (key: string, context: Record<string, any>) => {
    Sentry.setContext(key, context);
  };

  // 수동 에러 리포팅
  const captureError = (error: Error, context?: Record<string, any>) => {
    if (context) {
      Sentry.withScope((scope) => {
        Object.entries(context).forEach(([key, value]) => {
          scope.setExtra(key, value);
        });
        Sentry.captureException(error);
      });
    } else {
      Sentry.captureException(error);
    }
  };

  // 커스텀 메시지 리포팅
  const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>) => {
    if (context) {
      Sentry.withScope((scope) => {
        Object.entries(context).forEach(([key, value]) => {
          scope.setExtra(key, value);
        });
        Sentry.captureMessage(message, level);
      });
    } else {
      Sentry.captureMessage(message, level);
    }
  };

  // 성능 추적 시작
  const startTransaction = (name: string, operation: string) => {
    return Sentry.startTransaction({ name, op: operation });
  };

  // 브레드크럼 추가 (사용자 행동 추적)
  const addBreadcrumb = (message: string, category: string, data?: Record<string, any>) => {
    Sentry.addBreadcrumb({
      message,
      category,
      level: 'info',
      data,
    });
  };

  return {
    setUser,
    setTag,
    setContext,
    captureError,
    captureMessage,
    startTransaction,
    addBreadcrumb,
  };
};
