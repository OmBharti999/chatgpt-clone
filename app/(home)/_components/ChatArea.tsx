"use client";

import { useChatContext } from "@/app/_contexts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export const ChatArea = () => {
  const { chat } = useChatContext();
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {chat.map(({ author, content, id }, index) => {
        const isUser = author === "Human";
        return (
          <div key={id} className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage
                src={
                  isUser
                    ? "/placeholder-user.jpg"
                    : "/placeholder.svg?height=40&width=40"
                }
                alt={isUser ? "Human" : "ChatGPT"}
              />
              <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
            </Avatar>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 max-w-[80%]">
              <p className="text-sm">{content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
