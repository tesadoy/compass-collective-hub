import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/layout/SiteLayout";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Divisions from "./pages/Divisions.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";
import Careers from "./pages/Careers.tsx";
import Privacy from "./pages/legal/Privacy.tsx";
import Terms from "./pages/legal/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";

// Backend-backed areas (auth, client portal, admin) are preserved and lazy-loaded,
// so the public site never initializes the backend client.
const BackendRoutes = lazy(() => import("./BackendRoutes.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
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
                <BackendRoutes />
              </Suspense>
            }
          />
          <Route
            path="/portal/*"
            element={
              <Suspense fallback={null}>
                <BackendRoutes />
              </Suspense>
            }
          />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={null}>
                <BackendRoutes />
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
