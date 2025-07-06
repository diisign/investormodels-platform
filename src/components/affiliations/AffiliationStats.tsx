
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { StaticReferral } from '@/hooks/useStaticReferralData';

// Define a type for the affiliation data structure
type Affiliation = {
  id: string;
  status: string;
  created_at: string;
  total_earnings: number | null;
  referred?: {
    name: string | null;
  } | null;
}

interface AffiliationStatsProps {
  staticData?: StaticReferral[];
}

const AffiliationStats = ({ staticData }: AffiliationStatsProps = {}) => {
  const { user } = useAuth();

  const { data: affiliations = [], isLoading } = useQuery({
    queryKey: ['affiliations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Using the explicit foreign key column names in the query
      const { data, error } = await supabase
        .from('affiliations')
        .select(`
          id,
          status,
          created_at,
          total_earnings,
          referred:profiles!referred_id(name)
        `)
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) {
        console.error("Error fetching affiliations:", error);
        throw error;
      }
      
      // Use type assertion with unknown as intermediate step
      return (data as unknown) as Affiliation[];
    },
    enabled: !!user?.id && !staticData,
  });

  // Use static data if provided
  const displayData = staticData || affiliations;

  if (isLoading && !staticData) {
    return <div>Chargement...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Vos parrainages récents</CardTitle>
      </CardHeader>
      <CardContent>
        {displayData.length > 0 ? (
          <div className="space-y-4">
            {(staticData || affiliations).map((item, index) => (
              <div 
                key={staticData ? index : item.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {staticData ? item.name.charAt(1).toUpperCase() : (item.referred?.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">
                      {staticData ? item.name : (item.referred?.name || 'Utilisateur')}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {staticData ? item.date : formatDistance(new Date(item.created_at), new Date(), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    (staticData ? item.status : item.status) === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {(staticData ? item.status : item.status) === 'completed' ? 'Complété' : 'En attente'}
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    +{staticData ? item.reward : (item.total_earnings || 0)}€
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Aucun parrainage pour le moment
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AffiliationStats;
