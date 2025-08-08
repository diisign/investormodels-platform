import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/utils/auth';
const Terms = () => {
  const {
    isAuthenticated
  } = useAuth();
  return <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center py-[20px] my-[35px] text-yellow-300">Conditions Générales d'Utilisation</h1>
        
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Bienvenue sur CréatorInvest. En accédant à notre plateforme, vous acceptez d'être lié par les présentes conditions générales d'utilisation, toutes les lois et règlements applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables.
            </p>
            <p>
              Si vous n'acceptez pas ces conditions, vous n'êtes pas autorisé à utiliser ou à accéder à ce site. Les documents contenus dans ce site web sont protégés par les lois sur le droit d'auteur et les marques de commerce.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Licence d'utilisation</h2>
            <p>
              La permission est accordée de télécharger temporairement une copie des documents sur le site web de CréatorInvest pour un visionnement transitoire personnel et non commercial. Il s'agit de l'octroi d'une licence, et non d'un transfert de titre.
            </p>
            <p>
              Sous cette licence, vous ne pouvez pas :
            </p>
            <ul>
              <li>Modifier ou copier les documents;</li>
              <li>Utiliser les documents à des fins commerciales ou pour toute présentation publique;</li>
              <li>Tenter de décompiler ou d'appliquer une ingénierie inverse à tout logiciel contenu sur le site web de CréatorInvest;</li>
              <li>Supprimer tout droit d'auteur ou autres notations de propriété des documents;</li>
              <li>Transférer les documents à une autre personne ou "miroiter" les documents sur un autre serveur.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Investissements et Risques</h2>
            <p>
              CréatorInvest est une plateforme qui permet aux utilisateurs d'investir dans les créatrices de contenu. Ces investissements comportent des risques et les rendements ne sont pas garantis. Vous reconnaissez que:
            </p>
            <ul>
              <li>Tout investissement comporte un risque de perte</li>
              <li>Les performances passées ne garantissent pas les résultats futurs</li>
              <li>Vous êtes seul responsable de vos décisions d'investissement</li>
              <li>Vous avez évalué votre situation financière et votre tolérance au risque avant d'investir</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitation de Responsabilité</h2>
            <p>
              En aucun cas, CréatorInvest ou ses fournisseurs ne peuvent être tenus responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser les matériaux sur le site web de CréatorInvest, même si CréatorInvest ou un représentant autorisé de CréatorInvest a été notifié oralement ou par écrit de la possibilité de tels dommages.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Modifications</h2>
            <p>
              CréatorInvest peut réviser ces conditions d'utilisation de son site web à tout moment sans préavis. En utilisant ce site web, vous acceptez d'être lié par la version actuelle de ces conditions d'utilisation.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Loi Applicable</h2>
            <p>
              Toute réclamation relative au site web de CréatorInvest sera régie par les lois françaises, sans égard à ses dispositions en matière de conflit de lois.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Terms;