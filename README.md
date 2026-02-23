Here’s a clean, production-ready **README.md** for your project **`chatgpt-clone`** based on your branching chat implementation.

You can copy-paste this directly into `README.md`.

---

# 💬 ChatGPT Clone

A modern **ChatGPT-style conversational UI** built with **Next.js (App Router)** that supports:

* 🌳 Conversation tree (branching chat history)
* ✏️ Edit previous prompts (creates new branches)
* 🔀 Variant navigation (← → between sibling branches)
* 🧠 Active path rendering (ChatGPT-like behavior)
* ⚡ Built with React + TypeScript + Tailwind + shadcn/ui

---

## ✨ Features

### 🌲 Conversation Branching

* Every message is stored as a **tree node**
* Editing a prompt creates a **new branch**
* No conversation history is lost

### 🔁 Variant Navigation

* Navigate between sibling branches
* Displays `current / total` variant indicator
* Automatically resolves the deepest active path

### 🧭 Active Path Rendering

* Only the currently selected branch path is rendered
* Clean and predictable ChatGPT-like UX

### 🎨 Modern UI

* Built with:

  * Next.js App Router
  * TypeScript
  * TailwindCSS
  * shadcn/ui
  * Lucide Icons

---

## 🏗 Architecture

### Conversation Model (Tree-Based)

Each message turn:

```ts
type Turn = {
  id: string
  parentId: string | null
  prompt: string
  response: string
  createdAt: number
  updatedAt: number
}
```

Instead of storing messages linearly, the app builds a:

```
Root
 ├── Variant A
 │     ├── Reply A1
 │     └── Reply A2
 └── Variant B
       └── Reply B1
```

---

## 📂 Project Structure

```
chatgpt-clone/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── chat/                     # Feature folder
│   │   ├── components/
│   │   │   ├── ChatArea.tsx
│   │   │   ├── Message.tsx
│   │   │   ├── InputArea.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   │
│   │   ├── context/
│   │   │   └── ChatContext.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useChatContext.ts
│   │   │
│   │   ├── types/
│   │   │   └── chat.ts
│   │   │
│   │   └── index.ts
│   │
│   └── fonts/
│
├── components/
│   └── ui/                       # shadcn components only
│
├── lib/
│   └── utils.ts
│
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/chatgpt-clone.git
cd chatgpt-clone
```

### 2️⃣ Install dependencies

Using pnpm:

```bash
pnpm install
```

Or npm:

```bash
npm install
```

### 3️⃣ Run development server

```bash
pnpm dev
```

Visit:

```
http://localhost:3000
```

---

## 🔄 How Branching Works

### Editing a Prompt

* Creates a new `Turn`
* Uses the same `parentId`
* Generates a new assistant response
* Sets the new branch as active

### Navigating Variants

* Finds sibling turns
* Moves to previous or next variant
* Resolves deepest child path
* Updates `activeLeafId`

---

## 🧠 Core Concepts

* `turns` → All conversation nodes
* `activeLeafId` → Current visible conversation endpoint
* `visibleTurns` → Path from root → active leaf
* `childrenByParent` → Map of siblings
* `turnById` → Fast lookup map

---

## 🛠 Tech Stack

* **Next.js 15**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide Icons**

---

## 📦 Future Improvements

* 🌐 Connect to real OpenAI / LLM API
* 💾 Persist chat tree in database
* 🌳 Visual tree explorer panel
* 🗑 Delete branch feature
* 🏷 Rename branches
* 🔐 Authentication
* 📁 Multi-conversation support

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built with ❤️ by **Om Bharti**

---

If you want, I can also generate:

* 🔥 A more recruiter-impressive README (for GitHub visibility)
* 🧠 A production-ready README with badges
* 📊 A system design diagram section
* 🌟 A portfolio-optimized version

Just tell me which version you want 🚀
