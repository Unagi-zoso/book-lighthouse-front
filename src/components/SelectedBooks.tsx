import React from 'react';
import { Book } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, BookOpen } from 'lucide-react';

interface SelectedBooksProps {
  books: Book[];
  onRemove: (isbn: string) => void;
  onCalculate: () => void;
  isCalculating: boolean;
}

export function SelectedBooks({ books, onRemove, onCalculate, isCalculating }: SelectedBooksProps) {
  if (books.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-50 to-blue-50/30 border-dashed border-2 border-gray-200">
        <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" />
          <p className="text-gray-500 text-center text-sm sm:text-base px-4">
            최대 3권까지 책을 선택해주세요
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-lg">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          선택된 책 ({books.length}/3)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        {books.map((book) => (
          <div key={book.isbn} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <img
              src={book.cover || '/placeholder.svg?height=60&width=40&query=book cover'}
              alt={book.title}
              className="w-8 h-12 sm:w-10 sm:h-15 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-1">{book.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemove(book.isbn)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 min-w-[2rem] h-8"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        ))}
        
        <Button
          onClick={onCalculate}
          disabled={isCalculating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 sm:py-4 text-sm sm:text-base"
        >
          {isCalculating ? '계산 중...' : '최적 도서관 찾기'}
        </Button>
      </CardContent>
    </Card>
  );
}

