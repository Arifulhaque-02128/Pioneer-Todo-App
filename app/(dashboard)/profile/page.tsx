'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Upload, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {

    const { user } = useAuth();
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: '',
    birthday: '',
    profileImage: ''
    });

    useEffect(() => {
    if (user) {
        setFormData({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        address: user.address || '',
        contactNumber: user.contact_number || '',
        birthday: user.birthday || '',
        profileImage: user.profile_image || ''
        });
    }
    }, [user]);

    console.log('Profile Data:', user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile update:', formData);
    };

  return (
    <div className="p-8 text-black">
      <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 pb-2 inline-block">
        Account Information
      </h1>

      <div className="bg-white rounded-lg p-8 max-w-4xl">
        <div className="flex items-center gap-6 mb-8 border border-gray-400 rounded-lg p-6 max-w-xl">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center relative">
            {formData?.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
            <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Camera size={16} className="text-white" />
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer">
            <Upload size={18} />
            Upload New Photo
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Birthday</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.birthday}
              onChange={(e) =>
                setFormData({ ...formData, birthday: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4 pt-4 justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}