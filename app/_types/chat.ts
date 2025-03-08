export enum AUTHOR {
  AI = "AI",
  HUMAN = "Human",
}

export type Author = AUTHOR.AI | AUTHOR.HUMAN;

export interface Message {
  id: string;
  content: string;
  author: Author;
  parentId: string | null;
  branchId: string;
  timestamp: number;
  isEdited: boolean;
  originalMessageId?: string;
}

export interface Branch {
  id: string;
  parentBranchId: string | null;
  messages: Message[];
  isActive: boolean;
}

export interface ChatState {
  branches: Branch[];
  activeBranchId: string;
}

export interface BranchMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  parentId?: string;
  branchId: string;
  versions: BranchMessage[];
  versionIndex: number;
  isEdited: boolean;
}
