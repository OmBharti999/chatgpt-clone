"use client";

import { useContext, createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

type Author = "AI" | "Human";

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

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chat, setChat] = useState<Chat[]>([]);
  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

