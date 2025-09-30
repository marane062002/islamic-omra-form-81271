export interface FormData {
  // Personal Information (Step 1)
  fullName: string;
  email: string;
  phone: string;
  
  // Accommodation Details (Step 2)
  hotelCategory: string;
  roomType: string;
  numberOfRooms: number;
  
  // Trip Preferences (Step 3)
  dateType: 'flexible' | 'specific';
  flexibleMonth: string;
  departureDate: string;
  returnDate: string;
  
  // Special Requests (Step 4)
  specialRequests: string;
}

export const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  hotelCategory: '',
  roomType: '',
  numberOfRooms: 1,
  dateType: 'specific',
  flexibleMonth: '',
  departureDate: '',
  returnDate: '',
  specialRequests: '',
};

export interface FormErrors {
  [key: string]: string;
}