
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowDown, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const WebhookDebug = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer les logs de la fonction webhook
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
    refetchInterval: 10000, // Rafraîchir toutes les 10 secondes
  });

  // Récupérer les transactions les plus récentes
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
    refetchInterval: 5000, // Rafraîchir toutes les 5 secondes
  });

  const handleRefresh = () => {
    setIsLoading(true);
    Promise.all([refetchLogs(), refetchTransactions()]).finally(() => {
      setIsLoading(false);
    });
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Carte des transactions récentes */}
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
                
                {/* Carte des logs du webhook */}
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
