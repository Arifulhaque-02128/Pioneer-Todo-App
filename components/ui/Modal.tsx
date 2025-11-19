'use client';
import React from "react";

export default function Modal({
  children,
  onClose
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
}
