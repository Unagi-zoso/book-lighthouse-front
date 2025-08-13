import { useEffect } from 'react';

// GTM DataLayer 타입 정의
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const useAnalytics = () => {
  // Helper function to push events to dataLayer if available
  const pushToDataLayer = (eventObj: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(eventObj);
    }
  };

  useEffect(() => {
    // GTM 로드 확인 및 초기 페이지뷰 이벤트
    pushToDataLayer({
      event: 'page_view',
      page_title: '책등대 - 최적 도서관 조합 도구',
      page_location: window.location.href
    });
  }, []);

  // 커스텀 이벤트 트래킹 함수들
  const trackBookSearch = (searchTerm: string) => {
    pushToDataLayer({
      event: 'book_search',
      search_term: searchTerm
    });
  };

  const trackBookSelect = (bookTitle: string, isbn: string) => {
    pushToDataLayer({
      event: 'book_select',
      book_title: bookTitle,
      book_isbn: isbn
    });
  };

  const trackOptimalCalculation = (bookCount: number) => {
    pushToDataLayer({
      event: 'optimal_calculation',
      book_count: bookCount
    });
  };

  return {
    trackBookSearch,
    trackBookSelect,
    trackOptimalCalculation
  };
};
