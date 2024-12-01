"use client";

import { useChatContext } from "@/app/_contexts";
import { Message } from "./";

export const ChatArea = () => {
  const { chat } = useChatContext();
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {chat.map(({ author, content, id }) => {
        const isUser = author === "Human";
        return (
          <Message
            isUser={isUser}
            key={id}
            content={content}
            id={id}
            author={author}
          />
        );
      })}
    </div>
  );
};
