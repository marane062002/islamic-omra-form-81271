import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Hotel, Bed, Hash } from 'lucide-react';

export const Step2AccommodationDetails: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();

  const handleInputChange = (field: string, value: string | number) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className={`space-y-8 ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-islamic-green/20">
          <Hotel className="w-8 h-8 text-white drop-shadow-sm" />
        </div>
        <h3 className={`text-2xl font-bold text-islamic-green mb-2 ${
          isRTL ? 'font-amiri' : 'font-playfair'
        }`}>
          {isRTL ? 'تفاصيل الإقامة' : 'Accommodation Details'}
        </h3>
        <p className={`text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
          {isRTL ? 'يرجى تحديد تفضيلات الإقامة' : 'Please specify your accommodation preferences'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Hotel Category */}
        <div className="space-y-2">
          <Label htmlFor="hotelCategory" className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Hotel className="w-4 h-4 text-islamic-green" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'فئة الفندق' : 'Hotel Category'} *
            </span>
          </Label>
          <Select 
            value={formData.hotelCategory || ''} 
            onValueChange={(value) => handleInputChange('hotelCategory', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={isRTL ? 'اختر فئة الفندق' : 'Select hotel category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-star">
                {isRTL ? '3 نجوم' : '3-Star Hotels'}
              </SelectItem>
              <SelectItem value="4-star">
                {isRTL ? '4 نجوم' : '4-Star Hotels'}
              </SelectItem>
              <SelectItem value="5-star">
                {isRTL ? '5 نجوم' : '5-Star Hotels'}
              </SelectItem>
              <SelectItem value="deluxe">
                {isRTL ? '5 نجوم ديلوكس' : '5-Star Deluxe'}
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.hotelCategory && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.hotelCategory}
            </p>
          )}
        </div>

        {/* Room Type */}
        <div className="space-y-2">
          <Label htmlFor="roomType" className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Bed className="w-4 h-4 text-islamic-green" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'نوع الغرفة' : 'Room Type'} *
            </span>
          </Label>
          <Select 
            value={formData.roomType || ''} 
            onValueChange={(value) => handleInputChange('roomType', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder={isRTL ? 'اختر نوع الغرفة' : 'Select room type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">
                {isRTL ? 'غرفة فردية' : 'Single Room'}
              </SelectItem>
              <SelectItem value="double">
                {isRTL ? 'غرفة مزدوجة' : 'Double Room'}
              </SelectItem>
              <SelectItem value="triple">
                {isRTL ? 'غرفة ثلاثية' : 'Triple Room'}
              </SelectItem>
              <SelectItem value="quad">
                {isRTL ? 'غرفة رباعية' : 'Quad Room'}
              </SelectItem>
              <SelectItem value="family">
                {isRTL ? 'جناح عائلي' : 'Family Suite'}
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.roomType && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.roomType}
            </p>
          )}
        </div>

        {/* Number of Rooms */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="numberOfRooms" className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Hash className="w-4 h-4 text-islamic-green" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'عدد الغرف' : 'Number of Rooms'} *
            </span>
          </Label>
          <Input
            type="number"
            id="numberOfRooms"
            min="1"
            max="10"
            value={formData.numberOfRooms || 1}
            onChange={(e) => handleInputChange('numberOfRooms', parseInt(e.target.value) || 1)}
            className="h-12"
          />
          {errors.numberOfRooms && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.numberOfRooms}
            </p>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-islamic-green/10 p-6 rounded-lg border border-islamic-green/20 backdrop-blur-sm">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-islamic-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm">ℹ</span>
            </div>
          </div>
          <div className={`${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
            <p className="text-sm text-islamic-green-dark">
              {isRTL 
                ? 'سيتم تخصيص الغرف بناءً على توفرها والفئة المختارة. الأسعار قابلة للتغيير حسب الموسم.'
                : 'Rooms will be allocated based on availability and selected category. Prices may vary depending on the season.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
