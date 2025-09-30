import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  const { t, isRTL } = useLanguage();
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Check if user is near the bottom (within 100px)
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Button
      onClick={onClick}
      className={`fixed z-50 bg-gradient-islamic hover:bg-islamic-green-dark text-white shadow-2xl hover:shadow-xl transition-all duration-500 rounded-full px-6 py-6 flex items-center space-x-3 ${
        isRTL ? 'flex-row-reverse space-x-reverse' : ''
      } ${
        isAtBottom 
          ? 'bottom-6 right-6' 
          : 'top-1/2 -translate-y-1/2 right-6'
      }`}
      size="lg"
    >
      <MessageSquare className="w-5 h-5" />
      <span className={`font-semibold ${isRTL ? 'font-amiri' : 'font-inter'}`}>
        {t('hero.cta')}
      </span>
    </Button>
  );
};
