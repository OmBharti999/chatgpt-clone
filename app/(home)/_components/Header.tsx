import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center">
      <Button variant="ghost" size="icon" className="md:hidden mr-2">
        <Menu />
      </Button>
      <h1 className="text-xl font-bold flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/ai.svg" alt="ChatGPT Logo" />
        </Avatar>
        ChatGPT
      </h1>
    </header>
  );
};
