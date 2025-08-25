import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Julien Briot-Hadar",
      role: "Head of Compliance & Legal",
      description: "Ancien Compliance Officer chez TotalEnergies, Accenture et BMCE Bank, Julien est notre garant de la conformité et de la crédibilité juridique. Son rôle : sécuriser légalement Splitz, protéger nos utilisateurs et assurer une transparence totale.",
      emoji: "🛡️"
    },
    {
      name: "Łukasz Zgiep",
      role: "Head of Growth & Crowdfunding Strategy",
      description: "COO de Beesfund, l'une des plus grandes plateformes européennes de crowdfunding equity. Łukasz conçoit notre modèle économique et optimise la croissance de Splitz en alliant investissement, finance participative et Web3.",
      emoji: "📈"
    },
    {
      name: "Robby Greenfield",
      role: "General Manager (COO)",
      description: "Ancien de ConsenSys et fondateur de Umoja Labs, Robby pilote la vision opérationnelle et le scaling international de Splitz. Il assure l'exécution quotidienne et met en place les partenariats stratégiques qui propulsent notre plateforme.",
      emoji: "⚡"
    },
    {
      name: "Camila Russo",
      role: "Head of Marketing & Community",
      description: "Fondatrice de The Defiant et ex-journaliste chez Bloomberg, Camila est une référence mondiale en Web3 et creator economy. Elle construit la marque Splitz, développe notre stratégie de communication et anime une communauté engagée autour de notre vision.",
      emoji: "🎤"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
              🚀 Notre Équipe
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.2}>
                <motion.div
                  className="glass-card p-8 text-center hover:scale-105 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Avatar with emoji */}
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-4xl">
                    {member.emoji}
                  </div>
                  
                  {/* Name and role */}
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4">
                    {member.role}
                  </p>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
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