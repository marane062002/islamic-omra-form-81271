import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Common email domains for autocomplete
const COMMON_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

export const Step1PersonalInfo: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();
  
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  const [detectedCountry, setDetectedCountry] = useState('sa');
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code?.toLowerCase();
        
        if (countryCode) {
          setDetectedCountry(countryCode);
        }
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

  const handlePhoneChange = (value: string, country: any) => {
    updateFormData({ 
      phone: value,
      phoneCountry: country.countryCode
    });
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

        {/* Phone Input - Custom Styled with Underline */}
        <div className="form-input-floating-phone">
          <div className="phone-input-wrapper">
            <PhoneInput
              country={detectedCountry}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                id: 'phone',
                required: true,
                name: 'phone',
                className: 'custom-phone-input'
              }}
              containerClass="custom-phone-container"
              buttonClass="custom-phone-button"
              inputClass="custom-phone-input"
              dropdownClass="custom-phone-dropdown"
              searchClass="custom-phone-search"
              preferredCountries={['sa', 'ae', 'eg', 'ma', 'tn', 'dz', 'us', 'gb', 'fr', 'de']}
              enableSearch
              searchPlaceholder={isRTL ? 'ابحث عن الدولة...' : 'Search countries...'}
              countryCodeEditable={false}
              autoFormat={true}
              placeholder={isRTL ? 'ادخل رقم الهاتف' : 'Enter phone number'}
              specialLabel=""
            />
          </div>
          <label htmlFor="phone" className="phone-floating-label">
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

      {/* Add this to your global CSS file or CSS modules */}
      <style jsx global>{`
        /* Main container */
        .custom-phone-container {
          width: 100% !important;
          font-family: inherit !important;
        }

        /* Input field - Underlined style */
        .custom-phone-input {
          width: 100% !important;
          height: 56px !important;
          padding: 16px 16px 16px 60px !important;
          font-size: 16px !important;
          line-height: 24px !important;
          border: none !important;
          border-bottom: 1px solid #d1d5db !important;
          border-radius: 0 !important;
          background: transparent !important;
          transition: all 0.2s ease !important;
          font-family: inherit !important;
        }

        /* Focus state */
        .custom-phone-input:focus {
          border-bottom-color: #16a34a !important;
          box-shadow: none !important;
          outline: none !important;
        }

        /* Country dropdown button */
        .custom-phone-button {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          bottom: 0 !important;
          background: transparent !important;
          border: none !important;
          border-bottom: 1px solid #d1d5db !important;
          border-radius: 0 !important;
          padding: 0 12px !important;
          width: 52px !important;
          height: 100% !important;
        }

        .custom-phone-button.open {
          background: white !important;
          border-bottom: 1px solid #16a34a !important;
        }

        .custom-phone-button:hover {
          background-color: #f8fafc !important;
        }

        /* Country dropdown menu */
        .custom-phone-dropdown {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
          margin-top: 4px !important;
          max-height: 300px !important;
          overflow-y: auto !important;
          background: white !important;
        }

        /* Search box */
        .custom-phone-search {
          padding: 12px !important;
          border-bottom: 1px solid #e5e7eb !important;
          margin: 0 !important;
          border-radius: 8px 8px 0 0 !important;
        }

        .custom-phone-search input {
          width: 100% !important;
          padding: 8px 12px !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          outline: none !important;
          transition: all 0.2s ease !important;
          font-size: 14px !important;
        }

        .custom-phone-search input:focus {
          border-color: #16a34a !important;
          box-shadow: 0 0 0 3px rgb(22 163 74 / 0.1) !important;
        }

        /* Dial code arrow */
        .custom-phone-button .arrow {
          border-top-color: #6b7280 !important;
          margin-left: 4px !important;
        }

        .custom-phone-button.open .arrow {
          border-bottom-color: #16a34a !important;
        }

        /* RTL Support */
        .rtl .custom-phone-input {
          padding: 16px 60px 16px 16px !important;
          text-align: right;
        }

        .rtl .custom-phone-button {
          left: auto !important;
          right: 0 !important;
        }

        .rtl .custom-phone-button .arrow {
          margin-left: 0 !important;
          margin-right: 4px !important;
        }

        /* Floating label styles */
        .form-input-floating-phone {
          position: relative;
          width: 100%;
        }

        .phone-floating-label {
          position: absolute;
          top: -8px;
          left: 12px;
          background: white;
          padding: 0 4px;
          font-size: 12px;
          color: #16a34a;
          z-index: 10;
          transition: all 0.2s ease;
          pointer-events: none;
        }

        .rtl .phone-floating-label {
          left: auto;
          right: 12px;
        }
      `}</style>
    </div>
  );
};