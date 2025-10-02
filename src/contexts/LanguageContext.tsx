import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation & General
    'nav.home': 'Home',
    'nav.about': 'About Omra',
    'nav.contact': 'Contact',
    'language.selector': 'Language',
    
    // Hero Section
    'hero.title': 'Plan Your Omra Journey',
    'hero.subtitle': 'A blessed journey of faith and devotion',
    'hero.cta': 'Start Your Request',
    
    // About Section
    'about.title': 'About Omra Pilgrimage',
    'about.description': 'Omra is a sacred pilgrimage to Mecca that can be performed at any time of the year. It includes several rituals including Tawaf (circumambulation of the Kaaba) and Sa\'i (walking between Safa and Marwa hills).',
    'about.spiritual': 'This spiritual journey brings Muslims closer to Allah and provides an opportunity for prayer, reflection, and seeking forgiveness.',
    
    // Program Includes
    'program.title': 'Program Includes',
    'program.visa': 'Visa fees',
    'program.flight': 'Round-trip flight ticket',
    'program.guidance': 'Religious and technical guidance + ziyarat tours',
    'program.passport': 'Passport valid for at least 6 months',
    'program.payment': 'Payment of half the amount at registration',
    'program.hotels': 'Hotels in Medina & Mecca',
    'program.transport': 'Bus transport inside Saudi Arabia',
    'program.insurance': 'Health insurance',
    'program.book': 'Book Now',
    
    // Form Steps
    'form.step1': 'Personal Info',
    'form.step1.title': 'Personal Information',
    'form.step1.subtitle': 'Please provide your personal details for the pilgrimage',
    'form.step1.firstName': 'First Name',
    'form.step1.lastName': 'Last Name',
    'form.step1.email': 'Email Address',
    'form.step1.phone': 'Phone Number',
    'form.step1.passportNumber': 'Passport Number',
    'form.step1.passportExpiry': 'Passport Expiry Date',
    'form.step1.nationality': 'Nationality',
    'form.step1.note': 'Please ensure your passport is valid for at least 6 months from your intended travel date. All information must match your official documents exactly.',
    'form.step2': 'Travel Party',
    'form.step2.title': 'Travel Party Details',
    'form.step2.subtitle': 'How many people will be traveling for this sacred journey?',
    'form.step2.adults': 'Adults',
    'form.step2.children': 'Children',
    'form.step2.infants': 'Infants',
    'form.step2.adultsDesc': 'Ages 12 and above',
    'form.step2.childrenDesc': 'Ages 2-11',
    'form.step2.infantsDesc': 'Under 2 years old',
    'form.step2.agesTitle': 'Ages of Children and Infants',
    'form.step2.summary': 'Travel Party Summary',
    'form.step2.travelers': 'Travelers',
    'form.step2.note': 'Children under 2 years old are considered infants and may travel on an adult\'s lap. All travelers must have valid passports for international travel.',
    'form.step3': 'Trip Details',
    'form.step3.title': 'Trip Preferences',
    'form.step3.subtitle': 'When would you like to embark on your spiritual journey?',
    'form.step3.departureDate': 'Preferred Departure Date',
    'form.step3.returnDate': 'Preferred Return Date',
    'form.step3.duration': 'Trip Duration',
    'form.step3.flexibility': 'Date Flexibility',
    'form.step3.departureAirport': 'Preferred Departure Airport',
    'form.step3.tip': 'Flexible dates often result in significant cost savings. The most popular time for Omra is during Ramadan and school holidays, so consider traveling during quieter periods for a more peaceful experience.',
    'form.step4': 'Services',
    'form.step4.title': 'Service Selection',
    'form.step4.subtitle': 'Choose the services you need for your Omra journey',
    'form.step4.flights': 'Flight Booking',
    'form.step4.hotels': 'Hotel Accommodation',
    'form.step4.transportation': 'Ground Transportation',
    'form.step4.guide': 'Religious Guide',
    'form.step4.visa': 'Visa Processing',
    'form.step4.insurance': 'Travel Insurance',
    'form.step4.ziyarat': 'Ziyarat Tours',
    'form.step4.recommended': 'Recommended',
    'form.step4.essentialPackage': 'Essential Package',
    'form.step4.premiumPackage': 'Premium Package',
    'form.step4.startingFrom': 'Starting from',
    'form.step4.note': 'You can customize your package by selecting individual services. Our team will provide a detailed quote based on your selections and travel dates.',
    'form.step5': 'Accommodation',
    'form.step5.title': 'Accommodation Preferences',
    'form.step5.subtitle': 'Choose your preferred accommodation for your sacred journey',
    'form.step5.hotelCategory': 'Hotel Category',
    'form.step5.locationPreference': 'Location Preference',
    'form.step5.roomType': 'Room Type',
    'form.step5.mealPlan': 'Meal Plan',
    'form.step5.meccaRecommendations': 'Mecca Recommendations',
    'form.step5.medinaRecommendations': 'Medina Recommendations',
    'form.step6': 'Requests',
    'form.step6.title': 'Special Requests',
    'form.step7': 'Review',
    'form.step7.title': 'Review & Confirmation',
    'form.step7.subtitle': 'Please review all details before submitting your request',
    'form.step7.personalInfo': 'Personal Information',
    'form.step7.travelParty': 'Travel Party',
    'form.step7.tripPreferences': 'Trip Preferences',
    'form.step7.selectedServices': 'Selected Services',
    'form.step7.accommodation': 'Accommodation',
    'form.step7.specialRequests': 'Special Requests & Additional Information',
    'form.step7.submitRequest': 'Submit Omra Request',
    'form.step7.submittingRequest': 'Submitting Your Request...',
    'form.step7.reviewNote': 'Our team will review your request and contact you within 24 hours with a detailed quotation',
    'form.step7.termsAccept': 'I acknowledge that I have reviewed all the information provided and agree to the Terms and Conditions and Privacy Policy. I understand that this is a request for quotation and that final pricing and availability will be confirmed by your team.',
    
    // Form Fields
    'form.fullname': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone Number',
    'form.passport': 'Passport Number',
    'form.passport.expiry': 'Passport Expiry Date',
    'form.adults': 'Number of Adults',
    'form.children': 'Number of Children',
    'form.infants': 'Number of Infants',
    'form.departure.date': 'Preferred Departure Date',
    'form.return.date': 'Preferred Return Date',
    'form.duration': 'Duration (days)',
    'form.flexible': 'Flexible with dates',
    'form.airport': 'Departure Airport',
    'form.hotel.category': 'Hotel Category',
    'form.hotel.location': 'Location Preference',
    'form.room.type': 'Room Type',
    'form.meal.plan': 'Meal Plan',
    'form.special.requests': 'Special Requests',
    'form.submit': 'Submit Request',
    'form.next': 'Next',
    'form.back': 'Back',
    
    // Form Errors
    'form.error.fullname': 'name must be at least 2 characters',
    'form.error.email': 'Please enter a valid email address',
    'form.error.phone': 'Please enter a valid phone number',
    'form.error.passport': 'Passport number must be at least 6 characters',
    
    // Form Options
    'hotel.3star': '3 Star',
    'hotel.4star': '4 Star',
    'hotel.5star': '5 Star',
    'hotel.deluxe': 'Deluxe',
    'location.haram': 'Near Haram',
    'location.walking': 'Walking Distance',
    'location.shuttle': 'Shuttle Service',
    'room.single': 'Single',
    'room.double': 'Double',
    'room.triple': 'Triple',
    'room.suite': 'Suite',
    'meal.breakfast': 'Breakfast Only',
    'meal.halfboard': 'Half Board',
    'meal.fullboard': 'Full Board',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.phone': 'Phone Numbers',
    'contact.follow': 'Follow Us',
    
    // Success Message
    'success.title': 'Request Submitted Successfully',
    'success.message': 'Thank you for your request. May Allah accept your Omra.',
    'success.contact': 'We will contact you soon to finalize the details.',
  },
  
  ar: {
    // Navigation & General
    'nav.home': 'الرئيسية',
    'nav.about': 'عن العمرة',
    'nav.contact': 'اتصل بنا',
    'language.selector': 'اللغة',
    
    // Hero Section
    'hero.title': 'خطط رحلة العمرة',
    'hero.subtitle': 'رحلة مباركة من الإيمان والتفاني',
    'hero.cta': 'ابدأ طلبك',
    
    // About Section
    'about.title': 'عن حج العمرة',
    'about.description': 'العمرة هي حج مقدس إلى مكة يمكن أداؤها في أي وقت من السنة. تشمل عدة مناسك منها الطواف حول الكعبة والسعي بين الصفا والمروة.',
    'about.spiritual': 'هذه الرحلة الروحانية تقرب المسلمين من الله وتوفر فرصة للدعاء والتأمل وطلب المغفرة.',
    
    // Program Includes
    'program.title': 'البرنامج يشمل',
    'program.visa': 'رسوم التأشيرة',
    'program.flight': 'تذكرة الطائرة ذهابا وإيابا',
    'program.guidance': 'التأطير الديني والتقني + المزارات',
    'program.passport': 'جواز سفر لا تقل صلاحيته عن 6 أشهر',
    'program.payment': 'دفع نصف المبلغ عند التسجيل',
    'program.hotels': 'فندق بالمدينة المنورة وفندق بمكة المكرمة',
    'program.transport': 'نقل بالحافلات داخل السعودية مكيفة وممتازة',
    'program.insurance': 'التأمين الصحي',
    'program.book': 'احجز الآن',
    
    // Form Steps
    'form.step1': 'المعلومات الشخصية',
    'form.step1.title': 'المعلومات الشخصية',
    'form.step1.subtitle': 'يرجى تقديم تفاصيلك الشخصية للحج',
    'form.step1.firstName': 'الاسم الأول',
    'form.step1.lastName': 'اسم العائلة',
    'form.step1.email': 'عنوان البريد الإلكتروني',
    'form.step1.phone': 'رقم الهاتف',
    'form.step1.passportNumber': 'رقم جواز السفر',
    'form.step1.passportExpiry': 'تاريخ انتهاء صلاحية جواز السفر',
    'form.step1.nationality': 'الجنسية',
    'form.step1.note': 'يرجى التأكد من أن جواز سفرك صالح لمدة 6 أشهر على الأقل من تاريخ السفر المقصود. يجب أن تتطابق جميع المعلومات مع وثائقك الرسمية بدقة.',
    'form.step2': 'المسافرون',
    'form.step2.title': 'تفاصيل المسافرين',
    'form.step2.subtitle': 'كم عدد الأشخاص الذين سيسافرون في هذه الرحلة المقدسة؟',
    'form.step2.adults': 'البالغون',
    'form.step2.children': 'الأطفال',
    'form.step2.infants': 'الرضع',
    'form.step2.adultsDesc': '12 سنة فما فوق',
    'form.step2.childrenDesc': 'من 2-11 سنة',
    'form.step2.infantsDesc': 'أقل من سنتين',
    'form.step2.agesTitle': 'أعمار الأطفال والرضع',
    'form.step2.summary': 'ملخص مجموعة السفر',
    'form.step2.travelers': 'مسافر',
    'form.step2.note': 'الأطفال دون سن الثانية يُعتبرون رضعاً ويمكنهم السفر في حضن البالغين. يجب أن يحمل جميع المسافرين جوازات سفر صالحة للسفر الدولي.',
    'form.step3': 'تفاصيل الرحلة',
    'form.step3.title': 'تفضيلات الرحلة',
    'form.step3.subtitle': 'متى تود أن تبدأ رحلتك الروحانية؟',
    'form.step3.departureDate': 'تاريخ المغادرة المفضل',
    'form.step3.returnDate': 'تاريخ العودة المفضل',
    'form.step3.duration': 'مدة الرحلة',
    'form.step3.flexibility': 'مرونة التاريخ',
    'form.step3.departureAirport': 'مطار المغادرة المفضل',
    'form.step3.tip': 'التواريخ المرنة غالباً ما تؤدي إلى توفير كبير في التكاليف. أكثر الأوقات شعبية للعمرة هي خلال رمضان والعطل المدرسية، لذا فكر في السفر خلال فترات أهدأ للحصول على تجربة أكثر سلاماً.',
    'form.step4': 'الخدمات',
    'form.step4.title': 'اختيار الخدمات',
    'form.step4.subtitle': 'اختر الخدمات التي تحتاجها لرحلة العمرة',
    'form.step4.flights': 'حجز الطيران',
    'form.step4.hotels': 'الإقامة الفندقية',
    'form.step4.transportation': 'النقل البري',
    'form.step4.guide': 'مرشد ديني',
    'form.step4.visa': 'معالجة التأشيرة',
    'form.step4.insurance': 'تأمين السفر',
    'form.step4.ziyarat': 'جولات الزيارة',
    'form.step4.recommended': 'موصى به',
    'form.step4.essentialPackage': 'الباقة الأساسية',
    'form.step4.premiumPackage': 'الباقة المميزة',
    'form.step4.startingFrom': 'تبدأ من',
    'form.step4.note': 'يمكنك تخصيص باقتك عن طريق اختيار الخدمات الفردية. سيقوم فريقنا بتقديم عرض أسعار مفصل بناءً على اختياراتك وتواريخ سفرك.',
    'form.step5': 'الإقامة',
    'form.step5.title': 'تفضيلات الإقامة',
    'form.step5.subtitle': 'اختر الإقامة المفضلة لرحلتك المقدسة',
    'form.step5.hotelCategory': 'فئة الفندق',
    'form.step5.locationPreference': 'تفضيل الموقع',
    'form.step5.roomType': 'نوع الغرفة',
    'form.step5.mealPlan': 'خطة الوجبات',
    'form.step5.meccaRecommendations': 'توصيات مكة',
    'form.step5.medinaRecommendations': 'توصيات المدينة',
    'form.step6': 'الطلبات',
    'form.step6.title': 'طلبات خاصة',
    'form.step7': 'المراجعة',
    'form.step7.title': 'المراجعة والتأكيد',
    'form.step7.subtitle': 'يرجى مراجعة جميع التفاصيل قبل إرسال طلبك',
    'form.step7.personalInfo': 'المعلومات الشخصية',
    'form.step7.travelParty': 'مجموعة السفر',
    'form.step7.tripPreferences': 'تفضيلات الرحلة',
    'form.step7.selectedServices': 'الخدمات المختارة',
    'form.step7.accommodation': 'الإقامة',
    'form.step7.specialRequests': 'الطلبات الخاصة والمعلومات الإضافية',
    'form.step7.submitRequest': 'إرسال طلب العمرة',
    'form.step7.submittingRequest': 'جاري إرسال طلبك...',
    'form.step7.reviewNote': 'سيقوم فريقنا بمراجعة طلبك والاتصال بك خلال 24 ساعة مع عرض أسعار مفصل',
    'form.step7.termsAccept': 'أقر بأنني راجعت جميع المعلومات المقدمة وأوافق على الشروط والأحكام وسياسة الخصوصية. أفهم أن هذا طلب لعرض أسعار وأن الأسعار النهائية والتوفر سيتم تأكيدهما من قبل فريقكم.',
    
    // Form Fields
    'form.fullname': 'الاسم الكامل',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.passport': 'رقم جواز السفر',
    'form.passport.expiry': 'تاريخ انتهاء جواز السفر',
    'form.adults': 'عدد البالغين',
    'form.children': 'عدد الأطفال',
    'form.infants': 'عدد الرضع',
    'form.departure.date': 'تاريخ المغادرة المفضل',
    'form.return.date': 'تاريخ العودة المفضل',
    'form.duration': 'المدة (أيام)',
    'form.flexible': 'مرونة في التواريخ',
    'form.airport': 'مطار المغادرة',
    'form.hotel.category': 'فئة الفندق',
    'form.hotel.location': 'تفضيل الموقع',
    'form.room.type': 'نوع الغرفة',
    'form.meal.plan': 'خطة الوجبات',
    'form.special.requests': 'طلبات خاصة',
    'form.submit': 'إرسال الطلب',
    'form.next': 'التالي',
    'form.back': 'السابق',
    
    // Form Errors
    'form.error.fullname': 'الاسم الكامل يجب أن يكون على الأقل حرفين',
    'form.error.email': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    'form.error.phone': 'يرجى إدخال رقم هاتف صحيح',
    'form.error.passport': 'رقم جواز السفر يجب أن يكون على الأقل 6 أحرف',
    
    // Form Options
    'hotel.3star': '3 نجوم',
    'hotel.4star': '4 نجوم',
    'hotel.5star': '5 نجوم',
    'hotel.deluxe': 'ديلوكس',
    'location.haram': 'قريب من الحرم',
    'location.walking': 'مسافة مشي',
    'location.shuttle': 'خدمة الحافلات',
    'room.single': 'فردي',
    'room.double': 'مزدوج',
    'room.triple': 'ثلاثي',
    'room.suite': 'جناح',
    'meal.breakfast': 'إفطار فقط',
    'meal.halfboard': 'نصف إقامة',
    'meal.fullboard': 'إقامة كاملة',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.phone': 'أرقام الهاتف',
    'contact.follow': 'تابعنا',
    
    // Success Message
    'success.title': 'تم إرسال الطلب بنجاح',
    'success.message': 'شكرا لك على طلبك. تقبل الله عمرتك.',
    'success.contact': 'سنتصل بك قريبا لإنهاء التفاصيل.',
  },
  
  fr: {
    // Navigation & General
    'nav.home': 'Accueil',
    'nav.about': 'À propos d\'Omra',
    'nav.contact': 'Contact',
    'language.selector': 'Langue',
    
    // Hero Section
    'hero.title': 'Planifiez votre voyage Omra',
    'hero.subtitle': 'Un voyage béni de foi et de dévotion',
    'hero.cta': 'Commencer votre demande',
    
    // About Section
    'about.title': 'À propos du pèlerinage Omra',
    'about.description': 'Omra est un pèlerinage sacré à La Mecque qui peut être effectué à tout moment de l\'année. Il comprend plusieurs rituels dont le Tawaf (circumambulation de la Kaaba) et le Sa\'i (marche entre les collines Safa et Marwa).',
    'about.spiritual': 'Ce voyage spirituel rapproche les musulmans d\'Allah et offre une opportunité de prière, de réflexion et de demande de pardon.',
    
    // Program Includes
    'program.title': 'Le Programme Comprend',
    'program.visa': 'Frais de visa',
    'program.flight': 'Billet d\'avion aller-retour',
    'program.guidance': 'Guidance religieuse et technique + tours ziyarat',
    'program.passport': 'Passeport valide pendant au moins 6 mois',
    'program.payment': 'Paiement de la moitié du montant à l\'inscription',
    'program.hotels': 'Hôtels à Médine et La Mecque',
    'program.transport': 'Transport en bus en Arabie Saoudite',
    'program.insurance': 'Assurance santé',
    'program.book': 'Réserver Maintenant',
    
    // Form Steps
    'form.step1': 'Infos personnelles',
    'form.step1.title': 'Informations personnelles',
    'form.step1.subtitle': 'Veuillez fournir vos informations personnelles pour le pèlerinage',
    'form.step1.firstName': 'Prénom',
    'form.step1.lastName': 'Nom de famille',
    'form.step1.email': 'Adresse e-mail',
    'form.step1.phone': 'Numéro de téléphone',
    'form.step1.passportNumber': 'Numéro de passeport',
    'form.step1.passportExpiry': 'Date d\'expiration du passeport',
    'form.step1.nationality': 'Nationalité',
    'form.step1.note': 'Veuillez vous assurer que votre passeport est valide pour au moins 6 mois à partir de votre date de voyage prévue. Toutes les informations doivent correspondre exactement à vos documents officiels.',
    'form.step2': 'Groupe de voyage',
    'form.step2.title': 'Détails du groupe',
    'form.step2.subtitle': 'Combien de personnes voyageront pour ce voyage sacré ?',
    'form.step2.adults': 'Adultes',
    'form.step2.children': 'Enfants',
    'form.step2.infants': 'Nourrissons',
    'form.step2.adultsDesc': '12 ans et plus',
    'form.step2.childrenDesc': '2-11 ans',
    'form.step2.infantsDesc': 'Moins de 2 ans',
    'form.step2.agesTitle': 'Âges des enfants et nourrissons',
    'form.step2.summary': 'Résumé du groupe de voyage',
    'form.step2.travelers': 'Voyageurs',
    'form.step2.note': 'Les enfants de moins de 2 ans sont considérés comme des nourrissons et peuvent voyager sur les genoux d\'un adulte. Tous les voyageurs doivent avoir des passeports valides pour les voyages internationaux.',
    'form.step3': 'Détails voyage',
    'form.step3.title': 'Préférences de voyage',
    'form.step3.subtitle': 'Quand souhaitez-vous entreprendre votre voyage spirituel ?',
    'form.step3.departureDate': 'Date de départ préférée',
    'form.step3.returnDate': 'Date de retour préférée',
    'form.step3.duration': 'Durée du voyage',
    'form.step3.flexibility': 'Flexibilité des dates',
    'form.step3.departureAirport': 'Aéroport de départ préféré',
    'form.step3.tip': 'Les dates flexibles entraînent souvent des économies importantes. La période la plus populaire pour la Omra est pendant le Ramadan et les vacances scolaires, alors considérez voyager pendant les périodes plus calmes pour une expérience plus paisible.',
    'form.step4': 'Services',
    'form.step4.title': 'Sélection de services',
    'form.step4.subtitle': 'Choisissez les services dont vous avez besoin pour votre voyage Omra',
    'form.step4.flights': 'Réservation de Vol',
    'form.step4.hotels': 'Hébergement Hôtelier',
    'form.step4.transportation': 'Transport Terrestre',
    'form.step4.guide': 'Guide Religieux',
    'form.step4.visa': 'Traitement de Visa',
    'form.step4.insurance': 'Assurance Voyage',
    'form.step4.ziyarat': 'Tours Ziyarat',
    'form.step4.recommended': 'Recommandé',
    'form.step4.essentialPackage': 'Forfait Essentiel',
    'form.step4.premiumPackage': 'Forfait Premium',
    'form.step4.startingFrom': 'À partir de',
    'form.step4.note': 'Vous pouvez personnaliser votre forfait en sélectionnant des services individuels. Notre équipe fournira un devis détaillé basé sur vos sélections et dates de voyage.',
    'form.step5': 'Hébergement',
    'form.step5.title': 'Préférences d\'hébergement',
    'form.step5.subtitle': 'Choisissez votre hébergement préféré pour votre voyage sacré',
    'form.step5.hotelCategory': 'Catégorie d\'Hôtel',
    'form.step5.locationPreference': 'Préférence de Localisation',
    'form.step5.roomType': 'Type de Chambre',
    'form.step5.mealPlan': 'Plan de Repas',
    'form.step5.meccaRecommendations': 'Recommandations La Mecque',
    'form.step5.medinaRecommendations': 'Recommandations Médine',
    'form.step6': 'Demandes',
    'form.step6.title': 'Demandes spéciales',
    'form.step7': 'Révision',
    'form.step7.title': 'Révision et confirmation',
    'form.step7.subtitle': 'Veuillez réviser tous les détails avant de soumettre votre demande',
    'form.step7.personalInfo': 'Informations Personnelles',
    'form.step7.travelParty': 'Groupe de Voyage',
    'form.step7.tripPreferences': 'Préférences de Voyage',
    'form.step7.selectedServices': 'Services Sélectionnés',
    'form.step7.accommodation': 'Hébergement',
    'form.step7.specialRequests': 'Demandes Spéciales et Informations Supplémentaires',
    'form.step7.submitRequest': 'Soumettre Demande Omra',
    'form.step7.submittingRequest': 'Soumission de votre demande...',
    'form.step7.reviewNote': 'Notre équipe examinera votre demande et vous contactera dans les 24 heures avec un devis détaillé',
    'form.step7.termsAccept': 'Je reconnais avoir examiné toutes les informations fournies et accepte les Conditions Générales et la Politique de Confidentialité. Je comprends qu\'il s\'agit d\'une demande de devis et que les prix finaux et la disponibilité seront confirmés par votre équipe.',
    
    // Form Fields
    'form.fullname': 'Nom complet',
    'form.email': 'E-mail',
    'form.phone': 'Numéro de téléphone',
    'form.passport': 'Numéro de passeport',
    'form.passport.expiry': 'Date d\'expiration du passeport',
    'form.adults': 'Nombre d\'adultes',
    'form.children': 'Nombre d\'enfants',
    'form.infants': 'Nombre de nourrissons',
    'form.departure.date': 'Date de départ préférée',
    'form.return.date': 'Date de retour préférée',
    'form.duration': 'Durée (jours)',
    'form.flexible': 'Flexible avec les dates',
    'form.airport': 'Aéroport de départ',
    'form.hotel.category': 'Catégorie d\'hôtel',
    'form.hotel.location': 'Préférence d\'emplacement',
    'form.room.type': 'Type de chambre',
    'form.meal.plan': 'Plan de repas',
    'form.special.requests': 'Demandes spéciales',
    'form.submit': 'Soumettre la demande',
    'form.next': 'Suivant',
    'form.back': 'Retour',
    
    // Form Errors
    'form.error.fullname': 'Le nom complet doit contenir au moins 2 caractères',
    'form.error.email': 'Veuillez saisir une adresse e-mail valide',
    'form.error.phone': 'Veuillez saisir un numéro de téléphone valide',
    'form.error.passport': 'Le numéro de passeport doit contenir au moins 6 caractères',
    
    // Form Options
    'hotel.3star': '3 Étoiles',
    'hotel.4star': '4 Étoiles',
    'hotel.5star': '5 Étoiles',
    'hotel.deluxe': 'Deluxe',
    'location.haram': 'Près du Haram',
    'location.walking': 'Distance de marche',
    'location.shuttle': 'Service de navette',
    'room.single': 'Simple',
    'room.double': 'Double',
    'room.triple': 'Triple',
    'room.suite': 'Suite',
    'meal.breakfast': 'Petit déjeuner seulement',
    'meal.halfboard': 'Demi-pension',
    'meal.fullboard': 'Pension complète',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.phone': 'Numéros de téléphone',
    'contact.follow': 'Suivez-nous',
    
    // Success Message
    'success.title': 'Demande soumise avec succès',
    'success.message': 'Merci pour votre demande. Qu\'Allah accepte votre Omra.',
    'success.contact': 'Nous vous contacterons bientôt pour finaliser les détails.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };
  
  const isRTL = language === 'ar';

  const value = {
    language,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-amiri' : 'font-inter'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};