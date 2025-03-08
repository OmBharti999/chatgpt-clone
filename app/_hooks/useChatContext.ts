import { useContext } from "react";
import { ChatContext } from "../_contexts/ChatContext";


export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
      throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
  }
  