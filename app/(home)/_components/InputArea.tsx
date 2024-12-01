import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export const InputArea = () => {
  return (
    <div className="border-t dark:border-gray-700 p-4">
      <form className="flex space-x-2">
        <Input
          className="flex-1"
          placeholder="Type your message here..."
          type="text"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};
