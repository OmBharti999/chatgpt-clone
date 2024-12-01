import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export const ChatArea = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Sample messages */}
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-[80%]">
              <p className="text-sm">Hello, ChatGPT! How are you today?</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="ChatGPT" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 max-w-[80%]">
              <p className="text-sm">Hello! As an AI language model, I don't have feelings, but I'm functioning well and ready to assist you. How can I help you today?</p>
            </div>
          </div>
        </div>
  )
}
