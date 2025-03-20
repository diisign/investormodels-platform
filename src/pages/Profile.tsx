
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, UserRoundCog, AtSign, Mail, Edit2, Check, X, Plus, Minus, ExternalLink } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GradientButton from "@/components/ui/GradientButton";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import UserBalance from "@/components/UserBalance";

// Schema for form validation
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { user, isLoading, session } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const navigate = useNavigate();

  // Set up form with default values from user
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  // Handle form submission
  async function onSubmit(values: ProfileFormValues) {
    if (!user) return;
    
    try {
      setLoadingSubmit(true);
      
      // Only update name since email requires verification
      const { error } = await supabase
        .from('profiles')
        .update({ name: values.name })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update the user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name: values.name }
      });
      
      if (updateError) throw updateError;
      
      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setLoadingSubmit(false);
    }
  }

  const handleStripeRedirect = () => {
    // Rediriger vers le lien de paiement Stripe préexistant
    window.location.href = "https://buy.stripe.com/bIY28x2vDcyR97G5kl";
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWithdrawModal(false);
    
    // Simuler un retrait pour l'instant
    toast.success(`Demande de retrait de ${withdrawAmount}€ envoyée`, {
      description: "Votre demande sera traitée dans les 48 heures.",
    });
    setWithdrawAmount('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <UserBalance />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="md:col-span-2 glass-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || user?.email}`} />
                <AvatarFallback className="bg-primary/20">
                  {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user?.name || 'Utilisateur'}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <AtSign className="h-3.5 w-3.5" />
                  {user?.email}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="votre@email.com" {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            L'adresse email ne peut pas être modifiée ici.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center gap-4 pt-2">
                      <GradientButton
                        type="submit"
                        disabled={loadingSubmit}
                        icon={<Check className="h-4 w-4" />}
                      >
                        {loadingSubmit ? "Enregistrement..." : "Enregistrer"}
                      </GradientButton>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Annuler
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Nom</h3>
                      <p className="mt-1 text-base">{user?.name || '–'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p className="mt-1 text-base">{user?.email}</p>
                    </div>
                  </div>
                  <GradientButton
                    onClick={() => setIsEditing(true)}
                    className="mt-4"
                    icon={<Edit2 className="h-4 w-4" />}
                  >
                    Modifier le profil
                  </GradientButton>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card className="glass-card hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRoundCog className="h-5 w-5" />
                Paramètres du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                onClick={handleStripeRedirect}
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Déposer des fonds
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800"
                onClick={() => setShowWithdrawModal(true)}
              >
                <span className="flex items-center gap-2">
                  <Minus className="h-4 w-4" />
                  Retirer des fonds
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => navigate('/dashboard')}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
                    <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                    <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                    <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                    <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                  </svg>
                  Tableau de bord
                </span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => {
                  const confirm = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
                  if (confirm && user) {
                    supabase.auth.signOut().then(() => {
                      navigate('/');
                    });
                  }
                }}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
                  Déconnexion
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Retirer des fonds</h2>
            <form onSubmit={handleWithdrawSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Montant (€)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                    </div>
                    <input
                      type="number"
                      id="withdraw-amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min="10"
                      step="10"
                      className="block w-full pl-10 pr-12 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-investment-500 focus:border-investment-500"
                      placeholder="100"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">€</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bank-details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    IBAN
                  </label>
                  <input
                    type="text"
                    id="bank-details"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-investment-500 focus:border-investment-500"
                    placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                    required
                  />
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <Button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Annuler
                  </Button>
                  <GradientButton type="submit">
                    Demander un retrait
                  </GradientButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
