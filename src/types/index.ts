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

export interface OptimalBook {
  isbn: string;
  title: string;
  cover: string;
  libraries: Library[];
}

export interface OptimalSet {
  coverageRate: number;
  books: OptimalBook[];
}

export interface OptimalResponse {
  success: boolean;
  data: {
    optimalSets: OptimalSet[];
  };
}

