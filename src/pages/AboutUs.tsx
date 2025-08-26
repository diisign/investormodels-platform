import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import Navbar from "@/components/layout/Navbar";
const AboutUs = () => {
  const [openStates, setOpenStates] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleOpen = (memberName: string) => {
    setOpenStates(prev => ({
      ...prev,
      [memberName]: !prev[memberName]
    }));
  };
  const teamMembers = [{
    name: "Julien Briot-Hadar",
    role: "Head of Compliance & Legal",
    description: "Ancien Compliance Officer chez TotalEnergies, Accenture et BMCE Bank, Julien est notre garant de la conformité et de la crédibilité juridique. Son rôle : sécuriser légalement Splitz, protéger nos utilisateurs et assurer une transparence totale.",
    photo: "/lovable-uploads/b205bded-cd40-44ab-b06e-61b23c2e932b.png"
  }, {
    name: "Łukasz Zgiep",
    role: "Head of Growth & Crowdfunding Strategy",
    description: "COO de Beesfund, l'une des plus grandes plateformes européennes de crowdfunding equity. Łukasz conçoit notre modèle économique et optimise la croissance de Splitz en alliant investissement, finance participative et Web3.",
    photo: "/lovable-uploads/8671a3fc-1c86-4e2a-8fd3-f58a6c80b8d0.png"
  }, {
    name: "Renaud Laplanche",
    role: "General Manager (COO)",
    description: "Entrepreneur français reconnu, fondateur de LendingClub et CEO de Upgrade, Inc., Renaud apporte son expertise unique en fintech et financement participatif. Fort de son expérience dans le scaling international de plateformes financières, il pilote la vision opérationnelle de Splitz et structure notre croissance pour en faire un acteur incontournable de la creator economy.",
    photo: "/lovable-uploads/468a1a86-2634-452e-a8d7-aaa00dba0668.png"
  }, {
    name: "Camila Russo",
    role: "Head of Marketing & Community",
    description: "Fondatrice de The Defiant et ex-journaliste chez Bloomberg, Camila est une référence mondiale en Web3 et creator economy. Elle construit la marque Splitz, développe notre stratégie de communication et anime une communauté engagée autour de notre vision.",
    photo: "/lovable-uploads/89af2bc5-e9a2-4101-aebd-d45e06f58bb1.png"
  }];
  return <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold mb-12 text-foreground">
              Qui sommes nous
            </h1>
            <div className="text-lg md:text-xl text-muted-foreground space-y-4 max-w-3xl mx-auto">
              <p>
                Chez <strong className="text-primary">Splitz</strong>, nous réinventons l'investissement dans la creator economy.
              </p>
              <p>
                Notre mission est simple : <strong className="text-primary">permettre aux investisseurs de soutenir des créatrices et de profiter directement de leur succès</strong>.
              </p>
              <p>
                Pour bâtir cette vision, nous avons réuni une équipe d'experts complémentaires, chacun apportant une expertise unique.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-0">
        <div className="max-w-6xl mx-auto py-[28px]">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
              Notre équipe de direction
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => <FadeIn key={member.name} delay={index * 0.2}>
                <motion.div className="text-center hover:scale-105 transition-all duration-300" whileHover={{
              y: -5
            }}>
                  {/* Avatar with photo */}
                  <div className="w-16 md:w-24 h-16 md:h-24 mx-auto mb-4 md:mb-6 overflow-hidden rounded-full border-2 border-primary/20">
                    <img src={member.photo} alt={`Photo de profil de ${member.name}`} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Name and role */}
                  <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-xs md:text-base mb-2">
                    {member.role}
                  </p>
                  
                  {/* Arrow button centered below role */}
                  <div className="flex justify-center mb-2 md:mb-4">
                    <button onClick={() => toggleOpen(member.name)} className="text-yellow-500 hover:text-yellow-400 transition-all duration-200">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openStates[member.name] ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Description with smooth transition */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openStates[member.name] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-muted-foreground leading-relaxed text-xs md:text-base">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>)}
          </div>
        </div>
      </section>

      {/* Founders' Ambition Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-row items-center gap-4 md:gap-8 lg:gap-16">
              <div className="w-1/3 md:w-1/2">
                <img src="/lovable-uploads/ef1de523-e995-42cd-9c19-9acc736a03e8.png" alt="L'ambition des fondateurs - Interface mobile Splitz" className="w-full max-w-[200px] md:max-w-md mx-auto rounded-xl" />
              </div>
              <div className="w-2/3 md:w-1/2 text-left">
                <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-3 md:mb-6 text-foreground">
                  L'ambition des <span className="text-primary">fondateurs</span>
                </h2>
                <div className="space-y-2 md:space-y-4 text-muted-foreground">
                  <p className="text-sm md:text-lg">
                    Le potentiel humain est une classe d'actifs encore inexploitée.
                  </p>
                  <p className="text-sm md:text-lg">
                    Nous voulons offrir aux créatrices et aux utilisateurs un nouveau marché financier basé sur le capital humain.
                  </p>
                  <p className="text-sm md:text-lg">
                    Malgré leur potentiel de revenus, les créatrices peinent à obtenir des financements.
                  </p>
                  <p className="text-sm md:text-lg">
                    Contrairement aux entreprises, aux actions ou à l'immobilier, il n'existe aucun marché structuré pour investir dans les créatrices.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="glass-panel p-8 rounded-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Rejoignez la révolution de l'investissement
              </h2>
              <p className="text-muted-foreground mb-6">
                Découvrez comment notre équipe transforme la façon d'investir dans la creator economy
              </p>
              <motion.a href="/creators" className="btn-primary inline-block" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                Découvrir nos créatrices
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>;
};
export default AboutUs;