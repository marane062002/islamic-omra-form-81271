import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-gradient-sacred relative">
      <div className="absolute inset-0 islamic-pattern opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="islamic-ornament inline-block">
            <h2 className={`text-3xl md:text-4xl font-bold text-islamic-green mb-4 ${
              isRTL ? 'font-amiri' : 'font-inter'
            }`}>
              {t('about.title')}
            </h2>
          </div>
          
          <Separator className="w-24 mx-auto bg-islamic-gold h-1 rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <Card className="overflow-hidden shadow-xl border-islamic-green-lighter">
                <CardContent className="p-0">
                  <img
                    src="https://images.pexels.com/photos/2731666/pexels-photo-2731666.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Prophet's Mosque in Medina"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-islamic-green-dark/20 to-transparent"></div>
                </CardContent>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 text-islamic-gold text-6xl opacity-70 z-10">
                ☪
              </div>
              <div className="absolute -bottom-4 -left-4 text-islamic-gold text-4xl opacity-50 z-10">
                ✦
              </div>
            </div>

            {/* Content */}
            <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {/* Quranic Verse Card */}
              <Card className="bg-gradient-to-br from-islamic-green to-islamic-green-dark text-primary-foreground border-islamic-green-light shadow-2xl hover-lift">
                <CardContent className="p-12 text-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="islamic-pattern"></div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 text-islamic-gold text-3xl opacity-70">☪</div>
                  <div className="absolute top-4 right-4 text-islamic-gold text-3xl opacity-70">☪</div>
                  <div className="absolute bottom-4 left-4 text-islamic-gold text-2xl opacity-50">✦</div>
                  <div className="absolute bottom-4 right-4 text-islamic-gold text-2xl opacity-50">✦</div>
                  
                  {/* Opening Bracket */}
                  <div className="text-islamic-gold text-6xl mb-6 font-bold">﴾</div>
                  
                  {/* Quranic Verse */}
                  <div className="relative z-10">
                   <p className="arabic-text text-xl text-right mb-2">"فَإِذَا أَمِنتُمْ فَمَن تَمَتَّعَ بِالْعُمْرَةِ إِلَى الْحَجِّ فَمَا اسْتَيْسَرَ مِنَ الْهَدْيِ"</p>
                  </div>
                  
                  {/* Closing Bracket */}
                  <div className="text-islamic-gold text-6xl mb-6 font-bold">﴿</div>
                  
                  {/* Verse Reference */}
                  <div className="bg-islamic-gold/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
                    <p className="text-islamic-gold-light font-semibold text-lg">
                      سورة البقرة - آية 196
                    </p>
                  </div>
                  
                  {/* Translation */}
                  <div className="mt-6 pt-6 border-t border-islamic-gold/30">
                    <p className="text-islamic-green-lighter text-lg italic font-medium">
                      {isRTL 
                        ? '"فإذا أمنتم فمن تمتع بالعمرة إلى الحج فما استيسر من الهدي"'
                        : '"And when you are secure, then whoever performs Umrah [during the Hajj months] followed by Hajj [offers] what can be obtained with ease of sacrificial animals"'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};