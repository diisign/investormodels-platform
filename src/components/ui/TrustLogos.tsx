
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
      url: "/lovable-uploads/01779f25-8be6-4fec-ba27-69ee0aa76393.png",
      alt: "MYM Logo"
    },
    {
      name: "BPI France",
      url: "/lovable-uploads/dc54f338-5e9b-4519-ad9f-62dffdf4f580.png",
      alt: "BPI France Logo"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          <div className="flex animate-infinite-scroll">
            {/* Créer plusieurs copies pour la boucle infinie */}
            {[...Array(8)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {logos.map((logo, index) => (
                  <div key={`${setIndex}-${index}`} className={`flex-shrink-0 mx-8 md:mx-12 ${
                    logo.name === 'OnlyFans' ? '-mt-2' : 
                    logo.name === 'Station F' || logo.name === 'MYM' ? 'mt-1' : ''
                  }`}>
                    <img 
                      src={logo.url} 
                      alt={logo.alt} 
                      className={`w-auto object-contain ${
                        logo.name === 'Station F' ? 'h-5 md:h-10' : 
                        logo.name === 'OnlyFans' ? 'h-12 md:h-24' : 
                        'h-8 md:h-16'
                      }`}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
