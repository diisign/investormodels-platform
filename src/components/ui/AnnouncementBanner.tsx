import React from 'react';

const AnnouncementBanner = () => {
  const message = "🎉 Félicitations au meilleur parrain de juillet, Alexandre ! Avec 743 parrainages et un gain exceptionnel de 111 450 € 👏 • ✨ Nous recherchons des créatrices OnlyFans et MYM pour des collaborations durables et bénéfiques •";
  
  return (
    <div className="bg-white text-black py-2 overflow-hidden fixed top-0 left-0 right-0 z-[60] shadow-sm border-b">
      <div className="animate-scroll whitespace-nowrap flex">
        <div className="inline-block text-sm font-medium flex-shrink-0">
          {message} {message} {message}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;