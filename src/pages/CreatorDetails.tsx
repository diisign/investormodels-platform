
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, CircleDollarSign, TrendingUp, Users, 
  Calendar, ArrowRight, ArrowLeft
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from "sonner";
import { creators, investInCreator } from '@/utils/mockData';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { getCreatorProfile, generateMonthlyPerformanceData, creatorProfiles, calculateTotalInvested } from '@/utils/creatorProfiles';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const CreatorDetails = () => {
  const { creatorId } = useParams<{ creatorId: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [estimatedReturn, setEstimatedReturn] = useState<number>(0);
  
  const mockCreator = creators.find(c => c.id === creatorId);
  
  const profileExists = creatorId && creatorProfiles[creatorId];
  
  const creatorProfile = creatorId ? getCreatorProfile(creatorId) : null;
  
  const creatorExists = !!mockCreator || !!profileExists;
  
  const { data: userBalance = 0 } = useQuery({
    queryKey: ['userBalance', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      try {
        console.log('Récupération du solde pour l\'utilisateur:', user.id);
        
        const { data, error } = await supabase
          .from('transactions')
          .select('amount, status')
          .eq('user_id', user.id)
          .eq('status', 'completed');
        
        if (error) {
          console.error('Erreur lors de la récupération des transactions:', error);
          throw error;
        }
        
        console.log('Transactions récupérées:', data);
        
        const total = data && data.length > 0 
          ? data.reduce((sum, transaction) => sum + Number(transaction.amount), 0) 
          : 0;
        
        console.log('Solde calculé:', total);
        return total;
      } catch (error) {
        console.error('Erreur lors de la récupération du solde:', error);
        return 0;
      }
    },
    enabled: !!user && isAuthenticated,
    refetchOnWindowFocus: true,
  });
  
  useEffect(() => {
    if (creatorProfile && investmentAmount) {
      // Correction du calcul du rendement estimé
      const returnRate = creatorProfile.returnRate / 100;  // Convertir pourcentage en décimal
      const investmentValue = parseFloat(investmentAmount);
      // Rendement sur 3 mois = montant investi * taux de rendement annuel / 4 (trimestre)
      const threeMonthReturn = investmentValue * (returnRate / 4);
      setEstimatedReturn(threeMonthReturn);
    } else {
      setEstimatedReturn(0);
    }
  }, [investmentAmount, creatorProfile]);
  
  if (!creatorExists || !creatorProfile) {
    return (
      <div className="min-h-screen flex flex-col">
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
      </div>
    );
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
    if (isNaN(amount) || amount <= 0) {
      toast.error("Veuillez entrer un montant valide");
      return;
    }
    
    setLoading(true);
    
    try {
      await investInCreator(creator.id, "default", amount);
      toast.success(`Investissement de ${amount}€ réalisé avec succès!`);
      setShowInvestModal(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'investissement");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Button>
        </div>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] opacity-95"></div>
          <div className="absolute -top-[10%] -right-[10%] z-0 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-investment-200/10 to-investment-400/5 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -left-[10%] z-0 h-[300px] w-[300px] rounded-full bg-gradient-to-l from-investment-200/20 to-investment-300/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 text-white">
              <FadeIn direction="up">
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white overflow-hidden shadow-xl">
                  <img 
                    src={creator.imageUrl} 
                    alt={creatorProfile.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://api.dicebear.com/7.x/lorelei/svg?seed=${creatorProfile.id}`;
                    }}
                  />
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={100} className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{creatorProfile.name}</h1>
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-500" />
                    <span>{creatorProfile.followers.toLocaleString() || 0} followers</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                    <span>Depuis {new Date(creator.creationDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                  </div>
                  <div className="flex items-center">
                    <CircleDollarSign className="h-5 w-5 mr-2 text-purple-500" />
                    <span>{creator.totalInvested.toLocaleString()}€ investis</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <FadeIn direction="up" className="glass-card">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Performance des revenus</h2>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={monthlyRevenueData}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tickFormatter={(value) => `${Math.floor(value / 1000)}k€`}
                            domain={[
                              (dataMin) => Math.floor(dataMin / 10000) * 10000, 
                              (dataMax) => Math.ceil(dataMax / 10000) * 10000
                            ]}
                            tickCount={5}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}€`, 'Revenu']} 
                            labelFormatter={(label) => `Mois: ${label}`}
                          />
                          <defs>
                            <linearGradient id="revenueColorGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8B5CF6"
                            strokeWidth={3}
                            dot={{ r: 0 }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: "#8B5CF6" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn direction="up" delay={200} className="glass-card">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Statistiques clés</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                            <Users className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Investisseurs</span>
                        </div>
                        <div className="text-2xl font-bold">{creator.investorsCount}</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendement prévu</span>
                        </div>
                        <div className="text-2xl font-bold">{creatorProfile?.returnRate || 0}%</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                            <BarChart3 className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenu mensuel</span>
                        </div>
                        <div className="text-2xl font-bold">{creatorProfile?.monthlyRevenue.toLocaleString() || 0}€</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
              
              <div className="space-y-8">
                <FadeIn direction="up" className="glass-card">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Investir</h2>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg">Soutenir {creatorProfile?.name || creator.name}</h3>
                        <div className="flex items-center mt-2">
                          <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {creatorProfile?.returnRate || 0}% de rendement prévu
                          </span>
                        </div>
                      </div>
                      
                      <GradientButton 
                        fullWidth 
                        size="lg"
                        onClick={openInvestModal}
                        variant="primary"  // Assurons-nous d'utiliser le variant primary
                      >
                        Investir maintenant
                      </GradientButton>
                    </div>
                    
                    {!isAuthenticated && (
                      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        <span>Vous devez être connecté pour investir.</span>
                        <div className="mt-2 flex justify-center space-x-3">
                          <Link to="/login" className="text-investment-600 hover:text-investment-500 font-medium">
                            Se connecter
                          </Link>
                          <span>ou</span>
                          <Link to="/register" className="text-investment-600 hover:text-investment-500 font-medium">
                            S'inscrire
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </FadeIn>
                
                <FadeIn direction="up" delay={100} className="glass-card">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Créatrices similaires</h2>
                    <div className="space-y-4">
                      {creators
                        .filter(c => c.id !== creator.id)
                        .slice(0, 3)
                        .map((similarCreator) => {
                          const similarProfile = getCreatorProfile(similarCreator.id);
                          return (
                            <Link 
                              key={similarCreator.id}
                              to={`/creator/${similarCreator.id}`}
                              className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-investment-300 dark:hover:border-investment-600 transition-colors"
                            >
                              <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={similarCreator.imageUrl} 
                                  alt={similarProfile.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium">{similarProfile.name}</h4>
                                  <span className="text-xs font-medium text-green-500 flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {similarProfile.returnRate}%
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {similarCreator.investorsCount} investisseurs
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                    
                    <div className="mt-4">
                      <Link 
                        to="/creators" 
                        className="text-investment-600 hover:text-investment-500 text-sm font-medium flex items-center justify-center"
                      >
                        <span>Voir toutes les créatrices</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {showInvestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <FadeIn className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Confirmer votre investissement</h2>
            
            <form onSubmit={handleInvest}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="creator" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Créatrice
                  </label>
                  <input
                    type="text"
                    id="creator"
                    value={creator.name}
                    className="input-field bg-gray-50 dark:bg-gray-700 pointer-events-none"
                    readOnly
                  />
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Montant (€)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CircleDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="amount"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      min={50}
                      step="10"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Montant minimum: 50€
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
                  <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">Estimation du rendement (3 mois)</h3>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Taux de rendement:</span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">{creatorProfile?.returnRate || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Gains estimés (3 mois):</span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">{estimatedReturn.toFixed(2)}€</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Solde disponible:</span>
                    <span className="font-medium">{userBalance.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Montant d'investissement:</span>
                    <span className="font-medium">{investmentAmount || 0}€</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Solde après investissement:</span>
                    <span className="font-medium">{(userBalance - Number(investmentAmount || 0)).toFixed(2)}€</span>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInvestModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Annuler
                  </button>
                  <GradientButton 
                    type="submit"
                    variant="primary"  // Utilisons le variant primary
                    disabled={loading || !investmentAmount || Number(investmentAmount) <= 0 || !user || Number(investmentAmount) > userBalance}
                  >
                    {loading ? 'Traitement...' : 'Confirmer l\'investissement'}
                  </GradientButton>
                </div>
              </div>
            </form>
          </FadeIn>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CreatorDetails;
