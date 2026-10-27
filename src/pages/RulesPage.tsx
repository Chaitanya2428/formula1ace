import { useState } from 'react';
import {
  Cog, Wind, Fuel, Timer, Scale, ShieldCheck, Wrench, BookOpen,
  Users, Car, Plane, Zap, Gauge, Crown, Flag, ChevronDown, Info,
  Baby, FileCheck, Building2, Hammer, Battery, Thermometer, Layers,
  Ruler, Weight, CircleDollarSign, Trophy, AlertTriangle, Lock,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';

interface RuleSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  era: string;
  summary: string;
  points: string[];
}

const sections: RuleSection[] = [
  {
    id: 'driver-eligibility',
    icon: <Users size={20} />,
    title: 'Driver Eligibility & Licences',
    era: '1950 – Present',
    summary: 'Who can race in F1 and what qualifications they need.',
    points: [
      'Minimum age 18 years old at the time of their first race (raised from 17 in 2024).',
      'Must hold a valid FIA Super Licence — the highest grade of racing licence.',
      'Super Licence requires at least 40 points earned over 3 seasons in FIA-sanctioned junior categories (F2, F3, Formula E, IndyCar, etc.).',
      'Minimum age for a Super Licence was 18 from 2016, following Max Verstappen\'s debut at 17 in 2015.',
      'Drivers must complete an FIA medical examination, including cardiac and neurological checks.',
      'Must complete 300 km of testing in a contemporary F1 car before being granted the licence.',
      'A race-weekend penalty points system: 12 points within 12 months triggers an automatic one-race ban.',
      'Since 2025, the FIA requires drivers to be at least 18 and hold a valid road driving licence.',
    ],
  },
  {
    id: 'team-entry',
    icon: <Building2 size={20} />,
    title: 'Team Entry & Constructor Rules',
    era: '1950 – Present',
    summary: 'How teams enter F1 and what is required of them.',
    points: [
      'Each team is a constructor — they must design and build their own chassis (monocoque/tub).',
      'Power units (engines) may be supplied by manufacturers or customer engine suppliers.',
      'New entrants pay a £200,000 entry fee and are subject to FIA scrutiny and due diligence.',
      'Since 2016, teams must hold a valid FIA Constructor\'s Licence and meet sporting and technical requirements.',
      'Maximum of 12 teams (24 cars) on the grid — capped by the Concorde Agreement.',
      'Andretti/Cadillac was conditionally approved as the 11th team for 2026, the first new entry since Haas in 2016.',
      'No mid-season team withdrawals permitted without FIA approval and financial penalties.',
      'Each team must nominate two drivers per event; reserve drivers must also hold a Super Licence.',
    ],
  },
  {
    id: 'aerodynamics',
    icon: <Wind size={20} />,
    title: 'Aerodynamics — Wings, Floor & Downforce',
    era: '1976 – 2026',
    summary: 'How F1 cars generate grip through the air.',
    points: [
      'Ground-effect floors were pioneered by Lotus in 1977, using shaped underbodies to create massive downforce — banned in 1983 for safety, then reinstated in 2022.',
      '2022 regulations returned to ground-effect floors, removing complex bargeboards and edge wings to reduce dirty air.',
      'Front wing maximum width reduced by 50 mm in 2026, with simpler endplates to cut turbulence.',
      'Rear wing must fit within a strictly defined box — the Drag Reduction System (DRS) slot is permitted since 2011.',
      '2026 introduces active aerodynamics: "Z-mode" (low drag for straights) and "X-mode" (high downforce for corners) — wings adjust automatically.',
      'Downforce reduced by approximately 30% in 2026 to promote closer, wheel-to-wheel racing.',
      'Floor planks must be 10 mm thick — wear beyond 1 mm during a race results in disqualification (introduced 1994 after Senna\'s death).',
      'Skid blocks under the floor are mandatory to prevent cars bottoming out and sparking excessively.',
      'No movable aerodynamic devices except DRS and the 2026 active aero system — all wings must be structurally rigid.',
      'Sidepod openings and mirrors are strictly dimensioned to prevent aero exploitation (clarified after 2022 "porpoising" controversies).',
      'The diffuser is tightly regulated: maximum height 125 mm, width 1,000 mm, and exit angle 35°.',
    ],
  },
  {
    id: 'power-unit',
    icon: <Cog size={20} />,
    title: 'Power Unit & Engine Regulations',
    era: '1976 – 2026',
    summary: 'The heart of the F1 car — from turbo eras to hybrid.',
    points: [
      '1977: Renault introduced the first turbocharged engine; by 1986 turbos produced over 1,400 hp in qualifying trim.',
      '1989: Turbos banned, naturally aspirated 3.5L V8/V10/V12 engines mandated, capping the "screaming era".',
      '2006: Engine formula switched to 2.4L naturally aspirated V8s, freezing development to cut costs.',
      '2014: Hybrid era began — 1.6L turbo-hybrid V6 with MGU-K (kinetic) and MGU-H (heat) energy recovery.',
      '2026: MGU-H removed, leaving only the MGU-K. Electric power increases to 50% of total output.',
      'Electric motor boosts up to 400 kW (approx. 536 hp) in 2026 — nearly triple the 2014-era output.',
      'Power unit life: each driver may use no more than 3 engines per season (reduced from 4) — exceeding this triggers grid penalties.',
      'Engine RPM capped at 15,000 (since 2014), though fuel-flow limits make effective peak around 12,000.',
      'Sustainable fuel mandate: 100% advanced sustainable fuel from 2026 — no new fossil carbon.',
      'Power unit manufacturers must supply at least one customer team if requested, per FIA rules.',
      'Engine freeze from 2022 to 2025 prevented development; reopened for 2026 manufacturers.',
    ],
  },
  {
    id: 'fuel',
    icon: <Fuel size={20} />,
    title: 'Fuel & Sustainability',
    era: '1950 – 2026',
    summary: 'What powers F1 cars and the push to net zero.',
    points: [
      'Refuelling during races was banned in 2010 — all fuel must last the full race distance.',
      'Fuel tank capacity reduced to 200 kg in 2026 (down from ~110 kg) due to higher engine efficiency.',
      'Fuel flow limited to 100 kg/hour since 2014, enforced by FIA sensors — teams caught bypassing this face disqualification.',
      '100% sustainable fuel mandated from 2026 — derived from non-food bio-sources or carbon capture technology.',
      'Refuelling was common from 1994–2009, with rigs delivering up to 12 litres/second.',
      '1984: Fuel tank must be located behind the driver and ahead of the engine, fully enclosed in a crash-resistant bladder.',
      'Net-zero carbon footprint target by 2030 across all F1 operations, logistics, and events.',
      'Each fuel batch is tested by the FIA; deviations in composition result in penalties.',
    ],
  },
  {
    id: 'car-dimensions',
    icon: <Ruler size={20} />,
    title: 'Car Dimensions, Weight & Components',
    era: '1976 – 2026',
    summary: 'The physical limits of an F1 car.',
    points: [
      'Minimum car weight in 2026: 768 kg (down from 798 kg in 2023) — drivers and car weighed together post-race.',
      'Car width reduced by 100 mm in 2026 and wheelbase shortened by 150 mm for more nimble handling.',
      'Maximum car width: 2,000 mm (including tyres); minimum length governed by wheelbase regulations.',
      'Front tyre width 305 mm, rear 405 mm — unchanged since 2017\'s wider-car regulations.',
      'Wheel diameter: 18 inches since 2021 (up from 13 inches), with Pirelli as sole supplier.',
      'Halo cockpit protection device mandatory since 2018 — titanium structure weighing ~7 kg, rated to withstand a 12 kg wheel/tyre at 225 km/h.',
      'Cockpit opening strictly dimensioned: maximum width 550 mm at the front, 300 mm at the rear.',
      'Survival cell (monocoque) must pass front, side, and rear impact tests plus a static squeeze test.',
      'Wheel covers banned from 2026 (reintroduced in 2022, now removed to reduce weight).',
    ],
  },
  {
    id: 'tyres',
    icon: <Lock size={20} />,
    title: 'Tyres & Wheels',
    era: '1950 – 2026',
    summary: 'The only contact between car and track.',
    points: [
      'Pirelli has been the sole tyre supplier since 2011, replacing Bridgestone.',
      'Dry-weather slick tyres come in 5 compounds (C0–C4), from hardest to softest.',
      'Intermediate and full-wet tyres are treaded; wet tyres displace up to 85 litres of water per second.',
      'Each driver gets 13 sets of dry tyres per weekend (5 hard, 4 medium, 4 soft typically).',
      'Tyre blanket ban from 2026 — teams must manage tyre temperatures on-track, changing pit-stop strategies.',
      'During a dry race, drivers must use at least two different dry compounds (mandatory pit stop introduced 2014).',
      'In wet conditions, the two-compound rule is waived — intermediates or wets may be used throughout.',
      'Tyre pressure is monitored live by the FIA via sensors; minimum pressures are set per circuit.',
    ],
  },
  {
    id: 'points-system',
    icon: <Trophy size={20} />,
    title: 'Points System & Scoring',
    era: '1976 – 2026',
    summary: 'How championships are won.',
    points: [
      '1976–1979: Points awarded 9-6-4-3-2-1 to top 6, plus 1 for fastest lap (only 7 best results counted until 1979).',
      '1980–1990: System expanded — 9-6-4-3-2-1, all results counted from 1979 onward.',
      '1991–2002: Top 6 scoring changed to 10-8-6-4-3-2-1 for top 6, then expanded to top 8.',
      '2003–2009: 10-8-6-5-4-3-2-1 for top 8 finishers.',
      '2010–2018: 25-18-15-12-10-8-6-4-2-1 for top 10 — the current system.',
      'Fastest lap bonus: 1 point for the fastest lap, but only if the driver finishes in the top 10 (reintroduced 2019).',
      'Sprint race points (since 2021): 8-7-6-5-4-3-2-1 for the top 8 in the sprint.',
      'Sprint qualifying sets the sprint grid — held on Friday, replacing traditional FP2 on sprint weekends.',
      'Sprint result no longer sets the grid for Sunday\'s Grand Prix — qualifying is standalone since 2022.',
      'Constructors championship sums both drivers\' points across all races.',
      'Ties broken by countback of race wins, then second places, etc.',
      '2024: Half points awarded if a race completes between 2 and 5 laps; full points require 5+ laps.',
    ],
  },
  {
    id: 'penalties',
    icon: <ShieldCheck size={20} />,
    title: 'Penalties & Stewards',
    era: '1950 – Present',
    summary: 'How the FIA enforces the rules.',
    points: [
      '5-second time penalty: minor offences (track limits, minor contact) — served at next pit stop or added at finish.',
      '10-second time penalty: moderate offences (unsafe release, causing a collision).',
      '10-second stop-and-go penalty: serious offences (ignoring blue flags, dangerous driving).',
      'Drive-through penalty: must enter pit lane within 3 laps of being issued, no stop required.',
      'Grid penalties: carried over to the next race if a penalty cannot be served during the current race.',
      'Power unit component limits: exceeding the annual allocation of engines, gearboxes, or MGU parts triggers grid drops.',
      'Penalty points on the Super Licence: 12 points in 12 months = automatic 1-race ban.',
      'Race bans have been rare — the most famous was Romain Grosjean\'s 2012 one-race ban for causing a first-lap crash.',
      'Stewards may also issue reprimands; three reprimands in a season (two for driving offences) result in a grid penalty.',
      'Teams may appeal decisions to the FIA International Court of Appeal within 96 hours.',
    ],
  },
  {
    id: 'sprint',
    icon: <Timer size={20} />,
    title: 'Sprint Races & Weekend Format',
    era: '2021 – 2026',
    summary: 'The shortened race format introduced to spice up weekends.',
    points: [
      '6 sprint races per season (held at designated rounds — increased from 3 in 2021 to 6 in 2023).',
      'Sprint race distance: approximately 100 km or 30 minutes, whichever comes first.',
      'Sprint qualifying sets the sprint grid — held on Friday, replacing traditional FP2.',
      'Sprint races award points: 8-7-6-5-4-3-2-1 for the top 8 finishers.',
      'Sprint race result no longer sets the grid for Sunday\'s main Grand Prix — qualifying is standalone.',
      'Sprint pole position is officially recorded as a pole position in F1 statistics.',
      'No mandatory pit stop during sprints; tyre choice is free from the allocated set.',
      '2026: Sprint format refined further with parc fermé conditions relaxed slightly between sprint and qualifying.',
    ],
  },
  {
    id: 'safety',
    icon: <AlertTriangle size={20} />,
    title: 'Safety Car, VSC & Red Flags',
    era: '1950 – 2026',
    summary: 'How F1 manages on-track incidents safely.',
    points: [
      'Safety Car first officially deployed in 1993; before that, races were red-flagged for incidents.',
      'Virtual Safety Car (VSC) introduced in 2015 after Jules Bianchi\'s 2014 accident — drivers must maintain a delta time, no overtaking.',
      'Full Safety Car: cars bunch up behind the SC; lapped cars may unlap themselves before the restart (rule clarified in 2022).',
      'Red flag: race suspended; cars return to the pit lane or grid. Resumed with a standing or rolling start.',
      'Since 2023, red-flag restarts use a standing start if conditions allow.',
      'Pit lane closes when the Safety Car is deployed; entering a closed pit lane incurs a penalty.',
      'Medical Car follows the field on the opening lap of every race since 1981.',
      'Hans (Head and Neck Support) device mandatory since 2003 to prevent basilar skull fractures.',
      'Fire-resistant race suits (Nomex) must withstand 11 seconds of flame — standard since 1976.',
    ],
  },
  {
    id: 'drs',
    icon: <Plane size={20} />,
    title: 'DRS — Drag Reduction System',
    era: '2011 – 2026',
    summary: 'The overtaking aid that opens the rear wing.',
    points: [
      'DRS introduced in 2011 to promote overtaking by reducing drag on straights.',
      'Driver activates DRS via a button; the rear wing flap opens up to 50 mm.',
      'DRS may only be used in designated zones (typically 2–3 per circuit) when within 1 second of the car ahead.',
      'Available from lap 3 of the race (lap 2 in sprints) and after the Safety Car restart, once the race director enables it.',
      'DRS is always available in practice and qualifying — no 1-second gap requirement.',
      'In 2026, active aerodynamics (Z-mode) partially replaces DRS, but DRS remains as a supplementary overtaking tool.',
      'If the system fails or is used illegally, the driver is reported to the stewards.',
    ],
  },
  {
    id: 'budget-cap',
    icon: <CircleDollarSign size={20} />,
    title: 'Budget Cap & Financial Rules',
    era: '2021 – Present',
    summary: 'F1\'s cost control measures.',
    points: [
      'Budget cap introduced in 2021 at $145 million per team per year, excluding driver salaries, marketing, and certain capital costs.',
      '2023–2025: Cap reduced to $135 million as the sport tightened spending.',
      'Cap covers all on-track performance-related spending: engineering, design, race operations, and personnel.',
      'Top three teams\' finances are audited annually by independent FIA-appointed auditors.',
      '2022: Red Bull found guilty of a "minor overspend breach" of $1.8M and fined $7M plus a 10% wind-tunnel time reduction.',
      'Excluded costs: driver salaries, marketing, travel for non-competition staff, factory utilities, and capital expenditure.',
      'Penalties for breaches range from reprimands to championship point deductions and wind-tunnel time limits.',
    ],
  },
  {
    id: 'testing',
    icon: <FileCheck size={20} />,
    title: 'Testing Restrictions',
    era: '1976 – 2026',
    summary: 'How and when teams can test their cars.',
    points: [
      'Pre-season testing limited to 3 days at one circuit (typically Bahrain) since 2021.',
      'In-season testing banned from 2009, with limited exceptions for young driver tests and Pirelli tyre tests.',
      'Young driver tests: drivers with fewer than 2 Grand Prix starts may test in designated sessions.',
      'Wind tunnel and CFD testing restricted by "ATL" (Aerodynamic Testing Limit) tokens, scaled inversely by championship position.',
      'Tighter wind-tunnel time for top teams: the 1st-placed team gets 70% of the baseline; 10th gets 115%.',
      'Private testing with current or recent cars is forbidden without FIA permission.',
      'Promotional events (filming days) limited to 100 km per team per year using demonstration tyres.',
    ],
  },
  {
    id: 'transmissions',
    icon: <Gauge size={20} />,
    title: 'Gearbox & Transmission',
    era: '1976 – 2026',
    summary: 'How power reaches the wheels.',
    points: [
      'Sequential semi-automatic gearboxes introduced by Ferrari in 1989; fully paddle-shifted by mid-1990s.',
      'Current gearboxes: 8 forward ratios + 1 reverse — ratios fixed for the entire season once homologated.',
      'Each driver may use no more than 4 gearboxes per season; exceeding triggers a grid penalty.',
      'A gearbox must complete 6 consecutive race weekends before it can be replaced without penalty.',
      'All-wheel drive is banned — power must go to the rear wheels only.',
      'Traction control banned since 2008; launch control also prohibited.',
      'Clutch is operated via two paddles on the steering wheel; a single clutch plate is mandated.',
    ],
  },
  {
    id: 'weekend-format',
    icon: <BookOpen size={20} />,
    title: 'Race Weekend Structure',
    era: '1950 – 2026',
    summary: 'How a Grand Prix weekend is organised.',
    points: [
      'Free Practice 1 (FP1): Friday — 60-minute session for teams to test setups and gather data.',
      'Sprint Qualifying: Friday — 100 km shootout race that sets the sprint grid (sprint rounds only).',
      'Free Practice 2 (FP2): Saturday morning — final practice before qualifying (non-sprint weekends move FP2 to Friday).',
      'Qualifying: Saturday — 3 knockout sessions (Q1: 18 min, Q2: 15 min, Q3: 12 min) setting the race grid.',
      'Sprint Race: Saturday afternoon (sprint rounds only) — 100 km dash for points.',
      'Grand Prix: Sunday — the main race, typically 305 km or 2 hours, whichever comes first.',
      'Grid formation: Cars line up in qualifying order; pole position on the clean side of the track.',
      'Race start: Standing start from the grid; if conditions are too wet, a rolling start behind the safety car.',
      'Monaco is the exception — minimum race distance is 260 km due to its slow street-circuit nature.',
    ],
  },
  {
    id: 'historical-eras',
    icon: <Crown size={20} />,
    title: 'Historical Regulation Eras',
    era: '1976 – 2026',
    summary: 'Key rule changes that reshaped F1 over the decades.',
    points: [
      '1976: Six-wheeled Tyrrell P34 raced legally; later banned as the FIA moved to four-wheel limits.',
      '1977: Ground-effect floors introduced by Lotus — revolutionised downforce until banned in 1983.',
      '1981: Carbon-fibre monocoque pioneered by McLaren MP4/1 — set the standard for all future F1 cars.',
      '1988: Turbos banned after 1988; 3.5L naturally aspirated engines mandated from 1989.',
      '1994: Following the deaths of Senna and Ratzenberger, the FIA mandated stepped bottoms, smaller wings, and the 10 mm plank.',
      '1998: Cars narrowed from 2,000 mm to 1,800 mm; grooved tyres introduced to reduce grip and cornering speeds.',
      '2006: Engine formula changed to 2.4L V8s to cut costs and power.',
      '2009: Major aero overhaul — slick tyres returned, KERS (kinetic energy recovery) introduced.',
      '2014: Hybrid turbo era began — 1.6L V6 turbo-hybrids replaced V8s; Mercedes dominated.',
      '2017: Wider cars and tyres returned for aggressive looks and higher cornering speeds.',
      '2022: Ground-effect floors returned, 18-inch wheels, and simplified aero to reduce dirty air.',
      '2026: New power units (50% electric, no MGU-H), active aero, smaller and lighter cars, sustainable fuel.',
    ],
  },
  {
    id: 'practice-conduct',
    icon: <Flag size={20} />,
    title: 'On-Track Conduct & Etiquette',
    era: '1950 – Present',
    summary: 'The unwritten and written rules of racing.',
    points: [
      'Drivers must leave a car\'s width of space when defending — the "one move" rule (clarified in 2011).',
      'No more than one change of direction to defend a position on a straight; weaving is prohibited.',
      'Returning to the racing line after defending is allowed only if there is no car alongside.',
      'Overtaking must be completed before the braking zone; "dive bombs" are judged case-by-case by stewards.',
      'Blue flags: lapped drivers must let leaders past within a set number of corners; ignoring them triggers penalties.',
      'Yellow flags: no overtaking, must reduce speed; double yellow — be prepared to stop.',
      'Track limits: all four wheels must remain within the white lines; exceeding them in qualifying deletes the lap time.',
      'In races, three track-limits violations result in a 5-second time penalty; further violations escalate.',
      'Pit lane speed limit: typically 60–80 km/h, enforced by sensors; speeding incurs a 5-second penalty.',
      'Engine start is permitted only in the garage or with the FIA starter on the grid.',
    ],
  },
];

const eras = [
  { label: 'All Eras', filter: 'all' },
  { label: '1976–1989', filter: '1976' },
  { label: '1990–2005', filter: '1990' },
  { label: '2006–2013', filter: '2006' },
  { label: '2014–2021', filter: '2014' },
  { label: '2022–2026', filter: '2022' },
];

function eraMatches(era: string, filter: string): boolean {
  if (filter === 'all') return true;
  const startYear = parseInt(filter);
  const endYear = startYear === 1976 ? 1989 : startYear === 1990 ? 2005 : startYear === 2006 ? 2013 : startYear === 2014 ? 2021 : 2026;
  const yearMatch = era.match(/\d{4}/g);
  if (!yearMatch) return false;
  const years = yearMatch.map(Number);
  return years.some(y => y >= startYear && y <= endYear);
}

export function RulesPage() {
  const [openId, setOpenId] = useState<string | null>('aerodynamics');
  const [activeEra, setActiveEra] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = sections.filter(s => {
    const eraOk = eraMatches(s.era, activeEra);
    const qOk = query === '' ||
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.summary.toLowerCase().includes(query.toLowerCase()) ||
      s.points.some(p => p.toLowerCase().includes(query.toLowerCase()));
    return eraOk && qOk;
  });

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">FIA Regulations</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">
            F1 <span className="text-f1-red">Rules</span>
          </h1>
          <p className="mt-3 text-f1-silver max-w-2xl">
            Every rule that governs Formula 1 — from driver licences and team entry to aerodynamics, power units, and safety. Covering the sport from 1976 to the 2026 regulations revolution.
          </p>
        </div>
      </Reveal>

      {/* Era filter + search */}
      <Reveal delay={60}>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {eras.map(e => (
              <button
                key={e.filter}
                onClick={() => setActiveEra(e.filter)}
                className={`px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  activeEra === e.filter
                    ? 'bg-f1-red text-white'
                    : 'bg-f1-grey text-f1-silver hover:bg-white/10'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search rules..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 min-w-[200px] bg-f1-grey border border-white/10 px-4 py-2 text-sm font-body text-white placeholder:text-f1-silver/60 focus:outline-none focus:border-f1-red transition-colors"
          />
        </div>
      </Reveal>

      {/* Quick stats */}
      <Reveal delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: <Users size={16} />, label: 'Min Driver Age', value: '18' },
            { icon: <Weight size={16} />, label: 'Min Car Weight', value: '768 kg' },
            { icon: <Cog size={16} />, label: 'Max Engines/Year', value: '3' },
            { icon: <CircleDollarSign size={16} />, label: 'Budget Cap', value: '$135M' },
          ].map((s, i) => (
            <div key={i} className="f1-card p-4 flex items-center gap-3">
              <div className="text-f1-red">{s.icon}</div>
              <div>
                <div className="font-display font-black text-lg leading-none">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-f1-silver mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Accordion sections */}
      <div className="space-y-3">
        {filtered.map((section, i) => {
          const isOpen = openId === section.id;
          return (
            <Reveal key={section.id} delay={Math.min(i * 40, 200)}>
              <div className={`f1-card overflow-hidden transition-all ${isOpen ? 'ring-1 ring-f1-red/40' : ''}`}>
                <button
                  onClick={() => setOpenId(isOpen ? null : section.id)}
                  className="w-full text-left p-5 flex items-start gap-4 group"
                >
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center transition-colors ${isOpen ? 'bg-f1-red text-white' : 'bg-f1-grey text-f1-red group-hover:bg-white/10'}`}>
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-base md:text-lg uppercase tracking-wide group-hover:text-f1-red transition-colors">
                        {section.title}
                      </h3>
                      <span className="text-[10px] font-display font-bold uppercase tracking-wider px-2 py-0.5 bg-f1-red/10 text-f1-red border border-f1-red/20">
                        {section.era}
                      </span>
                    </div>
                    <p className="text-sm text-f1-silver mt-1">{section.summary}</p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-f1-silver transition-transform duration-300 ${isOpen ? 'rotate-180 text-f1-red' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-[76px] animate-fade-in-up">
                    <ul className="space-y-2.5 border-l-2 border-f1-red/20 pl-4">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="text-sm text-white/90 leading-relaxed flex gap-2.5">
                          <span className="text-f1-red shrink-0 mt-0.5 font-display font-black text-xs">{String(idx + 1).padStart(2, '0')}</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
        {filtered.length === 0 && (
          <div className="f1-card p-8 text-center">
            <Info size={32} className="mx-auto text-f1-silver mb-3" />
            <p className="text-f1-silver">No rules match your search. Try a different term or era.</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <Reveal delay={120}>
        <div className="mt-8 f1-card p-4 flex items-start gap-3 border-l-2 border-f1-red/40">
          <Info size={18} className="text-f1-red shrink-0 mt-0.5" />
          <p className="text-xs text-f1-silver leading-relaxed">
            These rules are a summary for fan reference. The official and binding regulations are the FIA Formula One Sporting and Technical Regulations, published annually at <span className="text-white">fia.com</span>. Rule details change yearly — always consult the current FIA rulebook for precision.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
