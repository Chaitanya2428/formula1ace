#!/usr/bin/env python3
import re
import json
import urllib.request
import urllib.parse
import time
import os

# Nationality to emoji flag mapping
NATIONALITY_FLAGS = {
    'Argentina': '🇦🇷', 'Australia': '🇦🇺', 'Austria': '🇦🇹', 'Belgium': '🇧🇪',
    'Brazil': '🇧🇷', 'Canada': '🇨🇦', 'Chile': '🇨🇱', 'Colombia': '🇨🇴',
    'Czech Republic': '🇨🇿', 'Czechoslovakia': '🇨🇿', 'Denmark': '🇩🇰',
    'East Germany': '🇩🇪', 'Finland': '🇫🇮', 'France': '🇫🇷',
    'Germany': '🇩🇪', 'Hungary': '🇭🇺', 'Ireland': '🇮🇪', 'Italy': '🇮🇹',
    'Japan': '🇯🇵', 'Luxembourg': '🇱🇺', 'Malaysia': '🇲🇾', 'Mexico': '🇲🇽',
    'Monaco': '🇲🇨', 'Morocco': '🇲🇦', 'Netherlands': '🇳🇱',
    'New Zealand': '🇳🇿', 'Poland': '🇵🇱', 'Portugal': '🇵🇹',
    'Rhodesia': '🇿🇼', 'Russia': '🇷🇺', 'South Africa': '🇿🇦',
    'Spain': '🇪🇸', 'Sweden': '🇸🇪', 'Switzerland': '🇨🇭',
    'Thailand': '🇹🇭', 'United Kingdom': '🇬🇧', 'United States': '🇺🇸',
    'Uruguay': '🇺🇾', 'Venezuela': '🇻🇪', 'Zimbabwe': '🇿🇼',
    'China': '🇨🇳', 'India': '🇮🇳', 'Indonesia': '🇮🇩', 'Iceland': '🇮🇸',
    'Liechtenstein': '🇱🇮', 'South Korea': '🇰🇷',
    'Slovakia': '🇸🇰', 'Slovenia': '🇸🇮', 'Tunisia': '🇹🇳', 'Turkey': '🇹🇷',
    'Ukraine': '🇺🇦', 'United Arab Emirates': '🇦🇪', 'Cuba': '🇨🇺',
    'Estonia': '🇪🇪', 'Latvia': '🇱🇻', 'Lithuania': '🇱🇹',
    'Greece': '🇬🇷', 'Norway': '🇳🇴', 'Bulgaria': '🇧🇬',
    'Romania': '🇷🇴', 'Serbia': '🇷🇸', 'Croatia': '🇭🇷',
    'Bosnia and Herzegovina': '🇧🇦', 'Albania': '🇦🇱', 'Israel': '🇮🇱',
    'Lebanon': '🇱🇧', 'Egypt': '🇪🇬', 'Nigeria': '🇳🇬', 'Ghana': '🇬🇭',
    'Kenya': '🇰🇪', 'Singapore': '🇸🇬', 'Philippines': '🇵🇭',
    'Taiwan': '🇹🇼', 'Vietnam': '🇻🇳', 'Qatar': '🇶🇦', 'Bahrain': '🇧🇭',
    'Saudi Arabia': '🇸🇦', 'Azerbaijan': '🇦🇿', 'Belarus': '🇧🇾',
    'Georgia': '🇬🇪', 'Kazakhstan': '🇰🇿', 'Uzbekistan': '🇺🇿',
    'Costa Rica': '🇨🇷', 'Dominican Republic': '🇩🇴', 'Ecuador': '🇪🇨',
    'Guatemala': '🇬🇹', 'Honduras': '🇭🇳', 'Nicaragua': '🇳🇮',
    'Panama': '🇵🇦', 'Paraguay': '🇵🇾', 'Peru': '🇵🇪', 'Puerto Rico': '🇵🇷',
    'El Salvador': '🇸🇻', 'Jamaica': '🇯🇲',
    'Trinidad and Tobago': '🇹🇹', 'Barbados': '🇧🇧', 'Bahamas': '🇧🇸',
    'Bermuda': '🇧🇲', 'Cyprus': '🇨🇾', 'Malta': '🇲🇹', 'Andorra': '🇦🇩',
    'San Marino': '🇲🇸', 'Vatican City': '🇻🇦', 'Moldova': '🇲🇩',
    'North Macedonia': '🇲🇰', 'Montenegro': '🇲🇪',
    'Greenland': '🇬🇱', 'Faroe Islands': '🇫🇴',
    'Isle of Man': '🇮🇲', 'Gibraltar': '🇬🇮', 'Guernsey': '🇬🇬',
    'Jersey': '🇯🇪', 'Curaçao': '🇨🇼', 'Aruba': '🇦🇼',
    'DR Congo': '🇨🇩', 'Congo': '🇨🇩', 'Algeria': '🇩🇿', 'Libya': '🇱🇾',
    'Sudan': '🇸🇩', 'Ethiopia': '🇪🇹', 'Somalia': '🇸🇴', 'Tanzania': '🇹🇿',
    'Uganda': '🇺🇬', 'Zambia': '🇿🇲', 'Botswana': '🇧🇼', 'Namibia': '🇳🇦',
    'Mozambique': '🇲🇿', 'Angola': '🇦🇴', 'Cameroon': '🇨🇲',
    'Ivory Coast': '🇨🇮', "Côte d'Ivoire": '🇨🇮', 'Senegal': '🇸🇳',
    'Mali': '🇲🇱', 'Burkina Faso': '🇧🇫', 'Niger': '🇳🇪', 'Chad': '🇹🇩',
    'Mauritania': '🇲🇷', 'Gambia': '🇬🇲', 'Guinea-Bissau': '🇬🇼',
    'Guinea': '🇬🇳', 'Sierra Leone': '🇸🇱', 'Liberia': '🇱🇷',
    'Togo': '🇹🇬', 'Benin': '🇧🇯', 'Burundi': '🇧🇮', 'Rwanda': '🇷🇼',
    'Djibouti': '🇩🇯', 'Eritrea': '🇪🇷', 'South Sudan': '🇸🇸',
    'Madagascar': '🇲🇬', 'Mauritius': '🇲🇺', 'Seychelles': '🇸🇨',
    'Comoros': '🇰🇲', 'Malawi': '🇲🇼', 'Lesotho': '🇱🇸',
    'Eswatini': '🇸🇿', 'Swaziland': '🇸🇿',
}

# Also map alternate nationality names
NATIONALITY_ALIASES = {
    'British': 'United Kingdom', 'English': 'United Kingdom',
    'American': 'United States', 'Argentine': 'Argentina',
    'Australian': 'Australia', 'Austrian': 'Austria',
    'Belgian': 'Belgium', 'Brazilian': 'Brazil',
    'Canadian': 'Canada', 'Chilean': 'Chile',
    'Colombian': 'Colombia', 'Czech': 'Czech Republic',
    'Danish': 'Denmark', 'Finnish': 'Finland',
    'French': 'France', 'German': 'Germany',
    'Hungarian': 'Hungary', 'Irish': 'Ireland',
    'Italian': 'Italy', 'Japanese': 'Japan',
    'Luxembourgish': 'Luxembourg', 'Malaysian': 'Malaysia',
    'Mexican': 'Mexico', 'Monegasque': 'Monaco',
    'Moroccan': 'Morocco', 'Dutch': 'Netherlands',
    'New Zealander': 'New Zealand', 'Polish': 'Poland',
    'Portuguese': 'Portugal', 'Russian': 'Russia',
    'South African': 'South Africa', 'Spanish': 'Spain',
    'Swedish': 'Sweden', 'Swiss': 'Switzerland',
    'Thai': 'Thailand', 'Venezuelan': 'Venezuela',
    'Zimbabwean': 'Zimbabwe', 'Rhodesian': 'Rhodesia',
    'Indian': 'India', 'Indonesian': 'Indonesia',
    'Icelandic': 'Iceland', 'Norwegian': 'Norway',
    'Greek': 'Greece', 'Bulgarian': 'Bulgaria',
    'Romanian': 'Romania', 'Serbian': 'Serbia',
    'Croatian': 'Croatia', 'Slovak': 'Slovakia',
    'Slovenian': 'Slovenia', 'Ukrainian': 'Ukraine',
    'Belarusian': 'Belarus', 'Georgian': 'Georgia',
    'Kazakh': 'Kazakhstan', 'Uzbek': 'Uzbekistan',
    'Singaporean': 'Singapore', 'Filipino': 'Philippines',
    'Vietnamese': 'Vietnam', 'Qatari': 'Qatar',
    'Azerbaijani': 'Azerbaijan', 'Saudi': 'Saudi Arabia',
    'Saudi Arabian': 'Saudi Arabia', 'Emirati': 'United Arab Emirates',
    'UAE': 'United Arab Emirates', 'Chinese': 'China',
    'Korean': 'South Korea', 'South Korean': 'South Korea',
    'Estonian': 'Estonia', 'Latvian': 'Latvia',
    'Lithuanian': 'Lithuania', 'Cypriot': 'Cyprus',
    'Maltese': 'Malta', 'Moldovan': 'Moldova',
    'Macedonian': 'North Macedonia', 'Montenegrin': 'Montenegro',
    'Albanian': 'Albania', 'Israeli': 'Israel',
    'Lebanese': 'Lebanon', 'Egyptian': 'Egypt',
    'Nigerian': 'Nigeria', 'Ghanaian': 'Ghana',
    'Kenyan': 'Kenya', 'Tunisian': 'Tunisia',
    'Turkish': 'Turkey', 'Algerian': 'Algeria',
    'Libyan': 'Libya', 'Sudanese': 'Sudan',
    'Ethiopian': 'Ethiopia', 'Somali': 'Somalia',
    'Tanzanian': 'Tanzania', 'Ugandan': 'Uganda',
    'Zambian': 'Zambia', 'Botswanan': 'Botswana',
    'Namibian': 'Namibia', 'Mozambican': 'Mozambique',
    'Angolan': 'Angola', 'Cameroonian': 'Cameroon',
    'Senegalese': 'Senegal', 'Malian': 'Mali',
    'Malagasy': 'Madagascar', 'Mauritian': 'Mauritius',
    'Malawian': 'Malawi', 'Basotho': 'Lesotho',
    'Swazi': 'Eswatini', 'Cuban': 'Cuba',
    'Jamaican': 'Jamaica', 'Barbadian': 'Barbados',
    'Bahamian': 'Bahamas', 'Bermudian': 'Bermuda',
    'Costa Rican': 'Costa Rica', 'Ecuadorian': 'Ecuador',
    'Guatemalan': 'Guatemala', 'Honduran': 'Honduras',
    'Nicaraguan': 'Nicaragua', 'Panamanian': 'Panama',
    'Paraguayan': 'Paraguay', 'Peruvian': 'Peru',
    'Salvadoran': 'El Salvador', 'Uruguayan': 'Uruguay',
    'Dominican': 'Dominican Republic', 'Puerto Rican': 'Puerto Rico',
    'Trinidadian': 'Trinidad and Tobago',
    'Andorran': 'Andorra', 'Sammarinese': 'San Marino',
    'Liechtensteiner': 'Liechtenstein', 'Ivorian': 'Ivory Coast',
    'Burkinabe': 'Burkina Faso', 'Togolese': 'Togo',
    'Beninese': 'Benin', 'Burundian': 'Burundi',
    'Rwandan': 'Rwanda', 'Djiboutian': 'Djibouti',
    'Eritrean': 'Eritrea', 'South Sudanese': 'South Sudan',
    'Seychellois': 'Seychelles', 'Comorian': 'Comoros',
    'Bosnian': 'Bosnia and Herzegovina',
    'Greenlandic': 'Greenland', 'Faroese': 'Faroe Islands',
    'Manx': 'Isle of Man', 'Gibraltarian': 'Gibraltar',
    'Curaçaoan': 'Curaçao', 'Aruban': 'Aruba',
    'Congolese': 'Congo',
}

def get_flag(nationality):
    """Get emoji flag for a nationality."""
    if nationality in NATIONALITY_FLAGS:
        return NATIONALITY_FLAGS[nationality]
    base = NATIONALITY_ALIASES.get(nationality)
    if base and base in NATIONALITY_FLAGS:
        return NATIONALITY_FLAGS[base]
    return '🏁'

def clean_text(text):
    """Clean HTML tags and whitespace from text."""
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'&#\d+;', '', text)
    text = re.sub(r'&[a-z]+;', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def parse_int(text):
    """Parse integer from text, handling edge cases."""
    text = text.strip()
    if not text or text == '—' or text == '-':
        return 0
    text = re.sub(r'[^\d]', '', text)
    if not text:
        return 0
    try:
        return int(text)
    except:
        return 0

def parse_years(text):
    """Parse years active from text like '1962–1963' or '1961'."""
    text = clean_text(text)
    years = re.findall(r'\d{4}', text)
    if len(years) == 0:
        return ''
    elif len(years) == 1:
        return years[0]
    else:
        return f"{years[0]}–{years[-1]}"

def extract_wiki_title(name_cell_html):
    """Extract the Wikipedia article title from the name cell."""
    links = re.findall(r'href=\"\./([^\"]+)\"', name_cell_html)
    for link in links:
        if 'Category:' not in link and 'File:' not in link:
            return link
    return None

def parse_drivers():
    with open('/tmp/f1_drivers.html', 'r', encoding='utf-8') as f:
        content = f.read()

    tables = list(re.finditer(r'<table[^>]*class=\"[^\"]*wikitable[^\"]*\"[^>]*>', content))
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
        
        name_cell = cells[0]
        nationality_cell = cells[1]
        seasons_cell = cells[2]
        championships_cell = cells[3]
        entries_cell = cells[4]
        starts_cell = cells[5]
        poles_cell = cells[6]
        wins_cell = cells[7]
        podiums_cell = cells[8]
        fastest_laps_cell = cells[9]
        points_cell = cells[10] if len(cells) > 10 else ''
        
        name = clean_text(name_cell)
        nationality = clean_text(nationality_cell)
        years_active = parse_years(seasons_cell)
        championships = parse_int(championships_cell)
        entries = parse_int(entries_cell)
        starts = parse_int(starts_cell)
        poles = parse_int(poles_cell)
        wins = parse_int(wins_cell)
        podiums = parse_int(podiums_cell)
        fastest_laps = parse_int(fastest_laps_cell)
        points = parse_int(points_cell)
        
        wiki_title = extract_wiki_title(name_cell)
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
            'teams': '',
            'bio': ''
        }
        drivers.append(driver)
    
    return drivers

drivers = parse_drivers()
print(f"Total drivers parsed: {len(drivers)}")

with open('/tmp/cc-agent/68733619/project/f1_drivers_raw.json', 'w', encoding='utf-8') as f:
    json.dump(drivers, f, ensure_ascii=False, indent=2)

for d in drivers[:3]:
    print(d)
print('...')
for d in drivers[-3:]:
    print(d)

missing_name = [d for d in drivers if not d['name']]
print(f"\nDrivers with missing name: {len(missing_name)}")
missing_wiki = [d for d in drivers if not d['wiki_title']]
print(f"Drivers with missing wiki_title: {len(missing_wiki)}")
if missing_wiki:
    for d in missing_wiki[:5]:
        print(f"  {d['name']}")

# Check unique nationalities
nats = set(d['nationality'] for d in drivers)
print(f"\nUnique nationalities: {len(nats)}")
for n in sorted(nats):
    flag = get_flag(n)
    if flag == '🏁':
        print(f"  NO FLAG: {n}")
