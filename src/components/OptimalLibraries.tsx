import React from 'react';
import { OptimalLibrarySet } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Building2, CheckCircle } from 'lucide-react';

interface OptimalLibrariesProps {
  optimalSets: OptimalLibrarySet[];
}

export function OptimalLibraries({ optimalSets }: OptimalLibrariesProps) {
  if (optimalSets.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
        <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
          <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mb-3 sm:mb-4" />
          <p className="text-red-600 text-center font-medium text-sm sm:text-base">
            선택한 책들을 모두 대출할 수 있는 도서관 조합을 찾을 수 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
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
                      key={book.isbn}
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
                          ISBN: {book.isbn}
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
  );
}

