export interface StatRecord {
  label: string;
  value: string;
  detail: string;
  icon: string;
}

export const statistics: StatRecord[] = [
  { label: 'Most Championships', value: '7', detail: 'Michael Schumacher & Lewis Hamilton', icon: 'crown' },
  { label: 'Most Race Wins', value: '104', detail: 'Lewis Hamilton', icon: 'trophy' },
  { label: 'Most Pole Positions', value: '104', detail: 'Lewis Hamilton', icon: 'flag' },
  { label: 'Most Fastest Laps', value: '77', detail: 'Michael Schumacher', icon: 'gauge' },
  { label: 'Youngest Champion', value: '23 yrs', detail: 'Sebastian Vettel (2010)', icon: 'zap' },
  { label: 'Oldest Champion', value: '46 yrs', detail: 'Juan Manuel Fangio (1957)', icon: 'clock' },
  { label: 'Most Wins in a Season', value: '19', detail: 'Max Verstappen (2023)', icon: 'bar-chart' },
  { label: 'Most Consecutive Wins', value: '10', detail: 'Max Verstappen (2023)', icon: 'trending-up' },
];

export interface TeamStat {
  label: string;
  value: number;
  team: string;
  color: string;
}

export const mostSuccessfulTeams: TeamStat[] = [
  { label: 'Ferrari', value: 16, team: 'Scuderia Ferrari', color: '#E8002D' },
  { label: 'McLaren', value: 8, team: 'McLaren F1', color: '#FF8000' },
  { label: 'Mercedes', value: 8, team: 'Mercedes-AMG', color: '#27F4D2' },
  { label: 'Williams', value: 9, team: 'Williams Racing', color: '#64C4FF' },
  { label: 'Red Bull', value: 6, team: 'Red Bull Racing', color: '#3671C6' },
  { label: 'Lotus', value: 7, team: 'Team Lotus', color: '#FFB800' },
];

export const seasonStats = [
  { label: 'Races Completed', value: '12', detail: 'of 24 rounds in 2026' },
  { label: 'Different Winners', value: '3', detail: 'Antonelli, Hamilton, Leclerc' },
  { label: 'Fastest Lap Record', value: '1:44.801', detail: 'Kimi Antonelli — Spa 2026' },
  { label: 'Lead Margin', value: '45 pts', detail: 'Antonelli over Hamilton' },
  { label: 'Podium Nation', value: '5', detail: 'Countries on the podium' },
  { label: 'Safety Car Deployments', value: '18', detail: 'Across 12 races' },
];
