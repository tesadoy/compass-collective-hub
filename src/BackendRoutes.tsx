import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import PortalLayout from "@/components/portal/PortalLayout";
import AdminLayout from "@/components/portal/AdminLayout";
import Auth from "./pages/Auth.tsx";
import PortalProjects from "./pages/portal/PortalProjects.tsx";
import PortalDocuments from "./pages/portal/PortalDocuments.tsx";
import PortalRequests from "./pages/portal/PortalRequests.tsx";
import PortalMessages from "./pages/portal/PortalMessages.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminJobs from "./pages/admin/AdminJobs.tsx";
import AdminContacts from "./pages/admin/AdminContacts.tsx";
import AdminMessages from "./pages/admin/AdminMessages.tsx";

/** Auth screen — backend-backed, mounted at /auth */
export const AuthRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  </AuthProvider>
);

/** Client portal — backend-backed, mounted at /portal */
export const PortalRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<PortalLayout />}>
        <Route index element={<PortalProjects />} />
        <Route path="documents" element={<PortalDocuments />} />
        <Route path="requests" element={<PortalRequests />} />
        <Route path="messages" element={<PortalMessages />} />
      </Route>
    </Routes>
  </AuthProvider>
);

/** Admin console — backend-backed, mounted at /admin */
export const AdminRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminUsers />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  </AuthProvider>
);
