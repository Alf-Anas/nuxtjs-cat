export interface GetSearchCatResponse {
  success: boolean;
  code: number;
  data: Data;
}

export interface Data {
  meta: Meta;
  data: Daum[];
}

export interface Meta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  next_page_url: string;
}

export interface Daum {
  id: number;
  name: string;
  age: number;
  breed: string;
  color: string;
  images: Image[];
}

export interface Image {
  id: number;
  name: string;
  path: string;
}
