
import React from 'react';

const AnnouncementBanner = () => {
  return (
    <div className="bg-yellow-400 text-black py-2 overflow-hidden relative">
      <div className="animate-scroll whitespace-nowrap">
        <span className="inline-block px-4 text-sm font-medium">
          🎉 Félicitations au meilleur parrain de juillet, Alexandre ! Avec 743 parrainages et un gain exceptionnel de 111 450 € 👏
        </span>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBanner;
