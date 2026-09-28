export interface Race {
  round: number;
  name: string;
  country: string;
  flag: string;
  circuit: string;
  date: string; // ISO date
  sprint: boolean;
  trackLayout: string;
}

export const races: Race[] = [
  { round: 1, name: 'Bahrain Grand Prix', country: 'Bahrain', flag: '🇧🇭', circuit: 'Bahrain International Circuit', date: '2026-03-08', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Bahrain_International_Circuit_logo.png' },
  { round: 2, name: 'Saudi Arabian Grand Prix', country: 'Saudi Arabia', flag: '🇸🇦', circuit: 'Jeddah Corniche Circuit', date: '2026-03-15', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jeddah_Corniche_Circuit_Logo.svg/960px-Jeddah_Corniche_Circuit_Logo.svg.png' },
  { round: 3, name: 'Australian Grand Prix', country: 'Australia', flag: '🇦🇺', circuit: 'Albert Park Circuit', date: '2026-03-29', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Albert_Park_Circuit_2021.svg/960px-Albert_Park_Circuit_2021.svg.png' },
  { round: 4, name: 'Japanese Grand Prix', country: 'Japan', flag: '🇯🇵', circuit: 'Suzuka Circuit', date: '2026-04-05', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Suzuka_circuit_map--2005.svg/960px-Suzuka_circuit_map--2005.svg.png' },
  { round: 5, name: 'Chinese Grand Prix', country: 'China', flag: '🇨🇳', circuit: 'Shanghai International Circuit', date: '2026-04-19', sprint: true, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Shanghai_International_Racing_Circuit_track_map.svg/960px-Shanghai_International_Racing_Circuit_track_map.svg.png' },
  { round: 6, name: 'Miami Grand Prix', country: 'USA', flag: '🇺🇸', circuit: 'Miami International Autodrome', date: '2026-05-03', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/en/4/45/Miami_International_Autodrome_Logo.png' },
  { round: 7, name: 'Emilia Romagna Grand Prix', country: 'Italy', flag: '🇮🇹', circuit: 'Imola Circuit', date: '2026-05-17', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Imola_2009.svg/960px-Imola_2009.svg.png' },
  { round: 8, name: 'Monaco Grand Prix', country: 'Monaco', flag: '🇲🇨', circuit: 'Circuit de Monaco', date: '2026-05-24', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Monte_Carlo_Formula_1_track_map.svg/960px-Monte_Carlo_Formula_1_track_map.svg.png' },
  { round: 9, name: 'Canadian Grand Prix', country: 'Canada', flag: '🇨🇦', circuit: 'Circuit Gilles Villeneuve', date: '2026-06-14', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%C3%8Ele_Notre-Dame_%28Circuit_Gilles_Villeneuve%29.svg/960px-%C3%8Ele_Notre-Dame_%28Circuit_Gilles_Villeneuve%29.svg.png' },
  { round: 10, name: 'Spanish Grand Prix', country: 'Spain', flag: '🇪🇸', circuit: 'Circuit de Barcelona-Catalunya', date: '2026-06-21', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Circuit_de_Catalunya_moto_2021.svg/960px-Circuit_de_Catalunya_moto_2021.svg.png' },
  { round: 11, name: 'Austrian Grand Prix', country: 'Austria', flag: '🇦🇹', circuit: 'Red Bull Ring', date: '2026-06-28', sprint: true, trackLayout: 'https://upload.wikimedia.org/wikipedia/en/8/86/Logo_for_Red_Bull_Ring.png' },
  { round: 12, name: 'British Grand Prix', country: 'UK', flag: '🇬🇧', circuit: 'Silverstone Circuit', date: '2026-07-05', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Silverstone_Circuit_2020.png/960px-Silverstone_Circuit_2020.png' },
  { round: 13, name: 'Hungarian Grand Prix', country: 'Hungary', flag: '🇭🇺', circuit: 'Hungaroring', date: '2026-07-19', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hungaroring.svg/960px-Hungaroring.svg.png' },
  { round: 14, name: 'Belgian Grand Prix', country: 'Belgium', flag: '🇧🇪', circuit: 'Circuit de Spa-Francorchamps', date: '2026-07-26', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Spa-Francorchamps_of_Belgium.svg/960px-Spa-Francorchamps_of_Belgium.svg.png' },
  { round: 15, name: 'Dutch Grand Prix', country: 'Netherlands', flag: '🇳🇱', circuit: 'Zandvoort Circuit', date: '2026-08-23', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Raadhuis%2C_Zandvoort.jpg/960px-Raadhuis%2C_Zandvoort.jpg' },
  { round: 16, name: 'Italian Grand Prix', country: 'Italy', flag: '🇮🇹', circuit: 'Monza Circuit', date: '2026-09-06', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Autodromo_Nazionale_Monza_circuit_logo.png' },
  { round: 17, name: 'Azerbaijan Grand Prix', country: 'Azerbaijan', flag: '🇦🇿', circuit: 'Baku City Circuit', date: '2026-09-26', sprint: true, trackLayout: 'https://images.pexels.com/photos/39730296/pexels-photo-39730296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { round: 18, name: 'Singapore Grand Prix', country: 'Singapore', flag: '🇸🇬', circuit: 'Marina Bay Street Circuit', date: '2026-10-04', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Marina_Bay_circuit_2023.svg/960px-Marina_Bay_circuit_2023.svg.png' },
  { round: 19, name: 'United States Grand Prix', country: 'USA', flag: '🇺🇸', circuit: 'Circuit of the Americas', date: '2026-10-18', sprint: true, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Austin_circuit.svg/960px-Austin_circuit.svg.png' },
  { round: 20, name: 'Mexican Grand Prix', country: 'Mexico', flag: '🇲🇽', circuit: 'Hermanos Rodríguez Circuit', date: '2026-10-25', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_2015.svg/960px-Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_2015.svg.png' },
  { round: 21, name: 'São Paulo Grand Prix', country: 'Brazil', flag: '🇧🇷', circuit: 'Interlagos Circuit', date: '2026-11-08', sprint: true, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Bairro_de_Interlagos.jpg' },
  { round: 22, name: 'Las Vegas Grand Prix', country: 'USA', flag: '🇺🇸', circuit: 'Las Vegas Strip Circuit', date: '2026-11-22', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/2023_Las_Vegas_street_circuit.svg/960px-2023_Las_Vegas_street_circuit.svg.png' },
  { round: 23, name: 'Qatar Grand Prix', country: 'Qatar', flag: '🇶🇦', circuit: 'Lusail International Circuit', date: '2026-11-29', sprint: true, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Lusail_International_Circuit_2023.svg/960px-Lusail_International_Circuit_2023.svg.png' },
  { round: 24, name: 'Abu Dhabi Grand Prix', country: 'UAE', flag: '🇦🇪', circuit: 'Yas Marina Circuit', date: '2026-12-06', sprint: false, trackLayout: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Yas_Marina_Circuit.png/960px-Yas_Marina_Circuit.png' },
];
