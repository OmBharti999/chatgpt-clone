"use client";

import { useChatContext } from "@/app/_hooks";
import { AUTHOR } from "@/app/_types/chat";

import { Message } from "./";

export const ChatArea = () => {
  const { visibleTurns, navigateVariant, getVariantMeta, editPrompt } =
    useChatContext();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {visibleTurns.map((turn) => {
        const variantMeta = getVariantMeta(turn.id);
        return (
          <div key={turn.id} className="space-y-3">
            <Message
              id={turn.id}
              author={AUTHOR.HUMAN}
              content={turn.prompt}
              isUser
              variantMeta={variantMeta}
              onPrevious={() => navigateVariant(turn.id, "prev")}
              onNext={() => navigateVariant(turn.id, "next")}
              onEdit={(nextPrompt) => editPrompt(turn.id, nextPrompt)}
            />
            <Message
              id={`${turn.id}-assistant`}
              author={AUTHOR.AI}
              content={turn.response}
              isUser={false}
            />
          </div>
        );
      })}
    </div>
  );
};
