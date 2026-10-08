import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";

const SiteLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
