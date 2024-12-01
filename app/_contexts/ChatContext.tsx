"use client";

import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type Author = "AI" | "Human";

interface Chat {
  id: string;
  content: string;
  author: Author;
}

interface ChatContextType {
  chat: Chat[];
  setChat: Dispatch<SetStateAction<Chat[]>>;
}

const defaultValue: ChatContextType = {
  chat: [],
  setChat: () => {},
};

const ChatContext = createContext<ChatContextType>(defaultValue);

const mockChat: Chat[] = [
  {
    id: "1",
    content: "Hello, ChatGPT! How are you today?",
    author: "Human",
  },
  {
    id: "2",
    content:
      "Hello! As an AI language model, I don't have feelings, but I'm functioning well and ready to assist you how can I help you today?",
    author: "AI",
  },
];

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chat, setChat] = useState<Chat[]>(mockChat);
  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
