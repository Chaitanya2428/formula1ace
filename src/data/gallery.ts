export interface GalleryImage {
  id: string;
  category: 'Cars' | 'Drivers' | 'Teams' | 'Historic Moments' | 'Championship Celebrations';
  title: string;
  url: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 'g1', category: 'Cars', title: 'McLaren MCL38 — Zandvoort 2024', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3805_by_Stepro.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3805_by_Stepro.jpg' },
  { id: 'g2', category: 'Cars', title: 'Ferrari SF-24 — Chinese GP 2024', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Carlos_Sainz_Chinese_GP_2024.jpg/960px-Carlos_Sainz_Chinese_GP_2024.jpg' },
  { id: 'g3', category: 'Cars', title: 'Red Bull RB20 — 2024', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/2024_Red_Bull_RB20.jpg/960px-2024_Red_Bull_RB20.jpg' },
  { id: 'g4', category: 'Cars', title: 'Mercedes W15 — Zandvoort 2024', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3434_by_Stepro.jpg/960px-2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3434_by_Stepro.jpg' },
  { id: 'g5', category: 'Cars', title: 'Aston Martin AMR24 — Zandvoort 2024', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3318_by_Stepro.jpg/960px-2024-08-24_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3318_by_Stepro.jpg' },
  { id: 'g6', category: 'Cars', title: 'Alpine A524 — Spanish GP 2024', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2024_Spanish_Grand_Prix_%2853811182883%29.jpg/960px-2024_Spanish_Grand_Prix_%2853811182883%29.jpg' },
  { id: 'g7', category: 'Cars', title: 'Williams FW46 — Austria 2024', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/FIA_F1_Austria_2024_Nr._23_Albon.jpg/960px-FIA_F1_Austria_2024_Nr._23_Albon.jpg' },
  { id: 'g8', category: 'Cars', title: 'Cadillac MAC-26 — Chinese GP 2026', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2026_Chinese_GP_-_Cadillac_-_MAC-26.jpg/960px-2026_Chinese_GP_-_Cadillac_-_MAC-26.jpg' },
  { id: 'g9', category: 'Drivers', title: 'Lando Norris', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg' },
  { id: 'g10', category: 'Drivers', title: 'Max Verstappen', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg' },
  { id: 'g11', category: 'Drivers', title: 'Charles Leclerc', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg/960px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg' },
  { id: 'g12', category: 'Drivers', title: 'Lewis Hamilton', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg/960px-Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg' },
  { id: 'g13', category: 'Drivers', title: 'Oscar Piastri', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg/960px-2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg' },
  { id: 'g14', category: 'Drivers', title: 'George Russell', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg/960px-KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg' },
  { id: 'g15', category: 'Drivers', title: 'Fernando Alonso', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alonso-68_%2824710447098%29.jpg/960px-Alonso-68_%2824710447098%29.jpg' },
  { id: 'g16', category: 'Drivers', title: 'Carlos Sainz', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Formula1Gabelhofen2022_%2804%29_%28cropped2%29.jpg/960px-Formula1Gabelhofen2022_%2804%29_%28cropped2%29.jpg' },
  { id: 'g17', category: 'Teams', title: 'McLaren F1 Team', url: 'https://upload.wikimedia.org/wikipedia/en/0/03/McLarenF1Team.png' },
  { id: 'g18', category: 'Teams', title: 'Scuderia Ferrari', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Scuderia_Ferrari_HP_logo_24.svg/960px-Scuderia_Ferrari_HP_logo_24.svg.png' },
  { id: 'g19', category: 'Teams', title: 'Red Bull Racing', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Red_Bull_Racing_Logo_2026.svg/960px-Red_Bull_Racing_Logo_2026.svg.png' },
  { id: 'g20', category: 'Teams', title: 'Williams Racing', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Atlassian_Williams_F1_Team_logo.svg/960px-Atlassian_Williams_F1_Team_logo.svg.png' },
  { id: 'g21', category: 'Teams', title: 'Haas F1 Team', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/TGR_Haas_F1_Team_Logo_%282026%29.svg/960px-TGR_Haas_F1_Team_Logo_%282026%29.svg.png' },
  { id: 'g22', category: 'Teams', title: 'Alpine F1 Team', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/BWT_Alpine_F1_Team_Logo.png/960px-BWT_Alpine_F1_Team_Logo.png' },
  { id: 'g23', category: 'Historic Moments', title: 'Suzuka Circuit', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Suzuka_circuit_map--2005.svg/960px-Suzuka_circuit_map--2005.svg.png' },
  { id: 'g24', category: 'Historic Moments', title: 'Spa-Francorchamps', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Spa-Francorchamps_of_Belgium.svg/960px-Spa-Francorchamps_of_Belgium.svg.png' },
  { id: 'g25', category: 'Historic Moments', title: 'Monaco Street Circuit', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Monte_Carlo_Formula_1_track_map.svg/960px-Monte_Carlo_Formula_1_track_map.svg.png' },
  { id: 'g26', category: 'Historic Moments', title: 'Silverstone Circuit', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Silverstone_Circuit_2020.png/960px-Silverstone_Circuit_2020.png' },
  { id: 'g27', category: 'Championship Celebrations', title: 'Monza Circuit', url: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Autodromo_Nazionale_Monza_circuit_logo.png' },
  { id: 'g28', category: 'Championship Celebrations', title: 'Circuit of the Americas', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Austin_circuit.svg/960px-Austin_circuit.svg.png' },
  { id: 'g29', category: 'Championship Celebrations', title: 'Yas Marina Circuit', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Yas_Marina_Circuit.png/960px-Yas_Marina_Circuit.png' },
  { id: 'g30', category: 'Championship Celebrations', title: 'Las Vegas Strip Circuit', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/2023_Las_Vegas_street_circuit.svg/960px-2023_Las_Vegas_street_circuit.svg.png' },
];

export const galleryCategories = ['All', 'Cars', 'Drivers', 'Teams', 'Historic Moments', 'Championship Celebrations'] as const;
