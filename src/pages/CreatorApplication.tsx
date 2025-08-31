import React, { useState } from 'react';
// Import des composants de layout
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/utils/auth';
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
    experience: '',
    goals: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Candidature envoyée !",
      description: "Nous examinerons votre dossier et vous recontacterons rapidement.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      platform: '',
      username: '',
      followers: '',
      monthlyRevenue: '',
      experience: '',
      goals: '',
      message: ''
    });
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Rejoignez Notre Communauté
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Vous êtes créatrice sur OnlyFans ou MYM ? Collaborons ensemble pour développer 
              votre audience et maximiser vos revenus avec notre plateforme d'investissement.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Collaborer Avec Nous ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Croissance Garantie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos investisseurs vous aident à développer votre contenu et augmenter vos revenus
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Communauté Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Rejoignez une communauté de créatrices motivées et d'investisseurs engagés
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Support Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bénéficiez d'un accompagnement personnalisé pour optimiser votre stratégie
                  </p>
                </CardContent>
              </Card>
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
                          <SelectItem value="0-100">0 - 100</SelectItem>
                          <SelectItem value="100-500">100 - 500</SelectItem>
                          <SelectItem value="500-1000">500 - 1000</SelectItem>
                          <SelectItem value="1000-5000">1000 - 5000</SelectItem>
                          <SelectItem value="5000+">5000+</SelectItem>
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
                          <SelectItem value="0-500">0 - 500€</SelectItem>
                          <SelectItem value="500-1000">500 - 1000€</SelectItem>
                          <SelectItem value="1000-3000">1000 - 3000€</SelectItem>
                          <SelectItem value="3000-5000">3000 - 5000€</SelectItem>
                          <SelectItem value="5000+">5000€+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Expérience dans le domaine *</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Décrivez votre expérience en tant que créatrice de contenu..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">Objectifs de collaboration</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="Quels sont vos objectifs ? Comment pensez-vous que nous pouvons vous aider ?"
                    />
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

      <Footer />
    </div>
  );
};

export default CreatorApplication;