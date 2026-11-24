import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <div className="min-h-[100svh] lg:min-h-screen flex flex-col bg-[#0E0C0A] text-[#0E0C0A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:bg-[#B8793A] focus:text-[#0E0C0A] focus:font-bold focus:px-4 focus:py-2 focus:rounded-[4px]"
      >
        Skip to main content
      </a>

      <ScrollToTop />

      <AnnouncementBar
        visible={showAnnouncement}
        onDismiss={() => setShowAnnouncement(false)}
      />

      <Navbar hasAnnouncement={showAnnouncement} />

      <main id="main-content" className="relative z-10 flex-1 bg-[#0E0C0A]">
        <Outlet />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
