export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  code?: string | null;
  order: number;
  options: Option[];
};
