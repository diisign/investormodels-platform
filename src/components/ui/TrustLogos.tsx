
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const TrustLogos = () => {
  const logos = [
    {
      name: "OnlyFans",
      url: "/lovable-uploads/0f3c2e28-dae5-45fe-b927-76448473ca67.png",
      alt: "OnlyFans Logo"
    },
    {
      name: "Stripe", 
      url: "/lovable-uploads/280f726b-2ee9-4965-8557-bbbb02e8fc51.png",
      alt: "Stripe Logo"
    },
    {
      name: "Station F",
      url: "/lovable-uploads/2bfd27d0-1248-45b5-a886-c18b132f1f6a.png", 
      alt: "Station F Logo"
    },
    {
      name: "MYM",
      url: "/lovable-uploads/86f59032-0bfd-41ce-ad65-c1afae091b24.png",
      alt: "MYM Logo"
    },
    {
      name: "BPI France",
      url: "/lovable-uploads/dc54f338-5e9b-4519-ad9f-62dffdf4f580.png",
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
                <img src={logo.url} alt={logo.alt} className="max-h-12 md:max-h-16 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
            {/* Deuxième set pour continuité */}
            {logos.map((logo, index) => (
              <div key={`set2-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:h-20 md:w-40">
                <img src={logo.url} alt={logo.alt} className="max-h-12 md:max-h-16 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
            {/* Troisième set pour continuité */}
            {logos.map((logo, index) => (
              <div key={`set3-${index}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32 md:h-20 md:w-40">
                <img src={logo.url} alt={logo.alt} className="max-h-12 md:max-h-16 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
