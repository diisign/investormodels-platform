
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const TrustLogos = () => {
  const logos = [
    {
      name: "OnlyFans",
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop&crop=center",
      alt: "OnlyFans Logo"
    },
    {
      name: "Stripe", 
      url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=80&fit=crop&crop=center",
      alt: "Stripe Logo"
    },
    {
      name: "Station F",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&crop=center", 
      alt: "Station F Logo"
    },
    {
      name: "MYM",
      url: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=200&h=80&fit=crop&crop=center",
      alt: "MYM Logo"
    },
    {
      name: "BPI France",
      url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=80&fit=crop&crop=center",
      alt: "BPI France Logo"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-8" direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ils nous font <span className="text-yellow-400">confiance</span>
          </h2>
        </FadeIn>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-trust space-x-12 md:space-x-16">
            {/* Premier set de logos */}
            {logos.map((logo, index) => (
              <div key={`set1-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:h-20 md:w-40">
                <div className="bg-white rounded-lg shadow-sm p-4 w-full h-full flex items-center justify-center border border-gray-200">
                  <span className="text-gray-700 font-semibold text-sm md:text-base">{logo.name}</span>
                </div>
              </div>
            ))}
            {/* Deuxième set pour continuité */}
            {logos.map((logo, index) => (
              <div key={`set2-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:h-20 md:w-40">
                <div className="bg-white rounded-lg shadow-sm p-4 w-full h-full flex items-center justify-center border border-gray-200">
                  <span className="text-gray-700 font-semibold text-sm md:text-base">{logo.name}</span>
                </div>
              </div>
            ))}
            {/* Troisième set pour continuité */}
            {logos.map((logo, index) => (
              <div key={`set3-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:h-20 md:w-40">
                <div className="bg-white rounded-lg shadow-sm p-4 w-full h-full flex items-center justify-center border border-gray-200">
                  <span className="text-gray-700 font-semibold text-sm md:text-base">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
