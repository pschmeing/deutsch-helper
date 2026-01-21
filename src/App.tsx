import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const sectionRoutes = ["home", "team", "leistungen", "kontakt", "standort"] as const;
const sectionRouteSet = new Set(sectionRoutes);

const ScrollToSection = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const target = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    if (!sectionRouteSet.has(target as (typeof sectionRoutes)[number])) {
      return;
    }
    const element = document.getElementById(target);
    if (!element) return;
    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth" });
    });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollToSection />
        <Routes>
          <Route path="/" element={<Index />} />
          {sectionRoutes.map((section) => (
            <Route key={section} path={`/${section}`} element={<Index />} />
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
