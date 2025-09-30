import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Hotel, Bed } from 'lucide-react';

const roomTypes = [
  { value: 'single', labelEn: 'Single Room', labelAr: 'غرفة فردية' },
  { value: 'double', labelEn: 'Double Room', labelAr: 'غرفة مزدوجة' },
  { value: 'triple', labelEn: 'Triple Room', labelAr: 'غرفة ثلاثية' },
  { value: 'quad', labelEn: 'Quad Room', labelAr: 'غرفة رباعية' },
  { value: 'family', labelEn: 'Family Suite', labelAr: 'جناح عائلي' },
];

export const Step2AccommodationDetails: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();

  const handleHotelCategoryChange = (value: string) => {
    updateFormData({ hotelCategory: value });
  };

  const handleRoomToggle = (roomType: string, checked: boolean) => {
    const currentSelections = { ...formData.roomSelections };
    if (checked) {
      currentSelections[roomType] = 1;
    } else {
      delete currentSelections[roomType];
    }
    updateFormData({ roomSelections: currentSelections });
  };

  const handleRoomCountChange = (roomType: string, count: number) => {
    const currentSelections = { ...formData.roomSelections };
    currentSelections[roomType] = Math.max(1, count);
    updateFormData({ roomSelections: currentSelections });
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

      <div className="space-y-8">
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
            onValueChange={handleHotelCategoryChange}
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

        {/* Room Types */}
        <div className="space-y-4">
          <Label className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Bed className="w-4 h-4 text-islamic-green" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'أنواع الغرف' : 'Room Types'} *
            </span>
          </Label>
          
          <div className="space-y-3">
            {roomTypes.map((room) => {
              const isSelected = formData.roomSelections?.[room.value] !== undefined;
              const roomCount = formData.roomSelections?.[room.value] || 1;
              
              return (
                <div
                  key={room.value}
                  className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-islamic-green bg-islamic-green/5 shadow-md shadow-islamic-green/10'
                      : 'border-muted-foreground/20 bg-card hover:border-islamic-green/50'
                  }`}
                >
                  <div className="p-4">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Checkbox
                          id={room.value}
                          checked={isSelected}
                          onCheckedChange={(checked) => handleRoomToggle(room.value, checked as boolean)}
                          className="data-[state=checked]:bg-islamic-green data-[state=checked]:border-islamic-green"
                        />
                        <Label
                          htmlFor={room.value}
                          className={`cursor-pointer font-medium transition-colors ${
                            isSelected ? 'text-islamic-green-dark' : 'text-foreground'
                          } ${isRTL ? 'font-amiri' : 'font-inter'}`}
                        >
                          {isRTL ? room.labelAr : room.labelEn}
                        </Label>
                      </div>
                      
                      {isSelected && (
                        <div 
                          className={`flex items-center space-x-3 animate-in slide-in-from-right-5 duration-300 ${
                            isRTL ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          <Label className={`text-sm text-muted-foreground whitespace-nowrap ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                            {isRTL ? 'العدد:' : 'Quantity:'}
                          </Label>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleRoomCountChange(room.value, roomCount - 1)}
                              className="w-8 h-8 rounded-md bg-islamic-green/10 hover:bg-islamic-green/20 text-islamic-green flex items-center justify-center transition-colors font-bold"
                              disabled={roomCount <= 1}
                            >
                              -
                            </button>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={roomCount}
                              onChange={(e) => handleRoomCountChange(room.value, parseInt(e.target.value) || 1)}
                              className="w-16 h-8 text-center font-semibold border-islamic-green/30"
                            />
                            <button
                              type="button"
                              onClick={() => handleRoomCountChange(room.value, roomCount + 1)}
                              className="w-8 h-8 rounded-md bg-islamic-green/10 hover:bg-islamic-green/20 text-islamic-green flex items-center justify-center transition-colors font-bold"
                              disabled={roomCount >= 10}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-islamic-green/0 via-islamic-green/5 to-islamic-green/0 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
          
          {errors.roomSelections && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.roomSelections}
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
