import React from 'react';
import { 
  User, Shield, Bell, HelpCircle, 
  LogOut, ChevronRight, CreditCard
} from 'lucide-react';

interface SettingsScreenProps {
  user: any;
  onSignOut: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onSignOut }) => {
  const settingsOptions = [
    {
      id: 'profile',
      name: 'Profile',
      icon: <User size={20} className="text-blue-500" />,
      description: 'Manage your personal information'
    },
    {
      id: 'security',
      name: 'Security',
      icon: <Shield size={20} className="text-green-500" />,
      description: 'Password and authentication settings'
    },
    {
      id: 'payment',
      name: 'Payment Methods',
      icon: <CreditCard size={20} className="text-purple-500" />,
      description: 'Manage your payment methods'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell size={20} className="text-yellow-500" />,
      description: 'Configure your notification preferences'
    },
    {
      id: 'help',
      name: 'Help & Support',
      icon: <HelpCircle size={20} className="text-gray-500" />,
      description: 'Get help with your account'
    }
  ];

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6">
        <h1 className="text-xl font-bold mb-4">Settings</h1>
        
        {/* User Info */}
        <div className="bg-white text-gray-800 rounded-xl p-4 shadow-md flex items-center">
          <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-xl font-bold mr-4">
            {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{user?.user_metadata?.full_name || 'User'}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
      
      {/* Settings Options */}
      <div className="px-6 py-4">
        <div className="space-y-3">
          {settingsOptions.map(option => (
            <button 
              key={option.id}
              className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center"
            >
              <div className="p-2 rounded-full mr-3 bg-gray-100">
                {option.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{option.name}</p>
                <p className="text-gray-500 text-sm">{option.description}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
          
          {/* Sign Out Button */}
          <button 
            onClick={onSignOut}
            className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center text-red-500"
          >
            <div className="p-2 rounded-full mr-3 bg-red-50">
              <LogOut size={20} className="text-red-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Sign Out</p>
            </div>
          </button>
        </div>
      </div>
      
      {/* App Info */}
      <div className="px-6 py-4 text-center">
        <p className="text-gray-500 text-sm">App Version 1.0.0</p>
        <p className="text-gray-400 text-xs mt-1">© 2025 Crypto Bill Pay</p>
      </div>
    </div>
  );
};

export default SettingsScreen;