
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AffiliationStats = () => {
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch the session when component mounts
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id || null);
    };
    
    getSession();
  }, []);

  const { data: affiliations, isLoading } = useQuery({
    queryKey: ['affiliations', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('affiliations')
        .select('*, referred:profiles(name)')
        .eq('referrer_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  return null; // Remove the stats table from this component
};

export default AffiliationStats;
