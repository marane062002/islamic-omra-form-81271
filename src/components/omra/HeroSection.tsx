import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import kaabaHero from '@/assets/kaaba-hero.jpg';

interface HeroSectionProps {
  onCTAClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${kaabaHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay with Islamic gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 islamic-pattern"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Islamic ornament */}
        <div className="flex justify-center mb-8">
          <div className="text-islamic-gold text-6xl">☪</div>
        </div>
        
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-sacred-white mb-6 ${
          isRTL ? 'font-amiri' : 'font-inter'
        }`}>
          {t('hero.title')}
        </h1>
        
        <p className={`text-xl md:text-2xl text-sacred-cream mb-8 max-w-2xl mx-auto leading-relaxed ${
          isRTL ? 'font-amiri text-right' : 'font-inter'
        }`}>
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onCTAClick}
            size="lg"
            className="bg-gradient-gold hover:scale-105 transition-all duration-300 text-islamic-green-dark font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl"
          >
            {t('hero.cta')}
            <ArrowDown className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </div>

        {/* Decorative Islamic calligraphy ornament */}
        <div className="mt-12 flex justify-center">
          <div className="text-islamic-gold-light text-4xl opacity-70">
            ﷽
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sacred-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sacred-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};