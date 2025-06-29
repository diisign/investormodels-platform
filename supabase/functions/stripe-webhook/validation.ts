
import { corsHeaders } from "./cors.ts";

export function validateRequest(req: Request): { isValid: boolean; error?: Response } {
  if (req.method !== "POST") {
    return {
      isValid: false,
      error: new Response(
        JSON.stringify({ error: `Méthode ${req.method} non autorisée` }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    };
  }
  
  return { isValid: true };
}

export async function parseRequestBody(req: Request): Promise<{ body: string; error?: Response }> {
  const body = await req.text();
  if (!body) {
    return {
      body: "",
      error: new Response(
        JSON.stringify({ error: "Corps de la requête vide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    };
  }
  
  return { body };
}
