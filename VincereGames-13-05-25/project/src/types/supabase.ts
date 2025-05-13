export type User = {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  name_color?: string;
  created_at: string;
}

export type WikiArticle = {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export type StoreItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  type: 'chest' | 'currency' | 'special';
}