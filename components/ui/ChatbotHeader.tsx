'use client';
import React, { useState } from 'react';
import { Minus, X, RotateCcw, MoreVertical, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
interface ChatbotHeaderProps {
  botName?: string;
  subtitle?: string;
  isOnline?: boolean;
  avatarUrl?: string;
  onMinimize?: () => void;
  onClose?: () => void;
  onClearChat?: () => void;
}

export const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({
  botName = "AI Assistant",
  subtitle = "Typically replies instantly",
  isOnline = true,
  avatarUrl = "https://unsplash.com",
  onMinimize,
  onClose,
  onClearChat,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-2xl shadow-md select-none">
      {/* Left: Avatar & Identity */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={avatarUrl} 
            alt={botName} 
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
          />
          {/* Status Indicator */}
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-indigo-700 ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
        </div>
        
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm leading-tight tracking-wide">{botName}</h3>
          <span className="text-xs text-blue-100 font-light">{subtitle}</span>
        </div>
      </div>

      {/* Right: Window Controls & Actions */}
      <div className="flex items-center gap-1">
        {/* Quick Clear History Button */}
        {onClearChat && (
          <button 
            onClick={onClearChat}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
            title="Clear Chat History"
          >
            <RotateCcw size={16} />
          </button>
        )}

        {/* Minimize Button */}
        {onMinimize && (
          <button 
            onClick={onMinimize}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
            title="Minimize"
          >
            <Minus size={16} />
          </button>
        )}

        {/* More Actions Dropdown Toggle */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <MoreVertical size={16} />
          </button>

          {/* Context Menu Dropdown */}
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in slide-in-from-top-1 duration-200">
                <button 
                  onClick={() => { onClearChat?.(); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center gap-2"
                >
                  <RotateCcw size={14} className="text-gray-500" /> Reset Conversation
                </button>
                <button 
                  onClick={() => setShowMenu(false)}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 text-red-600"
                >
                  <ShieldAlert size={14} /> Report an Issue
                </button>
              </div>
            </>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-red-500/20 hover:text-red-200 rounded-lg transition-colors duration-200 ml-1"
            title="Close Chat"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
