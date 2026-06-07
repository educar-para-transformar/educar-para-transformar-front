import React from 'react';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { GallerySection } from './components/GallerySection';
import { FluidStackSection } from './components/FluidStackSection';
import { CommunitySection } from './components/CommunitySection';
import { ContactSection } from './components/ContactSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { EnrollmentInviteSection } from './components/EnrollmentInviteSection';
import { MessageCircle } from 'lucide-react';
import { FadeInSection } from '../../shared/components/FadeInSection';

export const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <FadeInSection direction="none" duration={0.8}>
        <Hero />
      </FadeInSection>
      
      <FadeInSection direction="up" delay={0.2}>
        <IntroSection />
      </FadeInSection>
      
      <FadeInSection direction="up">
        <GallerySection />
      </FadeInSection>

      <FadeInSection direction="up">
        <FluidStackSection />
      </FadeInSection>

      <FadeInSection direction="up">
        <CommunitySection />
      </FadeInSection>

      <FadeInSection direction="up">
        <EnrollmentInviteSection />
      </FadeInSection>
      
      <FadeInSection direction="up">
        <ContactSection />
      </FadeInSection>
      
      <FadeInSection direction="up">
        <TestimonialsSection />
      </FadeInSection>

      {/* Floating Action Button (FAB) for WhatsApp/Chat from the wireframe */}
      <a
        href="https://wa.me/5493624000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
};
