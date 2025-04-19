
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

const AffiliationStats = () => {
  const { data: affiliations, isLoading } = useQuery({
    queryKey: ['affiliations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('affiliations')
        .select(`
          *,
          referred:profiles!referred_id(
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Chargement des données...</div>;
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mes Parrainages</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableCell colSpan={5} className="text-center py-4">
                  Aucun parrainage pour le moment
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AffiliationStats;
