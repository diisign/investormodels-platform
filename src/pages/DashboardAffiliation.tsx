import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Define types for the joined data - updated to match actual response structure
type AffiliationWithProfiles = {
  id: string;
  created_at: string;
  first_investment_amount: number | null;
  status: string;
  total_earnings: number | null;
  referrer: { name: string | null } | null;
  referred: { name: string | null } | null;
  // Include additional fields that might be in the response
  referred_id?: string;
  referrer_id?: string;
  first_investment_date?: string | null;
  referred_at?: string | null;
};

const DashboardAffiliation = () => {
  const { data: affiliations, isLoading } = useQuery({
    queryKey: ['all-affiliations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('affiliations')
        .select(`
          *,
          referrer:profiles!referrer_id(name),
          referred:profiles!referred_id(name)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      // Cast the data to the correct type
      return data as unknown as AffiliationWithProfiles[];
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Chargement des données...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Tous les Parrainages</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parrain</TableHead>
                  <TableHead>Filleul</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Premier Investissement</TableHead>
                  <TableHead>Gains Totaux</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliations && affiliations.length > 0 ? (
                  affiliations.map((affiliation) => (
                    <TableRow key={affiliation.id}>
                      <TableCell>{affiliation.referrer?.name || 'Anonyme'}</TableCell>
                      <TableCell>{affiliation.referred?.name || 'Anonyme'}</TableCell>
                      <TableCell>
                        {formatDistance(new Date(affiliation.created_at), new Date(), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          affiliation.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {affiliation.status === 'pending' ? 'En attente' : 'Actif'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {affiliation.first_investment_amount 
                          ? `${affiliation.first_investment_amount}€`
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {affiliation.total_earnings 
                          ? `${affiliation.total_earnings}€`
                          : '0€'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucun parrainage pour le moment
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardAffiliation;
