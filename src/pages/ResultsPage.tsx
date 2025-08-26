import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Book, OptimalLibrarySet } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { MapPin, Building2, CheckCircle, ArrowLeft, Eye, Waves, BookOpen, ExternalLink } from 'lucide-react';

interface LocationState {
  optimalSets: OptimalLibrarySet[];
  selectedBooks: Book[];
}

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBooksModal, setSelectedBooksModal] = useState(false);
  
  const state = location.state as LocationState;
  const isInvalidState = !state || !state.optimalSets;
  
  useEffect(() => {
    if (isInvalidState) {
      // 직접 접근한 경우 홈으로 리다이렉트
      navigate('/');
    }
  }, [isInvalidState, navigate]);
  
  if (isInvalidState) {
    return null;
  }
  
  const { optimalSets, selectedBooks } = state;

  if (optimalSets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
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
                    검색 결과
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {import.meta.env.VITE_BOOKBADA_URL && (
                  <a
                    href={import.meta.env.VITE_BOOKBADA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                  >
                    <span>책바다 바로가기</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                )}
                <Link to="/">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    다시 검색
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <CardContent className="flex flex-col items-center justify-center py-12 px-4">
              <Building2 className="w-16 h-16 text-red-400 mb-6" />
              <h2 className="text-xl font-bold text-red-800 mb-2">
                검색 결과가 없습니다
              </h2>
              <p className="text-red-600 text-center font-medium mb-6">
                선택한 책들을 모두 대출할 수 있는 도서관 조합을 찾을 수 없습니다.
              </p>
              <Link to="/">
                <Button className="bg-red-600 hover:bg-red-700">
                  다른 책으로 다시 검색
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

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
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  책등대
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                  검색 결과 - {optimalSets.length}개의 조합을 찾았습니다
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {import.meta.env.VITE_BOOKBADA_URL && (
                <a
                  href={import.meta.env.VITE_BOOKBADA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium"
                >
                  <span>책바다 바로가기</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              )}
              <Button
                variant="outline"
                onClick={() => setSelectedBooksModal(true)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                선택한 책 보기
              </Button>
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  다시 검색
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 px-1">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            최적 도서관 조합
          </h2>
          
          {optimalSets.map((set, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-green-50/30 border-0 shadow-lg">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span>조합 #{index + 1}</span>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm">
                    커버 책 수: {set.coverageCount}권
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pt-0">
                {set.libraries.map((library) => (
                  <div key={library.lib_code} className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base line-clamp-2">
                          {library.lib_name}
                        </h4>
                        <div className="flex items-start gap-1 mb-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {library.address || '주소 정보 없음'}
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {library.books.length}권 보유
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3 ml-2 sm:ml-4">
                      {library.books.map((book) => (
                        <div
                          key={book.isbn13 || book.isbn}
                          className="flex items-center gap-3 sm:gap-4 p-3 bg-white rounded-lg shadow-sm"
                        >
                          <img
                            src={book.cover || '/placeholder.svg?height=80&width=60&query=book cover'}
                            alt={book.title}
                            className="w-12 h-16 sm:w-15 sm:h-20 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">
                              {book.title}
                            </h5>
                            <p className="text-xs sm:text-sm text-gray-600">
                              ISBN: {book.isbn13 || book.isbn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Selected Books Modal */}
      {selectedBooksModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">선택한 책 목록</h3>
                <Button
                  variant="outline"
                  onClick={() => setSelectedBooksModal(false)}
                  className="text-sm"
                >
                  닫기
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                {selectedBooks.map((book) => (
                  <div key={book.isbn13 || book.isbn} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={book.cover || '/placeholder.svg?height=120&width=80&query=book cover'}
                      alt={book.title}
                      className="w-16 h-20 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        저자: {book.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        ISBN: {book.isbn13 || book.isbn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}