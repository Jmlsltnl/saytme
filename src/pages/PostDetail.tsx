import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { FloatingAbout } from "@/components/FloatingAbout";
import { Database } from "@/integrations/supabase/types";
import { Clock, Calendar, ChevronLeft, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { az } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";
import { BentoCard } from "@/components/BentoCard";
import { getIconForCategory } from "@/utils/icon-mapping";

type Post = Database['public']['Tables']['posts']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row']
};

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<{favicon_url: string | null} | null>(null);

  useEffect(() => {
    if (slug) {
      window.scrollTo(0, 0); // Scroll to top on navigation
      fetchPost(slug);
    }
    fetchSettings();
  }, [slug]);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('favicon_url').single();
    if (data) setSiteSettings(data);
  };

  const fetchPost = async (slug: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          categories:category_id (*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      
      if (data) {
        const currentPost = data as unknown as Post;
        setPost(currentPost);
        fetchRelatedPosts(currentPost.category_id, currentPost.id);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/404');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (categoryId: string, currentPostId: string) => {
     const { data } = await supabase
       .from('posts')
       .select(`*, categories:category_id (*)`)
       .eq('category_id', categoryId)
       .neq('id', currentPostId)
       .limit(4);
     
     if (data) setRelatedPosts(data as unknown as Post[]);
  };

  const handleShare = async () => {
    if (!post) return;
    
    const shareData = {
      title: post.title_az,
      text: post.seo_description || post.title_az,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link kopyalandı!", {
         description: "Dostlarınızla paylaşa bilərsiniz.",
         icon: <Copy className="w-4 h-4" />
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Yüklənir...</div>;
  }

  if (!post) return null;

  // Structured Data (Schema.org) for Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seo_title || post.title_az,
    "description": post.seo_description,
    "image": post.thumbnail_url ? [post.thumbnail_url] : [],
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "author": {
      "@type": "Organization",
      "name": "Sayt.me"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sayt.me",
      "logo": {
        "@type": "ImageObject",
        "url": window.location.origin + "/placeholder.svg" // Fallback or dynamic logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Səhifə",
      "item": window.location.origin
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": post.categories?.name_az || "Blog",
      "item": `${window.location.origin}/?category=${post.categories?.slug}`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": post.title_az
    }]
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
      <SEO 
        title={post.seo_title || post.title_az}
        description={post.seo_description || ""}
        image={post.thumbnail_url || undefined}
        slug={`post/${post.slug}`}
        type="article"
        publishedTime={post.published_at}
        modifiedTime={post.updated_at}
        schema={[articleSchema, breadcrumbSchema]}
        favicon={siteSettings?.favicon_url || undefined}
      />

      <Navbar />
      <FloatingAbout />

      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-32">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-8 pl-0 gap-2 hover:bg-transparent hover:text-primary"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-4 h-4" />
          Ana səhifəyə qayıt
        </Button>

        {/* Hero Section */}
        <div className="space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium">
              {post.categories?.name_az || 'Kateqoriya'}
            </span>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{post.read_time_az}</span>
            </div>
            {post.published_at && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.published_at), "d MMMM yyyy", { locale: az })}</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            {post.title_az}
          </h1>
        </div>

        {/* Featured Image */}
        {post.thumbnail_url && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border border-border shadow-lg animate-in zoom-in-95 duration-700 delay-100">
            <img 
              src={post.thumbnail_url} 
              alt={post.title_az}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        {/* Added break-words, w-full, overflow-hidden to fix responsiveness */}
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-img:w-full animate-in fade-in duration-700 delay-200 break-words w-full overflow-hidden">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content_html }} 
          />
        </article>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
          <span className="text-muted-foreground font-medium">Bu məqaləni paylaş:</span>
          <Button variant="outline" size="icon" className="rounded-full" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border">
             <h3 className="text-2xl font-bold mb-8">Oxşar Məqalələr</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                   <Link to={`/post/${related.slug}`} key={related.id} className="block h-[300px]">
                      <BentoCard 
                        title={related.title_az}
                        category={related.categories?.name_az || "Blog"}
                        readTime={related.read_time_az || "3 dəq"}
                        image={related.thumbnail_url || undefined}
                        size="standard"
                        icon={related.card_size === 'square' ? getIconForCategory(related.categories?.slug || '') : undefined}
                        className="h-full"
                      />
                   </Link>
                ))}
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default PostDetail;