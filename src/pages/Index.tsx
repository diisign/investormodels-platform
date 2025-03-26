
import React, { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import TopCreatorsSection from '@/components/home/TopCreatorsSection';
import FeaturesSection from '@/components/home/FeaturesSection';

const Index = () => {
  const creatorsRef = useRef<HTMLDivElement>(null);

  const scrollToCreators = () => {
    creatorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={false} />
      
      {/* Main Content */}
      <main className="flex-grow pt-20">
        <HeroSection scrollToCreators={scrollToCreators} />
        <TopCreatorsSection reference={creatorsRef} />
        <FeaturesSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
