import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import Navbar from "@/components/layout/Navbar";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Julien Briot-Hadar",
      role: "Head of Compliance & Legal",
      description: "Ancien Compliance Officer chez TotalEnergies, Accenture et BMCE Bank, Julien est notre garant de la conformité et de la crédibilité juridique. Son rôle : sécuriser légalement Splitz, protéger nos utilisateurs et assurer une transparence totale.",
      photo: "/lovable-uploads/b205bded-cd40-44ab-b06e-61b23c2e932b.png"
    },
    {
      name: "Łukasz Zgiep",
      role: "Head of Growth & Crowdfunding Strategy",
      description: "COO de Beesfund, l'une des plus grandes plateformes européennes de crowdfunding equity. Łukasz conçoit notre modèle économique et optimise la croissance de Splitz en alliant investissement, finance participative et Web3.",
      photo: "/lovable-uploads/8671a3fc-1c86-4e2a-8fd3-f58a6c80b8d0.png"
    },
    {
      name: "Robby Greenfield",
      role: "General Manager (COO)",
      description: "Ancien de ConsenSys et fondateur de Umoja Labs, Robby pilote la vision opérationnelle et le scaling international de Splitz. Il assure l'exécution quotidienne et met en place les partenariats stratégiques qui propulsent notre plateforme.",
      photo: "/lovable-uploads/468a1a86-2634-452e-a8d7-aaa00dba0668.png"
    },
    {
      name: "Camila Russo",
      role: "Head of Marketing & Community",
      description: "Fondatrice de The Defiant et ex-journaliste chez Bloomberg, Camila est une référence mondiale en Web3 et creator economy. Elle construit la marque Splitz, développe notre stratégie de communication et anime une communauté engagée autour de notre vision.",
      photo: "/lovable-uploads/89af2bc5-e9a2-4101-aebd-d45e06f58bb1.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
              Notre équipe de direction
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.2}>
                <motion.div
                  className="text-center hover:scale-105 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Avatar with photo */}
                  <div className="w-16 md:w-24 h-16 md:h-24 mx-auto mb-4 md:mb-6 overflow-hidden rounded-full border-2 border-primary/20">
                    <img 
                      src={member.photo} 
                      alt={`Photo de profil de ${member.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Name and role */}
                  <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-2 md:mb-4 text-xs md:text-base">
                    {member.role}
                  </p>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-xs md:text-base">
                    {member.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
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
              <motion.a
                href="/creators"
                className="btn-primary inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos créatrices
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;