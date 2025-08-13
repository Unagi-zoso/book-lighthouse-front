import React from 'react';
import { Book } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Check } from 'lucide-react';

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
            <img
              src={book.cover || '/placeholder.svg?height=120&width=80&query=book cover'}
              alt={book.title}
              className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg shadow-md object-cover"
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
              <p className="text-xs text-gray-500">{book.pubDate}</p>
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

