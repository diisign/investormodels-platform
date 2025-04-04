
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { 
  ArrowUpRight, Users, TrendingUp, CircleDollarSign, Calendar, BarChart2, Activity
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '@/components/layout/Navbar';
import GradientButton from '@/components/ui/GradientButton';
import { useAuth } from '@/utils/auth';
import { Separator } from '@/components/ui/separator';

// Generating random example data - no real database connection
const generateMonthlyData = (months = 12, baseValue = 1000, growth = 0.05, volatility = 0.2) => {
  const data = [];
  let value = baseValue;

  for (let i = 0; i < months; i++) {
    // Calculate month name
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    const monthName = date.toLocaleString('fr-FR', { month: 'short' });
    
    // Random growth with some volatility
    const randomFactor = 1 + (Math.random() * volatility - volatility/2);
    value = value * (1 + growth * randomFactor);
    
    data.push({
      name: monthName,
      earnings: Math.round(value),
      investments: Math.round(value * 0.8),
      returns: Math.round(value * 0.2),
    });
  }
  return data;
};

const generateCreatorData = (count = 5) => {
  const creators = [];
  const names = [
    'Sophia Dubois', 'Emma Martin', 'Julie Leroy', 
    'Camille Bernard', 'Léa Petit', 'Manon Thomas',
    'Clara Durand', 'Chloé Moreau', 'Jade Lefebvre'
  ];
  
  const domains = [
    'Mode et beauté', 'Fitness', 'Lifestyle', 'Voyage', 
    'Gastronomie', 'Art et design', 'Bien-être'
  ];
  
  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomFollowers = Math.floor(Math.random() * 900000) + 100000;
    const randomInvestment = (Math.floor(Math.random() * 45) + 5) * 100;
    const randomReturn = randomInvestment * (1 + (Math.random() * 0.5 + 0.2));
    
    creators.push({
      id: `creator-${i+1}`,
      name: randomName,
      domain: randomDomain,
      followers: randomFollowers,
      invested: randomInvestment,
      returns: Math.round(randomReturn),
      roi: Math.round((randomReturn / randomInvestment - 1) * 100) 
    });
  }
  
  return creators;
};

const generateReferralData = (count = 8) => {
  const referrals = [];
  const names = [
    'Thomas D.', 'Nicolas L.', 'Alexandre M.', 
    'Julien P.', 'Hugo B.', 'Antoine R.',
    'Mathieu F.', 'Lucas K.', 'Gabriel S.',
    'Maxime T.', 'Romain G.', 'Simon H.'
  ];
  
  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 60));
    const randomInvestment = Math.random() > 0.3 ? (Math.floor(Math.random() * 20) + 5) * 100 : 0;
    const randomStatus = randomInvestment > 0 ? 'Actif' : 'En attente';
    const randomCommission = randomInvestment * 0.08;
    
    referrals.push({
      id: `ref-${i+1}`,
      name: randomName,
      date: randomDate.toLocaleDateString('fr-FR'),
      investment: randomInvestment,
      status: randomStatus,
      commission: Math.round(randomCommission)
    });
  }
  
  return referrals;
};

// Pie chart data for portfolio allocation
const portfolioData = [
  { name: 'Mode & Beauté', value: 35 },
  { name: 'Fitness', value: 25 },
  { name: 'Lifestyle', value: 20 },
  { name: 'Autres', value: 20 },
];

// Color palette for charts
const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'];

const Examples = () => {
  const { isAuthenticated } = useAuth();
  const monthlyData = generateMonthlyData();
  const yearlyData = generateMonthlyData(5, 12000, 0.08, 0.15);
  const creatorData = generateCreatorData();
  const referralData = generateReferralData();
  
  // Random key figures
  const totalInvestment = 16500;
  const totalEarnings = 21450;
  const totalReturn = Math.round((totalEarnings / totalInvestment - 1) * 100);
  const activeCreators = 7;
  const totalReferrals = 14;
  const activeReferrals = 8;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="creator-gradient">Exemples</span> de Tableaux de Bord
          </h1>
          <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">
            Visualisez le potentiel de votre investissement avec nos exemples interactifs
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/register">
              <GradientButton 
                variant="primary" 
                size="lg"
                className="mr-4"
              >
                Inscrivez-vous
              </GradientButton>
            </Link>
            <Link to="/creators">
              <GradientButton 
                variant="outline" 
                size="lg"
              >
                Découvrir les créatrices
              </GradientButton>
            </Link>
          </div>
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CircleDollarSign className="mr-2 h-5 w-5 text-investment-500" />
                Investissement Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalInvestment} €</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Réparti sur {activeCreators} créatrices</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Retour sur Investissement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">+{totalReturn}%</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sur les 12 derniers mois</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Affiliations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalReferrals}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activeReferrals} affiliations actives</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-orange-500" />
                Gains Mensuels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{monthlyData[monthlyData.length-1].earnings} €</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +{Math.round((monthlyData[monthlyData.length-1].earnings / monthlyData[monthlyData.length-2].earnings - 1) * 100)}% 
                </span>
                depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly earnings chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-investment-500" />
                Évolution des revenus mensuels
              </CardTitle>
              <CardDescription>Les 12 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip 
                      formatter={(value) => [`${value} €`, 'Revenus']}
                      labelFormatter={(label) => `Mois: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#8B5CF6" 
                      fill="url(#colorEarnings)" 
                      name="Revenus"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Portfolio allocation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-investment-500" />
                Répartition du portefeuille
              </CardTitle>
              <CardDescription>Par catégorie de créatrices</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Répartition']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {portfolioData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-2" 
                      style={{backgroundColor: COLORS[index % COLORS.length]}}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Yearly comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-investment-500" />
                Comparaison annuelle
              </CardTitle>
              <CardDescription>Investissements vs. Rendements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yearlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} €`, '']} />
                    <Legend />
                    <Bar dataKey="investments" name="Investissements" fill="#A78BFA" />
                    <Bar dataKey="returns" name="Rendements" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Growth trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-investment-500" />
                Tendance de croissance
              </CardTitle>
              <CardDescription>Retour sur investissement cumulé</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} €`, '']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      name="Revenus" 
                      stroke="#8B5CF6" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="investments" 
                      name="Investissements" 
                      stroke="#A78BFA" 
                      strokeDasharray="5 5" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Creator Investments Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-investment-500" />
              Vos investissements par créatrice
            </CardTitle>
            <CardDescription>Performance détaillée du portefeuille</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Créatrice</TableHead>
                  <TableHead>Domaine</TableHead>
                  <TableHead>Abonnés</TableHead>
                  <TableHead>Investissement</TableHead>
                  <TableHead>Rendement</TableHead>
                  <TableHead>ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creatorData.map((creator) => (
                  <TableRow key={creator.id}>
                    <TableCell className="font-medium">{creator.name}</TableCell>
                    <TableCell>{creator.domain}</TableCell>
                    <TableCell>{creator.followers.toLocaleString('fr-FR')}</TableCell>
                    <TableCell>{creator.invested} €</TableCell>
                    <TableCell>{creator.returns} €</TableCell>
                    <TableCell className={creator.roi > 0 ? 'text-green-500' : 'text-red-500'}>
                      {creator.roi > 0 ? `+${creator.roi}` : creator.roi}%
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableCell colSpan={3} className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">{creatorData.reduce((acc, creator) => acc + creator.invested, 0)} €</TableCell>
                  <TableCell className="font-bold">{creatorData.reduce((acc, creator) => acc + creator.returns, 0)} €</TableCell>
                  <TableCell className="font-bold text-green-500">
                    +{Math.round((creatorData.reduce((acc, creator) => acc + creator.returns, 0) / 
                    creatorData.reduce((acc, creator) => acc + creator.invested, 0) - 1) * 100)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Referral Program */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-investment-500" />
              Programme d'affiliation
            </CardTitle>
            <CardDescription>Gagnez 8% sur les investissements de vos filleuls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Vos filleuls</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Inscription</TableHead>
                      <TableHead>Investissement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Commission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralData.map((ref) => (
                      <TableRow key={ref.id}>
                        <TableCell className="font-medium">{ref.name}</TableCell>
                        <TableCell>{ref.date}</TableCell>
                        <TableCell>{ref.investment > 0 ? `${ref.investment} €` : '-'}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ref.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ref.status}
                          </span>
                        </TableCell>
                        <TableCell>{ref.commission > 0 ? `${ref.commission} €` : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Statistiques d'affiliation</h3>
                <div className="space-y-4">
                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total des filleuls</p>
                          <p className="text-2xl font-bold">{referralData.length}</p>
                        </div>
                        <Users className="h-8 w-8 text-investment-400" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Filleuls actifs</p>
                          <p className="text-2xl font-bold">
                            {referralData.filter(r => r.status === 'Actif').length}
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total des commissions</p>
                          <p className="text-2xl font-bold">
                            {referralData.reduce((acc, ref) => acc + ref.commission, 0)} €
                          </p>
                        </div>
                        <CircleDollarSign className="h-8 w-8 text-investment-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="creator-gradient-bg hover-scale">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-white">Lien d'affiliation</p>
                          <p className="text-md font-medium text-white mt-1">
                            investormodels.com/?ref=USER123
                          </p>
                        </div>
                        <button className="bg-white text-investment-600 px-3 py-1 rounded text-sm">
                          Copier
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
            <CardDescription>
              Tout ce que vous devez savoir sur le fonctionnement de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment sont calculés les rendements ?</AccordionTrigger>
                <AccordionContent>
                  Les rendements sont calculés en fonction des revenus générés par les créatrices sur 
                  leurs différentes plateformes. Nous prenons un pourcentage prédéterminé de leurs 
                  revenus mensuels et le distribuons aux investisseurs proportionnellement à leur 
                  investissement initial.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Quelle est la durée minimale d'investissement ?</AccordionTrigger>
                <AccordionContent>
                  La durée minimale d'investissement est de 6 mois. Après cette période, vous pouvez 
                  retirer vos fonds à tout moment avec un préavis de 30 jours.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Comment fonctionne le programme d'affiliation ?</AccordionTrigger>
                <AccordionContent>
                  Vous recevez une commission de 8% sur tous les investissements réalisés par les 
                  personnes que vous parrainez. Cette commission est versée mensuellement tant que 
                  votre filleul maintient son investissement sur la plateforme.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Les rendements sont-ils garantis ?</AccordionTrigger>
                <AccordionContent>
                  Les rendements présentés sont basés sur des performances historiques et des 
                  projections, mais ne sont pas garantis. Comme tout investissement, il comporte 
                  des risques. Cependant, nous sélectionnons rigoureusement les créatrices pour 
                  maximiser les chances de succès.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Prêt à commencer votre investissement ?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Rejoignez des centaines d'investisseurs qui diversifient leur portefeuille 
            en soutenant des créatrices de contenu prometteuses.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <GradientButton variant="primary" size="lg">
                Créer un compte
              </GradientButton>
            </Link>
            <Link to="/creators">
              <GradientButton variant="outline" size="lg">
                Voir les créatrices
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
