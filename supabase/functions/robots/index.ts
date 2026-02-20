import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Supabase layihə ID-sini URL-dən alırıq və ya hardcode edirik
  const PROJECT_REF = "qnpoftjwfwzgxmuzqauc"; // Sizin layihə ID-niz
  const sitemapUrl = `https://${PROJECT_REF}.supabase.co/functions/v1/sitemap`;

  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login

Sitemap: ${sitemapUrl}`;

  return new Response(robots, {
    headers: { 
      ...corsHeaders,
      "Content-Type": "text/plain" 
    },
  })
})