import { useEffect } from 'react';

// GTM DataLayer 타입 정의
declare global {
  interface Window {
    dataLayer: any[];
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // GTM 로드 확인
    if (window.dataLayer) {
      // 초기 페이지뷰 이벤트
      window.dataLayer.push({
        event: 'page_view',
        page_title: '책등대 - 최적 도서관 조합 도구',
        page_location: window.location.href
      });
    }
  }, []);

  // 커스텀 이벤트 트래킹 함수들
  const trackBookSearch = (searchTerm: string) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'book_search',
        search_term: searchTerm
      });
    }
  };

  const trackBookSelect = (bookTitle: string, isbn: string) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'book_select',
        book_title: bookTitle,
        book_isbn: isbn
      });
    }
  };

  const trackOptimalCalculation = (bookCount: number) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'optimal_calculation',
        book_count: bookCount
      });
    }
  };

  return {
    trackBookSearch,
    trackBookSelect,
    trackOptimalCalculation
  };
};
