import { Music, Terminal, Layout, Share2, TrendingUp, Users, Zap, Target, Lightbulb } from "lucide-react";

export const getIconByName = (name: string, className?: string) => {
  // Simple mapping based on potential category themes or specific icon fields
  // In a real app, you might store the icon name in the DB
  switch (name) {
    case "Music": return <Music className={className} />;
    case "Terminal": return <Terminal className={className} />;
    case "Layout": return <Layout className={className} />;
    case "Share2": return <Share2 className={className} />;
    case "TrendingUp": return <TrendingUp className={className} />;
    case "Users": return <Users className={className} />;
    case "Zap": return <Zap className={className} />;
    case "Target": return <Target className={className} />;
    case "Lightbulb": return <Lightbulb className={className} />;
    default: return <Layout className={className} />;
  }
};

export const getIconForCategory = (categorySlug: string, className?: string) => {
  if (categorySlug.includes('social')) return <Users className={className} />;
  if (categorySlug.includes('brand')) return <Target className={className} />;
  if (categorySlug.includes('product')) return <Lightbulb className={className} />;
  if (categorySlug.includes('tech')) return <Terminal className={className} />;
  return <Layout className={className} />;
};