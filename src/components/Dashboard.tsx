import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Home, Wallet, CreditCard, Gift, Settings, 
  LogOut, ChevronRight, Plus, ArrowUpRight, 
  ArrowDownRight, Bitcoin, Repeat
} from 'lucide-react';
import HomeScreen from './dashboard/HomeScreen';
import WalletScreen from './dashboard/WalletScreen';
import BillsScreen from './dashboard/BillsScreen';
import GiftCardsScreen from './dashboard/GiftCardsScreen';
import SettingsScreen from './dashboard/SettingsScreen';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [walletData, setWalletData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        setWalletData(data);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [user.id]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/${tab === 'home' ? '' : tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 pb-20">
        <Routes>
          <Route path="/" element={<HomeScreen user={user} walletData={walletData} loading={loading} />} />
          <Route path="/wallet" element={<WalletScreen user={user} walletData={walletData} loading={loading} />} />
          <Route path="/bills" element={<BillsScreen user={user} walletData={walletData} />} />
          <Route path="/giftcards" element={<GiftCardsScreen user={user} walletData={walletData} />} />
          <Route path="/settings" element={<SettingsScreen user={user} onSignOut={handleSignOut} />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => handleTabChange('home')}
            className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            onClick={() => handleTabChange('wallet')}
            className={`flex flex-col items-center p-2 ${activeTab === 'wallet' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Wallet size={24} />
            <span className="text-xs mt-1">Wallet</span>
          </button>
          
          <button 
            onClick={() => handleTabChange('bills')}
            className={`flex flex-col items-center p-2 ${activeTab === 'bills' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <CreditCard size={24} />
            <span className="text-xs mt-1">Bills</span>
          </button>
          
          <button 
            onClick={() => handleTabChange('giftcards')}
            className={`flex flex-col items-center p-2 ${activeTab === 'giftcards' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Gift size={24} />
            <span className="text-xs mt-1">Gift Cards</span>
          </button>
          
          <button 
            onClick={() => handleTabChange('settings')}
            className={`flex flex-col items-center p-2 ${activeTab === 'settings' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;