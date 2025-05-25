
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { user_id } = await req.json()

    // Noms aléatoires pour les parrainages
    const firstNames = [
      'Emma', 'Lucas', 'Chloé', 'Hugo', 'Inès', 'Léo', 'Jade', 'Gabriel', 'Louise', 'Raphaël',
      'Alice', 'Louis', 'Léa', 'Jules', 'Manon', 'Arthur', 'Lina', 'Adam', 'Rose', 'Noah',
      'Zoé', 'Ethan', 'Anna', 'Théo', 'Camille', 'Nathan', 'Juliette', 'Marius', 'Sarah', 'Tom',
      'Nina', 'Maxime', 'Eva', 'Paul', 'Sofia', 'Victor', 'Lucie', 'Antoine', 'Clara', 'Mathis'
    ];

    const lastNames = ['M.', 'L.', 'B.', 'D.', 'R.', 'T.', 'P.', 'C.', 'G.', 'F.'];

    // Vérifier si l'utilisateur a déjà reçu des parrainages aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    
    const { data: existingStats } = await supabaseClient
      .from('referral_stats')
      .select('last_auto_referral_date')
      .eq('user_id', user_id)
      .single();

    if (existingStats?.last_auto_referral_date === today) {
      return new Response(
        JSON.stringify({ message: 'Already added referrals today' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Ajouter 6 nouveaux parrainages
    const newReferrals = [];
    for (let i = 0; i < 6; i++) {
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const randomReward = 50 + Math.floor(Math.random() * 201); // Entre 50€ et 250€
      const randomStatus = Math.random() < 0.7 ? 'completed' : 'pending';
      
      newReferrals.push({
        user_id,
        referee_name: `${randomFirstName} ${randomLastName}`,
        reward_amount: randomReward,
        status: randomStatus,
        referral_date: today
      });
    }

    // Insérer les nouveaux parrainages
    const { error: insertError } = await supabaseClient
      .from('referrals')
      .insert(newReferrals);

    if (insertError) {
      throw insertError;
    }

    // Calculer les nouvelles statistiques
    const { data: allReferrals } = await supabaseClient
      .from('referrals')
      .select('status, reward_amount')
      .eq('user_id', user_id);

    const totalReferrals = allReferrals?.length || 0;
    const completedReferrals = allReferrals?.filter(r => r.status === 'completed').length || 0;
    const pendingReferrals = allReferrals?.filter(r => r.status === 'pending').length || 0;
    const totalEarnings = allReferrals?.reduce((sum, r) => 
      r.status === 'completed' ? sum + r.reward_amount : sum, 0) || 0;

    // Mettre à jour les statistiques
    const { error: updateError } = await supabaseClient
      .from('referral_stats')
      .update({
        total_referrals: totalReferrals,
        pending_referrals: pendingReferrals,
        completed_referrals: completedReferrals,
        total_earnings: totalEarnings,
        last_auto_referral_date: today,
        tier_progress: Math.min(100, (completedReferrals / 10) * 100)
      })
      .eq('user_id', user_id);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ 
        message: 'Successfully added 6 new referrals',
        added_referrals: newReferrals.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
