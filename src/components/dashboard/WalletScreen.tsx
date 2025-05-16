import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, Repeat, 
  Bitcoin, Loader2, ChevronRight, DollarSign
} from 'lucide-react';

interface WalletScreenProps {
  user: any;
  walletData: any;
  loading: boolean;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ user, walletData, loading }) => {
  const [activeTab, setActiveTab] = useState('assets');
  
  // Mock transaction history
  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: '50,000',
      currency: 'NGN',
      date: '2 hours ago',
      description: 'Deposit from Bank'
    },
    {
      id: '2',
      type: 'bill_payment',
      amount: '5,000',
      currency: 'NGN',
      date: 'Yesterday',
      description: 'Airtime Purchase'
    },
    {
      id: '3',
      type: 'conversion',
      amount: '0.001',
      currency: 'BTC',
      date: '3 days ago',
      description: 'Converted to Naira'
    },
    {
      id: '4',
      type: 'deposit',
      amount: '0.005',
      currency: 'BTC',
      date: '5 days ago',
      description: 'Bitcoin Deposit'
    },
    {
      id: '5',
      type: 'withdrawal',
      amount: '20,000',
      currency: 'NGN',
      date: '1 week ago',
      description: 'Withdrawal to Bank'
    }
  ];

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6 rounded-b-3xl">
        <h1 className="text-xl font-bold mb-6">Wallet</h1>
        
        {/* Balance Card */}
        <div className="bg-white text-gray-800 rounded-xl p-4 shadow-md">
          <p className="text-gray-500 text-sm mb-1">Total Balance (NGN)</p>
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 size={20} className="animate-spin text-blue-500" />
              <span>Loading balance...</span>
            </div>
          ) : (
            <h1 className="text-2xl font-bold">₦ {walletData?.naira_balance?.toLocaleString() || '0'}</h1>
          )}
          
          <div className="flex mt-4 space-x-2">
            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center">
              <ArrowUpRight size={18} className="mr-1" />
              Deposit
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center">
              <ArrowDownRight size={18} className="mr-1" />
              Withdraw
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center">
              <Repeat size={18} className="mr-1" />
              Convert
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="px-6 pt-4">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('assets')}
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === 'assets' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-500'
            }`}
          >
            Assets
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 font-medium text-center ${
              activeTab === 'history' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-500'
            }`}
          >
            History
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="px-6 py-4">
        {activeTab === 'assets' ? (
          <div className="space-y-3">
            {/* Crypto Assets */}
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={30} className="animate-spin text-blue-500" />
              </div>
            ) : (
              <>
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                  <div className="p-3 rounded-full mr-3 bg-orange-100">
                    <Bitcoin size={24} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Bitcoin</p>
                    <p className="text-gray-500 text-sm">BTC</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{walletData?.btc_balance || '0'} BTC</p>
                    <p className="text-gray-500 text-sm">≈ ₦ {(walletData?.btc_balance * 25000000 || 0).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                  <div className="p-3 rounded-full mr-3 bg-blue-100">
                    <DollarSign size={24} className="text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">USD Tether</p>
                    <p className="text-gray-500 text-sm">USDT</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{walletData?.usdt_balance || '0'} USDT</p>
                    <p className="text-gray-500 text-sm">≈ ₦ {(walletData?.usdt_balance * 1500 || 0).toLocaleString()}</p>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center">
                  <span className="mr-1">Add New Asset</span>
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div key={transaction.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                <div className={`p-3 rounded-full mr-3 ${
                  transaction.type === 'deposit' ? 'bg-green-100' : 
                  transaction.type === 'withdrawal' ? 'bg-orange-100' :
                  transaction.type === 'bill_payment' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {transaction.type === 'deposit' && <ArrowDownRight size={20} className="text-green-500" />}
                  {transaction.type === 'withdrawal' && <ArrowUpRight size={20} className="text-orange-500" />}
                  {transaction.type === 'bill_payment' && <ArrowUpRight size={20} className="text-red-500" />}
                  {transaction.type === 'conversion' && <Repeat size={20} className="text-blue-500" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-gray-500 text-sm">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'deposit' ? 'text-green-500' : 
                    transaction.type === 'withdrawal' || transaction.type === 'bill_payment' ? 'text-red-500' : 
                    'text-blue-500'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : 
                     transaction.type === 'withdrawal' || transaction.type === 'bill_payment' ? '-' : ''}
                    {transaction.currency === 'NGN' ? '₦' : ''} {transaction.amount}
                    {transaction.currency !== 'NGN' ? ` ${transaction.currency}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletScreen;