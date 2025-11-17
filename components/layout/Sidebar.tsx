'use client';

import React from 'react';
import { CheckSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export const Sidebar: React.FC = () => {
  const { user, 
    // logout 
  } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    // await logout();
  };

  return (
    <div className="w-80 bg-[#0D224A] text-white flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
            {user?.profile_image ? (
              <img
                src={user.profile_image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center">{user?.first_name}</h2>
        <p className="text-gray-400 text-sm text-center">{user?.email}</p>
      </div>

      <nav className="flex-1 px-4">
        <button
          onClick={() => router.push('/todos')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors cursor-pointer ${
            pathname === '/todos' ? 'bg-linear-to-r from-[#1C3372] to-[#0D224A]' : 'hover:bg-[#1c3372]'
          }`}
        >
          <CheckSquare size={20} />
          <span>Todos</span>
        </button>
        <button
          onClick={() => router.push('/profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors cursor-pointer ${
            pathname === '/profile' ? 'bg-linear-to-r from-[#1C3372] to-[#0D224A]' : 'hover:bg-[#1c3372]'
          }`}
        >
          <User size={20} />
          <span>Account Information</span>
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-8 py-4 hover:bg-[#1c3372] transition-colors cursor-pointer"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};