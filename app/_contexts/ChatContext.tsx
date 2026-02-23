"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useMemo,
} from "react";
import type { Turn, VariantMeta } from "@/app/_types/chat";

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
};

export const ChatContext = createContext<ChatContextType>(defaultValue);

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

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [turns, setTurns] = useState<Turn[]>(mockTurns);
  const [activeLeafId, setActiveLeafId] = useState<string | null>(
    mockTurns[mockTurns.length - 1]?.id ?? null
  );

  const childrenByParent = useMemo(() => {
    const map = new Map<string | null, Turn[]>();
    turns.forEach((turn) => {
      const siblings = map.get(turn.parentId) ?? [];
      siblings.push(turn);
      map.set(turn.parentId, siblings);
    });
    map.forEach((siblings) =>
      siblings.sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id))
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
    setTurns((prev) => [...prev, newTurn]);
    setActiveLeafId(newTurn.id);
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
    setTurns((prev) => [...prev, newTurn]);
    setActiveLeafId(newTurn.id);
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
    setActiveLeafId(nextPath[nextPath.length - 1]?.id ?? selectedVariant.id);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
