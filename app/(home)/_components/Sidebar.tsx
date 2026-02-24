"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";
import { useChatContext } from "@/app/_hooks";

export const Sidebar = () => {
  const { chats, activeChatId, startNewChat, switchChat } = useChatContext();

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-gray-200 dark:bg-gray-800">
      <div className="p-4">
        <Button
          className="w-full justify-start"
          variant="outline"
          onClick={startNewChat}
        >
          <Plus className="mr-2 h-4 w-4" />
          New chat
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="px-2 py-4 space-y-2">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start truncate ${
                  chat.id === activeChatId
                    ? "bg-gray-300 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => switchChat(chat.id)}
              >
                <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">
                  {chat.title}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
