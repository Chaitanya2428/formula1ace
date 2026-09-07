import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Users, Car, Flag, ChevronRight, Trophy, Gauge, Zap } from 'lucide-react';
import { useRouter } from '../lib/router';
import { Reveal } from '../components/Reveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { drivers } from '../data/drivers';
import { teams } from '../data/teams';
import { races } from '../data/races';
import { driverStandings } from '../data/standings';

const heroImage = '/images/teams/cars/mercedes_(2).jpg';
const newsImages = [
  'https://images.pexels.com/photos/13641535/pexels-photo-13641535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29283584/pexels-photo-29283584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28680795/pexels-photo-28680795.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/14809396/pexels-photo-14809396.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31991104/pexels-photo-31991104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const newsArticles = [
  { tag: 'Feature', title: 'Leclerc triumphs at Monza as Ferrari roar to Italian Grand Prix glory', excerpt: 'The Ferrari driver delivered a masterclass in front of the Tifosi, holding off championship leader Antonelli in a thrilling Italian Grand Prix.', image: newsImages[0] },
  { tag: 'Analysis', title: 'What will Verstappen do next amid Red Bull struggles?', excerpt: 'With Red Bull trailing Mercedes and Ferrari, the four-time champions future is the talk of the paddock.', image: newsImages[1] },
  { tag: 'Report', title: 'How improving Hadjar is learning from Verstappen', excerpt: 'The French rookie is finding his feet at Red Bull alongside the four-time champion.', image: newsImages[2] },
  { tag: 'Feature', title: '10 of Ferraris most iconic triumphs on their path to 250 F1 wins', excerpt: 'From Fangio to Leclerc, we look back at the Scuderias greatest victories.', image: newsImages[3] },
  { tag: 'Report', title: 'How Cadillac have shown they are gaining on the F1 midfield', excerpt: 'The American teams improved pace at Silverstone proved they are closing the gap.', image: newsImages[4] },
];

const videoHighlights = [
  { title: 'Race Highlights: 2026 Italian Grand Prix', duration: '8:05', image: newsImages[0] },
  { title: 'Qualifying Highlights: 2026 Italian Grand Prix', duration: '7:56', image: newsImages[1] },
  { title: 'Top 10 Onboard Moments: 2026 Italian Grand Prix', duration: '14:48', image: newsImages[2] },
  { title: 'Jolyon Palmers Analysis: Leclercs Monza masterclass for Ferrari', duration: '16:19', image: newsImages[3] },
];

export function HomePage() {
  const { navigate } = useRouter();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const nextRace = races.find(r => new Date(r.date).getTime() > Date.now()) ?? races[0];
  const topDrivers = driverStandings.slice(0, 3);

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="F1 Racing" className={`w-full h-full object-cover transition-opacity duration-1000 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-f1-black via-f1-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-f1-black/80 via-transparent to-transparent" />
        </div>

        {/* Red accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-f1-red z-10" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 animate-fade-in">
              <span className="f1-tag">2026 Season</span>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-f1-silver">Round 16 of 24</span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-balance animate-fade-in-up">
              Welcome to<br /><span className="text-f1-red">Formula One Ace</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-f1-silver max-w-xl animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              Everything about Formula 1 in one place.
            </p>
            <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <p className="font-display font-bold text-lg md:text-xl text-red italic">
                "Lewis, remember who you are mate"
              </p>
              <p className="font-display font-bold text-base md:text-lg text-white italic mt-1">
                "You know what that is?? Simply. Lovely!"
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => navigate('/drivers')} className="btn-f1 group">
                Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/calendar')} className="btn-f1-outline">
                <Calendar size={16} /> Race Calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT RACE COUNTDOWN BAR */}
      <section className="bg-f1-carbon border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{nextRace.flag}</div>
            <div>
              <div className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-f1-red">Next Race</div>
              <div className="font-display font-bold text-lg">{nextRace.name}</div>
              <div className="text-xs text-f1-silver">{nextRace.circuit}</div>
            </div>
          </div>
          <NextRaceCountdown targetDate={nextRace.date} />
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-12 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Reveal delay={0}><AnimatedCounter value={2026} label="Current Season" icon={<Calendar size={16} />} /></Reveal>
          <Reveal delay={80}><AnimatedCounter value={teams.length} label="Number of Teams" icon={<Car size={16} />} /></Reveal>
          <Reveal delay={160}><AnimatedCounter value={drivers.length} label="Number of Drivers" icon={<Users size={16} />} /></Reveal>
          <Reveal delay={240}><AnimatedCounter value={races.length} label="Grand Prix Races" icon={<Flag size={16} />} /></Reveal>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="f1-section-header">
          <h2 className="f1-section-title">Latest News</h2>
          <button className="f1-section-link">View All <ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured article (spans 2 cols on lg) */}
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <article className="f1-card h-full group cursor-pointer overflow-hidden" onClick={() => navigate('/standings')}>
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img src={newsArticles[0].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-4 left-4 f1-tag">{newsArticles[0].tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-xl md:text-2xl group-hover:text-f1-red transition-colors mb-2">{newsArticles[0].title}</h3>
                <p className="text-sm text-f1-silver">{newsArticles[0].excerpt}</p>
              </div>
            </article>
          </Reveal>
          {/* Side articles */}
          {newsArticles.slice(1, 5).map((article, i) => (
            <Reveal key={i} delay={i * 60}>
              <article className="f1-card group cursor-pointer overflow-hidden h-full" onClick={() => navigate('/standings')}>
                <div className="relative h-32 overflow-hidden">
                  <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 f1-tag text-[9px]">{article.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm group-hover:text-f1-red transition-colors leading-snug">{article.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STANDINGS WIDGET */}
      <section className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="f1-section-header">
          <h2 className="f1-section-title">2026 Standings</h2>
          <button onClick={() => navigate('/standings')} className="f1-section-link">View Full Standings <ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Top 3 driver cards */}
          {topDrivers.map((s, i) => {
            const driver = drivers.find(d => d.id === s.driverId);
            return (
              <Reveal key={s.position} delay={i * 80}>
                <button onClick={() => navigate('/standings')} className="f1-card w-full text-left group overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${s.color}40, transparent)` }} />
                    {driver && <img src={driver.photo} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-3 right-3 font-display font-black text-4xl text-white/20">{s.position}</div>
                    <div className="absolute bottom-3 left-4">
                      <div className="font-display font-bold text-lg group-hover:text-f1-red transition-colors">{s.name}</div>
                      <div className="text-xs text-f1-silver">{s.team}</div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-display font-black text-2xl text-f1-red">{s.points}</div>
                      <div className="text-[10px] uppercase tracking-wider text-f1-silver">Points</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-lg">{s.wins}</div>
                      <div className="text-[10px] uppercase tracking-wider text-f1-silver">Wins</div>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* VIDEO HIGHLIGHTS */}
      <section className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="f1-section-header">
          <h2 className="f1-section-title">2026 Highlights</h2>
          <button className="f1-section-link">View All <ChevronRight size={16} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videoHighlights.map((v, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="f1-card group cursor-pointer overflow-hidden">
                <div className="relative h-32 md:h-36 overflow-hidden">
                  <img src={v.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] font-mono">{v.duration}</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-f1-red flex items-center justify-center">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="white"><path d="M0 0 L14 8 L0 16 Z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-display font-bold text-xs group-hover:text-f1-red transition-colors leading-snug">{v.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPLORE GRID */}
      <section className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="f1-section-header">
          <h2 className="f1-section-title">Explore F1 Ace</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Drivers', icon: <Users size={24} />, path: '/drivers' },
            { title: 'Teams', icon: <Car size={24} />, path: '/teams' },
            { title: 'Calendar', icon: <Calendar size={24} />, path: '/calendar' },
            { title: 'Standings', icon: <Trophy size={24} />, path: '/standings' },
            { title: 'Legends', icon: <Zap size={24} />, path: '/legends' },
            { title: 'Circuits', icon: <Flag size={24} />, path: '/circuits' },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 50}>
              <button onClick={() => navigate(card.path)} className="f1-card w-full p-5 text-left group h-full">
                <div className="w-12 h-12 bg-f1-red/10 flex items-center justify-center text-f1-red mb-3 group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="font-display font-bold text-sm group-hover:text-f1-red transition-colors">{card.title}</h3>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SPEED STATS */}
      <section className="py-8 px-4 md:px-6 max-w-[1400px] mx-auto">
        <Reveal>
          <div className="f1-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
              <div>
                <div className="relative inline-block">
                  <svg width="140" height="140" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#E10600" strokeWidth="6" strokeLinecap="round" strokeDasharray="440" strokeDashoffset="110" transform="rotate(-90 80 80)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Gauge size={24} className="text-f1-red mb-1" />
                    <span className="font-display font-black text-2xl text-f1-red">340</span>
                    <span className="text-[10px] uppercase tracking-wider text-f1-silver">km/h</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-f1-silver uppercase tracking-wider">Top Speed</p>
              </div>
              <div>
                <div className="font-mono text-4xl md:text-5xl font-bold text-white tabular-nums">1:23<span className="text-f1-red">.</span>456</div>
                <p className="mt-3 text-xs text-f1-silver uppercase tracking-wider">Fastest Lap Time</p>
              </div>
              <div>
                <div className="font-display font-black text-4xl md:text-5xl text-f1-red">6G</div>
                <p className="mt-3 text-xs text-f1-silver uppercase tracking-wider">Peak Cornering Force</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function NextRaceCountdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {[{ l: 'Days', v: time.days }, { l: 'Hrs', v: time.hours }, { l: 'Min', v: time.minutes }, { l: 'Sec', v: time.seconds }].map(t => (
        <div key={t.l} className="text-center">
          <div className="w-14 h-14 bg-f1-grey flex items-center justify-center font-display font-black text-xl text-f1-red tabular-nums">
            {String(t.v).padStart(2, '0')}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-f1-silver mt-1">{t.l}</div>
        </div>
      ))}
    </div>
  );
}
