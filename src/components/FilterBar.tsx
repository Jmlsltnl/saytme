import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Category = Database['public']['Tables']['categories']['Row'];

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export const FilterBar = ({ activeCategory, onCategoryChange }: FilterBarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="sticky top-20 z-40 py-6 mb-8 flex justify-center overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/5 mx-4">
        <button
          onClick={() => onCategoryChange("all")}
          className={cn(
            "px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 whitespace-nowrap",
            activeCategory === "all"
              ? "bg-transparent text-white shadow-[0_0_15px_rgba(0,229,255,0.3)] border border-cyan-500/50 text-shadow-glow"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
          style={activeCategory === "all" ? { textShadow: "0 0 10px rgba(0, 229, 255, 0.5)" } : {}}
        >
          HAMISI
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 whitespace-nowrap",
              activeCategory === cat.slug
                ? `bg-transparent text-${cat.color_theme === 'pink' ? 'pink' : cat.color_theme === 'yellow' ? 'yellow' : 'cyan'}-400 shadow-[0_0_15px_rgba(${cat.color_theme === 'pink' ? '255,0,127' : cat.color_theme === 'yellow' ? '255,215,0' : '0,229,255'},0.3)] border border-${cat.color_theme === 'pink' ? 'pink' : cat.color_theme === 'yellow' ? 'yellow' : 'cyan'}-500/50`
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
            style={activeCategory === cat.slug ? { 
              textShadow: `0 0 10px rgba(${cat.color_theme === 'pink' ? '255,0,127' : cat.color_theme === 'yellow' ? '255,215,0' : '0,229,255'}, 0.5)` 
            } : {}}
          >
            {cat.name_az.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};