// GA4 + Clarity 타입 정의
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    clarity: (action: string, ...args: unknown[]) => void;
  }
}

export const useAnalytics = () => {

  // GA4 이벤트 전송 헬퍼 함수
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }
    
    // Microsoft Clarity (선택적)
    if (window.clarity) {
      window.clarity('event', eventName);
    }
  };

  // 커스텀 이벤트 트래킹 함수들
  const trackBookSearch = (searchTerm: string) => {
    trackEvent('book_search', {
      search_term: searchTerm
    });
  };

  const trackBookSelect = (bookTitle: string, isbn: string) => {
    trackEvent('book_select', {
      book_title: bookTitle,
      book_isbn: isbn
    });
  };

  const trackOptimalCalculation = (bookCount: number) => {
    trackEvent('optimal_calculation', {
      book_count: bookCount
    });
  };

  return {
    trackBookSearch,
    trackBookSelect,
    trackOptimalCalculation,
    trackEvent, // 직접 사용 가능
  };
};
