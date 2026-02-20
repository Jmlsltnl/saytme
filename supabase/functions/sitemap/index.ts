import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // 1. Sayt ayarlarını çək (Base URL üçün)
    const { data: settings } = await supabaseClient
      .from('site_settings')
      .select('site_name')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    // Base URL-i müəyyən et (Default olaraq cari Supabase URL-i götürür, amma production-da real domain olmalıdır)
    // Qeyd: Real layihədə bunu site_settings cədvəlinə 'site_url' kimi əlavə etmək daha yaxşıdır.
    // Hələlik origin-i request-dən və ya default bir yerdən götürək.
    const baseUrl = "https://sayt.me"; // Bura öz real domeniniz gələcək

    // 2. Məqalələri çək
    const { data: posts } = await supabaseClient
      .from('posts')
      .select('slug, updated_at, created_at')
      .order('created_at', { ascending: false })

    // 3. Kateqoriyaları çək
    const { data: categories } = await supabaseClient
      .from('categories')
      .select('slug')

    // XML Başlanğıcı
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Kateqoriyalar
    categories?.forEach((cat: any) => {
      xml += `
  <url>
    <loc>${baseUrl}/?category=${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Məqalələr
    posts?.forEach((post: any) => {
      const date = post.updated_at || post.created_at;
      xml += `
  <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${new Date(date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    return new Response(xml, {
      headers: { 
        ...corsHeaders,
        "Content-Type": "application/xml" 
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})