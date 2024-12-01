import { Button } from '@/components/ui/button'
import { MessageSquare, Plus } from 'lucide-react'
import React from 'react'

export const Sidebar = () => {
    {/* Sidebar */}
  return (
     <aside className="hidden md:flex md:w-64 flex-col bg-gray-200 dark:bg-gray-800">
     <div className="p-4">
       <Button className="w-full justify-start" variant="outline">
         <Plus className="mr-2 h-4 w-4" />
         New chat
       </Button>
     </div>
     <nav className="flex-1 overflow-y-auto">
       <ul className="px-2 py-4 space-y-2">
         {['Previous chat 1', 'Previous chat 2', 'Previous chat 3'].map((chat, index) => (
           <li key={index}>
             <Button variant="ghost" className="w-full justify-start">
               <MessageSquare className="mr-2 h-4 w-4" />
               {chat}
             </Button>
           </li>
         ))}
       </ul>
     </nav>
   </aside>
  )
}

