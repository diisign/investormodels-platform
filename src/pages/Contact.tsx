
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-4 p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-4xl font-bold text-center creator-gradient">Contactez-nous</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nos informations</h2>
          <p className="text-muted-foreground mb-6">
            Nous sommes à votre disposition pour répondre à toutes vos questions concernant notre plateforme.
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-medium">Adresse</h3>
              <p className="text-sm text-muted-foreground">
                1600 Amphitheatre Parkway<br />
                Mountain View, CA 94043, USA
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted-foreground">creatorinvest@outlook.fr</p>
            </div>
            
            <div>
              <h3 className="font-medium">Téléphone</h3>
              <p className="text-sm text-muted-foreground">07 56 86 92 29</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h2 className="text-2xl font-semibold mb-4">Heures d'ouverture</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Lundi - Vendredi</span>
              <span>9:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span>Samedi</span>
              <span>10:00 - 16:00</span>
            </div>
            <div className="flex justify-between">
              <span>Dimanche</span>
              <span>Fermé</span>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Envoyez-nous un message</CardTitle>
            <CardDescription>
              Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nom</label>
                <Input id="name" placeholder="Votre nom" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="votre.email@exemple.com" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                <Input id="subject" placeholder="Sujet de votre message" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Détaillez votre message ici..." 
                  rows={5}
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full creator-gradient-bg">
                Envoyer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;

