import React, { useState } from 'react';
import { Book } from '../types';
import { searchBooks } from '../lib/api';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { BookCard } from './BookCard';
import { Search, Loader2 } from 'lucide-react';

interface BookSearchProps {
  selectedBooks: Book[];
  onBookSelect: (book: Book) => void;
}

export function BookSearch({ selectedBooks, onBookSelect }: BookSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await searchBooks(searchTerm);
      setBooks(response.data.books);
      setHasSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isBookSelected = (book: Book) => {
    return selectedBooks.some(selected => selected.isbn13 === book.isbn13);
  };

  const canSelectMore = selectedBooks.length < 3;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                placeholder="찾고 싶은 책 제목을 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 sm:pl-12 py-3 sm:py-4 text-base sm:text-lg border-0 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchTerm.trim()}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium text-sm sm:text-base min-h-[3rem] sm:min-h-[3.5rem]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                '검색'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 px-1">
            검색 결과 ({books.length}권)
          </h2>
          
          {books.length === 0 ? (
            <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
              <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" />
                <p className="text-gray-500 text-center text-sm sm:text-base">
                  검색 결과가 없습니다. 다른 키워드로 검색해보세요.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {books.map((book) => (
                <BookCard
                  key={book.isbn13 || book.isbn}
                  book={book}
                  isSelected={isBookSelected(book)}
                  onSelect={onBookSelect}
                  disabled={!canSelectMore && !isBookSelected(book)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

