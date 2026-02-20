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

    const { data: settings } = await supabaseClient
      .from('site_settings')
      .select('site_name, site_description')
      .limit(1)
      .maybeSingle()

    const { data: posts } = await supabaseClient
      .from('posts')
      .select('title_az, slug, seo_description')
      .order('created_at', { ascending: false })
      .limit(10)

    let content = `# ${settings?.site_name || 'Sayt.me'}

## Haqqında
${settings?.site_description || 'Bu sayt marketinq nümunələri və strategiyaları haqqındadır.'}

## Son Məqalələr
`;

    posts?.forEach((post: any) => {
      content += `
- [${post.title_az}](/post/${post.slug}): ${post.seo_description || 'Ətraflı oxuyun.'}`;
    });

    return new Response(content, {
      headers: { 
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8" 
      },
    })
  } catch (error) {
    return new Response("Error generating llms.txt", { status: 500, headers: corsHeaders })
  }
})