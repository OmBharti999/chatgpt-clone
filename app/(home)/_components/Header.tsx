import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center">
      <Button variant="ghost" size="icon" className="md:hidden mr-2">
        <Menu />
      </Button>
      <h1 className="text-xl font-bold">ChatGPT</h1>
    </header>
  );
};
