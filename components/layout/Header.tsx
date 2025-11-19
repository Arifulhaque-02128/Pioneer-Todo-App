'use client';
import React from 'react';
import { Bell, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const currentDate = new Date();
  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="bg-white px-8 py-4 flex items-center justify-between text-black">
      <div className="flex items-center gap-3">
        <img
            src="/images/logo.png"
            alt="Logo"
            className="w-full"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 bg-blue-500 rounded-lg transition-colors cursor-pointer hidden sm:block">
          <Bell size={20} color='white'/>
        </button>
        <button className="p-2 bg-blue-500 rounded-lg transition-colors cursor-pointer hidden sm:block">
          <Calendar size={20} color='white'/>
        </button>
        <div className="text-right">
          <p className="text-sm font-medium">{dayName}</p>
          <p className="text-xs text-gray-600">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};