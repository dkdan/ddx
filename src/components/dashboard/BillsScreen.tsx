import React, { useState } from 'react';
import { 
  Phone, Wifi, Zap, Tv, 
  ChevronRight, Search, ArrowLeft
} from 'lucide-react';

interface BillsScreenProps {
  user: any;
  walletData: any;
}

const BillsScreen: React.FC<BillsScreenProps> = ({ user, walletData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'airtime', name: 'Airtime', icon: <Phone size={24} /> },
    { id: 'data', name: 'Internet Data', icon: <Wifi size={24} /> },
    { id: 'electricity', name: 'Electricity', icon: <Zap size={24} /> },
    { id: 'tv', name: 'TV Subscription', icon: <Tv size={24} /> }
  ];
  
  const providers = {
    airtime: [
      { id: 'mtn', name: 'MTN', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New_MTN_Logo.svg/512px-New_MTN_Logo.svg.png' },
      { id: 'airtel', name: 'Airtel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Airtel_logo.svg/512px-Airtel_logo.svg.png' },
      { id: 'glo', name: 'Glo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Globacom_Limited_Logo.svg/512px-Globacom_Limited_Logo.svg.png' },
      { id: '9mobile', name: '9Mobile', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/9mobile_Logo.png/512px-9mobile_Logo.png' }
    ],
    data: [
      { id: 'mtn', name: 'MTN Data', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New_MTN_Logo.svg/512 px-New_MTN_Logo.svg.png' },
      { id: 'airtel', name: 'Airtel Data', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Airtel_logo.svg/512px-Airtel_logo.svg.png' },
      { id: 'glo', name: 'Glo Data', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Globacom_Limited_Logo.svg/512px-Globacom_Limited_Logo.svg.png' },
      { id: '9mobile', name: '9Mobile Data', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/9mobile_Logo.png/512px-9mobile_Logo.png' }
    ],
    electricity: [
      { id: 'ekedc', name: 'Eko Electric', logo: 'https://www.ekedp.com/wp-content/uploads/2020/02/ekedc-logo.png' },
      { id: 'ikedc', name: 'Ikeja Electric', logo: 'https://www.ikejaelectric.com/wp-content/uploads/2020/04/ikeja-electric-logo.png' },
      { id: 'aedc', name: 'Abuja Electric', logo: 'https://www.abujaelectricity.com/wp-content/uploads/2020/04/aedc-logo.png' }
    ],
    tv: [
      { id: 'dstv', name: 'DSTV', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/DSTV_Logo.svg/512px-DSTV_Logo.svg.png' },
      { id: 'gotv', name: 'GoTV', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/GOtv_logo.svg/512px-GOtv_logo.svg.png' },
      { id: 'startimes', name: 'StarTimes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/StarTimes_logo.svg/512px-StarTimes_logo.svg.png' }
    ]
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6">
        {selectedCategory ? (
          <div className="flex items-center">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mr-3"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{categories.find(c => c.id === selectedCategory)?.name}</h1>
          </div>
        ) : (
          <h1 className="text-xl font-bold mb-4">Pay Bills</h1>
        )}
        
        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-800 pl-10 pr-4 py-3 rounded-xl focus:outline-none"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 py-4">
        {selectedCategory ? (
          // Show providers for selected category
          <div className="grid grid-cols-1 gap-3">
            {providers[selectedCategory as keyof typeof providers].map(provider => (
              <button 
                key={provider.id}
                className="bg-white p-4 rounded-xl shadow-sm flex items-center"
              >
                <div className="w-12 h-12 mr-4 flex-shrink-0">
                  <img 
                    src={provider.logo} 
                    alt={provider.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{provider.name}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        ) : (
          // Show categories
          <>
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <div className="grid grid-cols-1 gap-3">
              {filteredCategories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white p-4 rounded-xl shadow-sm flex items-center"
                >
                  <div className="p-3 rounded-full mr-3 bg-blue-100 text-blue-500">
                    {category.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{category.name}</p>
                    <p className="text-gray-500 text-sm">Pay for {category.name.toLowerCase()} services</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </div>
            
            {/* Recent Payments */}
            <h2 className="text-lg font-semibold mt-6 mb-3">Recent Payments</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-gray-500">No recent payments</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillsScreen;