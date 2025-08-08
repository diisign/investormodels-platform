import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/utils/auth';
const Legal = () => {
  const {
    isAuthenticated
  } = useAuth();
  return <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow container mx-auto px-4 py-[40px] text-yellow-300">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#8B5CF6]">Mentions Légales</h1>
        
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
            <p>Le site CréatorInvest est édité par la société CréatorInvest SAS, société par actions simplifiée au capital de 10 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 182 166 089, dont le siège social est situé au 60 rue François 1er, 75008 Paris, France.</p>
            <p>
              Numéro de TVA intracommunautaire : FR 83 456 789 123<br />
              Directeur de la publication : Sophie Martin
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Hébergeur</h2>
            <p>
              Le site CréatorInvest est hébergé par Amazon Web Services (AWS), entreprise située au 38 Avenue John F. Kennedy, L-1855 Luxembourg.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments constituant le site CréatorInvest (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations françaises et internationales sur le droit d'auteur et la propriété intellectuelle.
            </p>
            <p>
              Ces éléments sont la propriété exclusive de CréatorInvest SAS. La reproduction ou représentation, intégrale ou partielle, des pages, des données et de toute autre élément constitutif au site, par quelque procédé ou support que ce soit, est interdite et constitue sans autorisation de l'éditeur une contrefaçon.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitation de responsabilité</h2>
            <p>
              CréatorInvest SAS s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toutefois, CréatorInvest SAS ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.
            </p>
            <p>
              En conséquence, CréatorInvest SAS décline toute responsabilité :
            </p>
            <ul>
              <li>pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site ;</li>
              <li>pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site ;</li>
              <li>et plus généralement pour tous dommages, directs ou indirects, qu'elles qu'en soient les causes, origines, nature ou conséquences, provoqués à raison de l'accès de quiconque au site ou de l'impossibilité d'y accéder, de même que l'utilisation du site et/ou du crédit accordé à une quelconque information provenant directement ou indirectement de ce dernier.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions légales, vous pouvez nous écrire à l'adresse suivante :
            </p>
            <p>
              CréatorInvest SAS<br />
              60 rue François 1er<br />
              75008 Paris, France
            </p>
            <p>
              Ou par email à : creatorinvest@outlook.fr
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Legal;