import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

interface GiftCardsScreenProps {
  user: any;
  walletData: any;
}

const GiftCardsScreen: React.FC<GiftCardsScreenProps> = ({ user, walletData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const giftCards = [
    { 
      id: 'amazon', 
      name: 'Amazon Gift Card', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png',
      description: 'Shop on Amazon.com'
    },
    { 
      id: 'itunes', 
      name: 'iTunes Gift Card', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/ITunes_logo.svg/512px-ITunes_logo.svg.png',
      description: 'For Apple App Store & iTunes'
    },
    { 
      id: 'google-play', 
      name: 'Google Play Gift Card', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png',
      description: 'For Google Play Store'
    },
    { 
      id: 'steam', 
      name: 'Steam Gift Card', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png',
      description: 'For PC gaming on Steam'
    },
    { 
      id: 'xbox', 
      name: 'Xbox Gift Card', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/512px-Xbox_one_logo.svg.png',
      description: 'For Xbox games and services'
    },
    { 
      id: 'playstation', 
      name: 'PlayStation Gift Card', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/512px-PlayStation_logo.svg.png',
      description: 'For PlayStation games and services'
    }
  ];

  const filteredGiftCards = giftCards.filter(card => 
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6">
        <h1 className="text-xl font-bold mb-4">Gift Cards</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search gift cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-800 pl-10 pr-4 py-3 rounded-xl focus:outline-none"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3">Available Gift Cards</h2>
        
        {filteredGiftCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {filteredGiftCards.map(card => (
              <button 
                key={card.id}
                className="bg-white p-4 rounded-xl shadow-sm flex items-center"
              >
                <div className="w-12 h-12 mr-4 flex-shrink-0">
                  <img 
                    src={card.logo} 
                    alt={card.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{card.name}</p>
                  <p className="text-gray-500 text-sm">{card.description}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">No gift cards found</p>
          </div>
        )}
        
        {/* Recent Purchases */}
        <h2 className="text-lg font-semibold mt-6 mb-3">Recent Purchases</h2>
        <div className="bg-white p-4 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">No recent purchases</p>
        </div>
      </div>
    </div>
  );
};

export default GiftCardsScreen;