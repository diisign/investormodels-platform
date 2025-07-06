
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/utils/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { StaticReferral } from '@/hooks/useStaticReferralData';
import { Users, Clock, CheckCircle, DollarSign } from 'lucide-react';

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
  const [showAll, setShowAll] = React.useState(false);

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
  const itemsToShow = showAll ? displayData : displayData.slice(0, 5);

  if (isLoading && !staticData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Programme de parrainage</h2>
        <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
          Voir tout →
        </button>
      </div>

      {/* Statistiques */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Statistiques</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total parrainages */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total parrainages</span>
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {staticData ? staticData.length : displayData.length}
            </div>
          </div>

          {/* En attente */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">En attente</span>
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {staticData ? staticData.filter(r => r.status === 'pending').length : displayData.filter(r => r.status === 'pending').length}
            </div>
          </div>

          {/* Complétés */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Complétés</span>
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {staticData ? staticData.filter(r => r.status === 'completed').length : displayData.filter(r => r.status === 'completed').length}
            </div>
          </div>

          {/* Gains totaux */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Gains totaux</span>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {staticData 
                ? staticData.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.reward, 0)
                : (affiliations as Affiliation[]).reduce((sum, r) => sum + (r.total_earnings || 0), 0)
              }€
            </div>
          </div>
        </div>
      </div>

      {/* Parrainages récents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Parrainages récents</h3>
          <select className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1">
            <option>30 dernier...</option>
          </select>
        </div>

        {displayData.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {itemsToShow.map((item, index) => (
                <div 
                  key={staticData ? index : item.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {staticData ? item.name : ((item as Affiliation).referred?.name || 'Utilisateur')}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {staticData ? item.date : formatDistance(new Date((item as Affiliation).created_at), new Date(), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600 dark:text-green-400 mb-1">
                      +{staticData ? (item as StaticReferral).reward : ((item as Affiliation).total_earnings || 0)}€
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {item.status === 'completed' ? 'Complété' : 'En attente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {displayData.length > 5 && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-purple-600 hover:text-purple-500 font-medium"
                >
                  {showAll ? 'Voir moins' : `Voir tous les ${displayData.length} parrainages`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Aucun parrainage pour le moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliationStats;
