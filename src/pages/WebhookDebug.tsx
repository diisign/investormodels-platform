
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowDown, RefreshCw, CheckCircle, AlertCircle, Loader2, Wand2, PlayCircle, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WebhookDebug = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [stripeWebhookConfigExpanded, setStripeWebhookConfigExpanded] = useState(false);

  const { data: logs, isLoading: isLogsLoading, refetch: refetchLogs } = useQuery({
    queryKey: ['webhookLogs'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-webhook-logs', {
          body: {}
        });
        
        if (error) throw error;
        return data?.logs || [];
      } catch (error) {
        console.error('Erreur lors de la récupération des logs:', error);
        return [];
      }
    },
    refetchInterval: 10000,
  });

  const { data: transactions, isLoading: isTransactionsLoading, refetch: refetchTransactions } = useQuery({
    queryKey: ['recentTransactions'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Erreur lors de la récupération des transactions:', error);
        return [];
      }
    },
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (!realtimeEnabled) return;

    console.log("Configuration du canal temps réel pour webhook_events");
    
    const channel = supabase
      .channel('webhook-events-changes')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'webhook_events' 
        },
        (payload) => {
          console.log('Nouvel événement webhook reçu:', payload);
          toast.success('Nouvel événement webhook reçu!', {
            description: `Type: ${payload.new.event_type}`,
            duration: 5000,
          });
          refetchLogs();
        }
      )
      .subscribe((status) => {
        console.log(`Statut de la souscription temps réel: ${status}`);
        if (status === 'SUBSCRIBED') {
          console.log('Souscription aux événements webhook activée');
        }
      });

    const transactionsChannel = supabase
      .channel('transactions-changes')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'transactions' 
        },
        (payload) => {
          console.log('Nouvelle transaction reçue:', payload);
          toast.success('Nouvelle transaction détectée!', {
            description: `Montant: ${payload.new.amount} ${payload.new.currency}`,
            duration: 5000,
          });
          refetchTransactions();
        }
      )
      .subscribe();

    return () => {
      console.log("Nettoyage des canaux temps réel");
      supabase.removeChannel(channel);
      supabase.removeChannel(transactionsChannel);
    };
  }, [refetchLogs, refetchTransactions, realtimeEnabled]);

  const handleRefresh = () => {
    setIsLoading(true);
    Promise.all([refetchLogs(), refetchTransactions()]).finally(() => {
      setIsLoading(false);
    });
  };

  const toggleRealtime = () => {
    const newState = !realtimeEnabled;
    setRealtimeEnabled(newState);
    if (newState) {
      toast.success('Notifications en temps réel activées');
    } else {
      toast.info('Notifications en temps réel désactivées');
    }
  };

  const testWebhook = async (e) => {
    if (e) e.preventDefault();
    
    setIsTestingWebhook(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const authToken = session?.access_token;
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      console.log("Calling webhook test endpoint with headers:", headers);
      
      // En production, assurez-vous d'utiliser la même URL exacte que celle définie dans les variables d'environnement
      const webhookUrl = 'https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-webhook/test';
      console.log("URL de test:", webhookUrl);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: headers,
        mode: 'cors' // Forcer le mode CORS
      });
      
      console.log("Statut de la réponse:", response.status);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Webhook test response:", data);
      
      if (data.success) {
        toast.success('Test du webhook réussi !', {
          description: 'La fonction webhook est accessible et opérationnelle.',
        });
        
        await Promise.all([refetchLogs(), refetchTransactions()]);
      } else {
        toast.error('Échec du test du webhook', {
          description: data.message || 'Une erreur s\'est produite lors du test.',
        });
      }
    } catch (error) {
      console.error('Erreur lors du test du webhook:', error);
      toast.error('Erreur lors du test du webhook', {
        description: error.message || 'Impossible de contacter la fonction webhook.',
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const openStripeWebhooks = () => {
    window.open('https://dashboard.stripe.com/webhooks', '_blank');
  };

  const toggleStripeWebhookConfig = () => {
    setStripeWebhookConfigExpanded(!stripeWebhookConfigExpanded);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isAuthenticated} />
      
      <main className="flex-grow pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FadeIn direction="up">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-center">Diagnostic Webhook Stripe</h1>
                <div className="flex gap-2">
                  <Button 
                    onClick={(e) => testWebhook(e)} 
                    variant="secondary"
                    disabled={isTestingWebhook}
                    className="flex items-center gap-2"
                  >
                    {isTestingWebhook ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4" />}
                    Tester le webhook
                  </Button>
                  <Button 
                    onClick={toggleRealtime} 
                    variant={realtimeEnabled ? "default" : "outline"}
                    className="flex items-center gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    {realtimeEnabled ? 'Temps réel activé' : 'Temps réel désactivé'}
                  </Button>
                  <Button 
                    onClick={handleRefresh} 
                    variant="outline" 
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Actualiser
                  </Button>
                </div>
              </div>
              
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>Configuration du Webhook Stripe</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={openStripeWebhooks}
                      className="flex items-center gap-2"
                    >
                      <span>Dashboard Stripe</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Vérifiez que votre webhook est correctement configuré dans Stripe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-md">URL du webhook</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={toggleStripeWebhookConfig}
                          className="text-xs"
                        >
                          {stripeWebhookConfigExpanded ? "Réduire" : "Étendre"}
                        </Button>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm font-mono break-all">
                        https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-webhook
                      </div>
                    </div>
                    
                    {stripeWebhookConfigExpanded && (
                      <div className="space-y-4 border-t pt-4 mt-2">
                        <div>
                          <h3 className="font-medium mb-1">Événements à surveiller</h3>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              checkout.session.completed
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              payment_intent.succeeded
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-1">En-têtes de requête</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Assurez-vous que Stripe envoie l'en-tête <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">stripe-signature</span> avec chaque requête.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-1">Secret du webhook</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Configurez le secret du webhook dans les secrets de la fonction Edge Supabase:
                          </p>
                          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm font-mono mt-1">
                            STRIPE_WEBHOOK_SECRET=whsec_...
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <h3 className="font-medium mb-1">Validation dans Stripe</h3>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={openStripeWebhooks}
                              className="flex items-center gap-2"
                            >
                              <span>Tester dans Stripe</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                              Utilisez le dashboard Stripe pour envoyer des événements de test
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions récentes</CardTitle>
                    <CardDescription>Dernières transactions enregistrées dans la base de données</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isTransactionsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                      </div>
                    ) : transactions && transactions.length > 0 ? (
                      <div className="space-y-4">
                        {transactions.map((transaction) => (
                          <div key={transaction.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="font-medium">{transaction.payment_method}</span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(transaction.created_at).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-300">ID: {transaction.payment_id}</span>
                              <span className="font-bold text-green-600 dark:text-green-400">+{Number(transaction.amount).toFixed(2)} €</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                        <p>Aucune transaction trouvée</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Logs du webhook Stripe</CardTitle>
                    <CardDescription>Derniers événements reçus par votre webhook</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLogsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                      </div>
                    ) : logs && logs.length > 0 ? (
                      <div className="max-h-[400px] overflow-y-auto space-y-2">
                        {logs.map((log, index) => (
                          <div key={index} className="p-3 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                            {log}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                        <p>Aucun log de webhook disponible</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Guide de résolution des problèmes</CardTitle>
                  <CardDescription>Étapes pour résoudre les problèmes de paiement Stripe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="inline-block h-6 w-6 rounded-full bg-blue-600 text-white text-center leading-6">1</span>
                      Vérifier la configuration du webhook Stripe
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 ml-8">
                      Assurez-vous que le webhook Stripe est configuré pour pointer vers votre fonction Supabase:<br />
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                        https://pzqsgvyprttfcpyofgnt.supabase.co/functions/v1/stripe-webhook
                      </code>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="inline-block h-6 w-6 rounded-full bg-blue-600 text-white text-center leading-6">2</span>
                      Vérifier les événements à écouter
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 ml-8">
                      Configurez votre webhook pour écouter les événements suivants:
                      <ul className="list-disc ml-5 mt-1">
                        <li>checkout.session.completed</li>
                        <li>checkout.session.async_payment_succeeded</li>
                        <li>payment_intent.succeeded</li>
                      </ul>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="inline-block h-6 w-6 rounded-full bg-blue-600 text-white text-center leading-6">3</span>
                      Configurer le secret du webhook
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 ml-8">
                      Dans le tableau de bord Stripe, obtenez le clé secrète du webhook (signing secret) et configurez-la dans les secrets de Supabase Edge Functions avec le nom <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">STRIPE_WEBHOOK_SECRET</code>.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="inline-block h-6 w-6 rounded-full bg-blue-600 text-white text-center leading-6">4</span>
                      Vérifier les journaux Supabase Edge Functions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 ml-8">
                      Consultez les journaux des fonctions Edge dans la console Supabase pour voir les éventuelles erreurs ou messages de débogage qui pourraient indiquer pourquoi les webhooks Stripe ne sont pas traités correctement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebhookDebug;
