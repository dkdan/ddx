import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Wallet, CreditCard, Gift, Repeat, Bitcoin } from 'lucide-react';
import { motion } from 'framer-motion';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Fast Crypto Bill Payments",
      description: "Pay bills instantly with cryptocurrency. Experience seamless transactions.",
      image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg",
      icon: <Bitcoin size={32} />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Instant Currency Conversion",
      description: "Convert crypto to fiat instantly at competitive rates.",
      image: "https://images.pexels.com/photos/8370836/pexels-photo-8370836.jpeg",
      icon: <Repeat size={32} />,
      bgColor: "bg-green-50"
    },
    {
      title: "Pay Bills Seamlessly",
      description: "Handle all your utility bills, airtime, and subscriptions in one place.",
      image: "https://images.pexels.com/photos/8370754/pexels-photo-8370754.jpeg",
      icon: <CreditCard size={32} />,
      bgColor: "bg-purple-50"
    },
    {
      title: "Digital Gift Cards",
      description: "Purchase gift cards from top brands using crypto.",
      image: "https://images.pexels.com/photos/8370772/pexels-photo-8370772.jpeg",
      icon: <Gift size={32} />,
      bgColor: "bg-yellow-50"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container mx-auto px-6 py-12 h-screen flex flex-col">
        {/* Top navigation */}
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20"
          >
            {currentSlide > 0 && (
              <button 
                onClick={() => setCurrentSlide(currentSlide - 1)}
                className="text-white/80 font-medium hover:text-white"
              >
                Back
              </button>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 text-right"
          >
            {currentSlide < slides.length - 1 && (
              <button 
                onClick={onComplete}
                className="text-white/80 font-medium hover:text-white"
              >
                Skip
              </button>
            )}
          </motion.div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center text-white">
                {slides[currentSlide].icon}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-12 max-w-lg mx-auto">
              {slides[currentSlide].description}
            </p>
            
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
              <img 
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="space-y-8">
          {/* Progress indicators */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Action button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={nextSlide}
            className="w-full bg-white text-blue-900 py-4 rounded-xl flex items-center justify-center font-semibold text-lg hover:bg-white/90 transition-colors"
          >
            {currentSlide < slides.length - 1 ? (
              <>
                Next <ChevronRight size={20} className="ml-2" />
              </>
            ) : (
              <>
                Get Started <ArrowRight size={20} className="ml-2" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;