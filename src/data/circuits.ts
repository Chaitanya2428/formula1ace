export interface Circuit {
  id: string;
  name: string;
  country: string;
  flag: string;
  length: string;
  laps: number;
  lapRecord: string;
  weather: string;
  lastWinner: string;
  map: string;
  round: number;
  dates: string;
}

export const circuits: Circuit[] = [
  {
    id: 'bahrain', round: 1, name: 'Bahrain International Circuit', country: 'Bahrain', flag: '🇧🇭',
    length: '5.412 km', laps: 57, lapRecord: '1:31.447', weather: 'Dry, 24°C', lastWinner: 'Kimi Antonelli', dates: '13–15 Mar',
    map: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Bahrain_International_Circuit_logo.png',
  },
  {
    id: 'jeddah', round: 2, name: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', flag: '🇸🇦',
    length: '6.174 km', laps: 50, lapRecord: '1:30.734', weather: 'Dry, 28°C', lastWinner: 'Kimi Antonelli', dates: '20–22 Mar',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jeddah_Corniche_Circuit_Logo.svg/960px-Jeddah_Corniche_Circuit_Logo.svg.png',
  },
  {
    id: 'albert-park', round: 3, name: 'Albert Park Circuit', country: 'Australia', flag: '🇦🇺',
    length: '5.278 km', laps: 58, lapRecord: '1:20.235', weather: 'Dry, 22°C', lastWinner: 'George Russell', dates: '27–30 Mar',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Albert_Park_Circuit_2021.svg/960px-Albert_Park_Circuit_2021.svg.png',
  },
  {
    id: 'suzuka', round: 4, name: 'Suzuka Circuit', country: 'Japan', flag: '🇯🇵',
    length: '5.807 km', laps: 53, lapRecord: '1:30.983', weather: 'Variable, 18°C', lastWinner: 'Kimi Antonelli', dates: '3–5 Apr',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Suzuka_circuit_map--2005.svg/960px-Suzuka_circuit_map--2005.svg.png',
  },
  {
    id: 'shanghai', round: 5, name: 'Shanghai International Circuit', country: 'China', flag: '🇨🇳',
    length: '5.451 km', laps: 56, lapRecord: '1:32.238', weather: 'Dry, 25°C', lastWinner: 'Kimi Antonelli', dates: '17–20 Apr',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Shanghai_International_Racing_Circuit_track_map.svg/960px-Shanghai_International_Racing_Circuit_track_map.svg.png',
  },
  {
    id: 'miami', round: 6, name: 'Miami International Autodrome', country: 'USA', flag: '🇺🇸',
    length: '5.412 km', laps: 57, lapRecord: '1:29.708', weather: 'Dry, 30°C', lastWinner: 'Kimi Antonelli', dates: '1–3 May',
    map: 'https://upload.wikimedia.org/wikipedia/en/4/45/Miami_International_Autodrome_Logo.png',
  },
  {
    id: 'imola', round: 7, name: 'Imola Circuit', country: 'Italy', flag: '🇮🇹',
    length: '4.909 km', laps: 63, lapRecord: '1:15.484', weather: 'Dry, 20°C', lastWinner: 'Max Verstappen', dates: '15–17 May',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Imola_2009.svg/960px-Imola_2009.svg.png',
  },
  {
    id: 'monaco', round: 8, name: 'Circuit de Monaco', country: 'Monaco', flag: '🇲🇨',
    length: '3.337 km', laps: 78, lapRecord: '1:12.909', weather: 'Dry, 23°C', lastWinner: 'Kimi Antonelli', dates: '22–25 May',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Monte_Carlo_Formula_1_track_map.svg/960px-Monte_Carlo_Formula_1_track_map.svg.png',
  },
  {
    id: 'villeneuve', round: 9, name: 'Circuit Gilles Villeneuve', country: 'Canada', flag: '🇨🇦',
    length: '4.361 km', laps: 70, lapRecord: '1:13.078', weather: 'Variable, 19°C', lastWinner: 'Kimi Antonelli', dates: '12–14 Jun',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%C3%8Ele_Notre-Dame_%28Circuit_Gilles_Villeneuve%29.svg/960px-%C3%8Ele_Notre-Dame_%28Circuit_Gilles_Villeneuve%29.svg.png',
  },
  {
    id: 'barcelona', round: 10, name: 'Circuit de Barcelona-Catalunya', country: 'Spain', flag: '🇪🇸',
    length: '4.657 km', laps: 66, lapRecord: '1:16.330', weather: 'Dry, 26°C', lastWinner: 'Lewis Hamilton', dates: '19–21 Jun',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Circuit_de_Catalunya_moto_2021.svg/960px-Circuit_de_Catalunya_moto_2021.svg.png',
  },
  {
    id: 'red-bull-ring', round: 11, name: 'Red Bull Ring', country: 'Austria', flag: '🇦🇹',
    length: '4.318 km', laps: 71, lapRecord: '1:05.619', weather: 'Dry, 24°C', lastWinner: 'Max Verstappen', dates: '26–28 Jun',
    map: 'https://upload.wikimedia.org/wikipedia/en/8/86/Logo_for_Red_Bull_Ring.png',
  },
  {
    id: 'silverstone', round: 12, name: 'Silverstone Circuit', country: 'United Kingdom', flag: '🇬🇧',
    length: '5.891 km', laps: 52, lapRecord: '1:27.097', weather: 'Variable, 17°C', lastWinner: 'Charles Leclerc', dates: '3–5 Jul',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Silverstone_Circuit_2020.png/960px-Silverstone_Circuit_2020.png',
  },
  {
    id: 'hungaroring', round: 13, name: 'Hungaroring', country: 'Hungary', flag: '🇭🇺',
    length: '4.381 km', laps: 70, lapRecord: '1:16.627', weather: 'Dry, 28°C', lastWinner: 'Oscar Piastri', dates: '17–19 Jul',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hungaroring.svg/960px-Hungaroring.svg.png',
  },
  {
    id: 'spa', round: 14, name: 'Circuit de Spa-Francorchamps', country: 'Belgium', flag: '🇧🇪',
    length: '7.004 km', laps: 44, lapRecord: '1:44.701', weather: 'Variable, 16°C', lastWinner: 'Kimi Antonelli', dates: '24–26 Jul',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Spa-Francorchamps_of_Belgium.svg/960px-Spa-Francorchamps_of_Belgium.svg.png',
  },
  {
    id: 'zandvoort', round: 15, name: 'Zandvoort Circuit', country: 'Netherlands', flag: '🇳🇱',
    length: '4.259 km', laps: 72, lapRecord: '1:11.097', weather: 'Variable, 18°C', lastWinner: 'Lando Norris', dates: '28–30 Aug',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Raadhuis%2C_Zandvoort.jpg/960px-Raadhuis%2C_Zandvoort.jpg',
  },
  {
    id: 'monza', round: 16, name: 'Monza Circuit', country: 'Italy', flag: '🇮🇹',
    length: '5.793 km', laps: 53, lapRecord: '1:21.046', weather: 'Dry, 25°C', lastWinner: 'Charles Leclerc', dates: '4–6 Sep',
    map: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Autodromo_Nazionale_Monza_circuit_logo.png',
  },
  {
    id: 'baku', round: 17, name: 'Baku City Circuit', country: 'Azerbaijan', flag: '🇦🇿',
    length: '6.003 km', laps: 51, lapRecord: '1:43.009', weather: 'Dry, 26°C', lastWinner: 'Oscar Piastri', dates: '18–20 Sep',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Imola_2009.svg/960px-Imola_2009.svg.png',
  },
  {
    id: 'marina-bay', round: 18, name: 'Marina Bay Street Circuit', country: 'Singapore', flag: '🇸🇬',
    length: '4.940 km', laps: 62, lapRecord: '1:35.867', weather: 'Humid, 30°C', lastWinner: 'Lando Norris', dates: '2–4 Oct',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Marina_Bay_circuit_2023.svg/960px-Marina_Bay_circuit_2023.svg.png',
  },
  {
    id: 'cota', round: 19, name: 'Circuit of the Americas', country: 'USA', flag: '🇺🇸',
    length: '5.513 km', laps: 56, lapRecord: '1:36.169', weather: 'Dry, 27°C', lastWinner: 'Max Verstappen', dates: '16–18 Oct',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Austin_circuit.svg/960px-Austin_circuit.svg.png',
  },
  {
    id: 'rodriguez', round: 20, name: 'Hermanos Rodríguez Circuit', country: 'Mexico', flag: '🇲🇽',
    length: '4.304 km', laps: 71, lapRecord: '1:17.774', weather: 'Dry, 22°C', lastWinner: 'Carlos Sainz', dates: '23–25 Oct',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_2015.svg/960px-Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_2015.svg.png',
  },
  {
    id: 'interlagos', round: 21, name: 'Interlagos Circuit', country: 'Brazil', flag: '🇧🇷',
    length: '4.309 km', laps: 71, lapRecord: '1:17.479', weather: 'Variable, 21°C', lastWinner: 'Max Verstappen', dates: '6–8 Nov',
    map: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Bairro_de_Interlagos.jpg',
  },
  {
    id: 'las-vegas', round: 22, name: 'Las Vegas Strip Circuit', country: 'USA', flag: '🇺🇸',
    length: '6.201 km', laps: 50, lapRecord: '1:35.490', weather: 'Dry, 12°C', lastWinner: 'Max Verstappen', dates: '19–21 Nov',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/2023_Las_Vegas_street_circuit.svg/960px-2023_Las_Vegas_street_circuit.svg.png',
  },
  {
    id: 'lusail', round: 23, name: 'Lusail International Circuit', country: 'Qatar', flag: '🇶🇦',
    length: '5.380 km', laps: 57, lapRecord: '1:24.679', weather: 'Dry, 28°C', lastWinner: 'Max Verstappen', dates: '28–30 Nov',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Lusail_International_Circuit_2023.svg/960px-Lusail_International_Circuit_2023.svg.png',
  },
  {
    id: 'yas-marina', round: 24, name: 'Yas Marina Circuit', country: 'UAE', flag: '🇦🇪',
    length: '5.281 km', laps: 58, lapRecord: '1:26.209', weather: 'Dry, 24°C', lastWinner: 'Max Verstappen', dates: '5–7 Dec',
    map: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Yas_Marina_Circuit.png/960px-Yas_Marina_Circuit.png',
  },
];
