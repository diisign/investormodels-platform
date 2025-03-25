
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, CircleDollarSign, TrendingUp, Users, 
  Calendar, ArrowRight, Twitter, Instagram, Youtube,
  ArrowLeft
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GradientButton from '@/components/ui/GradientButton';
import FadeIn from '@/components/animations/FadeIn';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { creators, investInCreator } from '@/utils/mockData';
import { useAuth } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import OnlyfansRevenueChart from '@/components/charts/OnlyfansRevenueChart';

// Generate deterministic return rates based on creator ID
const getExpectedReturnRate = (creatorId: string): number => {
  // Use the last character of creatorId to generate a deterministic value
  const lastChar = creatorId.charAt(creatorId.length - 1);
  const charCode = lastChar.charCodeAt(0);
  
  // Map the character code to a number between 80 and 130
  return 80 + (charCode % 51);
};

const CreatorDetails = () => {
  const { creatorId } = useParams<{ creatorId: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  
  // Find the creator data
  const creator = creators.find(c => c.id === creatorId);
  
  // Get deterministic expected return rate
  const expectedReturnRate = creatorId ? getExpectedReturnRate(creatorId) : 100;
  
  // Calculate followers based on monthly revenue
  const calculatedFollowers = creator ? Math.round(creator.monthlyRevenue / 15) : 0;
  
  if (!creator) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={isAuthenticated} />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Créateur non trouvé</h1>
            <p className="mb-6">Le créateur que vous cherchez n'existe pas ou a été supprimé.</p>
            <Link to="/creators">
              <GradientButton>
                Retour à la liste des créateurs
              </GradientButton>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Create revenue data for the chart - last month is March
  const monthlyRevenueData = [
    { month: 'Avr', revenue: Math.round(creator.monthlyRevenue * 0.7) },
    { month: 'Mai', revenue: Math.round(creator.monthlyRevenue * 0.75) },
    { month: 'Juin', revenue: Math.round(creator.monthlyRevenue * 0.8) },
    { month: 'Juil', revenue: Math.round(creator.monthlyRevenue * 0.85) },
    { month: 'Août', revenue: Math.round(creator.monthlyRevenue * 0.9) },
    { month: 'Sep', revenue: Math.round(creator.monthlyRevenue * 0.95) },
    { month: 'Oct', revenue: Math.round(creator.monthlyRevenue * 1.0) },
    { month: 'Nov', revenue: Math.round(creator.monthlyRevenue * 1.05) },
    { month: 'Déc', revenue: Math.round(creator.monthlyRevenue * 1.1) },
    { month: 'Jan', revenue: Math.round(creator.monthlyRevenue * 1.15) },
    { month: 'Fév', revenue: Math.round(creator.monthlyRevenue * 1.2) },
    { month: 'Mar', revenue: Math.round(creator.monthlyRevenue * 1.25) },
  ];
  
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
      // Use a default plan since we're removing plans
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
      {/* Navbar */}
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        {/* Back Button */}
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

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-investment-600 to-investment-700 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={creator.coverImageUrl} 
              alt={creator.name} 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
              <FadeIn direction="up">
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white overflow-hidden shadow-xl">
                  <img 
                    src={creator.imageUrl} 
                    alt={creator.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={100} className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{creator.name}</h1>
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-investment-200" />
                    <span>{calculatedFollowers.toLocaleString()} followers</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-investment-200" />
                    <span>Depuis {new Date(creator.creationDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                  </div>
                  <div className="flex items-center">
                    <CircleDollarSign className="h-5 w-5 mr-2 text-investment-200" />
                    <span>{creator.totalInvested.toLocaleString()}€ investis</span>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={200} className="flex gap-3 mt-4 md:mt-0">
                <a 
                  href="#" 
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Performance */}
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
                            tickFormatter={(value) => `${value / 1000}k€`}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}€`, 'Revenu']} 
                            labelFormatter={(label) => `Mois: ${label}`}
                          />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            dot={{ r: 0 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </FadeIn>
                
                {/* Key Stats */}
                <FadeIn direction="up" delay={200} className="glass-card">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Statistiques clés</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                            <Users className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Investisseurs</span>
                        </div>
                        <div className="text-2xl font-bold">{creator.investorsCount}</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-3">
                            <TrendingUp className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Rendement prévu</span>
                        </div>
                        <div className="text-2xl font-bold">{expectedReturnRate}%</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-investment-100 dark:bg-investment-900/30 text-investment-600 dark:text-investment-400 mr-3">
                            <BarChart3 className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenu mensuel</span>
                        </div>
                        <div className="text-2xl font-bold">{creator.monthlyRevenue.toLocaleString()}€</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
              
              {/* Right Column */}
              <div className="space-y-8">
                {/* Investment Section */}
                <FadeIn direction="up" className="glass-card">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Investir</h2>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg">Soutenir {creator.name}</h3>
                        <div className="flex items-center mt-2">
                          <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {expectedReturnRate}% de rendement prévu
                          </span>
                        </div>
                      </div>
                      
                      <GradientButton 
                        fullWidth 
                        size="lg"
                        onClick={openInvestModal}
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
                
                {/* Similar Creators */}
                <FadeIn direction="up" delay={100} className="glass-card">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Créateurs similaires</h2>
                    <div className="space-y-4">
                      {creators
                        .filter(c => c.id !== creator.id)
                        .slice(0, 3)
                        .map((similarCreator) => {
                          const similarExpectedReturnRate = getExpectedReturnRate(similarCreator.id);
                          const similarFollowers = Math.round(similarCreator.monthlyRevenue / 15);
                          
                          return (
                            <Link 
                              key={similarCreator.id}
                              to={`/creator/${similarCreator.id}`}
                              className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-investment-300 dark:hover:border-investment-600 transition-colors"
                            >
                              <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={similarCreator.imageUrl} 
                                  alt={similarCreator.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium">{similarCreator.name}</h4>
                                  <span className="text-xs font-medium text-green-500 flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {similarExpectedReturnRate}%
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {similarFollowers.toLocaleString()} followers
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
                        <span>Voir tous les créateurs</span>
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
      
      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <FadeIn className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Confirmer votre investissement</h2>
            
            <form onSubmit={handleInvest}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="creator" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Créateur
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
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Solde disponible:</span>
                    <span className="font-medium">{user?.balance || 0}€</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Montant d'investissement:</span>
                    <span className="font-medium">{investmentAmount || 0}€</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Solde après investissement:</span>
                    <span className="font-medium">{(user?.balance || 0) - Number(investmentAmount || 0)}€</span>
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
                    disabled={loading || !investmentAmount || Number(investmentAmount) <= 0 || !user || Number(investmentAmount) > user.balance}
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
