import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Category = Database['public']['Tables']['categories']['Row'];

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export const FilterBar = ({ activeCategory, onCategoryChange }: FilterBarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name_az');
    if (data) setCategories(data);
  };

  return (
    <div className="sticky top-20 z-40 py-6 mb-8 flex justify-center overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-lg whitespace-nowrap">
        <button
          onClick={() => onCategoryChange("all")}
          className={cn(
            "px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300",
            activeCategory === "all"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          HAMISI
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 uppercase",
              activeCategory === cat.slug
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {cat.name_az}
          </button>
        ))}
      </div>
    </div>
  );
};