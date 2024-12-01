import { ChatArea, Header, Sidebar, InputArea } from "./_components";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <Header />
        <ChatArea />
        <InputArea />
      </main>
    </div>
  );
}
