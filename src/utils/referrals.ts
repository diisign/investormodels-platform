import { supabase } from '@/integrations/supabase/client';

export const processReferralSignup = async (userId: string, referralCode?: string) => {
  if (!referralCode) {
    console.log('No referral code provided');
    return;
  }

  try {
    console.log('Processing referral signup for user:', userId, 'with code:', referralCode);

    // Find the referrer by referral code (assuming referral code is user ID for now)
    // In a real implementation, you might have a separate referral_codes table
    const referrerId = referralCode;

    // Check if referrer exists
    const { data: referrer, error: referrerError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', referrerId)
      .maybeSingle();

    if (referrerError || !referrer) {
      console.error('Invalid referral code or referrer not found:', referralCode);
      return;
    }

    // Create affiliation record
    const { data: affiliation, error: affiliationError } = await supabase
      .from('affiliations')
      .insert({
        referrer_id: referrerId,
        referred_id: userId,
        status: 'active',
        referred_at: new Date().toISOString()
      })
      .select()
      .single();

    if (affiliationError) {
      console.error('Error creating affiliation:', affiliationError);
      throw affiliationError;
    }

    console.log('Affiliation created successfully:', affiliation);
    return affiliation;

  } catch (error) {
    console.error('Error processing referral signup:', error);
    throw error;
  }
};

export const generateReferralLink = (userId: string, baseUrl: string = window.location.origin) => {
  return `${baseUrl}/register?ref=${userId}`;
};

export const getReferralCodeFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ref');
};