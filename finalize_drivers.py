#!/usr/bin/env python3
"""Fix nationalities, add bios and teams, generate final JSON."""
import json
import re

# Nationality to emoji flag mapping
NATIONALITY_FLAGS = {
    'Argentina': '🇦🇷', 'Australia': '🇦🇺', 'Austria': '🇦🇹', 'Belgium': '🇧🇪',
    'Brazil': '🇧🇷', 'Canada': '🇨🇦', 'Chile': '🇨🇱', 'China': '🇨🇳',
    'Colombia': '🇨🇴', 'Czech Republic': '🇨🇿', 'Czechoslovakia': '🇨🇿',
    'Denmark': '🇩🇰', 'East Germany': '🇩🇪', 'Finland': '🇫🇮',
    'France': '🇫🇷', 'Germany': '🇩🇪', 'Hungary': '🇭🇺', 'India': '🇮🇳',
    'Indonesia': '🇮🇩', 'Ireland': '🇮🇪', 'Italy': '🇮🇹', 'Japan': '🇯🇵',
    'Liechtenstein': '🇱🇮', 'Luxembourg': '🇱🇺', 'Malaysia': '🇲🇾',
    'Mexico': '🇲🇽', 'Monaco': '🇲🇨', 'Morocco': '🇲🇦',
    'Netherlands': '🇳🇱', 'New Zealand': '🇳🇿', 'Poland': '🇵🇱',
    'Portugal': '🇵🇹', 'Rhodesia': '🇿🇼', 'Rhodesia and Nyasaland': '🇿🇼',
    'Russia': '🇷🇺', 'South Africa': '🇿🇦', 'Spain': '🇪🇸',
    'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Thailand': '🇹🇭',
    'United Kingdom': '🇬🇧', 'United States': '🇺🇸',
    'Uruguay': '🇺🇾', 'Venezuela': '🇻🇪', 'West Germany': '🇩🇪',
    'Zimbabwe': '🇿🇼', 'RAF': '🏳️', 'Neutral': '🏳️',
}

def clean_nationality(nat):
    """Clean nationality string by removing footnote markers and extra content."""
    # Remove footnote markers like [43], [50], [f], [z]
    nat = re.sub(r'\[\w+\]', '', nat)
    # Remove citation templates that leaked through
    nat = re.sub(r'\{\{cite.*?\}\}', '', nat, flags=re.DOTALL)
    nat = re.sub(r'/ref>.*$', '', nat)
    # Remove trailing/leading whitespace
    nat = nat.strip()
    
    # Handle special cases
    if 'RAF' in nat or 'neutral' in nat.lower():
        return 'Russia'  # Mazepin raced under neutral flag but is Russian
    if 'East Germany, West Germany' in nat:
        return 'Germany'
    if 'Rhodesia and Nyasaland' in nat:
        return 'Rhodesia and Nyasaland'
    if 'Belgium France' in nat:
        return 'Belgium'  # Dual nationality, pick first
    if 'Monaco Netherlands' in nat:
        return 'Monaco'  # Dual nationality, pick first
    
    return nat

def get_flag(nationality):
    """Get emoji flag for a nationality."""
    if nationality in NATIONALITY_FLAGS:
        return NATIONALITY_FLAGS[nationality]
    return '🏁'

def generate_bio(driver):
    """Generate a 1-2 sentence bio for a driver."""
    name = driver['name']
    nat = driver['nationality']
    years = driver['years_active']
    champs = driver['championships']
    wins = driver['wins']
    poles = driver['poles']
    podiums = driver['podiums']
    entries = driver['entries']
    
    parts = []
    
    if champs > 0:
        parts.append(f"{name} is a {nat} Formula One driver who won the World Drivers' Championship {champs} time{'s' if champs > 1 else ''}")
    else:
        parts.append(f"{name} is a {nat} Formula One driver")
    
    if years:
        parts[-1] += f" who competed from {years}"
    
    stats = []
    if wins > 0:
        stats.append(f"{wins} race win{'s' if wins > 1 else ''}")
    if poles > 0:
        stats.append(f"{poles} pole position{'s' if poles > 1 else ''}")
    if podiums > 0:
        stats.append(f"{podiums} podium{'s' if podiums > 1 else ''}")
    if entries > 0:
        stats.append(f"{entries} race entr{'y' if entries == 1 else 'ies'}")
    
    if stats:
        bio = parts[0] + "."
        if champs > 0:
            bio += f" Across their career, they achieved {', '.join(stats)}."
        else:
            if len(stats) > 1:
                bio += f" They achieved {', '.join(stats[:-1])}, and {stats[-1]}."
            else:
                bio += f" They achieved {stats[0]}."
    else:
        bio = parts[0] + "."
    
    return bio

# Notable teams for champions and well-known drivers
NOTABLE_TEAMS = {
    'Lewis Hamilton': 'McLaren, Mercedes',
    'Michael Schumacher': 'Jordan, Benetton, Ferrari, Mercedes',
    'Max Verstappen': 'Toro Rosso, Red Bull Racing',
    'Ayrton Senna': 'Toleman, Lotus, McLaren, Williams',
    'Alain Prost': 'McLaren, Renault, Ferrari, Williams',
    'Niki Lauda': 'March, BRM, Ferrari, Brabham, McLaren',
    'Jackie Stewart': 'BRM, Matra, Tyrrell',
    'Nelson Piquet': 'Ensign, McLaren, Brabham, Williams, Lotus',
    'Nigel Mansell': 'Lotus, Williams, Ferrari, Williams',
    'Sebastian Vettel': 'BMW Sauber, Toro Rosso, Red Bull Racing, Ferrari, Aston Martin',
    'Kimi Räikkönen': 'Sauber, McLaren, Ferrari, Lotus, Ferrari, Alfa Romeo',
    'Fernando Alonso': 'Minardi, Renault, McLaren, Ferrari, Ferrari, McLaren, Alpine, Aston Martin',
    'Juan Manuel Fangio': 'Alfa Romeo, Ferrari, Mercedes, Maserati',
    'Jim Clark': 'Lotus',
    'Graham Hill': 'Lotus, BRM, Brabham, Hill',
    'Damon Hill': 'Brabham, Williams, Arrows, Jordan',
    'Phil Hill': 'Ferrari, ATS',
    'Denny Hulme': 'Brabham, McLaren',
    'Jochen Rindt': 'Cooper, Brabham, Lotus',
    'Emerson Fittipaldi': 'Lotus, McLaren, Fittipaldi',
    'James Hunt': 'Hesketh, McLaren, Wolf',
    'Mario Andretti': 'Lotus, Williams, Alfa Romeo, Ferrari',
    'Jody Scheckter': 'McLaren, Tyrrell, Wolf, Ferrari',
    'Alan Jones': 'Surtees, Shadow, Williams, Arrows, Ferrari',
    'Keke Rosberg': 'Theodore, ATS, Wolf, Fittipaldi, Williams',
    'Nico Rosberg': 'Williams, Mercedes',
    'Jacques Villeneuve': 'Williams, BAR, Renault, Sauber, BMW Sauber',
    'Mika Häkkinen': 'Lotus, McLaren',
    'Alberto Ascari': 'Ferrari, Lancia',
    'Giuseppe Farina': 'Alfa Romeo, Ferrari, Maserati',
    'Mike Hawthorn': 'Ferrari, Vanwall, BRM, Cooper',
    'John Surtees': 'Lotus, BRM, Ferrari, Honda, BRM, Surtees',
    'Jack Brabham': 'Cooper, Brabham',
    'Duncan Hamilton': 'Talbot, HWM, Connaught',
    'Stirling Moss': 'Mercedes, Maserati, Vanwall, Cooper, Lotus, BRM',
    'Carlos Reutemann': 'Brabham, Ferrari, Lotus, Williams',
    'Rubens Barrichello': 'Jordan, Stewart, Ferrari, Honda, Brawn, Williams',
    'Valtteri Bottas': 'Williams, Mercedes, Alfa Romeo',
    'Charles Leclerc': 'Sauber, Ferrari',
    'Lando Norris': 'McLaren',
    'Carlos Sainz': 'Toro Rosso, Renault, McLaren, Ferrari, Williams',
    'Sergio Pérez': 'Sauber, McLaren, Force India, Racing Point, Red Bull Racing',
    'Daniel Ricciardo': 'HRT, Toro Rosso, Red Bull Racing, Renault, McLaren, RB',
    'Pierre Gasly': 'Toro Rosso, Red Bull Racing, AlphaTauri, Alpine',
    'Esteban Ocon': 'Manor, Force India, Renault, Alpine',
    'Lance Stroll': 'Williams, Racing Point, Aston Martin',
    'Pierre Levegh': 'Talbot-Lago, Delahaye',
    'Oscar Piastri': 'McLaren',
    'George Russell': 'Williams, Mercedes',
    'Alexander Albon': 'Toro Rosso, Red Bull Racing, Williams',
    'Zhou Guanyu': 'Alfa Romeo',
    'Yuki Tsunoda': 'AlphaTauri, RB',
    'Logan Sargeant': 'Williams',
    'Kevin Magnussen': 'McLaren, Renault, Haas',
    'Nico Hülkenberg': 'Williams, Force India, Sauber, Renault, Haas',
    'Mick Schumacher': 'Haas',
    'Nyck de Vries': 'Williams, AlphaTauri',
    'Robert Kubica': 'BMW Sauber, Renault, Williams, Alfa Romeo',
    'Jenson Button': 'Williams, Benetton, Renault, BAR, Honda, Brawn, McLaren',
    'Jules Bianchi': 'Marussia',
    'Romain Grosjean': 'Renault, Lotus, Haas',
    'Pastor Maldonado': 'Williams, Lotus',
    'Kamui Kobayashi': 'Toyota, Sauber, Caterham',
    'Bruno Senna': 'HRT, Renault, Williams',
    'Heikki Kovalainen': 'Renault, McLaren, Caterham',
    'Timo Glock': 'Jordan, Toyota, Virgin/Marussia',
    'Giancarlo Fisichella': 'Minardi, Jordan, Benetton, Sauber, Jordan, Renault, Force India, Ferrari',
    'Mark Webber': 'Minardi, Jaguar, Williams, Red Bull Racing',
    'David Coulthard': 'Williams, McLaren, Red Bull Racing',
    'Juan Pablo Montoya': 'Williams, McLaren',
    'Ralf Schumacher': 'Jordan, Williams, Toyota',
    'Gilles Villeneuve': 'McLaren, Ferrari',
    'Didier Pironi': 'Tyrrell, Ligier, Ferrari',
    'Patrick Depailler': 'Tyrrell, Ligier, Alfa Romeo',
    'Jean-Pierre Jabouille': 'Matra, Surtees, Renault',
    'Riccardo Patrese': 'Shadow, Arrows, Brabham, Alfa Romeo, Williams, Benetton',
    'René Arnoux': 'Martini, Renault, Ferrari, Ligier',
    'Eddie Irvine': 'Jordan, Ferrari, Jaguar',
    'Heinz-Harald Frentzen': 'Sauber, Williams, Jordan, Prost, Arrows',
    'Ralf Schumacher': 'Jordan, Williams, Toyota',
    'Giovanna Amati': 'Brabham',
    'Lella Lombardi': 'BRM, March, Williams',
    'Maria Teresa de Filippis': 'Maserati, Behra-Porsche',
    'Desiré Wilson': 'Williams, Tyrrell, Ensign',
    'Divina Galica': 'Surtees, Shellsport',
    'Innes Ireland': 'Lotus, BRM, Eagle, Cooper',
    'Jo Bonnier': 'Maserati, BRM, Porsche, Cooper, McLaren, Eagle, Lola',
    'Wolfgang von Trips': 'Ferrari, Porsche',
    'Peter Collins': 'Ferrari, Vanwall',
    'Tony Brooks': 'Connaught, BRM, Vanwall, Ferrari, Cooper',
    'Bruce McLaren': 'Cooper, McLaren',
    'Dan Gurney': 'Ferrari, BRM, Porsche, Brabham, Eagle, McLaren',
    'Lorenzo Bandini': 'Ferrari',
    'Chris Amon': 'Lotus, Brabham, Ferrari, March, Matra, Tecno, Tyrrell, BRM',
    'Jacky Ickx': 'Ferrari, Brabham, McLaren, Lotus, Wolf, Ensign',
    'Clay Regazzoni': 'Ferrari, BRM, Shadow, Williams, Ensign',
    'Jean-Pierre Jarier': 'Shadow, March, Williams, Ligier, Lotus, Tyrrell, Osella',
    'Hans-Joachim Stuck': 'March, Brabham, ATS',
    'Tom Pryce': 'Token, Shadow',
    'Ronnie Peterson': 'March, Lotus, Tyrrell',
    'Jochen Mass': 'Surtees, McLaren, ATS, Arrows, March',
    'Vittorio Brambilla': 'March, Surtees, Alfa Romeo',
    'Patrick Tambay': 'McLaren, Ligier, Ferrari, Renault, Haas',
    'Andrea de Cesaris': 'McLaren, Alfa Romeo, Brabham, Ligier, Minardi, Brabham, Jordan, Tyrrell',
    'Michele Alboreto': 'Tyrrell, Ferrari, Larrousse, BMS Dallara, Minardi, Footwork',
    'Thierry Boutsen': 'Arrows, Benetton, Williams, Ligier, Jordan',
    'Alessandro Nannini': 'Minardi, Benetton',
    'Jean Alesi': 'Tyrrell, Ferrari, Benetton, Prost, Jordan',
    'Gerhard Berger': 'ATS, Arrows, Benetton, Ferrari, McLaren',
    'Elio de Angelis': 'Shadow, Lotus, Brabham',
    'Manfred Winkelhock': 'ATS, Brabham, McLaren',
    'Stefan Bellof': 'Tyrell',
    'Jonathan Palmer': 'Williams, RAM, Zakspeed, Tyrrell',
    'Piercarlo Ghinzani': 'Osella, Toleman, Ligier, Brabham',
    'Huub Rothengatter': 'Spirit, Zakspeed',
    'Francois Hesnault': 'Renault, Ligier',
    'Ivan Capelli': 'Rial, Leyton House, Ferrari, Jordan',
    'Mauricio Gugelmin': 'March, Leyton House, Jordan',
    'Aguri Suzuki': 'Zakspeed, Larrousse, Footwork',
    'Bertrand Gachot': 'Onyx, Coloni, Jordan, Larrousse, Pacific',
    'Eric Bernard': 'Larrousse, Ligier, Lotus',
    'Roberto Moreno': 'Coloni, Eurobrun, Jordan, Benetton, Minardi, Forti',
    'JJ Lehto': 'Onyx, Scuderia Italia, Sauber, Benetton',
    'Karl Wendlinger': 'March, Sauber, Mercedes',
    'Andrea Montermini': 'Simtek, Pacific, Forti',
    'Pedro Diniz': 'Forti, Ligier, Arrows, Sauber',
    'Giovanni Lavaggi': 'Minardi, Pacific',
    'Tarso Marques': 'Minardi',
    'Ukyo Katayama': 'Venturi, Tyrrell, Minardi',
    'Mika Salo': 'Lotus, Tyrrell, Arrows, BAR, Sauber, Toyota',
    'Pedro de la Rosa': 'Arrows, Jaguar, McLaren, HRT',
    'Luciano Burti': 'Jaguar, Prost',
    'Enrique Bernoldi': 'Arrows',
    'Alex Yoong': 'Minardi',
    'Allan McNish': 'Renault, Toyota',
    'Antonio Pizzonia': 'Williams, Jaguar',
    'Nicolas Kiesa': 'Jordan',
    'Björn Wirdheim': 'Jaguar',
    'Giorgio Pantano': 'Jordan',
    'Christijan Albers': 'Minardi, Midland, Spyker',
    'Patrick Friesacher': 'Minardi',
    'Robert Doornbos': 'Jordan, Minardi',
    'Takuma Sato': 'Jordan, BAR, Super Aguri',
    'Anthony Davidson': 'BAR, Super Aguri',
    'Sakon Yamamoto': 'Super Aguri, Spyker',
    'Sebastian Vettel': 'BMW Sauber, Toro Rosso, Red Bull Racing, Ferrari, Aston Martin',
    'Sebastien Buemi': 'Toro Rosso',
    'Sébastien Buemi': 'Toro Rosso',
    'Jaime Alguersuari': 'Toro Rosso',
    'Karun Chandhok': 'HRT, Lotus',
    'Bruno Senna': 'HRT, Renault, Williams',
    "Jerome D'Ambrosio": 'Virgin, Lotus, Marussia',
    "Jérôme D'Ambrosio": 'Virgin, Lotus, Marussia',
    'Charles Pic': 'Marussia, Caterham',
    'Giedo van der Garde': 'Caterham',
    'Max Chilton': 'Marussia',
    'Jules Bianchi': 'Marussia',
    'Marcus Ericsson': 'Caterham, Sauber',
    'Will Stevens': 'Caterham, Marussia',
    'Roberto Merhi': 'Marussia',
    'Alexander Rossi': 'Marussia',
    'Stoffel Vandoorne': 'McLaren, Aston Martin',
    'Pascal Wehrlein': 'Manor, Sauber',
    'Antonio Giovinazzi': 'Sauber, Alfa Romeo',
    'Nikita Mazepin': 'Haas',
    'Mick Schumacher': 'Haas',
    'Nicholas Latifi': 'Williams',
    'Jack Doohan': 'Alpine',
    'Franco Colapinto': 'Williams',
    'Oliver Bearman': 'Haas, Ferrari',
    'Liam Lawson': 'AlphaTauri, RB, Racing Bulls',
}

def get_teams(name):
    """Get notable teams for a driver."""
    # Clean name of footnote markers
    clean_name = re.sub(r'[\*\^~]', '', name).strip()
    if clean_name in NOTABLE_TEAMS:
        return NOTABLE_TEAMS[clean_name]
    return ''

def main():
    with open('/tmp/cc-agent/68733619/project/f1_drivers_raw.json', 'r', encoding='utf-8') as f:
        drivers = json.load(f)
    
    # Fix nationalities and flags
    for d in drivers:
        d['nationality'] = clean_nationality(d['nationality'])
        d['flag'] = get_flag(d['nationality'])
        d['teams'] = get_teams(d['name'])
        d['bio'] = generate_bio(d)
    
    # Check for any remaining flag issues
    no_flag = [d for d in drivers if d['flag'] == '🏁']
    if no_flag:
        print(f"Drivers without proper flag: {len(no_flag)}")
        for d in no_flag:
            print(f"  {d['name']}: {d['nationality']!r}")
    
    # Build final output
    final_drivers = []
    for d in drivers:
        final_drivers.append({
            'name': d['name'],
            'nationality': d['nationality'],
            'flag': d['flag'],
            'years_active': d['years_active'],
            'championships': d['championships'],
            'entries': d['entries'],
            'wins': d['wins'],
            'poles': d['poles'],
            'podiums': d['podiums'],
            'teams': d['teams'],
            'bio': d['bio'],
            'photo': d['photo']
        })
    
    # Save final JSON
    with open('/tmp/cc-agent/68733619/project/f1_drivers_final.json', 'w', encoding='utf-8') as f:
        json.dump(final_drivers, f, ensure_ascii=False, indent=2)
    
    print(f"Final driver count: {len(final_drivers)}")
    print(f"Drivers with photos: {sum(1 for d in final_drivers if d['photo'])}")
    print(f"Drivers with teams: {sum(1 for d in final_drivers if d['teams'])}")
    print(f"Drivers with championships: {sum(1 for d in final_drivers if d['championships'] > 0)}")
    
    # Show champions
    champs = sorted([d for d in final_drivers if d['championships'] > 0], key=lambda x: -x['championships'])
    print(f"\nChampions ({len(champs)}):")
    for c in champs:
        print(f"  {c['flag']} {c['name']} - {c['championships']} title(s), {c['wins']} wins")

if __name__ == '__main__':
    main()
