import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/layout/SiteLayout";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";

// Keep the home page immediate; other public pages load only when visited.
const About = lazy(() => import("./pages/About.tsx"));
const Divisions = lazy(() => import("./pages/Divisions.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const Privacy = lazy(() => import("./pages/legal/Privacy.tsx"));
const Terms = lazy(() => import("./pages/legal/Terms.tsx"));

// Backend-backed areas (auth, client portal, admin) are preserved and lazy-loaded,
// so the public site never initializes the backend client.
const AuthRoutes = lazy(() => import("./BackendRoutes.tsx").then((m) => ({ default: m.AuthRoutes })));
const PortalRoutes = lazy(() => import("./BackendRoutes.tsx").then((m) => ({ default: m.PortalRoutes })));
const AdminRoutes = lazy(() => import("./BackendRoutes.tsx").then((m) => ({ default: m.AdminRoutes })));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true }}>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/divisions" element={<Divisions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/legal/terms" element={<Terms />} />
          </Route>
          <Route
            path="/auth/*"
            element={
              <Suspense fallback={null}>
                <AuthRoutes />
              </Suspense>
            }
          />
          <Route
            path="/portal/*"
            element={
              <Suspense fallback={null}>
                <PortalRoutes />
              </Suspense>
            }
          />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={null}>
                <AdminRoutes />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
