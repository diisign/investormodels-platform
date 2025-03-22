
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/auth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/animations/FadeIn";

const StripeData = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("payments");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint = activeTab) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Obtenir la session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Session utilisateur expirée");
      }
      
      // Appel à la fonction Edge
      const response = await fetch(
        `https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-data?endpoint=${endpoint}&limit=20`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
          }
        }
      );
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue");
      }
      
      setData(result.data || []);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setError(err.message);
      toast.error("Erreur lors de la récupération des données", {
        description: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les données au chargement de la page
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Recharger les données lors du changement d'onglet
  const handleTabChange = (value) => {
    setActiveTab(value);
    fetchData(value);
  };

  const handleRefresh = () => {
    fetchData(activeTab);
    toast.info("Actualisation des données...");
  };

  // Formatage de la date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Données Stripe</h1>
                <Button 
                  onClick={handleRefresh} 
                  variant="outline" 
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Actualiser
                </Button>
              </div>

              <Tabs defaultValue="payments" onValueChange={handleTabChange}>
                <TabsList className="mb-6">
                  <TabsTrigger value="payments">Paiements</TabsTrigger>
                  <TabsTrigger value="summary">Résumé</TabsTrigger>
                  <TabsTrigger value="customers">Clients</TabsTrigger>
                </TabsList>

                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paiements récents</CardTitle>
                      <CardDescription>Liste des transactions récentes traitées par Stripe</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex justify-center p-8">
                          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                      ) : error ? (
                        <div className="p-4 text-center text-red-500">
                          {error}
                        </div>
                      ) : data.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          Aucun paiement trouvé
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Montant</th>
                                <th className="px-4 py-2 text-left">Devise</th>
                                <th className="px-4 py-2 text-left">Statut</th>
                                <th className="px-4 py-2 text-left">Client</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((payment) => (
                                <tr key={payment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <td className="px-4 py-2 font-mono text-xs">{payment.id}</td>
                                  <td className="px-4 py-2">{formatDate(payment.created)}</td>
                                  <td className="px-4 py-2 font-bold">{payment.amount.toFixed(2)}</td>
                                  <td className="px-4 py-2 uppercase">{payment.currency}</td>
                                  <td className="px-4 py-2">
                                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                                      payment.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {payment.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-sm">{payment.customer?.email || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="summary">
                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé des paiements</CardTitle>
                      <CardDescription>Analyse des paiements par devise</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex justify-center p-8">
                          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                      ) : error ? (
                        <div className="p-4 text-center text-red-500">
                          {error}
                        </div>
                      ) : data.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          Aucune donnée disponible
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-bold">Résumé par devise</h3>
                            <div className="space-y-2">
                              {data.map((item) => (
                                <div key={item.currency} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                                  <div className="flex justify-between items-center">
                                    <span className="text-lg uppercase font-bold">{item.currency}</span>
                                    <span className="text-lg font-bold">{item.total.toFixed(2)}</span>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.count} transactions
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="text-center p-8">
                              <div className="text-4xl font-bold mb-2">
                                {data.reduce((sum, item) => sum + item.count, 0)}
                              </div>
                              <div className="text-gray-500">Transactions totales</div>
                              <div className="mt-4 text-2xl font-bold">
                                {data.reduce((sum, item) => sum + item.total, 0).toFixed(2)} €
                              </div>
                              <div className="text-gray-500">Montant total</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="customers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Clients</CardTitle>
                      <CardDescription>Liste des clients Stripe</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex justify-center p-8">
                          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                      ) : error ? (
                        <div className="p-4 text-center text-red-500">
                          {error}
                        </div>
                      ) : data.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          Aucun client trouvé
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Nom</th>
                                <th className="px-4 py-2 text-left">Date de création</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((customer) => (
                                <tr key={customer.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <td className="px-4 py-2 font-mono text-xs">{customer.id}</td>
                                  <td className="px-4 py-2">{customer.email || '-'}</td>
                                  <td className="px-4 py-2">{customer.name || '-'}</td>
                                  <td className="px-4 py-2">
                                    {customer.created ? formatDate(new Date(customer.created * 1000).toISOString()) : '-'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StripeData;
