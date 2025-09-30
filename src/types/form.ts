export interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  passportNumber: string;
  passportExpiry: string;
  
  // Travel Party Details
  adults: number;
  children: number;
  infants: number;
  childrenAges: number[];
  infantsAges: number[];
  
  // Trip Preferences
  departureDate: string;
  returnDate: string;
  duration: number;
  flexible: boolean;
  departureAirport: string;
  
  // Service Selection
  flights: boolean;
  hotels: boolean;
  transportation: boolean;
  guide: boolean;
  visaProcessing: boolean;
  insurance: boolean;
  ziyaratTours: boolean;
  
  // Accommodation Preferences
  hotelCategory: '3star' | '4star' | '5star' | 'deluxe';
  locationPreference: 'haram' | 'walking' | 'shuttle';
  roomType: 'single' | 'double' | 'triple' | 'suite';
  mealPlan: 'breakfast' | 'halfboard' | 'fullboard';
  
  // Special Requests
  specialRequests: string;
}

export const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  passportNumber: '',
  passportExpiry: '',
  adults: 1,
  children: 0,
  infants: 0,
  childrenAges: [],
  infantsAges: [],
  departureDate: '',
  returnDate: '',
  duration: 7,
  flexible: false,
  departureAirport: '',
  flights: true,
  hotels: true,
  transportation: true,
  guide: true,
  visaProcessing: true,
  insurance: true,
  ziyaratTours: true,
  hotelCategory: '4star',
  locationPreference: 'haram',
  roomType: 'double',
  mealPlan: 'halfboard',
  specialRequests: '',
};

export interface FormErrors {
  [key: string]: string;
}