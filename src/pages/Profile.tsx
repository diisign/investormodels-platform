
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, UserRoundCog, AtSign, Mail, Edit2, Check, X, Plus, Minus, ExternalLink, ArrowLeft, Wallet, LogOut, LayoutDashboard } from 'lucide-react';
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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

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
    <div className="relative container max-w-6xl mx-auto px-4 py-10 md:py-16">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="absolute left-4 top-4 p-2 rounded-full hover:bg-primary/10 transition-all duration-300"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8 ml-16 md:ml-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Mon Profil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold">Mon Profil</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-2 rounded-xl">
              <UserBalance />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="md:col-span-2 glass-card hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="h-12 bg-gradient-to-r from-primary to-primary/60"></div>
            <CardHeader className="flex flex-row items-center gap-4 pt-6">
              <Avatar className="h-20 w-20 border-4 border-background shadow-md -mt-14">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || user?.email}`} />
                <AvatarFallback className="bg-primary/80 text-white text-xl font-bold">
                  {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl text-gradient">{user?.name || 'Utilisateur'}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
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
                          <FormLabel className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Nom
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} className="border-primary/20 focus:border-primary" />
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
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> Email
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="votre@email.com" {...field} disabled className="bg-muted/50" />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-xl p-4 transition-all hover:bg-primary/10">
                      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                        <User className="h-4 w-4" /> Nom
                      </h3>
                      <p className="text-base font-medium">{user?.name || '–'}</p>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-4 transition-all hover:bg-primary/10">
                      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4" /> Email
                      </h3>
                      <p className="text-base font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <GradientButton
                    onClick={() => setIsEditing(true)}
                    className="mt-4 w-full md:w-auto"
                    icon={<Edit2 className="h-4 w-4" />}
                  >
                    Modifier le profil
                  </GradientButton>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card className="glass-card hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-primary/60 to-primary/30"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserRoundCog className="h-5 w-5" />
                Paramètres du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 transition-all duration-300 h-14"
                onClick={handleStripeRedirect}
              >
                <span className="flex items-center gap-2.5">
                  <div className="bg-green-100 dark:bg-green-800/30 p-1.5 rounded-full">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Déposer des fonds</span>
                    <span className="text-xs text-green-600 dark:text-green-300">Via Stripe</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 ml-auto" />
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800 transition-all duration-300 h-14"
                onClick={() => setShowWithdrawModal(true)}
              >
                <span className="flex items-center gap-2.5">
                  <div className="bg-orange-100 dark:bg-orange-800/30 p-1.5 rounded-full">
                    <Minus className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Retirer des fonds</span>
                    <span className="text-xs text-orange-600 dark:text-orange-300">Sur votre compte bancaire</span>
                  </div>
                </span>
              </Button>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-2"></div>
              
              <Button
                variant="outline"
                className="w-full justify-start text-left transition-all duration-300 h-14"
                onClick={() => navigate('/dashboard')}
              >
                <span className="flex items-center gap-2.5">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Tableau de bord</span>
                    <span className="text-xs text-muted-foreground">Gérer vos investissements</span>
                  </div>
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive transition-all duration-300 h-14"
                onClick={() => {
                  const confirm = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
                  if (confirm && user) {
                    supabase.auth.signOut().then(() => {
                      navigate('/');
                    });
                  }
                }}
              >
                <span className="flex items-center gap-2.5">
                  <div className="bg-destructive/10 p-1.5 rounded-full">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Déconnexion</span>
                    <span className="text-xs text-destructive/70">Quitter votre compte</span>
                  </div>
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card dark:bg-card rounded-xl shadow-xl max-w-md w-full p-6 border border-border dark:border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Wallet className="h-5 w-5 text-orange-500" />
                Retirer des fonds
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowWithdrawModal(false)} className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleWithdrawSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="withdraw-amount" className="block text-sm font-medium text-foreground mb-1">
                    Montant (€)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
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
                      className="block w-full pl-10 pr-12 py-2 rounded-md border border-input bg-card focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="100"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-muted-foreground">€</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bank-details" className="block text-sm font-medium text-foreground mb-1">
                    IBAN
                  </label>
                  <input
                    type="text"
                    id="bank-details"
                    className="block w-full px-3 py-2 rounded-md border border-input bg-card focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                    required
                  />
                </div>
                
                <div className="bg-muted/30 p-3 rounded-lg text-sm text-muted-foreground">
                  <p>Les retraits sont traités sous 48h ouvrées. Des frais de 0.5% peuvent s'appliquer.</p>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowWithdrawModal(false)}
                    className="px-4 py-2"
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
