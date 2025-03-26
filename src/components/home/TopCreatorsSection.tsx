
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import CreatorCard from '@/components/ui/CreatorCard';
import GradientButton from '@/components/ui/GradientButton';
import { creators } from '@/utils/mockData';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

interface TopCreatorsSectionProps {
  reference: React.RefObject<HTMLDivElement>;
}

const TopCreatorsSection: React.FC<TopCreatorsSectionProps> = ({ reference }) => {
  return (
    <section ref={reference} className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn className="flex justify-between items-end mb-12" direction="up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top créatrices
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Découvrez les créatrices les plus performantes de notre plateforme.
            </p>
          </div>
          <Link to="/creators" className="hidden md:flex items-center text-[#8B5CF6] hover:text-[#7c4ce6] font-medium">
            <span>Voir toutes les créatrices</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </FadeIn>
        
        <FadeIn direction="up" delay={100}>
          <div className="relative px-10 pb-10">
            <Carousel 
              opts={{
                align: "start",
                loop: true
              }}
              className="w-full"
            >
              <CarouselContent>
                {creators.map((creator, index) => (
                  <CarouselItem key={creator.id} className="md:basis-1/3 lg:basis-1/4">
                    <div className="p-1">
                      <CreatorCard
                        id={creator.id}
                        name={creator.name}
                        imageUrl={creator.imageUrl}
                        category={creator.category}
                        investorsCount={creator.investorsCount}
                        totalInvested={creator.totalInvested}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </FadeIn>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/creators">
            <GradientButton 
              variant="outline" 
              className="text-[#8B5CF6] border-[#8B5CF6] hover:bg-[#8B5CF6]/10"
            >
              Voir toutes les créatrices
              <ArrowRight className="h-4 w-4 ml-1" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCreatorsSection;
