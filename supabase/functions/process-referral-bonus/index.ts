import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    const { investmentId, userId, amount } = await req.json();
    
    console.log('Processing referral bonus for investment:', { investmentId, userId, amount });

    // Create Supabase client with service role key to bypass RLS
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Check if this user was referred by someone
    const { data: affiliation, error: affiliationError } = await supabase
      .from('affiliations')
      .select('*')
      .eq('referred_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (affiliationError) {
      console.error('Error checking affiliation:', affiliationError);
      throw affiliationError;
    }

    if (!affiliation) {
      console.log('No active affiliation found for user');
      return new Response(
        JSON.stringify({ success: true, message: 'No referral bonus applicable' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Found affiliation:', affiliation);

    // Check if this is the first investment and amount >= 100€
    const { data: previousInvestments, error: investmentsError } = await supabase
      .from('investments')
      .select('id')
      .eq('user_id', userId)
      .neq('id', investmentId);

    if (investmentsError) {
      console.error('Error checking previous investments:', investmentsError);
      throw investmentsError;
    }

    const isFirstInvestment = !previousInvestments || previousInvestments.length === 0;
    
    // Process bonuses
    const transactions = [];
    const referralRecords = [];

    // 1. Filleul bonus: 50€ if first investment >= 100€
    if (isFirstInvestment && amount >= 100) {
      console.log('Adding 50€ bonus for first investment >= 100€');
      
      transactions.push({
        user_id: userId,
        amount: 50,
        status: 'completed',
        payment_method: 'referral_bonus',
        payment_id: `first_investment_bonus_${investmentId}`,
        currency: 'EUR'
      });

      referralRecords.push({
        user_id: userId,
        referee_name: 'Bonus premier investissement',
        reward_amount: 50,
        status: 'completed'
      });

      // Update affiliation with first investment info
      await supabase
        .from('affiliations')
        .update({
          first_investment_amount: amount,
          first_investment_date: new Date().toISOString()
        })
        .eq('id', affiliation.id);
    }

    // 2. Parrain commission: 50% of investment amount
    const referrerCommission = amount * 0.5; // 50%
    console.log(`Adding ${referrerCommission}€ commission for referrer`);

    transactions.push({
      user_id: affiliation.referrer_id,
      amount: referrerCommission,
      status: 'completed',
      payment_method: 'referral_commission',
      payment_id: `referral_commission_${investmentId}`,
      currency: 'EUR'
    });

    referralRecords.push({
      user_id: affiliation.referrer_id,
      referee_name: `Commission filleul (${amount}€)`,
      reward_amount: referrerCommission,
      status: 'completed'
    });

    // Insert all transactions
    if (transactions.length > 0) {
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert(transactions);

      if (transactionError) {
        console.error('Error creating transactions:', transactionError);
        throw transactionError;
      }
    }

    // Insert all referral records
    if (referralRecords.length > 0) {
      const { error: referralError } = await supabase
        .from('referrals')
        .insert(referralRecords);

      if (referralError) {
        console.error('Error creating referral records:', referralError);
        throw referralError;
      }
    }

    // Update affiliation total earnings
    const newTotalEarnings = (affiliation.total_earnings || 0) + referrerCommission + (isFirstInvestment && amount >= 100 ? 50 : 0);
    await supabase
      .from('affiliations')
      .update({
        total_earnings: newTotalEarnings
      })
      .eq('id', affiliation.id);

    console.log('Referral bonuses processed successfully');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        filleulBonus: isFirstInvestment && amount >= 100 ? 50 : 0,
        parrainCommission: referrerCommission
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing referral bonus:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});