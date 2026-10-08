import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useLayoutEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const SiteLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <ScrollToTop />
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
