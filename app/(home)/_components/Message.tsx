import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Author } from "@/app/_types/chat";

export const Message = ({
  content,

  isUser,
}: {
  author: Author;
  content: string;
  id: string;
  isUser: boolean;
}) => {
  return (
    <div className="flex items-start space-x-4">
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
      <div className="flex">
        <Button
          variant="ghost"
          onClick={() => {}}
          className={cn({ hidden: !isUser })}
          size="icon"
        >
          <Edit2 />
        </Button>
      </div>
      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 max-w-[80%]">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
