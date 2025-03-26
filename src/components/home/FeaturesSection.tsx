
import React from 'react';
import { BarChart3, Users, ShieldCheck, Zap } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const FeatureCard = ({ icon, title, description, delay }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) => (
  <FadeIn className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700" direction="up" delay={delay}>
    <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-[#8B5CF6] mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </FadeIn>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Rendements attractifs",
      description: "Nos créatrices offrent des rendements moyens de 80% à 150% par trimestre.",
      delay: 100
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Diversité des créatrices",
      description: "Plus de 250 créatrices de contenu avec statistique détaillé sur du long terme.",
      delay: 200
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Sécurité maximale",
      description: "Toutes les créatrices sont recrutés sous certains critère spéciaux pour vous proposez les plus performantes.",
      delay: 300
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Investissement facile",
      description: "Interface intuitive et processus simplifié pour investir en quelques clics, même pour les débutants.",
      delay: 400
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16" direction="up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Plateforme <span className="text-investment-600">visionnaire</span> unique au monde
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez pourquoi de plus en plus d'investisseurs nous font confiance pour diversifier leur portefeuille.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
