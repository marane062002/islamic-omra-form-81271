import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormProvider, useForm } from '@/contexts/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import { FormProgressBar } from './form/FormProgressBar';
import { Step1PersonalInfo } from './form/Step1PersonalInfo';
import { FormNavigation } from './form/FormNavigation';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

// Placeholder for other steps - we'll implement these as needed
const Step2TravelParty: React.FC = () => (
  <Card className="bg-card-sacred border-islamic-green-lighter">
    <CardContent className="p-8 text-center">
      <h3 className="text-xl font-semibold text-islamic-green mb-4">Travel Party Details</h3>
      <p className="text-muted-foreground">Number of adults, children, and infants will be configured here.</p>
    </CardContent>
  </Card>
);

const Step3TripPreferences: React.FC = () => (
  <Card className="bg-card-sacred border-islamic-green-lighter">
    <CardContent className="p-8 text-center">
      <h3 className="text-xl font-semibold text-islamic-green mb-4">Trip Preferences</h3>
      <p className="text-muted-foreground">Travel dates, duration, and departure airport selection.</p>
    </CardContent>
  </Card>
);

const Step4ServiceSelection: React.FC = () => (
  <Card className="bg-card-sacred border-islamic-green-lighter">
    <CardContent className="p-8 text-center">
      <h3 className="text-xl font-semibold text-islamic-green mb-4">Service Selection</h3>
      <p className="text-muted-foreground">Choose flights, hotels, transportation, guides, and other services.</p>
    </CardContent>
  </Card>
);

const Step5Accommodation: React.FC = () => (
  <Card className="bg-card-sacred border-islamic-green-lighter">
    <CardContent className="p-8 text-center">
      <h3 className="text-xl font-semibold text-islamic-green mb-4">Accommodation Preferences</h3>
      <p className="text-muted-foreground">Hotel category, location, room type, and meal plan selection.</p>
    </CardContent>
  </Card>
);

const Step6SpecialRequests: React.FC = () => (
  <Card className="bg-card-sacred border-islamic-green-lighter">
    <CardContent className="p-8 text-center">
      <h3 className="text-xl font-semibold text-islamic-green mb-4">Special Requests</h3>
      <p className="text-muted-foreground">Additional requirements and special accommodations.</p>
    </CardContent>
  </Card>
);

const Step7Review: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { formData } = useForm();

  return (
    <Card className="bg-card-sacred border-islamic-green-lighter">
      <CardContent className="p-8">
        <h3 className={`text-xl font-semibold text-islamic-green mb-6 text-center ${
          isRTL ? 'font-amiri' : 'font-inter'
        }`}>
          {t('form.step7')}
        </h3>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-islamic-green-lighter/10 rounded-lg">
              <h4 className="font-semibold text-islamic-green mb-2">{t('form.fullname')}</h4>
              <p>{formData.fullName || 'Not provided'}</p>
            </div>
            <div className="p-4 bg-islamic-green-lighter/10 rounded-lg">
              <h4 className="font-semibold text-islamic-green mb-2">{t('form.email')}</h4>
              <p>{formData.email || 'Not provided'}</p>
            </div>
          </div>
          
          <div className="p-4 bg-islamic-gold/10 rounded-lg text-center">
            <CheckCircle className="h-8 w-8 text-islamic-green mx-auto mb-2" />
            <p className={`text-sm text-muted-foreground ${isRTL ? 'font-amiri' : 'font-inter'}`}>
              {t('success.contact')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FormContent: React.FC = () => {
  const { currentStep } = useForm();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t('success.title'),
        description: t('success.message'),
      });
    } catch (error) {
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo />;
      case 2:
        return <Step2TravelParty />;
      case 3:
        return <Step3TripPreferences />;
      case 4:
        return <Step4ServiceSelection />;
      case 5:
        return <Step5Accommodation />;
      case 6:
        return <Step6SpecialRequests />;
      case 7:
        return <Step7Review />;
      default:
        return <Step1PersonalInfo />;
    }
  };

  return (
    <div className="min-h-[500px]">
      {renderStep()}
      <FormNavigation onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export const OmraForm: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="omra-form" className="py-20 bg-background relative islamic-pattern">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="islamic-ornament inline-block">
            <h2 className={`text-3xl md:text-4xl font-bold text-islamic-green mb-4 ${
              isRTL ? 'font-amiri' : 'font-playfair'
            }`}>
              {isRTL ? 'نموذج طلب العمرة' : 'Omra Request Form'}
            </h2>
          </div>
          
          <p className={`text-lg text-muted-foreground mt-6 max-w-2xl mx-auto ${
            isRTL ? 'font-amiri text-xl' : 'font-inter'
          }`}>
            {isRTL 
              ? 'املأ هذا النموذج لبدء تنظيم رحلة العمرة المباركة'
              : 'Fill out this form to start organizing your blessed Omra journey'
            }
          </p>
        </div>

        <FormProvider>
          <div className="max-w-4xl mx-auto">
            <FormProgressBar />
            
            <Card className="shadow-2xl border-islamic-green/20 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-md">
              <CardContent className="p-8">
                <div className="min-h-[500px]">
                  <FormContent />
                </div>
              </CardContent>
            </Card>
          </div>
        </FormProvider>
      </div>
    </section>
  );
};