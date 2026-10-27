import { useEffect, useState } from 'react';
import { Menu, X, Search, Sun, Moon, User } from 'lucide-react';
import { useRouter } from '../lib/router';
import { useTheme } from '../lib/theme';
import { useAuth } from '../lib/auth';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Drivers', path: '/drivers' },
  { label: 'Teams', path: '/teams' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Standings', path: '/standings' },
  { label: 'Live', path: '/live' },
  { label: 'Legends', path: '/legends' },
  { label: 'History', path: '/history' },
  { label: 'All-Time', path: '/all-time' },
  { label: 'Circuits', path: '/circuits' },
  { label: 'Stats', path: '/stats' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Play Game', path: '/play' },
  { label: 'Rules', path: '/rules' },
  { label: 'Contact', path: '/contact' },
];

interface Props {
  onSearch: () => void;
  onAuth: () => void;
}

export function Navbar({ onSearch, onAuth }: Props) {
  const { route, navigate } = useRouter();
  const { theme, toggle } = useTheme();
  const { profile } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [route.path]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-f1-black/95 backdrop-blur-md' : 'bg-f1-black'}`}>
        {/* Red accent line */}
        <div className="h-[3px] bg-f1-red w-full" />

        <nav className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 shrink-0 group" aria-label="Home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/960px-F1.svg.png"
              alt="Formula 1"
              className="h-7 w-auto transition-transform group-hover:scale-110"
            />
            <span className="font-display font-black text-base md:text-lg tracking-tight hidden sm:block">
              F1 <span className="text-f1-red">ACE</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-link ${route.path === item.path ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={onAuth} aria-label={profile ? 'Account' : 'Sign in'} className="flex items-center gap-2 px-3 h-9 text-sm font-display font-bold uppercase tracking-wider text-f1-silver hover:text-f1-red transition-colors">
              {profile ? (
                <>
                  <div className="w-6 h-6 bg-f1-red flex items-center justify-center font-display font-black text-xs text-white" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
                    {(profile.full_name || profile.email).charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block max-w-[80px] truncate">{profile.full_name?.split(' ')[0] || 'Account'}</span>
                </>
              ) : (
                <>
                  <User size={16} />
                  <span className="hidden sm:block">Sign In</span>
                </>
              )}
            </button>
            <button onClick={onSearch} aria-label="Search" className="w-9 h-9 flex items-center justify-center text-f1-silver hover:text-f1-red transition-colors">
              <Search size={18} />
            </button>
            <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 flex items-center justify-center text-f1-silver hover:text-f1-red transition-colors">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileOpen(v => !v)} aria-label="Menu" className="lg:hidden w-9 h-9 flex items-center justify-center text-f1-silver">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Secondary nav line */}
        <div className="hidden lg:block h-px bg-white/5" />
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute top-[60px] left-0 right-0 bg-f1-black border-t border-white/10 p-4 max-h-[80vh] overflow-y-auto no-scrollbar" onClick={e => e.stopPropagation()}>
            <div className="grid grid-cols-2 gap-1">
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-left px-4 py-3 text-sm font-display font-bold uppercase tracking-wider transition-colors ${route.path === item.path ? 'text-f1-red bg-f1-red/10' : 'text-f1-silver'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
