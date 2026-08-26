
import { useRouter } from '../lib/router';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-f1-black border-t border-white/10 mt-20">
      {/* Red line */}
      <div className="h-[3px] bg-f1-red w-full" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/960px-F1.svg.png"
                alt="Formula 1"
                className="h-6 w-auto"
              />
              <span className="font-display font-black text-lg">F1 <span className="text-f1-red">ACE</span></span>
            </div>
            <p className="text-sm text-f1-silver leading-relaxed max-w-xs">
              Everything about Formula 1 in one place. Your ultimate fan portal for drivers, teams, races, and history.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-3 text-f1-red">Explore</h4>
            <ul className="space-y-2 text-sm text-f1-silver">
              <li><button onClick={() => navigate('/drivers')} className="hover:text-white transition-colors">Drivers</button></li>
              <li><button onClick={() => navigate('/teams')} className="hover:text-white transition-colors">Teams</button></li>
              <li><button onClick={() => navigate('/calendar')} className="hover:text-white transition-colors">Calendar</button></li>
              <li><button onClick={() => navigate('/standings')} className="hover:text-white transition-colors">Standings</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-3 text-f1-red">More</h4>
            <ul className="space-y-2 text-sm text-f1-silver">
              <li><button onClick={() => navigate('/legends')} className="hover:text-white transition-colors">Legends</button></li>
              <li><button onClick={() => navigate('/history')} className="hover:text-white transition-colors">History</button></li>
              <li><button onClick={() => navigate('/circuits')} className="hover:text-white transition-colors">Circuits</button></li>
              <li><button onClick={() => navigate('/stats')} className="hover:text-white transition-colors">Stats</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-3 text-f1-red">Info</h4>
            <ul className="space-y-2 text-sm text-f1-silver">
              <li><button onClick={() => navigate('/gallery')} className="hover:text-white transition-colors">Gallery</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-f1-silver">
            © {new Date().getFullYear()} Formula One Ace. A fan-made project. Not affiliated with Formula 1.
          </p>
          <p className="text-xs text-f1-silver">Built with passion for the sport.</p>
        </div>
      </div>
    </footer>
  );
}
