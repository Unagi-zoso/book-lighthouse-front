export interface Book {
  title: string;
  author: string;
  isbn: string;
  isbn13: string;
  cover: string;
  publisher: string;
  pubDate: string;
  priceSales: number;
  description: string;
}

export interface SearchResponse {
  success: boolean;
  data: {
    books: Book[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface Library {
  lib_code: number;
  lib_name: string;
  address: string;
}

export interface LibraryWithBooks {
  lib_code: number;
  lib_name: string;
  address: string | null;
  books: {
    isbn: string;
    title: string;
    cover: string;
  }[];
}

export interface OptimalLibrarySet {
  libraries: LibraryWithBooks[];
  coverageCount: number; // 커버하는 책 수
}

export interface OptimalResponse {
  success: boolean;
  data: {
    optimalSets: OptimalLibrarySet[];
  };
}

