import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import { calculateOptimalLibraries } from '../lib/api';
import { BookSearch } from '../components/BookSearch';
import { SelectedBooks } from '../components/SelectedBooks';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Waves, BookOpen, ExternalLink } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useSentry } from '../hooks/useSentry';

export function HomePage() {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();
  
  // 애널리틱스 훅 사용
  const { trackBookSelect, trackOptimalCalculation } = useAnalytics();
  
  // Sentry 훅 사용
  const { captureError, addBreadcrumb } = useSentry();

  const handleBookSelect = (book: Book) => {
    setSelectedBooks(prev => {
      const isAlreadySelected = prev.some(selected => (selected.isbn13 || selected.isbn) === (book.isbn13 || book.isbn));
      
      if (isAlreadySelected) {
        return prev.filter(selected => (selected.isbn13 || selected.isbn) !== (book.isbn13 || book.isbn));
      } else if (prev.length < 3) {
        // 책 선택 이벤트 추적
        trackBookSelect(book.title, book.isbn13 || book.isbn);
        return [...prev, book];
      }
      
      return prev;
    });
  };

  const handleBookRemove = (isbn: string) => {
    setSelectedBooks(prev => prev.filter(book => (book.isbn13 || book.isbn) !== isbn));
  };

  const handleCalculateOptimal = async () => {
    if (selectedBooks.length === 0) return;

    setIsCalculating(true);
    
    // 최적화 계산 이벤트 추적
    trackOptimalCalculation(selectedBooks.length);
    
    // Sentry 브레드크럼 추가
    addBreadcrumb('Starting optimal calculation', 'user_action', {
      book_count: selectedBooks.length,
      book_isbns: selectedBooks.map(book => book.isbn13 || book.isbn)
    });
    
    try {
      const isbns = selectedBooks.map(book => book.isbn13 || book.isbn);
      const response = await calculateOptimalLibraries(isbns);
      
      // 성공 로그
      addBreadcrumb('Optimal calculation completed', 'api_success', {
        result_count: response.data.optimalSets.length
      });
      
      // 결과 페이지로 이동하면서 데이터 전달
      navigate('/results', { 
        state: { 
          optimalSets: response.data.optimalSets,
          selectedBooks 
        } 
      });
      
    } catch (error) {
      console.error('Calculation failed:', error);
      
      // Sentry에 에러 리포팅
      captureError(error as Error, {
        action: 'calculate_optimal_libraries',
        book_count: selectedBooks.length,
        selected_books: selectedBooks.map(book => ({
          title: book.title,
          isbn: book.isbn13 || book.isbn
        }))
      });
      
      // 에러 처리 - 알림이나 에러 페이지로 이동할 수 있음
      alert('계산 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <Waves className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  책등대
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 line-clamp-1">
                  책바다 서비스를 위한 최적 도서관 조합 도구
                </p>
              </div>
            </div>
            
            {import.meta.env.VITE_BOOKBADA_URL && (
              <a
                href={import.meta.env.VITE_BOOKBADA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                <span className="hidden sm:inline">책바다 바로가기</span>
                <span className="sm:hidden">책바다</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Search Section */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <BookSearch
              selectedBooks={selectedBooks}
              onBookSelect={handleBookSelect}
            />
          </div>

          {/* Selected Books Section */}
          <div className="order-2 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <SelectedBooks
                books={selectedBooks}
                onRemove={handleBookRemove}
              />
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        {selectedBooks.length > 0 && (
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            <div className="relative">
              <Button
                onClick={handleCalculateOptimal}
                disabled={isCalculating}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-3 py-3 sm:px-6 sm:py-4 text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-1 sm:mr-2"></div>
                    <span className="hidden xs:inline">계산 중...</span>
                    <span className="xs:hidden">...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden xs:inline">최적 도서관 찾기</span>
                    <span className="xs:hidden">도서관 찾기</span>
                    <div className="ml-1 sm:ml-2 bg-white/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs sm:text-sm">
                      {selectedBooks.length}/3
                    </div>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {selectedBooks.length === 0 && (
          <Card className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="text-center py-8 sm:py-12 px-4 sm:px-6">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <Waves className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                책등대에 오신 것을 환영합니다!
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                책바다 서비스 사용자를 위한 도구입니다. 
                원하는 책들을 검색하고 최대 3권까지 선택하세요. 
                선택한 책들을 모두 대출할 수 있는 최적의 도서관 조합을 찾아드립니다.
                본 서비스는 책바다 서비스와 아무 관계 없는 비공식 서비스임을 밝힙니다.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Waves className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600 absolute -bottom-0.5 -right-0.5" />
              </div>
              <span className="text-gray-600 font-medium text-sm sm:text-base">책등대</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 text-center">
              <a href="/privacy.html" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                개인정보처리방침
              </a>
              <span className="hidden sm:inline">•</span>
              <span className="text-center">책바다 서비스 비공식 도구</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-gray-500">© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}