export interface Team {
  id: string;
  name: string;
  fullName: string;
  principal: string;
  engine: string;
  headquarters: string;
  championships: number;
  founded: number;
  color: string;
  carImage: string;
  logo: string;
  history: string;
  drivers: string[];
  gallery: string[];
}

export const teams: Team[] = [
  {
    id: 'mclaren',
    name: 'McLaren',
    fullName: 'McLaren Formula 1 Team',
    principal: 'Andrea Stella',
    engine: 'Mercedes',
    headquarters: 'Woking, United Kingdom',
    championships: 9,
    founded: 1963,
    color: '#FF8000',
    carImage: '/images/teams/cars/mclaren-car.webp',
    logo: '/images/teams/cars/mclaren-logo.webp',
    history:
      'Founded by Bruce McLaren in 1963, McLaren is one of the most iconic names in motorsport. After winning the 2024 Constructors Championship, McLaren enters the new 2026 regulations era as a powerhouse, with Norris and Piastri forming one of the strongest driver pairings on the grid.',
    drivers: ['lando-norris', 'oscar-piastri'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3805_by_Stepro.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3805_by_Stepro.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg/960px-2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg'],
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    fullName: 'Scuderia Ferrari HP',
    principal: 'Frédéric Vasseur',
    engine: 'Ferrari',
    headquarters: 'Maranello, Italy',
    championships: 16,
    founded: 1950,
    color: '#E8002D',
    carImage: 'https://images.pexels.com/photos/13641535/pexels-photo-13641535.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    logo: '/images/teams/cars/ferrari-logo.webp',
    history:
      'The oldest and most successful team in Formula 1 history, Scuderia Ferrari has competed in every season since 1950. The Lewis Hamilton era at Ferrari began in 2025, and the team enters 2026 with new regulations chasing its first championship since 2008 with a formidable Leclerc-Hamilton lineup.',
    drivers: ['charles-leclerc', 'lewis-hamilton'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Carlos_Sainz_Chinese_GP_2024.jpg/960px-Carlos_Sainz_Chinese_GP_2024.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg/960px-Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg'],
  },
  {
    id: 'red-bull',
    name: 'Red Bull Racing',
    fullName: 'Oracle Red Bull Racing',
    principal: 'Christian Horner',
    engine: 'Ford RBPT',
    headquarters: 'Milton Keynes, United Kingdom',
    championships: 6,
    founded: 2005,
    color: '#3671C6',
    carImage: '/images/teams/cars/redbullracing-car.webp',
    logo: '/images/teams/cars/redbullracing-logo.webp',
    history:
      'Red Bull Racing became a modern dynasty with four consecutive titles for Verstappen from 2021-2024. For 2026, the team begins a new partnership with Ford under the RBPT banner, with rising star Isack Hadjar promoted to partner Verstappen in the new regulations era.',
    drivers: ['max-verstappen', 'isack-hadjar'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/2024_Red_Bull_RB20.jpg/960px-2024_Red_Bull_RB20.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg/960px-Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg'],
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    fullName: 'Mercedes-AMG Petronas F1 Team',
    principal: 'Toto Wolff',
    engine: 'Mercedes',
    headquarters: 'Brackley, United Kingdom',
    championships: 8,
    founded: 1954,
    color: '#27F4D2',
    carImage: '/images/teams/cars/mercedes-w11.jpg',
    logo: 'https://images.pexels.com/photos/28680795/pexels-photo-28680795.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    history:
      'Mercedes dominated 2014-2021 with eight consecutive constructors titles. For 2026, the Silver Arrows have been the early pacesetters under the new regulations, with Kimi Antonelli emerging as a race winner and George Russell leading the charge.',
    drivers: ['george-russell', 'kimiantonelli'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3434_by_Stepro.jpg/960px-2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3434_by_Stepro.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg/960px-KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg'],
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    fullName: 'Aston Martin Aramco Honda F1 Team',
    principal: 'Andy Cowell',
    engine: 'Honda',
    headquarters: 'Silverstone, United Kingdom',
    championships: 0,
    founded: 2021,
    color: '#229971',
    carImage: '/images/teams/cars/astonmartin-car.webp',
    logo: '/images/teams/cars/astonmartin-logo.webp',
    history:
      'Aston Martin returned to Formula 1 in 2021. For 2026, the team begins a landmark works partnership with Honda, becoming Honda\'s factory team. With Fernando Alonso still delivering and a state-of-the-art factory, Aston Martin aims to become a championship contender.',
    drivers: ['fernando-alonso', 'lance-stroll'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3318_by_Stepro.jpg/960px-2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3318_by_Stepro.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alonso-68_%2824710447098%29.jpg/960px-Alonso-68_%2824710447098%29.jpg'],
  },
  {
    id: 'alpine',
    name: 'Alpine',
    fullName: 'BWT Alpine F1 Team',
    principal: 'Oliver Oakes',
    engine: 'Mercedes',
    headquarters: 'Enstone, United Kingdom',
    championships: 2,
    founded: 1981,
    color: '#0093CC',
    carImage: '/images/teams/cars/alpine-car.webp',
    logo: '/images/teams/cars/alpine.png',
    history:
      'Alpine traces its roots through Benetton and Renault, winning championships with Schumacher and Alonso. For 2026, the team switches to Mercedes power units after decades with Renault, with Franco Colapinto joining Pierre Gasly to form an all-new lineup.',
    drivers: ['pierre-gasly', 'franco-colapinto'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2024_Spanish_Grand_Prix_%2853811182883%29.jpg/960px-2024_Spanish_Grand_Prix_%2853811182883%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2022_French_Grand_Prix_%2852279065728%29_%28midcrop%29.png/960px-2022_French_Grand_Prix_%2852279065728%29_%28midcrop%29.png'],
  },
  {
    id: 'williams',
    name: 'Williams',
    fullName: 'Atlassian Williams Racing',
    principal: 'James Vowles',
    engine: 'Mercedes',
    headquarters: 'Grove, United Kingdom',
    championships: 9,
    founded: 1977,
    color: '#64C4FF',
    carImage: 'https://images.pexels.com/photos/29252129/pexels-photo-29252129.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    logo: 'https://images.pexels.com/photos/35219022/pexels-photo-35219022.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    history:
      'Founded by Frank Williams in 1977, Williams dominated the 1980s and 1990s with nine constructors titles. Under James Vowles, the team has rebuilt steadily. For 2026, Carlos Sainz and Alex Albon form one of the most experienced and competitive driver pairings on the grid.',
    drivers: ['alexander-albon', 'carlos-sainz'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/FIA_F1_Austria_2024_Nr._23_Albon.jpg/960px-FIA_F1_Austria_2024_Nr._23_Albon.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Alex_Albon_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8626%29_%28cropped%29.jpg/960px-Alex_Albon_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8626%29_%28cropped%29.jpg'],
  },
  {
    id: 'racing-bulls',
    name: 'Racing Bulls',
    fullName: 'Visa Cash App Racing Bulls F1 Team',
    principal: 'Laurent Mekies',
    engine: 'Ford RBPT',
    headquarters: 'Faenza, Italy',
    championships: 0,
    founded: 2006,
    color: '#6692FF',
    carImage: '/images/teams/cars/racingbulls-car.webp',
    logo: '/images/teams/cars/racingbulls-logo.webp',
    history:
      'Racing Bulls is Red Bull\'s sister team, focused on developing young talent. For 2026, Liam Lawson returns as lead driver after his Red Bull stint, alongside highly-rated British-Thai rookie Arvid Lindblad, who becomes the youngest driver on the grid.',
    drivers: ['liam-lawson', 'arvid-lindblad'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Yuki_Tsunoda_Chinese_GP_2024.jpg/960px-Yuki_Tsunoda_Chinese_GP_2024.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7793%29.jpg/960px-Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7793%29.jpg'],
  },
  {
    id: 'audi',
    name: 'Audi',
    fullName: 'Audi Revolut F1 Team',
    principal: 'Mattia Binotto',
    engine: 'Audi',
    headquarters: 'Hinwil, Switzerland',
    championships: 0,
    founded: 2026,
    color: '#00C8C8',
    carImage: '/images/teams/cars/audi-car.webp',
    logo: '/images/teams/cars/audi-logo.webp',
    history:
      'Audi makes its historic Formula 1 debut in 2026 as a works team, taking over the Sauber operation. With Nico Hülkenberg bringing vast experience and Brazilian rookie Gabriel Bortoleto — managed by Fernando Alonso — the German manufacturer enters F1 with long-term championship ambitions.',
    drivers: ['nico-hulkenberg', 'gabriel-bortoleto'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2019_Formula_One_tests_Barcelona%2C_Hulkenberg_%2840287128313%29.jpg/960px-2019_Formula_One_tests_Barcelona%2C_Hulkenberg_%2840287128313%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Gabriel_Bortoleto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8581%29_cropped.jpg/960px-Gabriel_Bortoleto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8581%29_cropped.jpg'],
  },
  {
    id: 'haas',
    name: 'Haas',
    fullName: 'MoneyGram Haas F1 Team',
    principal: 'Ayao Komatsu',
    engine: 'Ferrari',
    headquarters: 'Kannapolis, United States',
    championships: 0,
    founded: 2016,
    color: '#B6BABD',
    carImage: 'https://images.pexels.com/photos/38184115/pexels-photo-38184115.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    logo: '/images/teams/cars/haas-logo.webp',
    history:
      'Haas is the only American team on the grid, founded by Gene Haas in 2016. For 2026, the team fields Oliver Bearman — who impressed as a Ferrari substitute in 2024 — alongside experienced Frenchman Esteban Ocon, forming a strong blend of youth and experience.',
    drivers: ['oliver-bearman', 'esteban-ocon'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/FIA_F1_Austria_2024_Nr._20_Magnussen.jpg/960px-FIA_F1_Austria_2024_Nr._20_Magnussen.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg/960px-2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg'],
  },
  {
    id: 'cadillac',
    name: 'Cadillac',
    fullName: 'Cadillac F1 Team',
    principal: 'Graeme Lowdon',
    engine: 'Ferrari',
    headquarters: 'Indianapolis, United States',
    championships: 0,
    founded: 2026,
    color: '#D4AF37',
    carImage: '/images/teams/cars/cadillac-car.webp',
    logo: 'https://images.pexels.com/photos/29252129/pexels-photo-29252129.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
    history:
      'Cadillac joins Formula 1 in 2026 as the sport\'s first new team in a decade and the 11th constructor on the grid. Backed by General Motors and TWG Global, the American team brings Valtteri Bottas and Sergio Pérez — with a combined 500+ race starts — to lead its debut campaign.',
    drivers: ['valtteri-bottas', 'sergio-perez'],
    gallery: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2026_Chinese_GP_-_Cadillac_-_MAC-26.jpg/960px-2026_Chinese_GP_-_Cadillac_-_MAC-26.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_%28028A7556%29.jpg/960px-Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_%28028A7556%29.jpg'],
  },
];

export const teamMap: Record<string, Team> = Object.fromEntries(teams.map((t) => [t.id, t]));
