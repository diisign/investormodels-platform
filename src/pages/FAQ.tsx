
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

const FAQ = () => {
  const { isAuthenticated } = useAuth();

  const faqItems = [
    {
      question: "Comment sont calculés les rendements ?",
      answer: "Les rendements sont calculés en fonction des revenus générés par les créatrices, de leur croissance d'audience et de leur engagement. Chaque plan propose un taux de rendement fixe ou variable selon les performances."
    },
    {
      question: "Est-ce que mon investissement est sécurisé ?",
      answer: "Nous mettons en place des garanties contractuelles avec les créatrices pour protéger vos investissements. Bien que tout investissement comporte des risques, notre plateforme travaille uniquement avec des créatrices vérifiées ayant un historique de performance stable."
    },
    {
      question: "Puis-je investir dans plusieurs créatrices ?",
      answer: "Absolument ! Nous encourageons même la diversification de votre portefeuille d'investissement. Vous pouvez investir dans autant de créatrices que vous le souhaitez, dans la limite de votre solde disponible."
    },
    {
      question: "Comment retirer mes fonds et mes gains ?",
      answer: "Les gains sont crédités mensuellement sur votre compte. Vous pouvez les retirer à tout moment. Pour le capital investi, il est libéré à la fin de la période d'investissement choisie. Des retraits anticipés sont possibles sous certaines conditions."
    },
    {
      question: "Comment devenir une créatrice sur la plateforme ?",
      answer: "Les créatrices intéressées peuvent postuler via notre formulaire dédié. Nous évaluons chaque candidature selon plusieurs critères : qualité du contenu, taille de l'audience, engagement, régularité et potentiel de croissance."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes de crédit/débit, les virements bancaires et certaines cryptomonnaies. Tous les paiements sont sécurisés et chiffrés selon les normes les plus strictes de l'industrie."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-teal-500/20 to-teal-500/20 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <FadeIn direction="up" className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-accent bg-clip-text text-transparent">
                Questions fréquentes
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                Découvrez les réponses aux questions les plus courantes sur notre plateforme.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeIn direction="up">
              <Accordion type="single" collapsible className="space-y-6">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-teal-100 dark:border-teal-900/30 rounded-xl overflow-hidden bg-gradient-to-br from-teal-50/50 to-transparent dark:from-gray-800 dark:to-gray-800">
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium text-black dark:text-white hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>

        {/* Additional Questions */}
        <section className="py-16 bg-gradient-to-br from-teal-500/5 via-teal-500/5 to-teal-500/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <FadeIn direction="up">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
                Vous avez d'autres questions ?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <Link to="/contact">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-8 py-3 text-lg">
                  Contactez-nous
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
