import React, { useState } from 'react';
// Import des composants de layout
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/utils/auth';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Star, Users, TrendingUp } from 'lucide-react';

const CreatorApplication = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: '',
    username: '',
    followers: '',
    monthlyRevenue: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('creator_applications')
        .insert({
          name: formData.name,
          email: formData.email,
          platform: formData.platform,
          username: formData.username,
          followers: formData.followers,
          monthly_revenue: formData.monthlyRevenue,
          message: formData.message
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Candidature enregistrée !",
        description: "Votre candidature a été sauvegardée. Notre équipe l'examinera prochainement.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        platform: '',
        username: '',
        followers: '',
        monthlyRevenue: '',
        message: ''
      });
    } catch (error) {
      console.error('Error saving application:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de votre candidature. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={!!user} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Heart className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400">
              Rejoignez Notre Communauté
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Vous êtes créatrice sur OnlyFans ou MYM ? Collaborons ensemble pour développer 
              votre audience et maximiser vos revenus avec notre plateforme d'investissement.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Collaborer Avec Nous ?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Croissance Garantie</h3>
                <p className="text-sm text-muted-foreground">
                  Nos investisseurs vous aident à développer votre contenu et augmenter vos revenus
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Communauté Active</h3>
                <p className="text-sm text-muted-foreground">
                  Rejoignez une communauté de créatrices motivées et d'investisseurs engagés
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Formulaire de Candidature</CardTitle>
                <p className="text-muted-foreground text-center">
                  Remplissez ce formulaire pour postuler à notre programme de collaboration
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom Complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Plateforme Principale *</Label>
                      <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre plateforme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onlyfans">OnlyFans</SelectItem>
                          <SelectItem value="mym">MYM</SelectItem>
                          <SelectItem value="both">Les deux</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Nom d'utilisateur *</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre d'abonnés</Label>
                      <Select value={formData.followers} onValueChange={(value) => handleInputChange('followers', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une tranche" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-10000">0 - 10 000</SelectItem>
                          <SelectItem value="10000-50000">10 000 - 50 000</SelectItem>
                          <SelectItem value="50000-100000">50 000 - 100 000</SelectItem>
                          <SelectItem value="100000-500000">100 000 - 500 000</SelectItem>
                          <SelectItem value="500000+">500 000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Revenus mensuels actuels</Label>
                      <Select value={formData.monthlyRevenue} onValueChange={(value) => handleInputChange('monthlyRevenue', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une tranche" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1000">0 - 1000€</SelectItem>
                          <SelectItem value="1000-3000">1000 - 3000€</SelectItem>
                          <SelectItem value="3000-8000">3000 - 8000€</SelectItem>
                          <SelectItem value="8000-15000">8000 - 15000€</SelectItem>
                          <SelectItem value="15000+">15000€+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message supplémentaire</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Ajoutez toute information que vous jugez pertinente..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Envoyer Ma Candidature
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreatorApplication;