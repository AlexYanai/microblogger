export type User = {
  id: number,
  username: string,
  bio: string,
  email: string
};

export type Category = {
  id: number,
  name: string,
  description: string
};

export type Post = {
  id: number,
  title: string,
  source: string,
  quote: string,
  is_public: boolean,
  is_favorite: boolean,
  categories: Array<Category>,
  inserted_at: string,
  username: string,
  email: string,
  user_id: number
};

export type Comment = {
  id: number,
  body: string,
  username: string,
  email: string,
  user_id: number,
  post_id: number
};