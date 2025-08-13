import { SearchResponse, OptimalResponse } from '../types';

const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';
const API_PATH = '/api/v1';
const BASE_URL = `${API_HOST}${API_PATH}`;

export async function searchBooks(title: string, page: number = 1, limit: number = 10): Promise<SearchResponse> {
  const params = new URLSearchParams({
    title,
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${BASE_URL}/books/search?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to search books');
  }

  return response.json();
}

export async function calculateOptimalLibraries(isbns: string[]): Promise<OptimalResponse> {
  const response = await fetch(`${BASE_URL}/libraries/calculate-optimal-library-set`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isbns }),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate optimal libraries');
  }

  return response.json();
}

