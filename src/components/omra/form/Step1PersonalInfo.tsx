import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Common email domains for autocomplete
const COMMON_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

export const Step1PersonalInfo: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();
  
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        // Update form data with detected country
        updateFormData({ 
          detectedCountry: countryCode 
        });
      } catch (error) {
        console.error('Error detecting country:', error);
      }
    };

    detectUserCountry();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleEmailChange = (value: string) => {
    updateFormData({ email: value });
    updateEmailSuggestion(value);
  };

  const updateEmailSuggestion = (value: string) => {
    if (value.includes('@')) {
      const atIndex = value.indexOf('@');
      const afterAt = value.slice(atIndex + 1);
      const beforeAt = value.slice(0, atIndex);
      
      // Find matching domain
      const matchedDomain = COMMON_EMAIL_DOMAINS.find(domain => 
        domain.startsWith(afterAt.toLowerCase())
      );

      if (matchedDomain && afterAt.length > 0) {
        const remainingPart = matchedDomain.slice(afterAt.length);
        setSuggestionText(value + remainingPart);
        setShowSuggestion(true);
      } else if (afterAt.length === 0) {
        // If just @ is typed, suggest the first domain
        setSuggestionText(value + COMMON_EMAIL_DOMAINS[0]);
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
      }
    } else {
      setShowSuggestion(false);
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      if (showSuggestion && suggestionText) {
        e.preventDefault();
        updateFormData({ email: suggestionText });
        setShowSuggestion(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestion(false);
    }
  };

  const handlePhoneChange = (value: string = '') => {
    updateFormData({ phone: value });
  };

  // Custom styles for phone input to match your design
  const phoneInputStyle = {
    '--PhoneInputColor--focus': '#16a34a',
    '--PhoneInputInternationalIconPhone-opacity': '0.8',
    '--PhoneInputInternationalIconGlobe-opacity': '0.8',
    '--PhoneInputCountrySelectArrow-opacity': '0.8',
    '--PhoneInputCountrySelectArrow-color': '#16a34a',
    '--PhoneInputCountryFlag-borderColor': '#e5e7eb',
    '--PhoneInputCountryFlag-height': '24px',
    '--PhoneInputCountryFlag-width': '24px',
  } as React.CSSProperties;

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

        {/* Email with Inline Autocomplete */}
        <div className="form-input-floating relative">
          <div className="relative">
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onKeyDown={handleEmailKeyDown}
              onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
              placeholder={t('form.email')}
              className="bg-transparent relative z-10 w-full"
            />
            {showSuggestion && (
              <div
                ref={suggestionRef}
                className="absolute top-0 left-0 w-full h-full text-gray-400 pointer-events-none z-0"
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              >
                <span className="invisible">{formData.email}</span>
                <span className="text-gray-400 absolute top-0 left-0">
                  {suggestionText.slice(formData.email.length)}
                </span>
              </div>
            )}
          </div>
          <label htmlFor="email">
            {t('form.email')} *
          </label>
          
          {errors.email && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.email}</p>
          )}
        </div>

        {/* Phone with react-phone-number-input */}
        <div className="form-input-floating">
          <div className="phone-input-container">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry={formData.detectedCountry as any || 'SA'}
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder={t('form.phone')}
              style={phoneInputStyle}
              className="!w-full"
              inputClassName="!w-full !border-none !outline-none !bg-transparent !py-4 !px-0 !h-auto"
              countrySelectProps={{
                className: '!border-none !bg-transparent'
              }}
            />
          </div>
          <label htmlFor="phone" style={{ left: '60px' }}>
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

      <style jsx>{`
        .phone-input-container :global(.PhoneInput) {
          display: flex;
          align-items: center;
          width: 100%;
          height: 56px;
          padding: 0 16px;
        }

        .phone-input-container :global(.PhoneInputInput) {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          line-height: 24px;
          padding: 0;
          margin-left: 8px;
        }

        .phone-input-container :global(.PhoneInputCountry) {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }

        .phone-input-container :global(.PhoneInputCountrySelect) {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .phone-input-container :global(.PhoneInputCountryIcon) {
          width: 24px;
          height: 24px;
          border-radius: 2px;
        }

        .phone-input-container :global(.PhoneInputCountrySelectArrow) {
          margin-left: 4px;
          color: #16a34a;
        }

        /* RTL Support */
        ${isRTL ? `
          .phone-input-container :global(.PhoneInput) {
            direction: rtl;
          }
          
          .phone-input-container :global(.PhoneInputInput) {
            margin-left: 0;
            margin-right: 8px;
            text-align: right;
          }
          
          .phone-input-container :global(.PhoneInputCountry) {
            margin-right: 0;
            margin-left: 8px;
          }
          
          .phone-input-container :global(.PhoneInputCountrySelectArrow) {
            margin-left: 0;
            margin-right: 4px;
          }
        ` : ''}
      `}</style>
    </div>
  );
};