# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **pnpm** as the package manager.

```bash
# Install dependencies
pnpm install

# Start development server (uses Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## Tech Stack

- **Framework**: Next.js 15 with App Router (using Turbopack in dev)
- **React**: Version 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4 with shadcn/ui
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Architecture Overview

### Tree-Based Conversation Model

The chat implements a branching conversation tree (like ChatGPT):

- Each message is a `Turn` node with `id`, `parentId`, `prompt`, and `response`
- Editing a prompt creates a new sibling branch with the same `parentId`
- `activeLeafId` tracks the currently visible conversation endpoint
- `visibleTurns` represents the path from root to the active leaf

Key data structures (see `app/_types/chat.ts`):
- `Turn`: Individual message node in the tree
- `ChatSession`: Contains multiple conversation trees with metadata
- `childrenByParent`: Computed Map for navigating sibling branches

### State Management

Global chat state is managed via React Context in `app/_contexts/ChatContext.tsx`:
- Supports multiple chat sessions (`chats` array)
- Functions: `sendPrompt`, `editPrompt`, `navigateVariant` (for branch switching)
- Hook: `useChatContext()` from `app/_hooks/`

### Project Structure

```
app/
  _contexts/          # React Context providers (ChatContext)
  _hooks/             # Custom React hooks (useChatContext)
  _types/             # TypeScript types (chat.ts)
  (home)/             # Route group for main chat page
    _components/      # Page-specific components (ChatArea, Message, etc.)
    layout.tsx        # Layout with Sidebar + ChatContextProvider
    page.tsx          # Main page composing ChatArea + InputArea
components/
  ui/                 # shadcn/ui components only (Button, Input, Avatar)
lib/
  utils.ts            # Tailwind utility (cn function)
```

### shadcn/ui Configuration

- Config file: `components.json`
- Aliases: `@/components`, `@/lib/utils`, `@/components/ui`
- Style: "new-york"
- Base color: "neutral"

### Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
```

## Key Implementation Details

- `buildResponse()` in ChatContext is a placeholder - replace with actual LLM API call
- Avatar images are loaded from `/user.svg` and `/ai.svg` in the public folder
- The Sidebar shows all chats with the ability to switch between them
- Message component supports inline editing with variant navigation
