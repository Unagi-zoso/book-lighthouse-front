import React, { useState } from 'react';
import { Book } from '../types';

interface BookCoverProps {
  book: Book;
  width?: string;
  height?: string;
  className?: string;
}

export function BookCover({ book, width = "w-16", height = "h-24", className = "" }: BookCoverProps) {
  const [showFallback, setShowFallback] = useState(false);
  
  const generateBookCover = (title: string, author: string) => {
    const gradients = [
      'from-rose-400 to-pink-600',
      'from-blue-400 to-indigo-600',
      'from-green-400 to-teal-600',
      'from-purple-400 to-violet-600',
      'from-yellow-400 to-orange-600',
      'from-red-400 to-rose-600',
      'from-indigo-400 to-purple-600',
      'from-teal-400 to-cyan-600',
      'from-orange-400 to-red-600',
      'from-cyan-400 to-blue-600',
      'from-violet-400 to-purple-600',
      'from-emerald-400 to-green-600'
    ];
    
    const patterns = [
      'bg-gradient-to-br',
      'bg-gradient-to-tr', 
      'bg-gradient-to-bl',
      'bg-gradient-to-tl'
    ];

    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const gradientIndex = Math.abs(hash) % gradients.length;
    const patternIndex = Math.abs(hash >> 8) % patterns.length;
    
    const firstChar = title.charAt(0);
    const shortTitle = title.length > 8 ? title.substring(0, 8) + '...' : title;
    
    return {
      gradient: gradients[gradientIndex],
      pattern: patterns[patternIndex],
      firstChar,
      shortTitle,
      hash
    };
  };

  const createDynamicCover = (book: Book) => {
    const { gradient, pattern, firstChar, shortTitle, hash } = generateBookCover(book.title, book.author);
    const hasPattern = Math.abs(hash) % 3 === 0;
    
    return (
      <div className={`${width} ${height} ${pattern} ${gradient} rounded-lg shadow-md flex flex-col justify-between p-2 text-white relative overflow-hidden ${className}`}>
        {hasPattern && (
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)"
              }}
            />
          </div>
        )}
        <div className="text-center flex-1 flex items-center justify-center relative z-10">
          <div className="text-2xl font-bold opacity-90 bg-white bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center text-sm">
            {firstChar}
          </div>
        </div>
        <div className="text-[10px] font-medium text-center leading-tight opacity-90 relative z-10">
          {shortTitle}
        </div>
        <div className="text-[8px] text-center opacity-75 truncate relative z-10">
          {book.author}
        </div>
      </div>
    );
  };

  if (book.cover && !showFallback) {
    return (
      <img
        src={book.cover}
        alt={book.title}
        className={`${width} ${height} rounded-lg shadow-md object-cover ${className}`}
        onError={() => setShowFallback(true)}
      />
    );
  }

  return createDynamicCover(book);
}