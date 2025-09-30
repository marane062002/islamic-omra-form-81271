import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FaCalendarAlt } from 'react-icons/fa';

export const Step3TripPreferences: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();
  const [dateType, setDateType] = useState<'flexible' | 'specific'>(
    formData.dateType || 'specific'
  );

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleDateTypeChange = (value: 'flexible' | 'specific') => {
    setDateType(value);
    updateFormData({ dateType: value });
  };

  const months = [
    { value: '2025-01', label: isRTL ? 'يناير 2025' : 'January 2025' },
    { value: '2025-02', label: isRTL ? 'فبراير 2025' : 'February 2025' },
    { value: '2025-03', label: isRTL ? 'مارس 2025' : 'March 2025' },
    { value: '2025-04', label: isRTL ? 'أبريل 2025' : 'April 2025' },
    { value: '2025-05', label: isRTL ? 'مايو 2025' : 'May 2025' },
    { value: '2025-06', label: isRTL ? 'يونيو 2025' : 'June 2025' },
    { value: '2025-07', label: isRTL ? 'يوليو 2025' : 'July 2025' },
    { value: '2025-08', label: isRTL ? 'أغسطس 2025' : 'August 2025' },
    { value: '2025-09', label: isRTL ? 'سبتمبر 2025' : 'September 2025' },
    { value: '2025-10', label: isRTL ? 'أكتوبر 2025' : 'October 2025' },
    { value: '2025-11', label: isRTL ? 'نوفمبر 2025' : 'November 2025' },
    { value: '2025-12', label: isRTL ? 'ديسمبر 2025' : 'December 2025' },
  ];

  return (
    <div className={`space-y-8 fade-in-up ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}>
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-islamic-green/20">
          <FaCalendarAlt className="w-8 h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-3xl font-bold mb-4 bg-gradient-islamic bg-clip-text text-transparent ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {isRTL ? 'تفضيلات الرحلة' : 'Trip Preferences'}
        </h3>
        <p className={`text-lg text-muted-foreground leading-relaxed ${
          isRTL ? 'font-amiri' : 'font-inter'
        }`}>
          {isRTL ? 'اختر تواريخ سفرك' : 'Choose your travel dates'}
        </p>
      </div>

      {/* Date Type Selection */}
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-muted-foreground/20">
        <h4 className={`font-semibold text-lg mb-4 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
          {isRTL ? 'نوع التاريخ' : 'Date Type'} *
        </h4>
        <RadioGroup
          value={dateType}
          onValueChange={(value) => handleDateTypeChange(value as 'flexible' | 'specific')}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flexible" id="flexible" />
            <Label htmlFor="flexible" className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'تاريخ مرن (اختر شهر)' : 'Flexible Date (Select a month)'}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id="specific" />
            <Label htmlFor="specific" className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'تاريخ محدد' : 'Specific Date'}
            </Label>
          </div>
        </RadioGroup>
      </Card>

      {/* Conditional Date Fields */}
      {dateType === 'flexible' ? (
        <div className="space-y-2">
          <Label htmlFor="flexibleMonth" className={isRTL ? 'font-amiri' : 'font-inter'}>
            {isRTL ? 'اختر الشهر' : 'Select Month'} *
          </Label>
          <Select 
            value={formData.flexibleMonth || ''} 
            onValueChange={(value) => handleInputChange('flexibleMonth', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={isRTL ? 'اختر شهر السفر' : 'Select travel month'} />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.flexibleMonth && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.flexibleMonth}
            </p>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative group">
            <Input
              id="departureDate"
              type="date"
              value={formData.departureDate || ''}
              onChange={(e) => handleInputChange('departureDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
              required
            />
            <Label htmlFor="departureDate" className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground ${
              isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
            }`}>
              {isRTL ? 'تاريخ المغادرة' : 'Departure Date'} *
            </Label>
            {errors.departureDate && (
              <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {errors.departureDate}
              </p>
            )}
          </div>

          <div className="relative group">
            <Input
              id="returnDate"
              type="date"
              value={formData.returnDate || ''}
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              min={formData.departureDate || new Date().toISOString().split('T')[0]}
              className="h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
              required
            />
            <Label htmlFor="returnDate" className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground ${
              isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
            }`}>
              {isRTL ? 'تاريخ العودة' : 'Return Date'} *
            </Label>
            {errors.returnDate && (
              <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {errors.returnDate}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tip Section */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-islamic-green/10 via-islamic-gold/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
        <div className="relative z-10">
          <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-8 h-8 bg-gradient-islamic rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-islamic-green-dark mb-2 ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {isRTL ? 'نصيحة' : 'Tip'}
              </h4>
              <p className={`text-sm leading-relaxed text-muted-foreground ${
                isRTL ? 'font-amiri' : 'font-inter'
              }`}>
                {isRTL 
                  ? 'التواريخ المرنة قد تساعدك في الحصول على أسعار أفضل وتوفر أكبر في الغرف.'
                  : 'Flexible dates may help you get better prices and greater room availability.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
