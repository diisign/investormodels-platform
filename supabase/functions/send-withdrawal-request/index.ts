import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WithdrawalRequest {
  amount: number;
  iban: string;
  userEmail: string;
  userName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, iban, userEmail, userName }: WithdrawalRequest = await req.json();

    console.log("Processing withdrawal request:", { amount, userEmail, userName });

    // Send email to admin
    const emailResponse = await resend.emails.send({
      from: "Creator Invest <onboarding@resend.dev>",
      to: ["pro.creatorinvest@gmail.com"],
      subject: `Nouvelle demande de retrait - ${amount}€`,
      html: `
        <h2>Nouvelle demande de retrait</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Utilisateur:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Montant:</strong> ${amount}€</p>
          <p><strong>IBAN:</strong> ${iban}</p>
        </div>
        <p>Cette demande de retrait doit être traitée dans les 48h ouvrées.</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Email automatique de Creator Invest</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-withdrawal-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);