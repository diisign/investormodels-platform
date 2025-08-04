import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BarChart3, CircleDollarSign, TrendingUp, Users, Calendar, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from "sonner";
import { creators, investInCreator } from '@/utils/mockData';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { getCreatorProfile, generateMonthlyPerformanceData, creatorProfiles, calculateTotalInvested, getCreatorRanking } from '@/utils/creatorProfiles';
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
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [estimatedReturn, setEstimatedReturn] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<'1' | '3' | '6' | '12'>('3');
  const queryClient = useQueryClient();
  const mockCreator = creators.find(c => c.id === creatorId);
  const profileExists = creatorId && creatorProfiles[creatorId];
  const creatorProfile = creatorId ? getCreatorProfile(creatorId) : null;

  // Debug logging for Kayla specifically
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

  // Scroll to top when creator changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [creatorId]);
  // Options d'investissement avec leurs rendements
  const investmentOptions = {
    '1': { label: '1 mois', returnRate: 15 },
    '3': { label: '3 mois', returnRate: 60 },
    '6': { label: '6 mois', returnRate: 150 },
    '12': { label: '12 mois', returnRate: 400 }
  };

  useEffect(() => {
    if (investmentAmount && selectedDuration) {
      const investmentValue = parseFloat(investmentAmount);
      const returnRate = investmentOptions[selectedDuration].returnRate;

      // Calcul du gain basé sur le taux de rendement total pour la période
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
        <Footer />
      </div>;
  }
  const creator = mockCreator || {
    id: creatorProfile.id,
    name: creatorProfile.name,
    imageUrl: creatorProfile.imageUrl || `https://api.dicebear.com/7.x/lorelei/svg?seed=${creatorProfile.id}`,
    category: "Lifestyle",
    returnRate: creatorProfile.returnRate / 10,
    investorsCount: Math.floor(creatorProfile.followers / 15),
    totalInvested: calculateTotalInvested(creatorProfile.monthlyRevenue),
    monthlyRevenue: creatorProfile.monthlyRevenue,
    followers: creatorProfile.followers,
    creationDate: new Date(Date.now() - Math.random() * 126144000000).toISOString(),
    coverImageUrl: 'https://images.unsplash.com/photo-1579762593131-b8945254345c?q=80&w=2071&auto=format&fit=crop'
  };
  const monthlyRevenueData = creatorId ? generateMonthlyPerformanceData(creatorId) : [];
  const openInvestModal = () => {
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter pour investir");
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

      // Vérifier si l'utilisateur a assez de solde pour investir directement
      if (userBalance >= amount) {
        console.log("Solde suffisant, investissement direct");

        // Investir directement depuis le solde
        await createInvestment(creatorId!, amount, creatorProfile?.returnRate || 0);
        toast.success(`Investissement de ${amount}€ effectué avec succès !`);

        // Fermer le modal
        setShowInvestModal(false);
        setInvestmentAmount('');

        // Actualiser les données
        queryClient.invalidateQueries({
          queryKey: ['userBalance', user?.id]
        });
        queryClient.invalidateQueries({
          queryKey: ['userInvestments']
        });
        return;
      }

      // Si le solde n'est pas suffisant, rediriger vers Stripe
      console.log("Solde insuffisant, redirection vers Stripe");

      // Obtenir la session et le token
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Session utilisateur expirée");
      }

      // Afficher un message informatif pour l'utilisateur
      toast.info("Redirection vers le paiement...");

      // Appel à la fonction Edge Supabase pour créer le paiement
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

      // Rediriger vers la page de paiement Stripe
      const paymentUrl = data.url;
      console.log("Redirection vers:", paymentUrl);
      toast.success("Redirection vers la page de paiement...");

      // Fermer le modal avant la redirection
      setShowInvestModal(false);

      // Rediriger vers la page de paiement Stripe
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Erreur lors de la création du paiement:", error);

      // En cas d'erreur, proposer l'URL fixe comme solution de secours
      toast.error("Erreur lors de la création du paiement. Vous allez être redirigé vers notre page de paiement alternative.", {
        duration: 5000
      });

      // Attendre que l'utilisateur voie le message d'erreur puis rediriger
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
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Button>
        </div>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-white opacity-95"></div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 text-white">
              <FadeIn direction="up">
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white overflow-hidden shadow-xl">
                  <img src={creator.imageUrl} alt={creatorProfile.name} className="w-full h-full object-cover" onError={e => {
                  const target = e.target as HTMLImageElement;
                  console.log(`CreatorDetails - Image failed to load for ${creatorProfile.name}:`, creator.imageUrl);
                  target.src = `https://api.dicebear.com/7.x/lorelei/svg?seed=${creatorProfile.id}`;
                }} onLoad={() => {
                  if (creatorId === 'creator3') {
                    console.log(`CreatorDetails - Image loaded successfully for Kayla:`, creator.imageUrl);
                  }
                }} />
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={100} className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{creatorProfile.name}</h1>
              </FadeIn>
            </div>
            
            <div className="mt-6">
              <ActiveInvestors creatorId={creatorId || ''} />
            </div>
          </div>
        </section>
        
        {/* Statistiques - Section entre dégradé et performance */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <FadeIn direction="up" delay={200}>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-gray-700 dark:text-gray-300">{creator.investorsCount} investisseurs</span>
                </div>
                <div className="flex items-center">
                  <img src="/lovable-uploads/524b83a2-faac-4024-b292-0aacd341b37c.png" alt="Followers" className="h-5 w-5 mr-2" style={{
                  filter: 'brightness(0) saturate(100%) invert(66%) sepia(76%) saturate(1392%) hue-rotate(5deg) brightness(103%) contrast(103%)'
                }} />
                  <span className="text-gray-700 dark:text-gray-300">{creatorProfile.followers.toLocaleString() || 0} followers</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-gray-700 dark:text-gray-300">Depuis {new Date(creator.creationDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}</span>
                </div>
                <div className="flex items-center">
                  <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-gray-700 dark:text-gray-300">{creator.totalInvested.toLocaleString()}€ investis</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Performance des revenus - Section pleine largeur */}
        <section className="py-[19px] w-full border-t border-b border-gray-200 dark:border-gray-700">
          <div className="w-full">
            <FadeIn direction="up">
              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center">Performance des revenus</h2>
                <div className="h-72 bg-white dark:bg-gray-800 p-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenueData} margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5
                  }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={value => `${Math.floor(value / 1000)}k€`} domain={[dataMin => Math.floor(dataMin / 10000) * 10000, dataMax => Math.ceil(dataMax / 10000) * 10000]} tickCount={5} />
                      <Tooltip formatter={value => [`${value}€`, 'Revenu']} labelFormatter={label => `Mois: ${label}`} />
                      <defs>
                        <linearGradient id="revenueColorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} dot={{
                      r: 0
                    }} activeDot={{
                      r: 6,
                      strokeWidth: 0,
                      fill: "#8B5CF6"
                    }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        
        <section className="py-[19px]">
          <div className="container mx-auto px-4 space-y-16">
            
            {/* Statistiques clés - Section 2 */}
            <FadeIn direction="up" delay={200}>
              <div></div>
            </FadeIn>
            
            {/* Investir - Section 3 */}
            <FadeIn direction="up" delay={300} className="mx-0 my-0">
              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-6">Investir</h2>
                <div className="max-w-md mx-auto">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg">Soutenir {creatorProfile?.name || creator.name}</h3>
                    </div>
                    
                    <GradientButton fullWidth size="lg" onClick={openInvestModal} variant="primary" gradientDirection="to-r" className="bg-primary text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300">
                      Investir maintenant
                    </GradientButton>
                  </div>
                  
                  {!isAuthenticated && <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      <span>Vous devez être connecté pour investir.</span>
                      <div className="mt-2 flex justify-center space-x-3">
                        <Link to="/login" className="text-yellow-300 hover:text-yellow-400 font-medium">
                          Se connecter
                        </Link>
                        <span>ou</span>
                        <Link to="/register" className="text-yellow-300 hover:text-yellow-400 font-medium">
                          S'inscrire
                        </Link>
                      </div>
                    </div>}
                </div>
              </div>
            </FadeIn>
            
            {/* Créatrices similaires - Section 4 avec ScrollArea */}
            <FadeIn direction="up" delay={400}>
              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-6">Créatrices similaires</h2>
                <ScrollArea className="h-96 w-full rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="p-4 space-y-4">
                    {creators.map(similarCreator => {
                    const similarProfile = getCreatorProfile(similarCreator.id);
                    return <Link key={similarCreator.id} to={`/creator/${similarCreator.id}`} className="flex items-center p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary transition-colors block">
                          <div className="h-16 w-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                            <img src={similarCreator.imageUrl} alt={similarProfile.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="font-medium truncate">{similarProfile.name}</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {similarCreator.investorsCount} investisseurs
                            </div>
                            <div className="text-sm text-primary mt-1">
                              {similarProfile.returnRate}% rendement
                            </div>
                          </div>
                        </Link>;
                  })}
                  </div>
                </ScrollArea>
                
                <div className="mt-6 text-center">
                  <Link to="/creators" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center">
                    <span>Voir toutes les créatrices</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      {showInvestModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <FadeIn className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Confirmer votre investissement</h2>
            
            <form onSubmit={handleInvest}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="creator" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Créatrice
                  </label>
                  <input type="text" id="creator" value={creator.name} className="input-field bg-gray-50 dark:bg-gray-700 pointer-events-none" readOnly />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Durée d'investissement
                  </label>
                  <select 
                    id="duration" 
                    value={selectedDuration} 
                    onChange={e => setSelectedDuration(e.target.value as '1' | '3' | '6' | '12')}
                    className="input-field"
                  >
                    {Object.entries(investmentOptions).map(([key, option]) => (
                      <option key={key} value={key}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Montant (€)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CircleDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="number" id="amount" value={investmentAmount} onChange={e => setInvestmentAmount(e.target.value)} min={100} step="1" className="input-field pl-10" required />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Montant minimum : 100€
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border border-black dark:border-black bg-slate-50">
                  <h3 className="text-sm font-medium mb-2 text-yellow-300">Estimation du rendement ({investmentOptions[selectedDuration].label})</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Somme investie:</span>
                    <span className="font-medium">{investmentAmount || '0'}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Gains estimés:</span>
                    <span className="font-medium text-yellow-300">{estimatedReturn.toFixed(2)}€</span>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowInvestModal(false)} className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Annuler
                  </button>
                  <GradientButton type="submit" variant="primary" gradientDirection="to-r" className="bg-primary text-primary-foreground shadow-xl hover:shadow-lg transition-all duration-300" disabled={loading || !investmentAmount || Number(investmentAmount) < 100 || !user}>
                    {loading ? 'Redirection...' : 'Investir maintenant'}
                  </GradientButton>
                </div>
              </div>
            </form>
          </FadeIn>
        </div>}
      
      <Footer />
    </div>;
};
export default CreatorDetails;