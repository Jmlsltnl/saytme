import { User, Github, Linkedin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const FloatingAbout = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed bottom-8 right-8 z-50 flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg group hover:bg-muted transition-all hover:scale-105">
          <span className="text-sm font-medium text-foreground">Haqqımda</span>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary/50 p-[1px]">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-foreground" />
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Marketinq Nümunələri
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Real marketinq strategiyaları və uğur hekayələri.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-start gap-4">
            <div className="min-w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium leading-none text-foreground">Müəllif haqqında</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bu platforma marketinq sahəsindəki ən son tendensiyaları və case study-ləri Azərbaycan dilində oxuculara çatdırmaq üçün yaradılmışdır.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-colors group">
               <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
               <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">GitHub</span>
             </a>
             <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-colors group">
               <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
               <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">LinkedIn</span>
             </a>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary text-center italic">
              "Marketinq məhsulların savaşı deyil, qavrayışların savaşıdır." <br/>
              <span className="opacity-70 mt-1 block not-italic font-semibold">— Al Ries</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};