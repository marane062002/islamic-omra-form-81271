import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Hotel, Bed, Users } from 'lucide-react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface TravelPartyData {
  adults: number;
  children: number;
  ages: number[];
}

interface TravelPartyStepProps {
  data: TravelPartyData;
  onChange: (data: Partial<TravelPartyData>) => void;
}

const TravelPartyStep = ({ data, onChange }: TravelPartyStepProps) => {
  const { isRTL } = useLanguage();

  const updateCount = (type: 'adults' | 'children', increment: boolean) => {
    const currentValue = data[type];
    const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
    
    if (type === 'adults' && newValue < 1) return; // At least 1 adult required
    
    onChange({ [type]: newValue });
  };

  const updateAge = (index: number, age: number) => {
    const newAges = [...data.ages];
    newAges[index] = age;
    onChange({ ages: newAges });
  };

  const totalTravelers = data.adults + data.children;
  const needAges = data.children;

  return (
    <div className="space-y-6">
      {/* Adults */}
      <Card className="p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-12 h-12 bg-gradient-islamic rounded-full flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-lg text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'بالغين' : 'Adults'}
              </h4>
              <p className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'العمر 18 سنة فما فوق' : 'Age 18 years and above'}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCount('adults', false)}
              disabled={data.adults <= 1}
              className="h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
            >
              <FaMinus className="w-3 h-3" />
            </Button>
            <span className="text-2xl font-bold w-12 text-center text-primary">
              {data.adults}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCount('adults', true)}
              disabled={data.adults >= 10}
              className="h-10 w-10 rounded-full hover:bg-primary/10 transition-colors"
            >
              <FaPlus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Children */}
      <Card className="p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-lg text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'أطفال' : 'Children'}
              </h4>
              <p className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'العمر 0-17 سنة' : 'Age 0-17 years'}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCount('children', false)}
              disabled={data.children <= 0}
              className="h-10 w-10 rounded-full hover:bg-yellow-500/10 transition-colors"
            >
              <FaMinus className="w-3 h-3" />
            </Button>
            <span className="text-2xl font-bold w-12 text-center text-yellow-600">
              {data.children}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCount('children', true)}
              disabled={data.children >= 8}
              className="h-10 w-10 rounded-full hover:bg-yellow-500/10 transition-colors"
            >
              <FaPlus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Ages for children */}
      {needAges > 0 && (
        <Card className="p-6 bg-gradient-to-br from-background/80 to-muted/20 border-dashed border-2 border-muted-foreground/30">
          <h4 className={`font-semibold text-lg mb-6 text-foreground ${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
            {isRTL ? 'أعمار الأطفال' : 'Children Ages'}
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: needAges }).map((_, index) => (
              <div key={index} className="relative group">
                <Input
                  id={`age-${index}`}
                  type="number"
                  min="0"
                  max="17"
                  value={data.ages[index] || ''}
                  onChange={(e) => updateAge(index, parseInt(e.target.value) || 0)}
                  placeholder={isRTL ? `طفل ${index + 1}` : `Child ${index + 1}`}
                  className={`h-12 transition-all duration-300 border-muted-foreground/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/50 backdrop-blur-sm ${
                    isRTL ? 'text-right' : ''
                  }`}
                />
                <Label 
                  htmlFor={`age-${index}`}
                  className={`absolute -top-2 bg-background px-2 text-sm font-medium text-muted-foreground transition-all duration-200 ${
                    isRTL ? 'right-3 font-amiri' : 'left-3 font-inter'
                  }`}
                >
                  {isRTL ? `طفل ${index + 1}` : `Child ${index + 1}`} {isRTL ? 'العمر' : 'Age'}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Summary */}
      <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-islamic-green/10 via-yellow-500/5 to-islamic-green/10 border border-islamic-green/20 backdrop-blur-sm text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/5 to-transparent"></div>
        <div className="relative z-10">
          <h4 className={`font-semibold text-xl mb-3 text-islamic-green-dark ${isRTL ? 'font-amiri' : 'font-playfair'}`}>
            {isRTL ? 'ملخص المسافرين' : 'Travelers Summary'}
          </h4>
          <p className={`text-3xl font-bold mb-2 bg-gradient-islamic bg-clip-text text-transparent ${isRTL ? 'font-amiri' : 'font-playfair'}`}>
            {totalTravelers} {isRTL ? 'مسافر' : 'travelers'}
          </p>
          <p className={`text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
            {data.adults} {isRTL ? 'بالغ' : 'adults'}, {data.children} {isRTL ? 'طفل' : 'children'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Step2AccommodationDetails: React.FC = () => {
  const { isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();

  const handleHotelCategoryChange = (category: string) => {
    updateFormData({ hotelCategory: category });
  };

  const handleRoomCountChange = (count: number) => {
    const roomCount = Math.max(1, Math.min(20, count)); // Limit between 1-20 rooms
    updateFormData({ numberOfRooms: roomCount });
  };

  const handleTravelPartyChange = (data: Partial<TravelPartyData>) => {
    const currentTravelParty = formData.travelParty || { adults: 1, children: 0, ages: [] };
    const updatedTravelParty = { ...currentTravelParty, ...data };
    updateFormData({ travelParty: updatedTravelParty });
  };

  const travelParty = formData.travelParty || { adults: 1, children: 0, ages: [] };

  // Hotel categories with star emojis
  const hotelCategories = [
    { 
      value: '4-star', 
      labelEn: '4 ⭐ Hotels', 
      labelAr: '4 ⭐ فنادق',
      descriptionEn: 'Comfortable and reliable accommodation',
      descriptionAr: 'إقامة مريحة وموثوقة'
    },
    { 
      value: '5-star', 
      labelEn: '5 ⭐ Hotels', 
      labelAr: '5 ⭐ فنادق',
      descriptionEn: 'Luxury experience with premium services',
      descriptionAr: 'تجربة فاخرة مع خدمات مميزة'
    },
    { 
      value: 'deluxe', 
      labelEn: '5 ⭐ Deluxe', 
      labelAr: '5 ⭐ ديلوكس',
      descriptionEn: 'Ultimate luxury and exclusive services',
      descriptionAr: 'أقصى درجات الفخامة والخدمات الحصرية'
    }
  ];

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
        {/* Travel Party with Age Categories */}
        <div className="space-y-4">
          <Label className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Users className="w-4 h-4 text-islamic-green" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'تفاصيل المسافرين' : 'Travel Party Details'} *
            </span>
          </Label>
          <TravelPartyStep 
            data={travelParty} 
            onChange={handleTravelPartyChange} 
          />
        </div>

        {/* Hotel Category - Checkboxes */}
        <div className="space-y-4">
          <Label className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Hotel className="w-4 h-4 text-islamic-green" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'فئة الفندق' : 'Hotel Category'} *
            </span>
          </Label>
          
          <div className="space-y-3">
            {hotelCategories.map((category) => {
              const isSelected = formData.hotelCategory === category.value;
              
              return (
                <div
                  key={category.value}
                  className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-islamic-green bg-islamic-green/5 shadow-md shadow-islamic-green/10'
                      : 'border-muted-foreground/20 bg-card hover:border-islamic-green/50'
                  }`}
                  onClick={() => handleHotelCategoryChange(category.value)}
                >
                  <div className="p-4">
                    <div className={`flex items-start space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Checkbox
                        id={category.value}
                        checked={isSelected}
                        onCheckedChange={() => handleHotelCategoryChange(category.value)}
                        className="mt-1 data-[state=checked]:bg-islamic-green data-[state=checked]:border-islamic-green"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={category.value}
                          className={`cursor-pointer font-semibold text-lg transition-colors ${
                            isSelected ? 'text-islamic-green-dark' : 'text-foreground'
                          } ${isRTL ? 'font-amiri' : 'font-inter'}`}
                        >
                          {isRTL ? category.labelAr : category.labelEn}
                        </Label>
                        <p className={`text-sm text-muted-foreground mt-1 ${
                          isRTL ? 'font-amiri' : 'font-inter'
                        }`}>
                          {isRTL ? category.descriptionAr : category.descriptionEn}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-islamic-green/0 via-islamic-green/5 to-islamic-green/0 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
          
          {errors.hotelCategory && (
            <p className={`text-red-500 text-sm mt-1 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {errors.hotelCategory}
            </p>
          )}
        </div>

        {/* Number of Rooms */}
        <div className="space-y-4">
          <Label className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Bed className="w-4 h-4 text-islamic-green" />
            <span className={isRTL ? 'font-amiri' : 'font-inter'}>
              {isRTL ? 'عدد الغرف' : 'Number of Rooms'} *
            </span>
          </Label>
          
          <div className="group relative overflow-hidden rounded-lg border-2 border-islamic-green/20 bg-card hover:border-islamic-green/50 transition-all duration-300">
            <div className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-islamic-green/10 rounded-full flex items-center justify-center">
                    <Bed className="w-5 h-5 text-islamic-green" />
                  </div>
                  <div>
                    <Label className={`font-medium text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                      {isRTL ? 'الغرف المطلوبة' : 'Rooms Required'}
                    </Label>
                    <p className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                      {isRTL ? 'اختر عدد الغرف المناسب' : 'Select the number of rooms needed'}
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center space-x-4 animate-in slide-in-from-right-5 duration-300 ${
                    isRTL ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <Label className={`text-sm text-muted-foreground whitespace-nowrap ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                    {isRTL ? 'العدد:' : 'Quantity:'}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRoomCountChange((formData.numberOfRooms || 1) - 1)}
                      className="w-10 h-10 rounded-md bg-islamic-green/10 hover:bg-islamic-green/20 text-islamic-green flex items-center justify-center transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={(formData.numberOfRooms || 1) <= 1}
                    >
                      -
                    </button>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.numberOfRooms || 1}
                      onChange={(e) => handleRoomCountChange(parseInt(e.target.value) || 1)}
                      className="w-20 h-10 text-center font-semibold border-islamic-green/30 text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRoomCountChange((formData.numberOfRooms || 1) + 1)}
                      className="w-10 h-10 rounded-md bg-islamic-green/10 hover:bg-islamic-green/20 text-islamic-green flex items-center justify-center transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={(formData.numberOfRooms || 1) >= 20}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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
                ? 'سيتم تخصيص الغرف بناءً على عدد الضيوف والفئة المختارة. الأسعار قابلة للتغيير حسب الموسم.'
                : 'Rooms will be allocated based on guest count and selected category. Prices may vary depending on the season.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};