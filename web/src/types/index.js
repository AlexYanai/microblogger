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
  user_id: number
};