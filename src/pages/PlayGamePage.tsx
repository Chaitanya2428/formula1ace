import { useState, useMemo } from 'react';
import { useRouter } from '../lib/router';
import { Flag, Trophy, Gamepad2, ExternalLink, Star, Users, Zap, Gauge, Search, ArrowLeft } from 'lucide-react';

interface GameLink {
  id: string;
  title: string;
  url: string;
  desc: string;
  tags: string[];
  type: '3D' | '2D' | 'Arcade' | 'Sim' | 'Manager';
  players: 'Single' | 'Multiplayer';
  rating: number;
  img: string;
  featured?: boolean;
}

const GAMES: GameLink[] = [
  {
    id: 'crazy-grand-prix',
    title: 'Crazy Grand Prix',
    url: 'https://www.crazygames.com/game/crazy-grand-prix',
    desc: 'Full 3D Formula 1 racing with career mode, practice, and multiplayer. Recruit a teammate, win races, earn prize money, and upgrade your car. One of the most complete browser F1 games.',
    tags: ['3D', 'Career', 'Multiplayer', 'Upgrades'],
    type: '3D',
    players: 'Multiplayer',
    rating: 9.1,
    img: 'https://images.pexels.com/photos/28680795/pexels-photo-28680795.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'grand-prix-hero',
    title: 'Grand Prix Hero',
    url: 'https://poki.com/en/g/grand-prix-hero',
    desc: 'Race across iconic global tracks from Monaco to Silverstone. Dodge traffic, collect coins, hit speed boosts, and upgrade your car to climb the podium.',
    tags: ['Arcade', 'Upgrades', 'Coins'],
    type: 'Arcade',
    players: 'Single',
    rating: 8.7,
    img: 'https://images.pexels.com/photos/29252129/pexels-photo-29252129.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'formula-racers',
    title: 'Formula Racers',
    url: 'https://www.mortgagecalculator.org/money-games/formula-racers',
    desc: 'A simple, fast F1 racing game with 10 fun tracks. Control your car with WASD or arrow keys and avoid collisions. Great for quick races.',
    tags: ['2D', '10 Tracks', 'Keyboard'],
    type: '2D',
    players: 'Single',
    rating: 8.2,
    img: 'https://images.pexels.com/photos/38184115/pexels-photo-38184115.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'flatspot',
    title: 'Flatspot',
    url: 'https://www.flatspot.club/',
    desc: 'A tiny, lightweight Formula 1-themed browser game that takes about 7-8 minutes to finish. Free, no sign-up, perfect for a quick session during a calendar break.',
    tags: ['Indie', 'Quick Play', 'No Sign-up'],
    type: 'Sim',
    players: 'Single',
    rating: 8.0,
    img: 'https://images.pexels.com/photos/29309753/pexels-photo-29309753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'f1-games-playgama',
    title: 'F1 Games Collection',
    url: 'https://playgama.com/series/formula-1-games',
    desc: 'A full series of 8+ Formula 1 games you can play online for free. Compete with friends and master different tracks across the collection.',
    tags: ['Collection', '8+ Games', 'Free'],
    type: 'Arcade',
    players: 'Single',
    rating: 7.9,
    img: 'https://images.pexels.com/photos/35219022/pexels-photo-35219022.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'miniplay-f1',
    title: 'Formula 1 Games - Miniplay',
    url: 'https://www.miniplay.com/formula-1-games',
    desc: 'A large library of F1 games including Formula Speed, Monaco Grand Prix, Grand Race, and more. Compete for the best lap times across multiple titles.',
    tags: ['Library', 'Multiple Titles', 'Lap Times'],
    type: 'Arcade',
    players: 'Single',
    rating: 7.7,
    img: 'https://images.pexels.com/photos/31331378/pexels-photo-31331378.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'itch-f1',
    title: 'Free F1 Games - itch.io',
    url: 'https://itch.io/games/free/tag-f1',
    desc: 'A community-driven collection of free indie F1 games, including text-based simulators, 2-player racers, and experimental titles.',
    tags: ['Indie', 'Free', 'Community'],
    type: '2D',
    players: 'Multiplayer',
    rating: 7.5,
    img: 'https://images.pexels.com/photos/13857975/pexels-photo-13857975.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'f1-official',
    title: 'Official F1 Gaming Hub',
    url: 'https://www.formula1.com/en/page/gaming',
    desc: 'The official Formula 1 gaming page featuring F1 Fantasy, F1 Predict, F1 Trivia, F1 Sim Racing, and info on EA SPORTS F1 25.',
    tags: ['Official', 'Fantasy', 'Trivia', 'EA F1 25'],
    type: 'Manager',
    players: 'Multiplayer',
    rating: 9.0,
    img: 'https://images.pexels.com/photos/11848352/pexels-photo-11848352.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
];

const FILTERS = ['All', '3D', '2D', 'Arcade', 'Sim', 'Manager'] as const;
type Filter = typeof FILTERS[number];

export function PlayGamePage() {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return GAMES.filter(g => {
      const matchesFilter = filter === 'All' || g.type === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q ||
        g.title.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const featured = GAMES.filter(g => g.featured);
  const openGame = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div className="page-enter pt-20 pb-16 px-4 md:px-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="f1-tag mb-2">Gaming Hub</span>
        <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-1">
          F1 <span className="text-f1-red">Games</span> Arcade
        </h1>
        <p className="mt-3 text-f1-silver text-sm max-w-2xl mx-auto">
          A curated collection of free Formula 1 racing games you can play right in your browser.
          Click any game to launch it in a new tab and start racing.
        </p>
      </div>

      {/* Featured games */}
      {filter === 'All' && !query && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-f1-red" />
            <h2 className="font-display font-bold text-sm uppercase tracking-wider">Featured Games</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((g) => (
              <button
                key={g.id}
                onClick={() => openGame(g.url)}
                className="group relative overflow-hidden rounded-xl text-left transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-f1-red"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src={g.img}
                    alt={g.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-f1-red text-white text-[9px] font-display font-bold uppercase tracking-wider">Featured</span>
                    <span className="flex items-center gap-0.5 text-[10px] text-yellow-400 font-bold">
                      <Star size={9} fill="currentColor" /> {g.rating}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">{g.title}</h3>
                  <p className="text-[11px] text-f1-silver/90 mt-1 line-clamp-2 leading-relaxed">{g.desc}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-f1-red text-xs font-display font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={12} /> Play Now
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-f1-silver/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-2.5 bg-f1-grey/40 border border-white/10 rounded-lg text-sm text-white placeholder:text-f1-silver/40 focus:outline-none focus:border-f1-red/50 transition-colors"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all ${
                filter === f
                  ? 'bg-f1-red text-white'
                  : 'bg-f1-grey/40 text-f1-silver hover:bg-f1-grey/70 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* All games grid */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Gamepad2 size={16} className="text-f1-red" />
          <h2 className="font-display font-bold text-sm uppercase tracking-wider">
            {filter === 'All' && !query ? 'All Games' : `${filtered.length} Game${filtered.length !== 1 ? 's' : ''}`}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-f1-silver/60">
            <Gamepad2 size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No games found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((g) => (
              <button
                key={g.id}
                onClick={() => openGame(g.url)}
                className="group f1-card overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:border-f1-red/30 focus:outline-none focus:ring-2 focus:ring-f1-red"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={g.img}
                    alt={g.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {/* Type badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white text-[9px] font-display font-bold uppercase tracking-wider">
                    {g.type}
                  </span>
                  {/* Rating */}
                  <span className="absolute top-2.5 right-2.5 flex items-center gap-0.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold">
                    <Star size={9} fill="currentColor" /> {g.rating}
                  </span>
                  {/* Players */}
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white/80 text-[9px] font-display font-bold uppercase tracking-wider">
                    <Users size={9} /> {g.players}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="font-display font-black text-base text-white uppercase tracking-tight group-hover:text-f1-red transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-[11px] text-f1-silver mt-1.5 leading-relaxed line-clamp-3">
                    {g.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {g.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-f1-silver/70 text-[9px] font-display font-bold uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Play button */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <span className="text-[10px] text-f1-silver/50 font-display uppercase tracking-wider">
                      Opens in new tab
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-f1-red group-hover:gap-2.5 transition-all">
                      <ExternalLink size={12} /> Play
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
        <div className="f1-card p-4 flex items-start gap-2.5">
          <Gauge size={16} className="text-f1-red mt-0.5 shrink-0" />
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-wider mb-1">Instant Play</p>
            <p className="text-[11px] text-f1-silver leading-relaxed">No downloads needed. Every game launches directly in your browser in a new tab.</p>
          </div>
        </div>
        <div className="f1-card p-4 flex items-start gap-2.5">
          <Zap size={16} className="text-f1-red mt-0.5 shrink-0" />
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-wider mb-1">Curated Selection</p>
            <p className="text-[11px] text-f1-silver leading-relaxed">Hand-picked F1 games ranging from arcade fun to full career simulations.</p>
          </div>
        </div>
        <div className="f1-card p-4 flex items-start gap-2.5">
          <Flag size={16} className="text-f1-red mt-0.5 shrink-0" />
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-wider mb-1">Free to Play</p>
            <p className="text-[11px] text-f1-silver leading-relaxed">All games are free. Some offer optional in-game upgrades for deeper play.</p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="text-center mt-8">
        <button onClick={() => navigate('/')} className="text-xs text-f1-silver hover:text-f1-red transition-colors font-display uppercase tracking-wider inline-flex items-center gap-1.5">
          <ArrowLeft size={12} /> Back to Home
        </button>
      </div>
    </div>
  );
}
