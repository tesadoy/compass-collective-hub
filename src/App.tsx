import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import SiteLayout from "@/components/layout/SiteLayout";
import PortalLayout from "@/components/portal/PortalLayout";
import AdminLayout from "@/components/portal/AdminLayout";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Divisions from "./pages/Divisions.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";
import Insights from "./pages/Insights.tsx";
import Careers from "./pages/Careers.tsx";
import Auth from "./pages/Auth.tsx";
import PortalProjects from "./pages/portal/PortalProjects.tsx";
import PortalDocuments from "./pages/portal/PortalDocuments.tsx";
import PortalRequests from "./pages/portal/PortalRequests.tsx";
import PortalMessages from "./pages/portal/PortalMessages.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminContacts from "./pages/admin/AdminContacts.tsx";
import AdminMessages from "./pages/admin/AdminMessages.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/divisions" element={<Divisions />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/careers" element={<Careers />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/portal" element={<PortalLayout />}>
              <Route index element={<PortalProjects />} />
              <Route path="documents" element={<PortalDocuments />} />
              <Route path="requests" element={<PortalRequests />} />
              <Route path="messages" element={<PortalMessages />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminUsers />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
