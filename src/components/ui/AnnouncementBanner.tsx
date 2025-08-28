
import React from 'react';

const AnnouncementBanner = () => {
  return (
    <div className="bg-white text-black py-2 overflow-hidden relative z-40 shadow-sm border-b">
      <div className="animate-scroll whitespace-nowrap">
        <span className="inline-block px-4 text-sm font-medium">
          🎉 Félicitations au meilleur parrain de juillet, Alexandre ! Avec 743 parrainages et un gain exceptionnel de 111 450 € 👏
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
