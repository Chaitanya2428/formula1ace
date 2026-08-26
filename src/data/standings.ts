export interface StandingRow {
  position: number;
  driverId?: string;
  teamId?: string;
  name: string;
  team: string;
  points: number;
  wins: number;
  color: string;
}

export const driverStandings: StandingRow[] = [
  { position: 1, driverId: 'kimiantonelli', name: 'Kimi Antonelli', team: 'Mercedes', points: 238, wins: 6, color: '#27F4D2' },
  { position: 2, driverId: 'lewis-hamilton', name: 'Lewis Hamilton', team: 'Ferrari', points: 175, wins: 1, color: '#E8002D' },
  { position: 3, driverId: 'george-russell', name: 'George Russell', team: 'Mercedes', points: 170, wins: 2, color: '#27F4D2' },
  { position: 4, driverId: 'lando-norris', name: 'Lando Norris', team: 'McLaren', points: 153, wins: 2, color: '#FF8000' },
  { position: 5, driverId: 'charles-leclerc', name: 'Charles Leclerc', team: 'Ferrari', points: 150, wins: 1, color: '#E8002D' },
  { position: 6, driverId: 'max-verstappen', name: 'Max Verstappen', team: 'Red Bull Racing', points: 124, wins: 0, color: '#3671C6' },
  { position: 7, driverId: 'oscar-piastri', name: 'Oscar Piastri', team: 'McLaren', points: 100, wins: 0, color: '#FF8000' },
  { position: 8, driverId: 'isack-hadjar', name: 'Isack Hadjar', team: 'Red Bull Racing', points: 72, wins: 0, color: '#3671C6' },
  { position: 9, driverId: 'liam-lawson', name: 'Liam Lawson', team: 'Racing Bulls', points: 44, wins: 0, color: '#6692FF' },
  { position: 10, driverId: 'pierre-gasly', name: 'Pierre Gasly', team: 'Alpine', points: 44, wins: 0, color: '#0093CC' },
  { position: 11, driverId: 'arvid-lindblad', name: 'Arvid Lindblad', team: 'Racing Bulls', points: 23, wins: 0, color: '#6692FF' },
  { position: 12, driverId: 'franco-colapinto', name: 'Franco Colapinto', team: 'Alpine', points: 19, wins: 0, color: '#0093CC' },
  { position: 13, driverId: 'oliver-bearman', name: 'Oliver Bearman', team: 'Haas', points: 18, wins: 0, color: '#B6BABD' },
  { position: 14, driverId: 'gabriel-bortoleto', name: 'Gabriel Bortoleto', team: 'Audi', points: 10, wins: 0, color: '#00C8C8' },
  { position: 15, driverId: 'carlos-sainz', name: 'Carlos Sainz', team: 'Williams', points: 6, wins: 0, color: '#64C4FF' },
  { position: 16, driverId: 'alexander-albon', name: 'Alexander Albon', team: 'Williams', points: 5, wins: 0, color: '#64C4FF' },
  { position: 17, driverId: 'esteban-ocon', name: 'Esteban Ocon', team: 'Haas', points: 3, wins: 0, color: '#B6BABD' },
  { position: 18, driverId: 'nico-hulkenberg', name: 'Nico Hülkenberg', team: 'Audi', points: 2, wins: 0, color: '#00C8C8' },
  { position: 19, driverId: 'fernando-alonso', name: 'Fernando Alonso', team: 'Aston Martin', points: 1, wins: 0, color: '#229971' },
  { position: 20, driverId: 'lance-stroll', name: 'Lance Stroll', team: 'Aston Martin', points: 0, wins: 0, color: '#229971' },
  { position: 21, driverId: 'valtteri-bottas', name: 'Valtteri Bottas', team: 'Cadillac', points: 0, wins: 0, color: '#D4AF37' },
  { position: 22, driverId: 'sergio-perez', name: 'Sergio Pérez', team: 'Cadillac', points: 0, wins: 0, color: '#D4AF37' },
];

export const constructorStandings: StandingRow[] = [
  { position: 1, teamId: 'mercedes', name: 'Mercedes', team: 'Mercedes', points: 408, wins: 8, color: '#27F4D2' },
  { position: 2, teamId: 'ferrari', name: 'Ferrari', team: 'Ferrari', points: 325, wins: 2, color: '#E8002D' },
  { position: 3, teamId: 'mclaren', name: 'McLaren', team: 'McLaren', points: 253, wins: 2, color: '#FF8000' },
  { position: 4, teamId: 'red-bull', name: 'Red Bull Racing', team: 'Red Bull Racing', points: 196, wins: 0, color: '#3671C6' },
  { position: 5, teamId: 'racing-bulls', name: 'Racing Bulls', team: 'Racing Bulls', points: 67, wins: 0, color: '#6692FF' },
  { position: 6, teamId: 'alpine', name: 'Alpine', team: 'Alpine', points: 63, wins: 0, color: '#0093CC' },
  { position: 7, teamId: 'haas', name: 'Haas', team: 'Haas', points: 21, wins: 0, color: '#B6BABD' },
  { position: 8, teamId: 'audi', name: 'Audi', team: 'Audi', points: 12, wins: 0, color: '#00C8C8' },
  { position: 9, teamId: 'williams', name: 'Williams', team: 'Williams', points: 11, wins: 0, color: '#64C4FF' },
  { position: 10, teamId: 'aston-martin', name: 'Aston Martin', team: 'Aston Martin', points: 1, wins: 0, color: '#229971' },
  { position: 11, teamId: 'cadillac', name: 'Cadillac', team: 'Cadillac', points: 0, wins: 0, color: '#D4AF37' },
];

export const livePoints = {
  raceWinner: { name: 'Lando Norris', team: 'McLaren', grandPrix: 'Dutch Grand Prix', color: '#FF8000' },
  fastestLap: { name: 'Kimi Antonelli', team: 'Mercedes', time: '1:13.812', color: '#27F4D2' },
  mostPoles: { name: 'Kimi Antonelli', team: 'Mercedes', count: 7, color: '#27F4D2' },
  lastPodium: [
    { pos: 1, name: 'Lando Norris', team: 'McLaren', color: '#FF8000' },
    { pos: 2, name: 'Kimi Antonelli', team: 'Mercedes', color: '#27F4D2' },
    { pos: 3, name: 'Max Verstappen', team: 'Red Bull Racing', color: '#3671C6' },
  ],
};
