"use client";

import { useChatContext } from "@/app/_contexts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import Message from "./Message";

export const ChatArea = () => {
  const { chat } = useChatContext();
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {chat.map(({ author, content, id }, index) => {
        const isUser = author === "Human";
        return (
          <Message isUser={isUser} key={id} content={content} id={id} author={author} />
        );
      })}
    </div>
  );
};
