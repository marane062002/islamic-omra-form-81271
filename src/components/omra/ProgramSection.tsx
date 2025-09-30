import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Plane,
  FileText,
  MapPin,
  CreditCard,
  Building2,
  Bus,
  Shield,
  Users,
  CheckCircle,
} from 'lucide-react';

interface ProgramSectionProps {
  onBookNowClick: () => void;
}

const programItems = [
  { key: 'program.visa', icon: FileText },
  { key: 'program.flight', icon: Plane },
  { key: 'program.guidance', icon: Users },
  { key: 'program.passport', icon: FileText },
  { key: 'program.payment', icon: CreditCard },
  { key: 'program.hotels', icon: Building2 },
  { key: 'program.transport', icon: Bus },
  { key: 'program.insurance', icon: Shield },
];

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onBookNowClick }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="islamic-ornament inline-block">
            <h2 className={`text-3xl md:text-4xl font-bold text-islamic-green mb-4 ${
              isRTL ? 'font-amiri' : 'font-inter'
            }`}>
              {t('program.title')}
            </h2>
          </div>
          
          <Separator className="w-24 mx-auto bg-islamic-gold h-1 rounded-full" />
          
          <p className={`text-lg text-muted-foreground mt-6 max-w-2xl mx-auto ${
            isRTL ? 'font-amiri text-xl' : 'font-inter'
          }`}>
            {isRTL 
              ? 'رحلة شاملة ومريحة لأداء مناسك العمرة بكل يسر وطمأنينة'
              : 'A comprehensive and comfortable journey to perform Omra rituals with ease and peace of mind'
            }
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Program Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {programItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="group hover-lift bg-card-sacred border-islamic-green-lighter hover:border-islamic-green hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="h-5 w-5 text-islamic-green mr-2" />
                    </div>
                    
                    <p className={`text-sm font-medium text-foreground leading-relaxed ${
                      isRTL ? 'font-amiri text-base text-right' : 'font-inter'
                    }`}>
                      {t(item.key)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-islamic text-primary-foreground max-w-md mx-auto shadow-xl">
              <CardContent className="p-8">
                <div className="text-islamic-gold text-6xl mb-4">☪</div>
                
                <h3 className={`text-xl font-bold mb-4 ${
                  isRTL ? 'font-amiri' : 'font-inter'
                }`}>
                  {isRTL 
                    ? 'ابدأ رحلتك المباركة اليوم'
                    : 'Start Your Blessed Journey Today'
                  }
                </h3>
                
                <p className={`text-islamic-green-lighter mb-6 ${
                  isRTL ? 'font-amiri text-right' : 'font-inter'
                }`}>
                  {isRTL 
                    ? 'احجز الآن واحصل على خصم خاص للحجوزات المبكرة'
                    : 'Book now and get a special discount for early reservations'
                  }
                </p>
                
                <Button
                  onClick={onBookNowClick}
                  size="lg"
                  className="bg-gradient-gold hover:scale-105 transition-all duration-300 text-islamic-green-dark font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl"
                >
                  {t('program.book')}
                  <MapPin className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};