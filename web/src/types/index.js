export type Category = {
  id: number,
  name: string,
  description: string
};

export type Citation = {
  id: number,
  title: string,
  source: string,
  quote: string,
  is_public: boolean,
  is_favorite: boolean,
  categories: Array<Category>,
  inserted_at: string,
  user_id: number
};
