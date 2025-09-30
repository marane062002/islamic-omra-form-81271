import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';

export const Step1PersonalInfo: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
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
        <div className="form-input-floating">
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

        {/* Email */}
        <div className="form-input-floating">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t('form.email')}
          />
          <label htmlFor="email">
            {t('form.email')} *
          </label>
          {errors.email && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="form-input-floating">
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder={t('form.phone')}
          />
          <label htmlFor="phone">
            {t('form.phone')} *
          </label>
          {errors.phone && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.phone}</p>
          )}
        </div>

        {/* Passport Number */}
        <div className="form-input-floating">
          <input
            type="text"
            id="passportNumber"
            value={formData.passportNumber}
            onChange={(e) => handleInputChange('passportNumber', e.target.value)}
            placeholder={t('form.passport')}
          />
          <label htmlFor="passportNumber">
            {t('form.passport')} *
          </label>
          {errors.passportNumber && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.passportNumber}</p>
          )}
        </div>

        {/* Passport Expiry */}
        <div className="form-input-floating md:col-span-2">
          <input
            type="date"
            id="passportExpiry"
            value={formData.passportExpiry}
            onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
            placeholder={t('form.passport.expiry')}
          />
          <label htmlFor="passportExpiry">
            {t('form.passport.expiry')} *
          </label>
          {errors.passportExpiry && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>{errors.passportExpiry}</p>
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
                ? 'يرجى التأكد من أن جواز سفرك صالح لمدة 6 أشهر على الأقل من تاريخ السفر المقصود. يجب أن تطابق جميع المعلومات وثائقك الرسمية تماماً.'
                : 'Please ensure your passport is valid for at least 6 months from your intended travel date. All information must match your official documents exactly.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};