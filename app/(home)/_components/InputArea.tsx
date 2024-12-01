"use client";

import { useState } from "react";
import { useChatContext } from "@/app/_contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { AUTHOR } from "@/app/_types/chat";

export const InputArea = () => {
  const { setChat } = useChatContext();
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setChat((prevChat) => [
        ...prevChat,
        {
          author: AUTHOR.HUMAN,
          content: inputValue.trim(),
          id: `${prevChat.length+1}`,
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="border-t dark:border-gray-700 p-4">
      <form className="flex space-x-2" onSubmit={onSubmit}>
        <Input
          className="flex-1"
          placeholder="Type your message here..."
          type="text"
          name="prompt"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};
