
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, UserRoundCog, AtSign, Mail, Edit2, Check, X } from 'lucide-react';
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
                className="w-full justify-start text-left"
                onClick={() => navigate('/deposit')}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                  </svg>
                  Recharger mon compte
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
    </div>
  );
};

export default Profile;
