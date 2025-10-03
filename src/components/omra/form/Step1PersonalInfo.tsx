import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';

// Common email domains for autocomplete
const COMMON_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

// Common country codes (you can expand this list)
const COUNTRY_CODES = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+20', country: 'EG', flag: '🇪🇬' },
  { code: '+212', country: 'MA', flag: '🇲🇦' },
  { code: '+216', country: 'TN', flag: '🇹🇳' },
  { code: '+213', country: 'DZ', flag: '🇩🇿' },
  { code: '+90', country: 'TR', flag: '🇹🇷' },
  { code: '+92', country: 'PK', flag: '🇵🇰' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
];

export const Step1PersonalInfo: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();
  
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [userCountryCode, setUserCountryCode] = useState('+1');
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Detect user's country code based on IP
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        // Find matching country code in our list
        const matchedCountry = COUNTRY_CODES.find(country => 
          country.country === countryCode
        );
        
        if (matchedCountry) {
          setUserCountryCode(matchedCountry.code);
          setSelectedCountryCode(matchedCountry.code);
          // Update phone number with detected country code if phone is empty
          if (!formData.phone) {
            updateFormData({ phone: matchedCountry.code });
          }
        }
      } catch (error) {
        console.error('Error detecting country:', error);
        // Fallback to a default country code
        setSelectedCountryCode('+1');
      }
    };

    detectUserCountry();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleEmailChange = (value: string) => {
    updateFormData({ email: value });
    
    // Show suggestions when user types @
    if (value.includes('@')) {
      const atIndex = value.indexOf('@');
      const afterAt = value.slice(atIndex + 1);
      const beforeAt = value.slice(0, atIndex);
      
      if (afterAt.length > 0) {
        const filteredDomains = COMMON_EMAIL_DOMAINS.filter(domain => 
          domain.startsWith(afterAt.toLowerCase())
        );
        setEmailSuggestions(filteredDomains.map(domain => `${beforeAt}@${domain}`));
      } else {
        setEmailSuggestions(COMMON_EMAIL_DOMAINS.map(domain => `${beforeAt}@${domain}`));
      }
      setShowEmailSuggestions(true);
    } else {
      setShowEmailSuggestions(false);
    }
  };

  const handleEmailSuggestionClick = (suggestion: string) => {
    updateFormData({ email: suggestion });
    setShowEmailSuggestions(false);
    emailInputRef.current?.focus();
  };

  const handleCountryCodeSelect = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setShowCountryDropdown(false);
    
    // Update phone number with new country code
    const currentPhone = formData.phone.replace(/^\+\d+\s?/, '');
    updateFormData({ phone: `${countryCode} ${currentPhone}` });
  };

  const handlePhoneChange = (value: string) => {
    // Remove existing country code if present
    const phoneWithoutCode = value.replace(/^\+\d+\s?/, '');
    updateFormData({ phone: `${selectedCountryCode} ${phoneWithoutCode}` });
  };

  const getCurrentPhoneNumber = () => {
    return formData.phone.replace(/^\+\d+\s?/, '');
  };

  return (
    <div className={`space-y-8 ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}>
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold text-islamic-green mb-2 ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {t('form.step1.title')}
        </h3>
        <p className={`text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
          {isRTL ? 'يرجى تقديم معلوماتك الشخصية للحج' : 'Please provide your personal details for the pilgrimage'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div className="form-input-floating md:col-span-2">
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder={t('form.fullname')}
          />
          <label htmlFor="fullName">
            {t('form.fullname')} *
          </label>
          {errors.fullName && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.fullName}</p>
          )}
        </div>

        {/* Email with Autocomplete */}
        <div className="form-input-floating relative">
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => setTimeout(() => setShowEmailSuggestions(false), 200)}
            onFocus={() => {
              if (formData.email.includes('@')) {
                const atIndex = formData.email.indexOf('@');
                const beforeAt = formData.email.slice(0, atIndex);
                setEmailSuggestions(COMMON_EMAIL_DOMAINS.map(domain => `${beforeAt}@${domain}`));
                setShowEmailSuggestions(true);
              }
            }}
            placeholder={t('form.email')}
          />
          <label htmlFor="email">
            {t('form.email')} *
          </label>
          
          {/* Email Suggestions */}
          {showEmailSuggestions && emailSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-48 overflow-y-auto">
              {emailSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                  onMouseDown={() => handleEmailSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          
          {errors.email && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.email}</p>
          )}
        </div>

        {/* Phone with Country Code */}
        <div className="form-input-floating">
          <div className="flex">
            {/* Country Code Dropdown */}
            <div className="relative" ref={countryDropdownRef}>
              <button
                type="button"
                className="flex items-center px-3 border-r border-gray-300 bg-gray-50 rounded-l-lg hover:bg-gray-100"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                <span className="text-sm font-medium">{selectedCountryCode}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto w-48">
                  {COUNTRY_CODES.map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCountryCodeSelect(country.code)}
                    >
                      <span className="text-lg mr-2">{country.flag}</span>
                      <span className="text-sm font-medium">{country.code}</span>
                      <span className="text-xs text-gray-500 ml-2">({country.country})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Phone Input */}
            <input
              type="tel"
              id="phone"
              value={getCurrentPhoneNumber()}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder={t('form.phone')}
              className="flex-1 rounded-r-lg"
              style={{ marginLeft: 0 }}
            />
          </div>
          <label htmlFor="phone" className="!left-12">
            {t('form.phone')} *
          </label>
          {errors.phone && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Note Section */}
      <div className="bg-islamic-green/10 p-6 rounded-lg border border-islamic-green/20 backdrop-blur-sm">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-islamic-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
          </div>
          <div className={`${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
            <p className="text-sm text-islamic-green-dark">
              <strong className="font-semibold">
                {isRTL ? 'ملاحظة:' : 'Note:'}
              </strong>{' '}
              {isRTL 
                ? 'يرجى التأكد من صحة جميع المعلومات المقدمة. سيتم استخدام هذه البيانات للتواصل معك وترتيب رحلتك.'
                : 'Please ensure all information provided is accurate. This data will be used to contact you and arrange your trip.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};