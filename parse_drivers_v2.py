#!/usr/bin/env python3
"""Parse F1 driver data from Wikipedia HTML - fixed version."""
import re
import json

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

# Nationality adjective form for bios
NATIONALITY_ADJECTIVE = {
    'Argentina': 'Argentine', 'Australia': 'Australian', 'Austria': 'Austrian',
    'Belgium': 'Belgian', 'Brazil': 'Brazilian', 'Canada': 'Canadian',
    'Chile': 'Chilean', 'China': 'Chinese', 'Colombia': 'Colombian',
    'Czech Republic': 'Czech', 'Czechoslovakia': 'Czechoslovak',
    'Denmark': 'Danish', 'East Germany': 'East German',
    'Finland': 'Finnish', 'France': 'French', 'Germany': 'German',
    'Hungary': 'Hungarian', 'India': 'Indian', 'Indonesia': 'Indonesian',
    'Ireland': 'Irish', 'Italy': 'Italian', 'Japan': 'Japanese',
    'Liechtenstein': 'Liechtensteiner', 'Luxembourg': 'Luxembourgish',
    'Malaysia': 'Malaysian', 'Mexico': 'Mexican', 'Monaco': 'Monegasque',
    'Morocco': 'Moroccan', 'Netherlands': 'Dutch',
    'New Zealand': 'New Zealander', 'Poland': 'Polish',
    'Portugal': 'Portuguese', 'Rhodesia': 'Rhodesian',
    'Rhodesia and Nyasaland': 'Rhodesian', 'Russia': 'Russian',
    'South Africa': 'South African', 'Spain': 'Spanish',
    'Sweden': 'Swedish', 'Switzerland': 'Swiss', 'Thailand': 'Thai',
    'United Kingdom': 'British', 'United States': 'American',
    'Uruguay': 'Uruguayan', 'Venezuela': 'Venezuelan',
    'West Germany': 'West German', 'Zimbabwe': 'Zimbabwean',
    'RAF': 'Neutral', 'Neutral': 'Neutral',
}

def strip_html(html):
    """Remove all HTML tags and their attributes, keeping only text content."""
    # Remove all HTML tags (including those with attributes)
    text = re.sub(r'<[^>]+>', '', html)
    # Decode HTML entities
    text = text.replace('&nbsp;', ' ').replace('\xa0', ' ')
    text = text.replace('&amp;', '&')
    text = text.replace('&lt;', '<').replace('&gt;', '>')
    # Remove numeric entities
    text = re.sub(r'&#\d+;', '', text)
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def parse_first_number(text):
    """Extract the first number from text."""
    text = text.strip()
    if not text or text == '—' or text == '-':
        return 0
    match = re.search(r'\d+', text)
    if match:
        return int(match.group())
    return 0

def parse_championships(cell_html):
    """Parse championship count from cell HTML.
    The championship cell has data-sort-value='N !' where N is the count,
    or the plain text is just '0' for non-champions."""
    # Check for data-sort-value
    sort_val = re.findall(r'data-sort-value="([^"]+)"', cell_html)
    if sort_val:
        val = sort_val[0].replace('\xa0', ' ').strip()
        match = re.match(r'(\d+)', val)
        if match:
            return int(match.group(1))
    
    # Fallback: get first span text
    first_span = re.search(r'<span[^>]*>([^<]*)</span>', cell_html)
    if first_span:
        text = first_span.group(1).strip()
        match = re.match(r'(\d+)', text)
        if match:
            return int(match.group(1))
    
    # Last resort: plain text first number
    plain = strip_html(cell_html)
    match = re.match(r'(\d+)', plain)
    if match:
        return int(match.group(1))
    return 0

def parse_years(text):
    """Parse years active from text like '1962–1963' or '1961'."""
    text = strip_html(text)
    years = re.findall(r'\d{4}', text)
    if len(years) == 0:
        return ''
    elif len(years) == 1:
        return years[0]
    else:
        return f"{years[0]}–{years[-1]}"

def clean_nationality(nat):
    """Clean nationality string."""
    nat = strip_html(nat)
    # Remove footnote markers
    nat = re.sub(r'\[\w+\]', '', nat).strip()
    
    if 'RAF' in nat or 'neutral' in nat.lower():
        return 'Russia'
    if 'East Germany, West Germany' in nat:
        return 'Germany'
    if 'Rhodesia and Nyasaland' in nat:
        return 'Rhodesia and Nyasaland'
    if 'Belgium France' in nat:
        return 'Belgium'
    if 'Monaco Netherlands' in nat:
        return 'Monaco'
    
    return nat

def get_flag(nationality):
    if nationality in NATIONALITY_FLAGS:
        return NATIONALITY_FLAGS[nationality]
    return '🏁'

def extract_wiki_title(name_cell_html):
    links = re.findall(r'href="\./([^"]+)"', name_cell_html)
    for link in links:
        if 'Category:' not in link and 'File:' not in link:
            return link
    return None

def generate_bio(driver):
    name = re.sub(r'[\*\^~]', '', driver['name']).strip()
    nat = driver['nationality']
    nat_adj = NATIONALITY_ADJECTIVE.get(nat, nat)
    years = driver['years_active']
    champs = driver['championships']
    wins = driver['wins']
    poles = driver['poles']
    podiums = driver['podiums']
    entries = driver['entries']
    
    article = 'an' if nat_adj[0].lower() in 'aeiou' else 'a'
    
    if champs > 0:
        bio = f"{name} is {article} {nat_adj} Formula One driver who won the World Drivers' Championship {champs} time{'s' if champs > 1 else ''}"
        if years:
            bio += f", competing from {years}."
        else:
            bio += "."
    else:
        bio = f"{name} is {article} {nat_adj} Formula One driver"
        if years:
            bio += f" who competed from {years}."
        else:
            bio += "."
    
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
        if champs > 0:
            bio += f" Career highlights include {', '.join(stats)}."
        else:
            if len(stats) > 1:
                bio += f" They achieved {', '.join(stats[:-1])}, and {stats[-1]}."
            else:
                bio += f" They achieved {stats[0]}."
    
    return bio

# Notable teams
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
    'Kimi Räikkönen': 'Sauber, McLaren, Ferrari, Lotus, Alfa Romeo',
    'Fernando Alonso': 'Minardi, Renault, McLaren, Ferrari, Alpine, Aston Martin',
    'Juan Manuel Fangio': 'Alfa Romeo, Ferrari, Mercedes, Maserati',
    'Jim Clark': 'Lotus',
    'Graham Hill': 'Lotus, BRM, Brabham, Embassy Hill',
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
    'Romain Grosjean': 'Renault, Lotus, Haas',
    'Pastor Maldonado': 'Williams, Lotus',
    'Kamui Kobayashi': 'Toyota, Sauber, Caterham',
    'Bruno Senna': 'HRT, Renault, Williams',
    'Heikki Kovalainen': 'Renault, McLaren, Caterham',
    'Giancarlo Fisichella': 'Minardi, Jordan, Benetton, Sauber, Renault, Force India, Ferrari',
    'Mark Webber': 'Minardi, Jaguar, Williams, Red Bull Racing',
    'David Coulthard': 'Williams, McLaren, Red Bull Racing',
    'Juan Pablo Montoya': 'Williams, McLaren',
    'Ralf Schumacher': 'Jordan, Williams, Toyota',
    'Gilles Villeneuve': 'McLaren, Ferrari',
    'Didier Pironi': 'Tyrrell, Ligier, Ferrari',
    'Riccardo Patrese': 'Shadow, Arrows, Brabham, Alfa Romeo, Williams, Benetton',
    'René Arnoux': 'Martini, Renault, Ferrari, Ligier',
    'Eddie Irvine': 'Jordan, Ferrari, Jaguar',
    'Heinz-Harald Frentzen': 'Sauber, Williams, Jordan, Prost, Arrows',
    'Jean Alesi': 'Tyrrell, Ferrari, Benetton, Prost, Jordan',
    'Gerhard Berger': 'ATS, Arrows, Benetton, Ferrari, McLaren',
    'Elio de Angelis': 'Shadow, Lotus, Brabham',
    'Ronnie Peterson': 'March, Lotus, Tyrrell',
    'Patrick Depailler': 'Tyrrell, Ligier, Alfa Romeo',
    'Jean-Pierre Jabouille': 'Matra, Surtees, Renault',
    'Clay Regazzoni': 'Ferrari, BRM, Shadow, Williams, Ensign',
    'Jacky Ickx': 'Ferrari, Brabham, McLaren, Lotus, Wolf, Ensign',
    'Chris Amon': 'Lotus, Brabham, Ferrari, March, Matra, Tecno, Tyrrell, BRM',
    'Bruce McLaren': 'Cooper, McLaren',
    'Dan Gurney': 'Ferrari, BRM, Porsche, Brabham, Eagle, McLaren',
    'Jochen Mass': 'Surtees, McLaren, ATS, Arrows, March',
    'Michele Alboreto': 'Tyrrell, Ferrari, Larrousse, BMS Dallara, Minardi, Footwork',
    'Andrea de Cesaris': 'McLaren, Alfa Romeo, Brabham, Ligier, Minardi, Jordan, Tyrrell',
    'Thierry Boutsen': 'Arrows, Benetton, Williams, Ligier, Jordan',
    'Stefan Bellof': 'Tyrrell',
    'Elio de Angelis': 'Shadow, Lotus, Brabham',
    'Lella Lombardi': 'BRM, March, Williams',
    'Maria Teresa de Filippis': 'Maserati, Behra-Porsche',
    'Giovanna Amati': 'Brabham',
    'Divina Galica': 'Surtees, Shellsport',
    'Desiré Wilson': 'Williams, Tyrrell, Ensign',
    'Innes Ireland': 'Lotus, BRM, Eagle, Cooper',
    'Jo Bonnier': 'Maserati, BRM, Porsche, Cooper, McLaren, Eagle, Lola',
    'Wolfgang von Trips': 'Ferrari, Porsche',
    'Peter Collins': 'Ferrari, Vanwall',
    'Tony Brooks': 'Connaught, BRM, Vanwall, Ferrari, Cooper',
    'Lorenzo Bandini': 'Ferrari',
    'Vittorio Brambilla': 'March, Surtees, Alfa Romeo',
    'Patrick Tambay': 'McLaren, Ligier, Ferrari, Renault, Haas',
    'Manfred Winkelhock': 'ATS, Brabham, McLaren',
    'Jonathan Palmer': 'Williams, RAM, Zakspeed, Tyrrell',
    'Ivan Capelli': 'Rial, Leyton House, Ferrari, Jordan',
    'Aguri Suzuki': 'Zakspeed, Larrousse, Footwork',
    'Bertrand Gachot': 'Onyx, Coloni, Jordan, Larrousse, Pacific',
    'Roberto Moreno': 'Coloni, Eurobrun, Jordan, Benetton, Minardi, Forti',
    'JJ Lehto': 'Onyx, Scuderia Italia, Sauber, Benetton',
    'Karl Wendlinger': 'March, Sauber, Mercedes',
    'Ukyo Katayama': 'Venturi, Tyrrell, Minardi',
    'Mika Salo': 'Lotus, Tyrrell, Arrows, BAR, Sauber, Toyota',
    'Pedro de la Rosa': 'Arrows, Jaguar, McLaren, HRT',
    'Takuma Sato': 'Jordan, BAR, Super Aguri',
    'Anthony Davidson': 'BAR, Super Aguri',
    'Sebastien Buemi': 'Toro Rosso',
    'Sébastien Buemi': 'Toro Rosso',
    'Jaime Alguersuari': 'Toro Rosso',
    'Karun Chandhok': 'HRT, Lotus',
    'Charles Leclerc': 'Sauber, Ferrari',
    'Stoffel Vandoorne': 'McLaren, Aston Martin',
    'Pascal Wehrlein': 'Manor, Sauber',
    'Antonio Giovinazzi': 'Sauber, Alfa Romeo',
    'Nikita Mazepin': 'Haas',
    'Nicholas Latifi': 'Williams',
    'Jack Doohan': 'Alpine',
    'Franco Colapinto': 'Williams',
    'Oliver Bearman': 'Haas, Ferrari',
    'Liam Lawson': 'AlphaTauri, RB, Racing Bulls',
    'Paulo de Carvalho': '',
}

def get_teams(name):
    clean_name = re.sub(r'[\*\^~]', '', name).strip()
    return NOTABLE_TEAMS.get(clean_name, '')

def parse_drivers():
    with open('/tmp/f1_drivers.html', 'r', encoding='utf-8') as f:
        content = f.read()

    tables = list(re.finditer(r'<table[^>]*class="[^"]*wikitable[^"]*"[^>]*>', content))
    main_table_start = tables[1].start()
    main_table_end = content.find('</table>', main_table_start) + 8
    table_html = content[main_table_start:main_table_end]

    data_rows = list(re.finditer(r'<tr[^>]*>(.*?)</tr>', table_html, re.DOTALL))
    driver_rows = data_rows[1:]

    drivers = []
    for row_match in driver_rows:
        row_html = row_match.group(1)
        cells = re.findall(r'<td[^>]*>(.*?)</td>', row_html, re.DOTALL)
        
        if len(cells) < 11:
            continue
        
        name = strip_html(cells[0])
        nationality = clean_nationality(cells[1])
        years_active = parse_years(cells[2])
        championships = parse_championships(cells[3])
        entries = parse_first_number(strip_html(cells[4]))
        starts = parse_first_number(strip_html(cells[5]))
        poles = parse_first_number(strip_html(cells[6]))
        wins = parse_first_number(strip_html(cells[7]))
        podiums = parse_first_number(strip_html(cells[8]))
        fastest_laps = parse_first_number(strip_html(cells[9]))
        points = parse_first_number(strip_html(cells[10])) if len(cells) > 10 else 0
        
        wiki_title = extract_wiki_title(cells[0])
        flag = get_flag(nationality)
        
        driver = {
            'name': name,
            'nationality': nationality,
            'flag': flag,
            'years_active': years_active,
            'championships': championships,
            'entries': entries,
            'starts': starts,
            'wins': wins,
            'poles': poles,
            'podiums': podiums,
            'fastest_laps': fastest_laps,
            'points': points,
            'wiki_title': wiki_title,
            'photo': None,
            'teams': get_teams(name),
            'bio': ''
        }
        driver['bio'] = generate_bio(driver)
        drivers.append(driver)
    
    return drivers

drivers = parse_drivers()
print(f"Total drivers: {len(drivers)}")

# Load existing photos
with open('/tmp/cc-agent/68733619/project/f1_drivers_raw.json', 'r', encoding='utf-8') as f:
    old_drivers = json.load(f)

# Map photos from old data
photo_map = {}
for d in old_drivers:
    if d.get('photo'):
        photo_map[d.get('wiki_title', '')] = d['photo']

for d in drivers:
    if d['wiki_title'] in photo_map:
        d['photo'] = photo_map[d['wiki_title']]

# Verify champions
champs = sorted([d for d in drivers if d['championships'] > 0], key=lambda x: -x['championships'])
print(f"\nChampions ({len(champs)}):")
for c in champs:
    print(f"  {c['flag']} {c['name']} - {c['championships']} titles, {c['wins']} wins, {c['poles']} poles, {c['podiums']} podiums, {c['entries']} entries")

# Check for flag issues
no_flag = [d for d in drivers if d['flag'] == '🏁']
if no_flag:
    print(f"\nDrivers without proper flag: {len(no_flag)}")
    for d in no_flag:
        print(f"  {d['name']}: {d['nationality']!r}")

print(f"\nDrivers with photos: {sum(1 for d in drivers if d['photo'])}")
print(f"Drivers with teams: {sum(1 for d in drivers if d['teams'])}")

# Save
with open('/tmp/cc-agent/68733619/project/f1_drivers_final.json', 'w', encoding='utf-8') as f:
    json.dump(drivers, f, ensure_ascii=False, indent=2)

print("\nSample drivers:")
for d in drivers[:3]:
    print(json.dumps(d, ensure_ascii=False, indent=2))
