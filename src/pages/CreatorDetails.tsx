import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, CircleDollarSign, TrendingUp, TrendingDown, Users, Calendar, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import { toast } from "sonner";
import { creators, investInCreator } from '@/utils/mockData';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { getCreatorProfile, generateMonthlyPerformanceData, creatorProfiles, getMarketCap, getCreatorRanking, getLastVariation } from '@/utils/creatorProfiles';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ActiveInvestors from '@/components/ui/ActiveInvestors';
import { createInvestment } from '@/utils/investments';
import CreatorBadge from '@/components/ui/CreatorBadge';
const CreatorDetails = () => {
  const {
    creatorId
  } = useParams<{
    creatorId: string;
  }>();
  const {
    isAuthenticated,
    user
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [estimatedReturn, setEstimatedReturn] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<'1' | '3' | '6' | '12'>('3');
  const queryClient = useQueryClient();
  const mockCreator = creators.find(c => c.id === creatorId);
  const profileExists = creatorId && creatorProfiles[creatorId];
  const creatorProfile = creatorId ? getCreatorProfile(creatorId) : null;
  if (creatorId === 'creator3' && creatorProfile) {
    console.log('CreatorDetails - Kayla debug:', {
      creatorId,
      profileExists,
      creatorProfileImageUrl: creatorProfile.imageUrl,
      creatorProfileName: creatorProfile.name
    });
  }
  const creatorExists = !!mockCreator || !!profileExists;
  const {
    data: userBalance = 0
  } = useQuery({
    queryKey: ['userBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      try {
        console.log('Récupération du solde pour l\'utilisateur:', user.id);
        const {
          data,
          error
        } = await supabase.from('transactions').select('amount, status').eq('user_id', user.id).eq('status', 'completed');
        if (error) {
          console.error('Erreur lors de la récupération des transactions:', error);
          throw error;
        }
        console.log('Transactions récupérées:', data);
        const total = data && data.length > 0 ? data.reduce((sum, transaction) => sum + Number(transaction.amount), 0) : 0;
        console.log('Solde calculé:', total);
        return total;
      } catch (error) {
        console.error('Erreur lors de la récupération du solde:', error);
        return 0;
      }
    },
    enabled: !!user && isAuthenticated,
    refetchOnWindowFocus: true
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [creatorId]);
  const investmentOptions = {
    '1': {
      label: '1 mois',
      returnRate: 15
    },
    '3': {
      label: '3 mois',
      returnRate: 60
    },
    '6': {
      label: '6 mois',
      returnRate: 150
    },
    '12': {
      label: '12 mois',
      returnRate: 400
    }
  };
  useEffect(() => {
    if (investmentAmount && selectedDuration) {
      const investmentValue = parseFloat(investmentAmount);
      const returnRate = investmentOptions[selectedDuration].returnRate;
      const gain = investmentValue * returnRate / 100;
      setEstimatedReturn(gain);
    } else {
      setEstimatedReturn(0);
    }
  }, [investmentAmount, selectedDuration]);
  if (!creatorExists || !creatorProfile) {
    return <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={isAuthenticated} />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Créatrice non trouvée</h1>
            <p className="mb-6">La créatrice que vous cherchez n'existe pas ou a été supprimée.</p>
            <Link to="/creators">
              <GradientButton>
                Retour à la liste des créatrices
              </GradientButton>
            </Link>
          </div>
        </main>
      </div>;
  }
  const creator = mockCreator || {
    id: creatorProfile.id,
    name: creatorProfile.name,
    imageUrl: creatorProfile.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${creatorProfile.id}`,
    category: "Lifestyle",
    returnRate: creatorProfile.returnRate / 10,
    investorsCount: Math.floor(creatorProfile.followers / 15),
    totalInvested: getMarketCap(creatorProfile.id, creators),
    monthlyRevenue: creatorProfile.monthlyRevenue,
    followers: creatorProfile.followers,
    creationDate: new Date(Date.now() - Math.random() * 126144000000).toISOString(),
    coverImageUrl: 'https://images.unsplash.com/photo-1579762593131-b8945254345c?q=80&w=2071&auto=format&fit=crop'
  };
  const monthlyRevenueData = creatorId ? generateMonthlyPerformanceData(creatorId) : [];
  const openInvestModal = () => {
    if (!isAuthenticated) {
      navigate(`/login?returnTo=${encodeURIComponent(location.pathname)}`);
      window.scrollTo(0, 0);
      return;
    }
    setShowInvestModal(true);
  };
  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter pour investir");
      return;
    }
    const amount = Number(investmentAmount);
    if (isNaN(amount) || amount < 100) {
      toast.error("Le montant minimum d'investissement est de 100€");
      return;
    }
    setLoading(true);
    try {
      console.log("Début du processus d'investissement...");
      console.log("Solde utilisateur:", userBalance, "Montant à investir:", amount);
      if (userBalance >= amount) {
        console.log("Solde suffisant, investissement direct");
        await createInvestment(creatorId!, amount, creatorProfile?.returnRate || 0);
        toast.success(`Investissement de ${amount}€ effectué avec succès !`);
        setShowInvestModal(false);
        setInvestmentAmount('');
        queryClient.invalidateQueries({
          queryKey: ['userBalance', user?.id]
        });
        queryClient.invalidateQueries({
          queryKey: ['userInvestments']
        });
        return;
      }
      console.log("Solde insuffisant, redirection vers Stripe");
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Session utilisateur expirée");
      }
      toast.info("Redirection vers le paiement...");
      const response = await fetch("https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/create-payment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cXNndnlwcnR0ZmNweW9mZ250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MDIyNzQsImV4cCI6MjA1ODA3ODI3NH0.Tdl-ViV44yvnpIXEisYsHcWFCnkBd2yvmuIiudGAVlY'
        },
        body: JSON.stringify({
          amount: amount,
          userId: user.id,
          returnUrl: `${window.location.origin}/creator/${creatorId}?investment_success=true`,
          creatorId: creatorId,
          returnRate: creatorProfile?.returnRate || 0
        })
      });
      const data = await response.json();
      console.log("Réponse de l'API de paiement:", data);
      if (!response.ok && !data.url) {
        throw new Error(data.error || "Une erreur est survenue lors de la création du paiement");
      }
      const paymentUrl = data.url;
      console.log("Redirection vers:", paymentUrl);
      toast.success("Redirection vers la page de paiement...");
      setShowInvestModal(false);
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Erreur lors de la création du paiement:", error);
      toast.error("Erreur lors de la création du paiement. Vous allez être redirigé vers notre page de paiement alternative.", {
        duration: 5000
      });
      setTimeout(() => {
        window.location.href = "https://buy.stripe.com/bIY28x2vDcyR97G5kl";
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto my-0 py-[8px] px-px">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" onClick={() => {
          navigate(-1);
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 100);
        }}>
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Button>
        </div>

        {/* Header Section with White Background */}
        <section className="bg-white dark:bg-gray-800 pb-8">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image - Centered on mobile, left on desktop */}
              <FadeIn direction="up">
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-xl border-4 border-gray-200">
                  <img src={creator.imageUrl} alt={creatorProfile.name} className="w-full h-full object-cover" onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://api.dicebear.com/7.x/lorelei/svg?seed=${creatorProfile.id}`;
                }} />
                </div>
              </FadeIn>
              
              {/* Profile Info */}
              <FadeIn direction="up" delay={100} className="flex-grow w-full md:w-auto">
                <div className="text-center md:text-left w-full">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-2 break-words">
                    {creatorProfile.name}
                  </h1>
                  <div className="text-xl md:text-3xl font-bold text-black dark:text-white mb-4">
                    {(creatorProfile.monthlyRevenue / 1000).toFixed(2)} k€
                  </div>
                  
                  {/* Variation Badge */}
                  {(() => {
                  const variation = getLastVariation(creatorId || '');
                  const isNegative = variation < 0;
                  return <div className="flex justify-center md:justify-start items-center gap-2 mb-6">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
                          {isNegative ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                          <span className="font-semibold">{variation.toFixed(2)}% (Tout)</span>
                        </div>
                      </div>;
                })()}
                  
                  {/* Invest Button */}
                  <div className="w-full flex justify-center md:justify-start">
                    <Button onClick={openInvestModal} className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 md:px-8 py-3 rounded-lg shadow-lg transition-all duration-300 text-sm md:text-base max-w-xs md:max-w-none">
                      ACHETER {creatorProfile.name.length > 8 ? creatorProfile.name.substring(0, 8).toUpperCase() + '...' : creatorProfile.name.toUpperCase()}
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Performance Chart Section - Full Width */}
        <section className="py-8 bg-white dark:bg-gray-800 w-full">
          <div className="w-full px-0">
            <div className="bg-white dark:bg-gray-800 w-full">
              <div className="h-80 w-full pl-4 pr-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRevenueData} margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 20
                }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{
                    fontSize: 12,
                    fill: '#666'
                  }} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={value => `${Math.floor(value / 1000)}k€`} tick={{
                    fontSize: 12,
                    fill: '#666'
                  }} width={40} />
                    <Tooltip formatter={value => [`${value}€`, 'Revenu']} labelFormatter={label => `Mois: ${label}`} contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{
                    r: 4,
                    fill: '#3b82f6'
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-2 md:gap-8">
              {/* Market Cap */}
              <FadeIn direction="up" className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <CircleDollarSign className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-black dark:text-white">
                    {(creator.totalInvested / 1000).toFixed(2)} k €
                  </div>
                  <div className="text-sm text-gray-500">Market Cap</div>
                </div>
              </FadeIn>

              {/* Instant Liquidity */}
              <FadeIn direction="up" delay={100} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-black dark:text-white">
                    {(creator.totalInvested * 0.2 / 1000).toFixed(2)} k €
                  </div>
                  <div className="text-sm text-gray-500">Instant Liquidity</div>
                </div>
              </FadeIn>

              {/* Yield */}
              <FadeIn direction="up" delay={200} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-black dark:text-white">
                    {(creatorProfile.returnRate / 10).toFixed(2)} %
                  </div>
                  <div className="text-sm text-gray-500">Yield</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              <button className="py-2 px-4 border-b-2 border-black font-medium text-black dark:text-white">
                À propos
              </button>
              <button className="py-2 px-4 text-gray-500 hover:text-black dark:hover:text-white">
                ROY
              </button>
              <button className="py-2 px-4 text-gray-500 hover:text-black dark:hover:text-white">
                Actu
              </button>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {creatorProfile.description || `${creatorProfile.name} est une créatrice de contenu lifestyle 
                  passionnée qui a su construire une communauté fidèle grâce à son authenticité et sa créativité. 
                  Avec ${creatorProfile.followers.toLocaleString()} abonnés, elle continue d'évoluer et d'innover 
                  dans son domaine, offrant des opportunités d'investissement attractives pour ses partenaires.`}
                </p>
                
                {/* Creator Info */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nom complet</span>
                    <span className="font-medium">{creatorProfile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date d'introduction</span>
                    <span className="font-medium">22/11/2022, 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Instagram</span>
                    <span className="font-medium flex items-center gap-2">
                      {(creatorProfile.followers / 1000000).toFixed(2)}M Followers
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 px-[100px] text-yellow-300">Statistiques</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Investisseurs actifs</span>
                      <span className="font-medium">{creator.investorsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Revenu mensuel</span>
                      <span className="font-medium">{creatorProfile.monthlyRevenue.toLocaleString()} €</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Rendement annuel</span>
                      <span className="font-medium text-green-600">{creatorProfile.returnRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Catégorie</span>
                      <span className="font-medium">Lifestyle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Créatrices similaires
            </h2>
            <ScrollArea className="h-[300px] rounded-md border dark:bg-gray-900">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {creators.slice(0, 4).map(creator => <Link to={`/creator/${creator.id}`} key={creator.id}>
                    <div className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img src={creator.imageUrl} alt={creator.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm">{creator.name}</h4>
                          <span className="text-sm font-semibold">{creator.returnRate}%</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {creator.investorsCount} Investisseurs
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>)}
              </div>
            </ScrollArea>
          </div>
        </section>
      </main>

      {/* Investment Modal */}
      {showInvestModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Investir dans {creatorProfile.name}</h3>
            
            <form onSubmit={handleInvest}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Durée d'investissement</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(investmentOptions).map(([key, option]) => <button key={key} type="button" onClick={() => setSelectedDuration(key as any)} className={`p-3 rounded-lg border text-sm ${selectedDuration === key ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary'}`}>
                      {option.label}
                      <div className="text-xs opacity-75">+{option.returnRate}%</div>
                    </button>)}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Montant (€)</label>
                <input type="number" min="100" step="50" value={investmentAmount} onChange={e => setInvestmentAmount(e.target.value)} placeholder="Montant minimum: 100€" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none" required />
              </div>

              {estimatedReturn > 0 && <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-sm text-green-800 dark:text-green-300">
                    Gain estimé: <span className="font-bold">{estimatedReturn.toFixed(2)}€</span>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    Total à recevoir: {(Number(investmentAmount) + estimatedReturn).toFixed(2)}€
                  </div>
                </div>}

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setShowInvestModal(false)} className="flex-1">
                  Annuler
                </Button>
                <Button type="submit" disabled={loading || !investmentAmount || Number(investmentAmount) < 100 || !isAuthenticated} className="flex-1 bg-primary hover:bg-primary/90">
                  {loading ? 'Traitement...' : 'Investir maintenant'}
                </Button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default CreatorDetails;