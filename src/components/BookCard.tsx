import React from 'react';
import { Book } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Check } from 'lucide-react';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: Book;
  isSelected: boolean;
  onSelect: (book: Book) => void;
  disabled?: boolean;
}

export function BookCard({ book, isSelected, onSelect, disabled }: BookCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30">
      <CardContent className="p-3 sm:p-4">
        <div className="flex gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <BookCover
              book={book}
              width="w-16 sm:w-20"
              height="h-24 sm:h-28"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight line-clamp-2">
                {book.title}
              </h3>
              <Button
                size="sm"
                variant={isSelected ? "default" : "outline"}
                onClick={() => onSelect(book)}
                disabled={disabled}
                className={`flex-shrink-0 min-w-[2.5rem] h-8 sm:h-9 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
                    : 'hover:bg-blue-50 border-blue-200'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Plus className="w-3 h-3 sm:w-4 sm:h-4" />}
              </Button>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">{book.author}</p>
            
            <div className="space-y-1 mb-2 sm:mb-3">
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                {book.publisher}
              </Badge>
              {book.pubDate && (
                <p className="text-xs text-gray-500">
                  출간연도: {book.pubDate.substring(0, 4)}
                </p>
              )}
            </div>
            
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed hidden sm:block">
              {book.description}
            </p>
            
            {book.priceSales > 0 && (
              <p className="text-sm font-medium text-green-600 mt-2">
                ₩{book.priceSales.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

