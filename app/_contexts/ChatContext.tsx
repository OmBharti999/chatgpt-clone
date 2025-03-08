"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { AUTHOR, type Author } from "../_types/chat";

interface Chat {
  id: string;
  content: string;
  author: Author;
}

interface ChatContextType {
  chat: Chat[];
  setChat: Dispatch<SetStateAction<Chat[]>>;
}

const defaultValue: ChatContextType = {
  chat: [],
  setChat: () => {},
};

export const ChatContext = createContext<ChatContextType>(defaultValue);

const mockChat: Chat[] = [
  {
    id: "1",
    content: "Hello, ChatGPT! How are you today?",
    author: AUTHOR.HUMAN,
  },
  {
    id: "2",
    content:
      "Hello! As an AI language model, I don't have feelings, but I'm functioning well and ready to assist you how can I help you today?",
    author: AUTHOR.AI,
  },
];

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chat, setChat] = useState<Chat[]>(mockChat);
  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

// "use client";

// import { createContext, useReducer, ReactNode } from "react";
// import { Author, Message, Branch, ChatState, AUTHOR } from "@/app/_types/chat";

// type ChatAction =
//   | { type: "ADD_MESSAGE"; payload: { content: string; author: Author } }
//   | { type: "EDIT_MESSAGE"; payload: { messageId: string; content: string } }
//   | { type: "NAVIGATE_EDIT"; payload: { messageId: string; direction: "prev" | "next" } };

// const initialState: ChatState = {
//   branches: [
//     {
//       id: "main",
//       parentBranchId: null,
//       messages: [],
//       isActive: true,
//     },
//   ],
//   activeBranchId: "main",
//   // editHistory: {},
// };

// function chatReducer(state: ChatState, action: ChatAction): ChatState {
//   switch (action.type) {
//     case "ADD_MESSAGE": {
//       const activeBranch = state.branches.find(
//         (branch) => branch.id === state.activeBranchId
//       )!;
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: action.payload.content,
//         author: action.payload.author,
//         parentId: activeBranch.messages[activeBranch.messages.length - 1]?.id || null,
//         branchId: activeBranch.id,
//         timestamp: Date.now(),
//         isEdited: false,
//       };

//       const updatedBranch = {
//         ...activeBranch,
//         messages: [...activeBranch.messages, newMessage],
//       };

//       // Add AI response
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "I will respond you later.",
//         author: AUTHOR.AI,
//         parentId: newMessage.id,
//         branchId: activeBranch.id,
//         timestamp: Date.now() + 1,
//         isEdited: false,
//       };

//       updatedBranch.messages.push(aiResponse);

//       return {
//         ...state,
//         branches: state.branches.map((branch) =>
//           branch.id === state.activeBranchId ? updatedBranch : branch
//         ),
//       };
//     }

//     case "EDIT_MESSAGE": {
//       const activeBranch = state.branches.find(
//         (branch) => branch.id === state.activeBranchId
//       )!;
//       const messageToEdit = activeBranch.messages.find(
//         (msg) => msg.id === action.payload.messageId
//       )!;

//       // Create a new branch
//       const newBranchId = `branch-${Date.now()}`;
//       const newBranch: Branch = {
//         id: newBranchId,
//         parentBranchId: state.activeBranchId,
//         messages: [
//           ...activeBranch.messages.slice(
//             0,
//             activeBranch.messages.findIndex((msg) => msg.id === messageToEdit.id)
//           ),
//           {
//             ...messageToEdit,
//             id: Date.now().toString(),
//             content: action.payload.content,
//             branchId: newBranchId,
//             timestamp: Date.now(),
//             isEdited: true,
//             originalMessageId: messageToEdit.id,
//           },
//         ],
//         isActive: true,
//       };

//       // Add AI response to the new branch
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "I will respond you later.",
//         author: "AI",
//         parentId: newBranch.messages[newBranch.messages.length - 1].id,
//         branchId: newBranchId,
//         timestamp: Date.now() + 1,
//         isEdited: false,
//       };

//       newBranch.messages.push(aiResponse);

//       // Update edit history
//       const updatedEditHistory = { ...state.editHistory };
//       if (!updatedEditHistory[messageToEdit.id]) {
//         updatedEditHistory[messageToEdit.id] = [];
//       }
//       updatedEditHistory[messageToEdit.id].push(newBranchId);

//       return {
//         ...state,
//         activeBranchId: newBranchId,
//         branches: state.branches
//           .map((branch) => ({
//             ...branch,
//             isActive: false,
//           }))
//           .concat(newBranch),
//         editHistory: updatedEditHistory,
//       };
//     }

//     case "NAVIGATE_EDIT": {
//       const { messageId, direction } = action.payload;
//       const editHistory = state.editHistory[messageId] || [];
//       const currentIndex = editHistory.indexOf(state.activeBranchId);
//       let newIndex = currentIndex;

//       if (direction === "prev" && currentIndex > 0) {
//         newIndex--;
//       } else if (direction === "next" && currentIndex < editHistory.length - 1) {
//         newIndex++;
//       }

//       const newBranchId = editHistory[newIndex];

//       return {
//         ...state,
//         activeBranchId: newBranchId,
//         branches: state.branches.map((branch) => ({
//           ...branch,
//           isActive: branch.id === newBranchId,
//         })),
//       };
//     }

//     default:
//       return state;
//   }
// }

// export const ChatContext = createContext<{
//   state: ChatState;
//   dispatch: React.Dispatch<ChatAction>;
// } | null>(null);

// export function ChatProvider({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(chatReducer, initialState);

//   return (
//     <ChatContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ChatContext.Provider>
//   );
// }
