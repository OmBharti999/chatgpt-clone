"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import type { Turn, VariantMeta, ChatSession } from "@/app/_types/chat";

type NavigateDirection = "prev" | "next";

interface ChatContextType {
  turns: Turn[];
  visibleTurns: Turn[];
  sendPrompt: (prompt: string) => void;
  editPrompt: (turnId: string, prompt: string) => void;
  navigateVariant: (turnId: string, direction: NavigateDirection) => void;
  getVariantMeta: (turnId: string) => VariantMeta;
  activeLeafId: string | null;
  setTurns: Dispatch<SetStateAction<Turn[]>>;
  chats: ChatSession[];
  activeChatId: string | null;
  startNewChat: () => void;
  switchChat: (chatId: string) => void;
}

const defaultValue: ChatContextType = {
  turns: [],
  visibleTurns: [],
  sendPrompt: () => {},
  editPrompt: () => {},
  navigateVariant: () => {},
  getVariantMeta: () => ({ current: 1, total: 1 }),
  activeLeafId: null,
  setTurns: () => {},
  chats: [],
  activeChatId: null,
  startNewChat: () => {},
  switchChat: () => {},
};

export const ChatContext = createContext<ChatContextType>(defaultValue);

function createChatId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const now = Date.now();

const mockTurns: Turn[] = [
  {
    id: "1",
    parentId: null,
    prompt: "Hello, ChatGPT! How are you today?",
    response:
      "Hello! As an AI language model, I don't have feelings, but I'm functioning well and ready to assist you. How can I help today?",
    createdAt: now,
    updatedAt: now,
  },
];

const initialChat: ChatSession = {
  id: "initial",
  title: "Hello, ChatGPT! How are you today?",
  turns: mockTurns,
  activeLeafId: mockTurns[mockTurns.length - 1]?.id ?? null,
  createdAt: now,
};

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<ChatSession[]>([initialChat]);
  const [activeChatId, setActiveChatId] = useState<string | null>(
    initialChat.id
  );

  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeChatId) ?? null,
    [chats, activeChatId]
  );

  const turns = activeChat?.turns ?? [];
  const activeLeafId = activeChat?.activeLeafId ?? null;

  // Update the active chat's turns and activeLeafId in the chats array
  const updateActiveChat = useCallback(
    (newTurns: Turn[], newLeafId: string | null) => {
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id !== activeChatId) return chat;
          const title =
            newTurns.length > 0
              ? newTurns.find((t) => t.parentId === null)?.prompt.slice(0, 40) ??
                chat.title
              : chat.title;
          return {
            ...chat,
            turns: newTurns,
            activeLeafId: newLeafId,
            title,
          };
        })
      );
    },
    [activeChatId]
  );

  const setTurns: Dispatch<SetStateAction<Turn[]>> = useCallback(
    (action) => {
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id !== activeChatId) return chat;
          const newTurns =
            typeof action === "function" ? action(chat.turns) : action;
          return { ...chat, turns: newTurns };
        })
      );
    },
    [activeChatId]
  );

  const childrenByParent = useMemo(() => {
    const map = new Map<string | null, Turn[]>();
    turns.forEach((turn) => {
      const siblings = map.get(turn.parentId) ?? [];
      siblings.push(turn);
      map.set(turn.parentId, siblings);
    });
    map.forEach((siblings) =>
      siblings.sort(
        (a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id)
      )
    );
    return map;
  }, [turns]);

  const turnById = useMemo(
    () => new Map(turns.map((turn) => [turn.id, turn])),
    [turns]
  );

  const getPathToTurn = (turnId: string | null) => {
    if (!turnId) return [];
    const path: Turn[] = [];
    let currentId: string | null = turnId;
    while (currentId) {
      const currentTurn = turnById.get(currentId);
      if (!currentTurn) break;
      path.unshift(currentTurn);
      currentId = currentTurn.parentId;
    }
    return path;
  };

  const getDeepestPath = (startId: string) => {
    const path: Turn[] = [];
    let currentId: string | null = startId;
    while (currentId) {
      const current = turnById.get(currentId);
      if (!current) break;
      path.push(current);
      const nextChildren = childrenByParent.get(current.id) ?? [];
      currentId = nextChildren[nextChildren.length - 1]?.id ?? null;
    }
    return path;
  };

  const visibleTurns = getPathToTurn(activeLeafId);

  const buildResponse = (prompt: string) =>
    `You said: "${prompt}". This is a placeholder assistant response.`;

  const sendPrompt = (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    const ts = Date.now();
    const newTurn: Turn = {
      id: `${ts}-${Math.random().toString(36).slice(2, 8)}`,
      parentId: activeLeafId,
      prompt: trimmed,
      response: buildResponse(trimmed),
      createdAt: ts,
      updatedAt: ts,
    };
    const newTurns = [...turns, newTurn];
    updateActiveChat(newTurns, newTurn.id);
  };

  const editPrompt = (turnId: string, prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    const turnToEdit = turnById.get(turnId);
    if (!turnToEdit) return;

    const ts = Date.now();
    const newTurn: Turn = {
      id: `${ts}-${Math.random().toString(36).slice(2, 8)}`,
      parentId: turnToEdit.parentId,
      prompt: trimmed,
      response: buildResponse(trimmed),
      createdAt: ts,
      updatedAt: ts,
    };
    const newTurns = [...turns, newTurn];
    updateActiveChat(newTurns, newTurn.id);
  };

  const navigateVariant = (turnId: string, direction: NavigateDirection) => {
    const targetTurn = turnById.get(turnId);
    if (!targetTurn) return;
    const siblings = childrenByParent.get(targetTurn.parentId) ?? [];
    const currentIndex = siblings.findIndex((item) => item.id === targetTurn.id);
    if (currentIndex < 0 || siblings.length < 2) return;

    const nextIndex =
      direction === "prev"
        ? Math.max(0, currentIndex - 1)
        : Math.min(siblings.length - 1, currentIndex + 1);
    if (nextIndex === currentIndex) return;

    const selectedVariant = siblings[nextIndex];
    const nextPath = getDeepestPath(selectedVariant.id);
    const newLeafId =
      nextPath[nextPath.length - 1]?.id ?? selectedVariant.id;
    updateActiveChat(turns, newLeafId);
  };

  const getVariantMeta = (turnId: string): VariantMeta => {
    const targetTurn = turnById.get(turnId);
    if (!targetTurn) return { current: 1, total: 1 };
    const siblings = childrenByParent.get(targetTurn.parentId) ?? [];
    const index = siblings.findIndex((item) => item.id === turnId);
    return {
      current: index >= 0 ? index + 1 : 1,
      total: Math.max(siblings.length, 1),
    };
  };

  const startNewChat = useCallback(() => {
    const newChat: ChatSession = {
      id: createChatId(),
      title: "New chat",
      turns: [],
      activeLeafId: null,
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  }, []);

  const switchChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        turns,
        visibleTurns,
        sendPrompt,
        editPrompt,
        navigateVariant,
        getVariantMeta,
        activeLeafId,
        setTurns,
        chats,
        activeChatId,
        startNewChat,
        switchChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
