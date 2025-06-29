
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/utils/auth';

const Cookies = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#8B5CF6]">Gestion des Cookies</h1>
        
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte qui est stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Les cookies sont largement utilisés par les propriétaires de sites web pour faire fonctionner leurs sites web, ou pour fonctionner plus efficacement, ainsi que pour fournir des informations de rapport.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Comment nous utilisons les cookies</h2>
            <p>
              CréatorInvest utilise les cookies pour les raisons suivantes :
            </p>
            <ul>
              <li><strong>Cookies strictement nécessaires :</strong> Ces cookies sont essentiels pour vous permettre de vous déplacer sur le site web et d'utiliser ses fonctionnalités, comme l'accès aux zones sécurisées du site web.</li>
              <li><strong>Cookies analytiques/de performance :</strong> Ils nous permettent de reconnaître et de compter le nombre de visiteurs et de voir comment les visiteurs se déplacent sur notre site web lorsqu'ils l'utilisent. Cela nous aide à améliorer le fonctionnement de notre site web.</li>
              <li><strong>Cookies de fonctionnalité :</strong> Ces cookies sont utilisés pour vous reconnaître lorsque vous revenez sur notre site web. Cela nous permet de personnaliser notre contenu pour vous, de vous saluer par votre nom et de mémoriser vos préférences.</li>
              <li><strong>Cookies de ciblage :</strong> Ces cookies enregistrent votre visite sur notre site web, les pages que vous avez visitées et les liens que vous avez suivis. Nous utiliserons ces informations pour rendre notre site web et la publicité qui y est affichée plus pertinents par rapport à vos intérêts.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Contrôle des cookies</h2>
            <p>
              Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies qui sont déjà sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour empêcher leur installation. Mais si vous faites cela, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visitez un site, et certains services et fonctionnalités peuvent ne pas fonctionner.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Plus d'informations</h2>
            <p>
              Pour plus d'informations sur les cookies, y compris comment voir quels cookies ont été définis et comment les gérer et les supprimer, visitez <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6]">www.allaboutcookies.org</a>.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
