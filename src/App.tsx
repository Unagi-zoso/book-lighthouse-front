import React, { useState } from 'react';
import { Book, OptimalSet } from './types';
import { calculateOptimalLibraries } from './lib/api';
import { BookSearch } from './components/BookSearch';
import { SelectedBooks } from './components/SelectedBooks';
import { OptimalLibraries } from './components/OptimalLibraries';
import { Card, CardContent } from './components/ui/card';
import { Waves, BookOpen } from 'lucide-react';
import { useAnalytics } from './hooks/useAnalytics';
import './App.css';

function App() {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [optimalSets, setOptimalSets] = useState<OptimalSet[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // 애널리틱스 훅 사용
  const { trackBookSelect, trackOptimalCalculation } = useAnalytics();

  const handleBookSelect = (book: Book) => {
    setSelectedBooks(prev => {
      const isAlreadySelected = prev.some(selected => selected.isbn === book.isbn);
      
      if (isAlreadySelected) {
        return prev.filter(selected => selected.isbn !== book.isbn);
      } else if (prev.length < 3) {
        // 책 선택 이벤트 추적
        trackBookSelect(book.title, book.isbn);
        return [...prev, book];
      }
      
      return prev;
    });
  };

  const handleBookRemove = (isbn: string) => {
    setSelectedBooks(prev => prev.filter(book => book.isbn !== isbn));
  };

  const handleCalculateOptimal = async () => {
    if (selectedBooks.length === 0) return;

    setIsCalculating(true);
    
    // 최적화 계산 이벤트 추적
    trackOptimalCalculation(selectedBooks.length);
    
    try {
      const isbns = selectedBooks.map(book => book.isbn13);
      const response = await calculateOptimalLibraries(isbns);
      setOptimalSets(response.data.optimalSets);
      setHasCalculated(true);
    } catch (error) {
      console.error('Calculation failed:', error);
      setOptimalSets([]);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Waves className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                책등대
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                책바다 서비스를 위한 최적 도서관 조합 도구
              </p>
            </div>
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
                onCalculate={handleCalculateOptimal}
                isCalculating={isCalculating}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {hasCalculated && (
          <div className="mt-8 sm:mt-12">
            <OptimalLibraries optimalSets={optimalSets} />
          </div>
        )}

        {/* Welcome Message */}
        {selectedBooks.length === 0 && !hasCalculated && (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Waves className="w-5 h-5 text-blue-600" />
                <BookOpen className="w-3 h-3 text-purple-600 absolute -bottom-0.5 -right-0.5" />
              </div>
              <span className="text-gray-600 font-medium">책등대</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="/privacy.html" className="hover:text-blue-600 transition-colors">
                개인정보처리방침
              </a>
              <span>•</span>
              <span>책바다 서비스 비공식 도구</span>
              <span>•</span>
              <span className="text-gray-500">© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

