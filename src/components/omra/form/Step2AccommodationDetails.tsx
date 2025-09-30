import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from '@/contexts/FormContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Hotel, Bed, Users, Child, Baby } from 'lucide-react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface TravelPartyData {
  adults: number;
  children: number;
  infants: number;
  ages: number[];
}

interface TravelPartyStepProps {
  data: TravelPartyData;
  onChange: (data: Partial<TravelPartyData>) => void;
}

const TravelPartyStep = ({ data, onChange }: TravelPartyStepProps) => {
  const { isRTL } = useLanguage();

  const updateCount = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
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

  const totalTravelers = data.adults + data.children + data.infants;
  const needAges = data.children + data.infants;

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
                {isRTL ? 'العمر 12 سنة فما فوق' : 'Age 12 years and above'}
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
              <Child className="w-6 h-6 text-white" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-lg text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'أطفال' : 'Children'}
              </h4>
              <p className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'العمر 2-11 سنة' : 'Age 2-11 years'}
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

      {/* Infants */}
      <Card className="p-6 group hover:shadow-lg transition-all duration-300 border-muted-foreground/20 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-md">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className={`font-semibold text-lg text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'رضع' : 'Infants'}
              </h4>
              <p className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                {isRTL ? 'تحت سن سنتين' : 'Under 2 years'}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCount('infants', false)}
              disabled={data.infants <= 0}
              className="h-10 w-10 rounded-full hover:bg-pink-500/10 transition-colors"
            >
              <FaMinus className="w-3 h-3" />
            </Button>
            <span className="text-2xl font-bold w-12 text-center text-pink-600">
              {data.infants}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateCount('infants', true)}
              disabled={data.infants >= 4}
              className="h-10 w-10 rounded-full hover:bg-pink-500/10 transition-colors"
            >
              <FaPlus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Ages for children and infants */}
      {needAges > 0 && (
        <Card className="p-6 bg-gradient-to-br from-background/80 to-muted/20 border-dashed border-2 border-muted-foreground/30">
          <h4 className={`font-semibold text-lg mb-6 text-foreground ${isRTL ? 'font-amiri text-right' : 'font-inter text-left'}`}>
            {isRTL ? 'أعمار الأطفال والرضع' : 'Children and Infants Ages'}
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: needAges }).map((_, index) => {
              const isChild = index < data.children;
              return (
                <div key={index} className="relative group">
                  <Input
                    id={`age-${index}`}
                    type="number"
                    min="0"
                    max={isChild ? "11" : "2"}
                    value={data.ages[index] || ''}
                    onChange={(e) => updateAge(index, parseInt(e.target.value) || 0)}
                    placeholder={isChild ? 
                      (isRTL ? `طفل ${index + 1}` : `Child ${index + 1}`) : 
                      (isRTL ? `رضيع ${index + 1}` : `Infant ${index + 1}`)
                    }
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
                    {isChild ? 
                      (isRTL ? `طفل ${index + 1}` : `Child ${index + 1}`) : 
                      (isRTL ? `رضيع ${index + 1}` : `Infant ${index + 1}`)
                    } {isRTL ? 'العمر' : 'Age'}
                  </Label>
                </div>
              );
            })}
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
            {data.adults} {isRTL ? 'بالغ' : 'adults'}, {data.children} {isRTL ? 'طفل' : 'children'}, {data.infants} {isRTL ? 'رضيع' : 'infants'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Step2AccommodationDetails: React.FC = () => {
  const { isRTL } = useLanguage();
  const { formData, updateFormData, errors } = useForm();

  const handleHotelCategoryChange = (value: string) => {
    updateFormData({ hotelCategory: value });
  };

  const handleRoomCountChange = (count: number) => {
    const roomCount = Math.max(1, Math.min(20, count)); // Limit between 1-20 rooms
    updateFormData({ numberOfRooms: roomCount });
  };

  const handleTravelPartyChange = (data: Partial<TravelPartyData>) => {
    const currentTravelParty = formData.travelParty || { adults: 1, children: 0, infants: 0, ages: [] };
    const updatedTravelParty = { ...currentTravelParty, ...data };
    updateFormData({ travelParty: updatedTravelParty });
  };

  // Calculate total guests from travel party
  const travelParty = formData.travelParty || { adults: 1, children: 0, infants: 0, ages: [] };
  const totalGuests = travelParty.adults + travelParty.children + travelParty.infants;

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
              {/* <SelectItem value="3-star">
                {isRTL ? '3 نجوم' : '3-Star Hotels'}
              </SelectItem> */}
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
                    <Users className="w-5 h-5 text-islamic-green" />
                  </div>
                  <div>
                    <Label className={`font-medium text-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                      {isRTL ? 'إجمالي الضيوف' : 'Total Guests'}
                    </Label>
                    <p className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                      {totalGuests} {isRTL ? 'ضيف' : 'guests'}
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center space-x-4 animate-in slide-in-from-right-5 duration-300 ${
                    isRTL ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <Label className={`text-sm text-muted-foreground whitespace-nowrap ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                    {isRTL ? 'عدد الغرف:' : 'Rooms:'}
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
              
              {/* Room recommendation hint */}
              {totalGuests > 0 && (
                <div className={`mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  <p className={`text-sm text-blue-700 ${isRTL ? 'font-amiri' : 'font-inter'}`}>
                    {isRTL 
                      ? `مقترح: ${Math.ceil(totalGuests / 2)} غرفة (غرفتان لكل ${Math.ceil(totalGuests / 2)} ضيوف)`
                      : `Suggested: ${Math.ceil(totalGuests / 2)} rooms (2 guests per room)`
                    }
                  </p>
                </div>
              )}
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