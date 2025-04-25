
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

// Define a type for the affiliation data structure
type Affiliation = {
  id: string;
  status: string;
  created_at: string;
  total_earnings: number | null;
  referred: {
    name: string | null;
  } | null;
}

const AffiliationStats = () => {
  const { user } = useAuth();

  const { data: affiliations = [], isLoading } = useQuery({
    queryKey: ['affiliations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Using the proper foreign key relationship in the query
      const { data, error } = await supabase
        .from('affiliations')
        .select(`
          id,
          status,
          created_at,
          total_earnings,
          referred:profiles(name)
        `)
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      return data as Affiliation[];
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Vos parrainages récents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filleul</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Gains</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {affiliations.length > 0 ? (
              affiliations.map((affiliation) => (
                <TableRow key={affiliation.id}>
                  <TableCell>
                    {affiliation.referred?.name || 'Utilisateur'}
                  </TableCell>
                  <TableCell>
                    {formatDistance(new Date(affiliation.created_at), new Date(), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      affiliation.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {affiliation.status === 'completed' ? 'Actif' : 'En attente'}
                    </span>
                  </TableCell>
                  <TableCell>{affiliation.total_earnings || 0}€</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Aucun parrainage pour le moment
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AffiliationStats;
