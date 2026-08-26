export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'How can I attend a Formula 1 Grand Prix?',
    answer:
      'Tickets for Formula 1 races are sold through the official F1 website and authorized ticket partners. Prices vary by circuit and grandstand, with general admission starting around €100 and VIP hospitality packages reaching several thousand euros.',
  },
  {
    question: 'How does the points system work in F1?',
    answer:
      'Points are awarded to the top 10 finishers: 25-18-15-12-10-8-6-4-2-1. An additional point is awarded for the fastest lap (if the driver finishes in the top 10). Sprint races award 8-7-6-5-4-3-2-1 to the top 8.',
  },
  {
    question: 'What is a sprint weekend?',
    answer:
      'A sprint weekend features a 100km sprint race on Saturday in addition to the main Grand Prix on Sunday. The sprint has its own qualifying session (Sprint Shootout) and awards points to the top 8 finishers.',
  },
  {
    question: 'How many races are in a Formula 1 season?',
    answer:
      'The current F1 calendar features 24 Grand Prix events across five continents, making it the most geographically diverse motorsport championship in the world.',
  },
  {
    question: 'What is DRS in Formula 1?',
    answer:
      'DRS (Drag Reduction System) is a movable rear flap that reduces aerodynamic drag, increasing top speed by 10-12 km/h. It can only be used in designated zones when within one second of the car ahead.',
  },
  {
    question: 'How fast do Formula 1 cars go?',
    answer:
      'Modern F1 cars reach top speeds of over 370 km/h (230 mph) on circuits like Monza and Jeddah. Cornering forces can exceed 6G, and acceleration from 0-100 km/h takes under 2.6 seconds.',
  },
];
