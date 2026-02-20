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

    // 1. Sayt Ayarlarını ətraflı çək
    const { data: settings } = await supabaseClient
      .from('site_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    // 2. Kateqoriyaları çək
    const { data: categories } = await supabaseClient
      .from('categories')
      .select('name_az, slug')
      .order('name_az')

    // 3. Məqalələri kateqoriyaları ilə birlikdə çək
    const { data: posts } = await supabaseClient
      .from('posts')
      .select('title_az, slug, seo_description, published_at, category_id, categories(name_az)')
      .order('published_at', { ascending: false })

    // --- Məzmunun Formalaşdırılması ---

    const siteName = settings?.site_name || 'Sayt.me';
    const baseUrl = "https://sayt.me"; // Real domeninizi bura yazarsınız və ya settings-dən götürərsiniz

    let content = `# ${siteName} - Marketinq Bilik Bazası\n\n`;

    // Giriş və Missiya
    content += `> ${settings?.hero_title || 'Marketinq Nümunələri və Strategiyaları'}\n`;
    content += `> ${settings?.hero_description || settings?.site_description || ''}\n\n`;

    content += `## 💡 Sayt Haqqında\n`;
    content += `Bu platforma marketinq mütəxəssisləri, sahibkarlar və tələbələr üçün real biznes strategiyaları, brendinq nümunələri (case-studies) və rəqəmsal marketinq analizləri təqdim edir.\n\n`;

    // Müəllif
    if (settings?.author_name) {
      content += `## 👤 Müəllif\n`;
      content += `**${settings.author_name}**\n`;
      if (settings?.about_text) content += `${settings.about_text}\n`;
      content += `\n`;
    }

    // Mövzular (Kateqoriyalar)
    if (categories && categories.length > 0) {
      content += `## 📂 Əsas Mövzular (Kateqoriyalar)\n`;
      categories.forEach((cat: any) => {
        content += `- **${cat.name_az}**: /?category=${cat.slug}\n`;
      });
      content += `\n`;
    }

    // Məqalələr (Detallı)
    if (posts && posts.length > 0) {
      content += `## 📝 Məqalələr və Analizlər\n\n`;
      
      posts.forEach((post: any) => {
        const date = post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : 'N/A';
        const catName = post.categories?.name_az || 'Ümumi';
        
        content += `### ${post.title_az}\n`;
        content += `- **URL:** ${baseUrl}/post/${post.slug}\n`;
        content += `- **Kateqoriya:** ${catName}\n`;
        content += `- **Tarix:** ${date}\n`;
        if (post.seo_description) {
          content += `- **Xülasə:** ${post.seo_description}\n`;
        }
        content += `\n---\n\n`;
      });
    }

    // Footer
    content += `Generated dynamically by Sayt.me Engine.\nLast Update: ${new Date().toISOString()}`;

    return new Response(content, {
      headers: { 
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600" // 1 saatlıq cache
      },
    })
  } catch (error) {
    return new Response(`Error generating llms.txt: ${error.message}`, { status: 500, headers: corsHeaders })
  }
})