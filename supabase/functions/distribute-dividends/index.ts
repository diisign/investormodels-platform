import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting dividend distribution process...');
    
    // Get all active investments that haven't received dividends for the current month
    const currentDate = new Date();
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    
    const { data: investments, error: investmentsError } = await supabase
      .from('investments')
      .select('*')
      .eq('shares_owned', true)
      .eq('status', 'active')
      .lt('created_at', lastMonthStart.toISOString()); // Au moins 1 mois d'ancienneté

    if (investmentsError) {
      console.error('Error fetching investments:', investmentsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch investments' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${investments?.length || 0} eligible investments`);

    let distributedCount = 0;
    let totalDistributed = 0;

    for (const investment of investments || []) {
      try {
        // Vérifier si un dividende a déjà été distribué ce mois-ci
        const { data: existingDividends, error: dividendCheckError } = await supabase
          .from('dividends')
          .select('id')
          .eq('investment_id', investment.id)
          .gte('dividend_date', currentMonthStart.toISOString().split('T')[0])
          .lt('dividend_date', currentDate.toISOString().split('T')[0]);

        if (dividendCheckError) {
          console.error(`Error checking dividends for investment ${investment.id}:`, dividendCheckError);
          continue;
        }

        if (existingDividends && existingDividends.length > 0) {
          console.log(`Dividend already distributed this month for investment ${investment.id}`);
          continue;
        }

        // Calculer le yield du créateur (vous devrez ajuster cette logique selon vos données)
        const creatorYields: Record<string, number> = {
          'creator13': 16.55, 'creator22': 16.55, 'creator4': 15.78, 'creator17': 16.34,
          'creator26': 16.34, 'creator8': 26.35, 'brookmills': 28.31, 'creator10': 12.16,
          'creator1': 15.43, 'creator14': 23.16, 'creator23': 23.16, 'creator5': 21.36,
          'creator18': 21.60, 'creator27': 21.60, 'creator9': 20.16, 'creator24': 16.55,
          'creator2': 16.15, 'creator11': 18.03, 'creator6': 15.21, 'brooks-mills-🍒': 14.48,
          'creator28': 22.18, 'creator19': 22.18, 'creator20': 18.03, 'creator21': 16.53,
          'creator29': 20.53, 'creator3': 22.41, 'creator16': 22.49, 'creator7': 26.24,
          'aishah': 11.71, 'creator25': 22.49, 'creator12': 16.53
        };

        const yieldRate = creatorYields[investment.creator_id] || 15.0; // Yield par défaut
        const monthlyDividend = investment.amount * (yieldRate / 100 / 12);

        console.log(`Distributing ${monthlyDividend.toFixed(2)}€ dividend for investment ${investment.id} (yield: ${yieldRate}%)`);

        // Créer l'enregistrement de dividende
        const { error: dividendError } = await supabase
          .from('dividends')
          .insert({
            investment_id: investment.id,
            user_id: investment.user_id,
            amount: monthlyDividend,
            dividend_date: currentDate.toISOString().split('T')[0],
            yield_rate: yieldRate
          });

        if (dividendError) {
          console.error(`Error creating dividend record for investment ${investment.id}:`, dividendError);
          continue;
        }

        // Créer une transaction pour créditer le dividende
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: investment.user_id,
            amount: monthlyDividend,
            status: 'completed',
            payment_method: 'dividend',
            payment_id: investment.id,
            currency: 'EUR'
          });

        if (transactionError) {
          console.error(`Error creating transaction for investment ${investment.id}:`, transactionError);
          continue;
        }

        // Mettre à jour la date du dernier dividende
        const { error: updateError } = await supabase
          .from('investments')
          .update({ last_dividend_date: currentDate.toISOString() })
          .eq('id', investment.id);

        if (updateError) {
          console.error(`Error updating investment ${investment.id}:`, updateError);
        }

        distributedCount++;
        totalDistributed += monthlyDividend;

      } catch (error) {
        console.error(`Error processing investment ${investment.id}:`, error);
        continue;
      }
    }

    console.log(`Distribution complete: ${distributedCount} dividends distributed, total: ${totalDistributed.toFixed(2)}€`);

    return new Response(
      JSON.stringify({
        success: true,
        distributed_count: distributedCount,
        total_distributed: totalDistributed,
        message: `Successfully distributed ${distributedCount} dividends totaling ${totalDistributed.toFixed(2)}€`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error during dividend distribution:', error);
    return new Response(
      JSON.stringify({ error: 'Unexpected error during dividend distribution' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});