export enum AUTHOR {
  AI = "AI",
  HUMAN = "Human",
}

export type Author = AUTHOR.AI | AUTHOR.HUMAN;

export interface Turn {
  id: string;
  parentId: string | null;
  prompt: string;
  response: string;
  createdAt: number;
  updatedAt: number;
}

export interface VariantMeta {
  current: number;
  total: number;
}
