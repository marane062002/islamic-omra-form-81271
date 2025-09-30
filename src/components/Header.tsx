import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToForm }) => {
  const { t, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sacred-white/95 backdrop-blur-sm border-b border-islamic-green-lighter shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="text-islamic-gold text-3xl">☪</div>
            <span className={`text-xl font-bold text-islamic-green ${
              isRTL ? 'font-amiri' : 'font-inter'
            }`}>
              {isRTL ? 'رحلات العمرة' : 'Omra Journeys'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`text-islamic-green hover:text-islamic-green-dark transition-colors duration-200 ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}
              >
                {t(item.key)}
              </button>
            ))}
            
            <Button
              onClick={onNavigateToForm}
              variant="outline"
              className="bg-islamic-green text-primary-foreground hover:bg-islamic-green-dark border-islamic-green hover:border-islamic-green-dark"
            >
              {t('hero.cta')}
            </Button>
            
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-islamic-green hover:text-islamic-green-dark hover:bg-islamic-green-lighter/20"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-islamic-green-lighter bg-sacred-white/98 backdrop-blur-sm">
            <nav className="py-4 space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-2 text-islamic-green hover:text-islamic-green-dark hover:bg-islamic-green-lighter/20 rounded-lg transition-colors duration-200 ${
                    isRTL ? 'font-amiri text-right' : 'font-inter'
                  }`}
                >
                  {t(item.key)}
                </button>
              ))}
              
              <div className="px-4">
                <Button
                  onClick={() => {
                    onNavigateToForm();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-islamic-green text-primary-foreground hover:bg-islamic-green-dark"
                >
                  {t('hero.cta')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};