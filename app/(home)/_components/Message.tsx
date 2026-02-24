"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronLeft, ChevronRight, Edit2, X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Author, VariantMeta } from "@/app/_types/chat";

export const Message = ({
  content,
  isUser,
  variantMeta,
  onPrevious,
  onNext,
  onEdit,
}: {
  author: Author;
  content: string;
  id: string;
  isUser: boolean;
  variantMeta?: VariantMeta;
  onPrevious?: () => void;
  onNext?: () => void;
  onEdit?: (prompt: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(content);

  const canNavigate = isUser && variantMeta && variantMeta.total > 1;

  const submitEdit = () => {
    const trimmed = editedPrompt.trim();
    if (!trimmed || !onEdit) return;
    onEdit(trimmed);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start space-x-4">
      <Avatar>
        <AvatarImage
          src={
            isUser
              ? "/user.svg"
              : "/ai.svg?height=40&width=40"
          }
          alt={isUser ? "Human" : "ChatGPT"}
        />
        <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
      </Avatar>
      <div className="max-w-[80%] space-y-2">
        {isUser && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className={cn("h-8 w-8", { hidden: isEditing })}
              aria-label="Edit prompt"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            {canNavigate && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  disabled={variantMeta.current <= 1}
                  className="h-8 w-8"
                  aria-label="Previous prompt branch"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground">
                  {variantMeta.current}/{variantMeta.total}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  disabled={variantMeta.current >= variantMeta.total}
                  className="h-8 w-8"
                  aria-label="Next prompt branch"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}

        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editedPrompt}
                onChange={(event) => setEditedPrompt(event.target.value)}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={submitEdit}>
                  <Check className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditedPrompt(content);
                    setIsEditing(false);
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
};
