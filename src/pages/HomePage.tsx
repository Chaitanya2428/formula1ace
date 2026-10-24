import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Users, Car, Flag, ChevronRight, Trophy, Gauge, Zap, Crown, Edit3, Code2, Palette, PenTool, BookOpen, Scale, Fuel, Cog, ShieldCheck, Timer, Wrench, Wind, Plus, Minus } from 'lucide-react';
import { useRouter } from '../lib/router';
import { Reveal } from '../components/Reveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { drivers } from '../data/drivers';
import { teams } from '../data/teams';
import { races } from '../data/races';
import { driverStandings } from '../data/standings';

const heroImage = '/images/teams/cars/mercedes_(2).jpg';
const newsImages = [
  'https://images.pexels.com/photos/29252129/pexels-photo-29252129.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35219022/pexels-photo-35219022.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/39347624/pexels-photo-39347624.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13857975/pexels-photo-13857975.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28680795/pexels-photo-28680795.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const newsArticles = [
  { tag: 'Race Report', title: 'Verstappen conquers Singapore as Red Bull triumphs at Marina Bay', excerpt: 'Max Verstappen claimed his second win of the 2026 season at the Singapore Grand Prix, mastering the wet conditions at Marina Bay to finish ahead of Charles Leclerc and championship leader Kimi Antonelli in a thrilling race.', image: newsImages[0] },
  { tag: 'Analysis', title: 'Leclerc back on the podium — Ferraris P2 keeps pressure on Mercedes', excerpt: 'Charles Leclercs second place in Singapore kept Ferrari in the fight, but Mercedes championship lead of 134 points looks increasingly unassailable with six rounds remaining.', image: newsImages[1] },
  { tag: 'Feature', title: 'Antonelli extends lead to 102 points despite P3 in Singapore', excerpt: 'Kimi Antonelli finished third at Marina Bay but still stretched his drivers championship lead to 102 points as title rival George Russell could only manage ninth.', image: newsImages[2] },
  { tag: 'Report', title: 'Sprint drama — Verstappen wins rain-hit Singapore Sprint as Russell crashes out', excerpt: 'The Singapore sprint race delivered chaos as Max Verstappen won a rain-shortened sprint, with George Russell crashing out and the McLarens colliding in a dramatic afternoon.', image: newsImages[3] },
  { tag: 'Analysis', title: 'Red Bull close the gap to McLaren — constructors battle intensifies', excerpt: 'Max Verstappens win and Isack Hadjars points finish at Singapore slashed Red Bulls deficit to McLaren to just seven points in the constructors standings with six races to go.', image: newsImages[4] },
];

const videoHighlights = [
  { title: 'Race Highlights: 2026 Singapore Grand Prix', duration: '9:12', image: newsImages[0] },
  { title: 'Sprint Highlights: 2026 Singapore GP', duration: '7:38', image: newsImages[1] },
  { title: 'Top 10 Onboard Moments: Marina Bay Circuit', duration: '13:05', image: newsImages[2] },
  { title: 'Verstappen interview: Best win of the season', duration: '5:33', image: newsImages[3] },
];

const fiaRegulations = [
  {
    icon: Cog,
    title: 'Power Unit & Engine Rules',
    summary: 'The 2026 regulations usher in a new era of hybrid power units.',
    points: [
      '50% electric / 50% combustion power split — a massive increase from the current 20% electric ratio.',
      '1.6L turbo-hybrid V6 internal combustion engine remains, but with simplified and cleaner combustion.',
      'Removal of the MGU-H (heat energy recovery) — only the MGU-K (kinetic energy recovery) stays.',
      'Electric motor boosts up to 400 kW (approx. 536 hp), nearly triple the current electric output.',
      'Sustainable fuel mandate: 100% advanced sustainable fuel with no new fossil carbon.',
      'Power unit life extended — each driver must use no more than 3 engines per season (down from 4).',
    ],
  },
  {
    icon: Wind,
    title: 'Aerodynamics & Car Design',
    summary: 'Smaller, lighter cars designed to enable closer racing.',
    points: [
      'Car weight reduced by approximately 30 kg — minimum weight drops to 768 kg.',
      'Car width reduced by 100 mm and wheelbase shortened by 150 mm for more nimble handling.',
      'Active aerodynamics introduced — front and rear wings adjust automatically to reduce drag on straights.',
      'Downforce reduced by approximately 30% to promote closer wheel-to-wheel racing.',
      'Moveable aero modes: "Z-mode" for low drag on straights, "X-mode" for high downforce in corners.',
      'Wheel covers banned and smaller front wings (narrower by 50 mm) to reduce dirty air.',
    ],
  },
  {
    icon: Fuel,
    title: 'Fuel & Sustainability',
    summary: 'Formula 1 goes fully sustainable in 2026.',
    points: [
      '100% sustainable fuel — derived from non-food bio-sources or carbon capture technology.',
      'Fuel tank capacity reduced to 200 kg (down from ~110 kg) due to higher engine efficiency.',
      'No refuelling during races remains the rule — all fuel must last the full race distance.',
      'Net-zero carbon footprint target by 2030 across all F1 operations.',
      'Power unit manufacturers must source sustainable fuel from FIA-approved suppliers only.',
    ],
  },
  {
    icon: Timer,
    title: 'Sprint Races & Weekend Format',
    summary: 'Sprint races return with refined rules for 2026.',
    points: [
      '6 sprint races per season (up from 6 in 2025, held at designated rounds).',
      'Sprint race distance: approximately 100 km or 30 minutes, whichever comes first.',
      'Sprint qualifying sets the sprint grid — held on Friday, replacing traditional FP2.',
      'Sprint races award points: P1 gets 8 points, down to P8 who gets 1 point.',
      'Sprint race result no longer sets the grid for Sundays main Grand Prix — qualifying is standalone.',
    ],
  },
  {
    icon: Scale,
    title: 'Points System & Scoring',
    summary: 'How championship points are awarded in 2026.',
    points: [
      'Race points: 25-18-15-12-10-8-6-4-2-1 for the top 10 finishers.',
      'Fastest lap bonus: 1 point for the fastest lap, but only if the driver finishes in the top 10.',
      'Sprint race points: 8-7-6-5-4-3-2-1 for the top 8 finishers.',
      'Constructors championship sums both drivers points across all races.',
      'Ties broken by countback of race wins, then second places, etc.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Penalties & Stewards',
    summary: 'FIA stewards enforce the rules with clear penalty guidelines.',
    points: [
      '5-second time penalty: minor offences (e.g., track limits, minor contact).',
      '10-second time penalty: moderate offences (e.g., unsafe release, causing a collision).',
      '10-second stop-and-go penalty: serious offences (e.g., ignoring blue flags, dangerous driving).',
      'Drive-through penalty: must enter pit lane within 3 laps of being issued.',
      'Grid penalties: carried over to the next race if served during race is not possible.',
      'Penalty points on super licence: 12 points in 12 months = automatic 1-race ban.',
    ],
  },
  {
    icon: Wrench,
    title: 'Tyres, Testing & Budget Cap',
    summary: 'Sporting regulations around tyres, testing and costs.',
    points: [
      'Tyre supplier Pirelli provides slick tyres in 5 dry compounds (C0–C4) plus intermediates and wets.',
      'Each driver gets 13 sets of dry tyres per weekend (down from 13, with allocation flexibility).',
      'No tyre blankets from 2026 — teams must manage tyre temperatures on-track.',
      'Pre-season testing limited to 3 days at one circuit (typically Bahrain).',
      'In-season testing heavily restricted — only young driver tests and Pirelli tyre tests allowed.',
      'Budget cap: $135 million per team per year (excluding driver salaries and marketing costs).',
    ],
  },
  {
    icon: BookOpen,
    title: 'Race Weekend Basics',
    summary: 'New to F1? Heres how a Grand Prix weekend works.',
    points: [
      'Free Practice 1 (FP1): Friday — 60-minute session for teams to test setups and gather data.',
      'Sprint Qualifying: Friday — 100 km shootout race that sets the sprint grid (sprint rounds only).',
      'Free Practice 2 (FP2): Saturday morning — final practice before qualifying.',
      'Qualifying: Saturday — 3 knockout sessions (Q1: 18 min, Q2: 15 min, Q3: 12 min) setting the race grid.',
      'Sprint Race: Saturday afternoon (sprint rounds only) — 100 km dash for points.',
      'Grand Prix: Sunday — the main race, typically 305 km or 2 hours, whichever comes first.',
      'Grid formation: Cars line up in qualifying order; pole position on the clean side of the track.',
      'Race start: Standing start from the grid; if conditions are too wet, a rolling start behind the safety car.',
    ],
  },
];

const creators = [
  { name: 'Chaitanaya', id: '24030-CM-175', role: 'Creator', icon: Crown, quote: 'If you no longer go for a gap that exists, you are no longer a racing driver.' },
  { name: 'Prasanth', id: '24030-CM-174', role: 'Editor', icon: Edit3, quote: 'The car is the art. The driver is the artist. The track is the canvas.' },
  { name: 'Jagadeesh', id: '24030-CM-167', role: 'Developer', icon: Code2, quote: 'Racing is life. Anything that happens before or after is just waiting.' },
  { name: 'Veerendra', id: '24030-CM-177', role: 'Designer', icon: Palette, quote: 'Speed is not just about going fast. It is about controlling the chaos.' },
  { name: 'Jeevan', id: '24030-CM-168', role: 'Content Writer', icon: PenTool, quote: 'Champions are made from something deep inside them — a desire, a dream, a vision.' },
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
              <span className="text-xs font-display font-bold uppercase tracking-wider text-f1-silver">Round 19 of 24</span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-balance animate-fade-in-up">
              Welcome to<br /><span className="text-f1-red">Formula One Ace</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-f1-silver max-w-xl animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              Everything about Formula 1 in one place.
            </p>
            <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <p className="font-display font-bold text-lg md:text-xl text-white italic">
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

      {/* FIA REGULATIONS & F1 BASICS */}
      <section className="py-12 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="f1-section-header">
          <h2 className="f1-section-title">2026 FIA Regulations & F1 Basics</h2>
          <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-f1-silver">Official Rulebook</span>
        </div>
        <p className="text-sm text-f1-silver mb-6 max-w-3xl">
          The 2026 season marks the biggest regulation overhaul in a generation. New hybrid power units, smaller and lighter cars, active aerodynamics, and 100% sustainable fuel redefine what a Formula 1 car can be. Tap any topic to explore the rules.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fiaRegulations.map((reg, i) => (
            <RegulationCard key={i} reg={reg} delay={i * 60} />
          ))}
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-12 px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="f1-section-header">
          <h2 className="f1-section-title">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {creators.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.id} delay={i * 60}>
                <div className="f1-card p-5 h-full group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-f1-red/5 rounded-full -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 bg-f1-red/10 flex items-center justify-center text-f1-red group-hover:scale-110 transition-transform">
                        <Icon size={20} />
                      </div>
                      <span className="f1-tag text-[9px]">{c.role}</span>
                    </div>
                    <h3 className="font-display font-black text-lg leading-tight group-hover:text-f1-red transition-colors">{c.name}</h3>
                    <p className="text-[10px] font-mono text-f1-silver mt-0.5 mb-3">{c.id}</p>
                    <div className="border-l-2 border-f1-red pl-3">
                      <p className="text-xs italic text-f1-silver leading-relaxed">"{c.quote}"</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
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

function RegulationCard({ reg, delay }: { reg: typeof fiaRegulations[number]; delay: number }) {
  const [open, setOpen] = useState(false);
  const Icon = reg.icon;
  return (
    <Reveal delay={delay}>
      <div className="f1-card overflow-hidden h-full">
        <button
          onClick={() => setOpen(!open)}
          className="w-full p-5 flex items-start gap-4 text-left group"
        >
          <div className="w-11 h-11 shrink-0 bg-f1-red/10 flex items-center justify-center text-f1-red group-hover:scale-110 transition-transform">
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-sm group-hover:text-f1-red transition-colors leading-tight">{reg.title}</h3>
            <p className="text-xs text-f1-silver mt-1">{reg.summary}</p>
          </div>
          <div className="shrink-0 text-f1-silver group-hover:text-f1-red transition-colors">
            {open ? <Minus size={18} /> : <Plus size={18} />}
          </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="px-5 pb-5 pt-0 space-y-2.5">
            {reg.points.map((point, j) => (
              <li key={j} className="flex items-start gap-2.5 text-xs text-f1-silver leading-relaxed">
                <span className="text-f1-red font-mono font-bold shrink-0 mt-0.5">{String(j + 1).padStart(2, '0')}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
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
