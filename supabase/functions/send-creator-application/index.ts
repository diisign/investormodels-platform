import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CreatorApplicationRequest {
  name: string;
  email: string;
  platform: string;
  username: string;
  followers: string;
  monthlyRevenue: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: CreatorApplicationRequest = await req.json();

    console.log("Received creator application:", formData);

    const emailContent = `
      <h2>Nouvelle candidature créatrice</h2>
      <p><strong>Nom:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Plateforme:</strong> ${formData.platform}</p>
      <p><strong>Nom d'utilisateur:</strong> ${formData.username}</p>
      <p><strong>Nombre d'abonnés:</strong> ${formData.followers}</p>
      <p><strong>Revenus mensuels:</strong> ${formData.monthlyRevenue}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      
      <hr>
      <p><em>Candidature reçue via Splitz.com</em></p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Splitz <onboarding@resend.dev>",
      to: ["contact@splitz.fr"],
      subject: `Nouvelle candidature créatrice - ${formData.name}`,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-creator-application function:", error);
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