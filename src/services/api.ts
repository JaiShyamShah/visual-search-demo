
/**
 * API client for interacting with the FastAPI backend
 */

export interface SearchResult {
  path: string;
  similarity: number;
}

export interface SearchResponse {
  results: SearchResult[];
}

const API_URL = 'http://localhost:8000';

/**
 * Search for similar images using the query_image endpoint
 */
export async function searchImage(file: File): Promise<SearchResult[]> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/query_image`, {
    method: 'GET',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to search image');
  }

  const data: SearchResponse = await response.json();
  return data.results;
}

/**
 * Add image to the default_images folder
 */
export async function addImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/add_image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to add image');
  }

  const data = await response.json();
  return data.message;
}
