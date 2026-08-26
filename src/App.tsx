import { useEffect, useState } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { ThemeProvider } from './lib/theme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SearchModal } from './components/SearchModal';
import { ParticleBackground } from './components/ParticleBackground';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HomePage } from './pages/HomePage';
import { DriversPage } from './pages/DriversPage';
import { TeamsPage } from './pages/TeamsPage';
import { CalendarPage } from './pages/CalendarPage';
import { StandingsPage } from './pages/StandingsPage';
import { LivePointsPage } from './pages/LivePointsPage';
import { LegendsPage } from './pages/LegendsPage';
import { HistoryPage } from './pages/HistoryPage';
import { CircuitsPage } from './pages/CircuitsPage';
import { StatsPage } from './pages/StatsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AllTimePage } from './pages/AllTimePage';
import { PlayGamePage } from './pages/PlayGamePage';

function AppContent() {
  const { route } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  const renderPage = () => {
    switch (route.path) {
      case '/': return <HomePage />;
      case '/drivers': return <DriversPage />;
      case '/teams': return <TeamsPage />;
      case '/calendar': return <CalendarPage />;
      case '/standings': return <StandingsPage />;
      case '/live': return <LivePointsPage />;
      case '/legends': return <LegendsPage />;
      case '/history': return <HistoryPage />;
      case '/circuits': return <CircuitsPage />;
      case '/stats': return <StatsPage />;
      case '/gallery': return <GalleryPage />;
      case '/contact': return <ContactPage />;
      case '/all-time': return <AllTimePage />;
      case '/play': return <PlayGamePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={() => setSearchOpen(true)} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <ScrollToTop />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function App() {
  const [welcomeDone, setWelcomeDone] = useState(() => {
    return sessionStorage.getItem('f1-welcome-seen') === 'true';
  });

  useEffect(() => {
    if (welcomeDone) {
      sessionStorage.setItem('f1-welcome-seen', 'true');
    }
  }, [welcomeDone]);

  return (
    <ThemeProvider>
      <RouterProvider>
        <ParticleBackground />
        {!welcomeDone && <WelcomeScreen onComplete={() => setWelcomeDone(true)} />}
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;
