import { ReactNode } from "react";
import { ChatContextProvider } from "@/app/_contexts";
import { Header, Sidebar } from "./_components";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ChatContextProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          {/* Main content */}
          {children}
        </main>
      </div>

      {children}
    </ChatContextProvider>
  );
};

export default layout;
