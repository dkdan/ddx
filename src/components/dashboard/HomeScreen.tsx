import React from 'react';
import { 
  ArrowUpRight, ArrowDownRight, Repeat, 
  Gift, ChevronRight, Plus, Loader2,
  Phone, Wifi, Tv, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeScreenProps {
  user: any;
  walletData: any;
  loading: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, walletData, loading }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'buy',
      name: 'Buy Crypto',
      icon: <ArrowDownRight size={20} className="text-green-500" />,
      bgColor: 'bg-green-50',
      onClick: () => navigate('/dashboard/wallet')
    },
    {
      id: 'sell',
      name: 'Sell Crypto',
      icon: <ArrowUpRight size={20} className="text-red-500" />,
      bgColor: 'bg-red-50',
      onClick: () => navigate('/dashboard/wallet')
    },
    {
      id: 'swap',
      name: 'Swap Crypto',
      icon: <Repeat size={20} className="text-blue-500" />,
      bgColor: 'bg-blue-50',
      onClick: () => navigate('/dashboard/wallet')
    },
    {
      id: 'deposit',
      name: 'Deposit',
      icon: <ArrowDownRight size={20} className="text-green-500" />,
      bgColor: 'bg-green-50',
      onClick: () => navigate('/dashboard/wallet')
    },
    {
      id: 'giftcard',
      name: 'Giftcard',
      icon: <Gift size={20} className="text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      onClick: () => navigate('/dashboard/giftcards')
    },
    {
      id: 'withdraw',
      name: 'Withdraw',
      icon: <ArrowUpRight size={20} className="text-red-500" />,
      bgColor: 'bg-red-50',
      onClick: () => navigate('/dashboard/wallet')
    }
  ];

  const cryptoAssets = [
    { symbol: 'BCH', name: 'Bitcoin Cash', price: 398.76, change: '+0.00' },
    { symbol: 'BNB', name: 'Binance Coin', price: 652.82, change: '+0.00' },
    { symbol: 'BTC', name: 'Bitcoin', price: 103560.47, change: '+0.00' },
    { symbol: 'ETH', name: 'Ethereum', price: 2603.58, change: '+0.00' },
    { symbol: 'LTC', name: 'Litecoin', price: 100.94, change: '+0.00' },
    { symbol: 'SOL', name: 'Solana', price: 172.32, change: '+0.00' },
    { symbol: 'TRX', name: 'TRON', price: 0.27, change: '+0.00' },
    { symbol: 'USDC', name: 'USD Coin', price: 1, change: '+0.00' },
    { symbol: 'USDT', name: 'Tether', price: 1, change: '+0.00' },
    { symbol: 'NGN', name: 'Nigerian Naira', price: 1585, change: '+0.00' }
  ];

  return (
    <div className="pb-20">
      {/* Header with Balance */}
      <div className="bg-secondary p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm opacity-80">Total Balance</p>
            <div className="flex items-center">
              <img src="/ng-flag.png" alt="NGN" className="w-5 h-5 mr-2" />
              <span className="font-bold text-2xl">₦****</span>
            </div>
          </div>
          <button className="p-2 bg-white/10 rounded-full">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Leaderboard Banner */}
      <div className="mx-4 -mt-4 bg-secondary rounded-xl p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">LeaderBoard</h3>
          <p className="text-sm opacity-80">You can be a winner by just trading.</p>
          <button className="text-sm underline mt-1">Click here to view more</button>
        </div>
        <img src="/leaderboard.png" alt="Trophy" className="w-20 h-20" />
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="font-semibold mb-4">Quick Action</h3>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl"
            >
              <div className={`${action.bgColor} p-3 rounded-full mb-2`}>
                {action.icon}
              </div>
              <span className="text-xs">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gift Cards Banner */}
      <div className="mx-4 my-6">
        <div className="bg-secondary rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Gift Cards to Cash?</h3>
            <p>Follow These Steps...</p>
          </div>
          <button className="bg-black/10 px-4 py-2 rounded-lg text-sm">
            Click here
          </button>
        </div>
      </div>

      {/* Crypto Assets */}
      <div className="p-4">
        <h3 className="font-semibold mb-4">All Cryptos</h3>
        <div className="bg-white rounded-xl">
          <div className="grid grid-cols-4 p-3 border-b text-sm">
            <span>ASSET</span>
            <span>PRICE</span>
            <span>24HR CHANGE</span>
            <span>CHART</span>
          </div>
          {cryptoAssets.map(asset => (
            <div key={asset.symbol} className="grid grid-cols-4 p-3 border-b items-center">
              <div className="flex items-center">
                <img 
                  src={`/crypto-icons/${asset.symbol.toLowerCase()}.png`} 
                  alt={asset.symbol}
                  className="w-6 h-6 mr-2"
                />
                <span>{asset.symbol}</span>
              </div>
              <span>${asset.price.toLocaleString()}</span>
              <span className="text-green-500">{asset.change}</span>
              <div className="flex justify-between items-center">
                <svg className="w-20 h-10" viewBox="0 0 100 50">
                  <path
                    d="M0 25 C20 25, 40 10, 60 40 S80 30, 100 25"
                    fill="none"
                    stroke="#28C76F"
                    strokeWidth="2"
                  />
                </svg>
                <button className="px-3 py-1 bg-gray-100 rounded text-sm">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;