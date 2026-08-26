export interface HistoryEra {
  id: string;
  year: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const historyEras: HistoryEra[] = [
  {
    id: 'birth',
    year: '1950',
    title: 'Birth of Formula 1',
    category: 'Genesis',
    description:
      'The FIA established the World Drivers Championship in 1950. The first race was held at Silverstone on May 13, with Giuseppe Farina winning the inaugural championship driving an Alfa Romeo. The post-war era brought together the best drivers and manufacturers in a global contest.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Silverstone_Circuit_2020.png/960px-Silverstone_Circuit_2020.png',
  },
  {
    id: 'evolution',
    year: '1960s',
    title: 'Evolution of Cars',
    category: 'Technology',
    description:
      'The 1960s saw the shift from front-engine to mid-engine cars, pioneered by Cooper. Lotus introduced the monocoque chassis in 1962, revolutionizing car construction. Wings and aerodynamics arrived in 1968, transforming F1 car design forever.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Grote_Prijs_van_Zandvoort%2C_Jim_Clark_na_de_race%2C_omstuwd_door_pers_en_publiek%2C_Bestanddeelnr_917-9755.jpg/960px-Grote_Prijs_van_Zandvoort%2C_Jim_Clark_na_de_race%2C_omstuwd_door_pers_en_publiek%2C_Bestanddeelnr_917-9755.jpg',
  },
  {
    id: 'turbo',
    year: '1980s',
    title: 'The Turbo Era',
    category: 'Power',
    description:
      'The 1980s turbo era saw engines producing over 1,400 horsepower in qualifying trim. BMW, Honda, Renault, and Ferrari battled for supremacy. The cars were brutally fast and spectacular, with drivers wrestling 900+ hp beasts around classic circuits.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Lauda_at_1982_Dutch_Grand_Prix.jpg/960px-Lauda_at_1982_Dutch_Grand_Prix.jpg',
  },
  {
    id: 'ground-effect',
    year: '1978-1981',
    title: 'Ground Effect Era',
    category: 'Aerodynamics',
    description:
      'Colin Chapman and Lotus pioneered ground effect aerodynamics with the Lotus 78 and 79, using venturi tunnels to create massive downforce. The technology was eventually banned for safety reasons, but it changed the understanding of aerodynamics in racing.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Monte_Carlo_Formula_1_track_map.svg/960px-Monte_Carlo_Formula_1_track_map.svg.png',
  },
  {
    id: 'safety',
    year: '1990s-Present',
    title: 'Safety Improvements',
    category: 'Safety',
    description:
      'Following the tragic deaths of Senna and Ratzenberger in 1994, F1 embarked on a safety revolution. The HANS device, carbon-fiber survival cell, crash barriers, and the halo cockpit protection (2018) have made the sport dramatically safer. No driver has died in an F1 race since 1994.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Ayrton_Senna_in_the_paddock_before_the_1993_British_Grand_Prix_%2833686752075%29_%28cropped%29.jpg',
  },
  {
    id: 'hybrid',
    year: '2014-Present',
    title: 'The Hybrid Era',
    category: 'Efficiency',
    description:
      'In 2014, Formula 1 introduced the most efficient power units in motorsport history — 1.6L turbo-hybrid V6 engines with two energy recovery systems (ERS). Mercedes dominated the early years, achieving thermal efficiency over 50%, making F1 power units the most efficient engines on earth.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3434_by_Stepro.jpg/960px-2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3434_by_Stepro.jpg',
  },
];

export interface Rivalry {
  id: string;
  title: string;
  drivers: string;
  era: string;
  description: string;
}

export const rivalries: Rivalry[] = [
  {
    id: 'senna-prost',
    title: 'Senna vs Prost',
    drivers: 'Ayrton Senna vs Alain Prost',
    era: '1988-1991',
    description:
      'The greatest rivalry in F1 history. Teammates at McLaren in 1988-89, their relationship deteriorated into bitter enmity. Their collisions at Suzuka in 1989 and 1990 decided two championships and defined an era.',
  },
  {
    id: 'hunt-lauda',
    title: 'Hunt vs Lauda',
    drivers: 'James Hunt vs Niki Lauda',
    era: '1975-1977',
    description:
      'The playboy Briton versus the calculating Austrian. Their 1976 battle — decided by one point — was dramatized in the film Rush. Laudas near-fatal crash at the Nürburgring and miraculous return defined courage in motorsport.',
  },
  {
    id: 'schumacher-hakkinen',
    title: 'Schumacher vs Häkkinen',
    drivers: 'Michael Schumacher vs Mika Häkkinen',
    era: '1998-2001',
    description:
      'Two greats who respected each other deeply. Their battles for the 1998 and 2000 titles were decided by inches and strategy. Häkkinens overtake of Schumacher at Spa 2000 remains one of the greatest moves in F1.',
  },
  {
    id: 'hamilton-verstappen',
    title: 'Hamilton vs Verstappen',
    drivers: 'Lewis Hamilton vs Max Verstappen',
    era: '2021',
    description:
      'The 2021 season was the most intense title fight in decades. Coming together at Silverstone, Monza, and the controversial Abu Dhabi finale, their battle went to the very last lap of the very last race.',
  },
];

export interface FamousRace {
  id: string;
  year: string;
  race: string;
  description: string;
}

export const famousRaces: FamousRace[] = [
  { id: '1', year: '1976', race: 'Japanese GP', description: 'Niki Lauda withdraws in torrential rain, James Hunt claims the title by one point.' },
  { id: '2', year: '1984', race: 'Monaco GP', description: 'Ayrton Senna in a Toleth hunts down Prost in a downpour before the race is red-flagged.' },
  { id: '3', year: '1988', race: 'Japanese GP', description: 'Senna recovers from 16th to beat Prost and clinch his first championship.' },
  { id: '4', year: '1997', race: 'European GP', description: 'Schumacher collides with Villeneuve but loses — the title goes to the Canadian.' },
  { id: '5', year: '2008', race: 'Brazilian GP', description: 'Hamilton passes Glock on the final corner to win the championship by one point.' },
  { id: '6', year: '2021', race: 'Abu Dhabi GP', description: 'Verstappen passes Hamilton on the final lap after a late safety car restart to claim his first title.' },
];

export interface IconicCircuit {
  id: string;
  name: string;
  country: string;
  flag: string;
  note: string;
}

export const iconicCircuits: IconicCircuit[] = [
  { id: 'monaco', name: 'Monaco', country: 'Monaco', flag: '🇲🇨', note: 'The crown jewel — a street circuit through Monte Carlo since 1929.' },
  { id: 'monza', name: 'Monza', country: 'Italy', flag: '🇮🇹', note: 'The Temple of Speed — fastest circuit on the calendar since 1922.' },
  { id: 'spa', name: 'Spa-Francorchamps', country: 'Belgium', flag: '🇧🇪', note: 'Eau Rouge-Raidillon — the most fearsome corner complex in racing.' },
  { id: 'suzuka', name: 'Suzuka', country: 'Japan', flag: '🇯🇵', note: 'The only figure-8 circuit, with the legendary 130R and Spoon Curve.' },
  { id: 'silverstone', name: 'Silverstone', country: 'UK', flag: '🇬🇧', note: 'Home of the first F1 World Championship race in 1950.' },
  { id: 'nurburgring', name: 'Nürburgring Nordschleife', country: 'Germany', flag: '🇩🇪', note: 'The Green Hell — 20.8 km of the most demanding track ever built.' },
];
