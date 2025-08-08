import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/utils/auth';
const Privacy = () => {
  const {
    isAuthenticated
  } = useAuth();
  return <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center my-[35px] py-[20px] text-yellow-300">Politique de Confidentialité</h1>
        
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Chez CréatorInvest, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informe sur la façon dont nous traitons vos données personnelles lorsque vous visitez notre site web et vous informe de vos droits en matière de confidentialité et de la manière dont la loi vous protège.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Les données que nous collectons</h2>
            <p>
              Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant, notamment :
            </p>
            <ul>
              <li><strong>Données d'identité :</strong> prénom, nom, nom d'utilisateur ou identifiant similaire.</li>
              <li><strong>Données de contact :</strong> adresse e-mail et numéros de téléphone.</li>
              <li><strong>Données financières :</strong> détails de compte bancaire et de carte de paiement.</li>
              <li><strong>Données de transaction :</strong> détails des paiements et autres détails des produits et services que vous avez achetés auprès de nous.</li>
              <li><strong>Données techniques :</strong> adresse IP, identifiants de connexion, type et version de navigateur, paramètres de fuseau horaire et localisation, types et versions de plug-in de navigateur, système d'exploitation et plateforme, et autres technologies sur les appareils que vous utilisez pour accéder à ce site web.</li>
              <li><strong>Données de profil :</strong> votre nom d'utilisateur et mot de passe, vos investissements, vos préférences, vos commentaires et vos réponses aux enquêtes.</li>
              <li><strong>Données d'utilisation :</strong> informations sur la façon dont vous utilisez notre site web, nos produits et nos services.</li>
              <li><strong>Données de marketing et de communication :</strong> vos préférences pour recevoir des informations marketing de notre part et de nos tiers, et vos préférences de communication.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Comment nous utilisons vos données</h2>
            <p>
              Nous n'utiliserons vos données personnelles que lorsque la loi nous y autorise. Le plus souvent, nous utiliserons vos données personnelles dans les circonstances suivantes :
            </p>
            <ul>
              <li>Lorsque nous devons exécuter le contrat que nous sommes sur le point de conclure ou que nous avons conclu avec vous.</li>
              <li>Lorsque cela est nécessaire pour nos intérêts légitimes (ou ceux d'un tiers) et que vos intérêts et droits fondamentaux ne l'emportent pas sur ces intérêts.</li>
              <li>Lorsque nous devons nous conformer à une obligation légale ou réglementaire.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Sécurité des données</h2>
            <p>
              Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles soient accidentellement perdues, utilisées ou consultées de manière non autorisée, modifiées ou divulguées. En outre, nous limitons l'accès à vos données personnelles aux employés, agents, contractants et autres tiers qui ont un besoin commercial de les connaître.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Vos droits légaux</h2>
            <p>
              Vous avez le droit, dans certaines circonstances, de :
            </p>
            <ul>
              <li>Demander l'accès à vos données personnelles.</li>
              <li>Demander la correction de vos données personnelles.</li>
              <li>Demander l'effacement de vos données personnelles.</li>
              <li>Vous opposer au traitement de vos données personnelles.</li>
              <li>Demander la limitation du traitement de vos données personnelles.</li>
              <li>Demander le transfert de vos données personnelles.</li>
              <li>Retirer votre consentement.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Modifications</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre en publiant une nouvelle version sur notre site web. Vous devriez consulter cette page occasionnellement pour vous assurer que vous êtes satisfait des changements.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Privacy;