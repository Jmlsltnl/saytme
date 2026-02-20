import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ghost, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Xətası: İstifadəçi mövcud olmayan səhifəyə daxil olmağa çalışdı:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Background Decor Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      
      <div className="text-center max-w-md mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Animated Icon */}
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
             <Ghost className="w-16 h-16 text-muted-foreground" />
          </div>
          <div className="absolute -bottom-2 w-32 h-4 bg-black/10 blur-md rounded-[100%] mx-auto animate-pulse" />
        </div>

        <div className="space-y-4">
          <h1 className="text-8xl font-black text-primary/20 select-none">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Ups! Yolunu azmısan deyəsən.</h2>
          <p className="text-muted-foreground text-lg">
            Axtardığın səhifə bu qalaktikada (və ya serverdə) mövcud deyil. Ola bilsin ki, silinib və ya ünvan səhv yazılıb.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate(-1)}
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Geri Qayıt
          </Button>
          
          <Button 
            size="lg" 
            onClick={() => navigate("/")}
            className="group"
          >
            <Home className="mr-2 h-4 w-4" />
            Ana Səhifəyə Get
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;