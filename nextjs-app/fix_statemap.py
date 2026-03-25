import re

file_path = "projects/funding/repo/nextjs-app/app/loans/[state]/[dealType]/page.tsx"

states = [
    {"slug": "florida", "name": "Florida", "code": "FL"},
    {"slug": "texas", "name": "Texas", "code": "TX"},
    {"slug": "california", "name": "California", "code": "CA"},
    {"slug": "georgia", "name": "Georgia", "code": "GA"},
    {"slug": "north-carolina", "name": "North Carolina", "code": "NC"},
    {"slug": "new-york", "name": "New York", "code": "NY"},
    {"slug": "illinois", "name": "Illinois", "code": "IL"},
    {"slug": "ohio", "name": "Ohio", "code": "OH"},
    {"slug": "pennsylvania", "name": "Pennsylvania", "code": "PA"},
    {"slug": "new-jersey", "name": "New Jersey", "code": "NJ"},
    {"slug": "michigan", "name": "Michigan", "code": "MI"},
    {"slug": "virginia", "name": "Virginia", "code": "VA"},
    {"slug": "washington", "name": "Washington", "code": "WA"},
    {"slug": "arizona", "name": "Arizona", "code": "AZ"},
    {"slug": "massachusetts", "name": "Massachusetts", "code": "MA"},
    {"slug": "tennessee", "name": "Tennessee", "code": "TN"},
    {"slug": "indiana", "name": "Indiana", "code": "IN"},
    {"slug": "missouri", "name": "Missouri", "code": "MO"},
    {"slug": "maryland", "name": "Maryland", "code": "MD"},
    {"slug": "colorado", "name": "Colorado", "code": "CO"},
    {"slug": "wisconsin", "name": "Wisconsin", "code": "WI"},
    {"slug": "minnesota", "name": "Minnesota", "code": "MN"},
    {"slug": "south-carolina", "name": "South Carolina", "code": "SC"},
    {"slug": "alabama", "name": "Alabama", "code": "AL"},
    {"slug": "louisiana", "name": "Louisiana", "code": "LA"},
    {"slug": "kentucky", "name": "Kentucky", "code": "KY"},
    {"slug": "oregon", "name": "Oregon", "code": "OR"},
    {"slug": "oklahoma", "name": "Oklahoma", "code": "OK"},
    {"slug": "connecticut", "name": "Connecticut", "code": "CT"},
    {"slug": "utah", "name": "Utah", "code": "UT"},
    {"slug": "iowa", "name": "Iowa", "code": "IA"},
    {"slug": "nevada", "name": "Nevada", "code": "NV"},
    {"slug": "arkansas", "name": "Arkansas", "code": "AR"},
    {"slug": "mississippi", "name": "Mississippi", "code": "MS"},
    {"slug": "kansas", "name": "Kansas", "code": "KS"},
    {"slug": "new-mexico", "name": "New Mexico", "code": "NM"},
    {"slug": "nebraska", "name": "Nebraska", "code": "NE"},
    {"slug": "idaho", "name": "Idaho", "code": "ID"},
    {"slug": "west-virginia", "name": "West Virginia", "code": "WV"},
    {"slug": "hawaii", "name": "Hawaii", "code": "HI"},
    {"slug": "maine", "name": "Maine", "code": "ME"},
    {"slug": "montana", "name": "Montana", "code": "MT"},
    {"slug": "rhode-island", "name": "Rhode Island", "code": "RI"},
    {"slug": "delaware", "name": "Delaware", "code": "DE"},
    {"slug": "south-dakota", "name": "South Dakota", "code": "SD"},
    {"slug": "north-dakota", "name": "North Dakota", "code": "ND"},
    {"slug": "alaska", "name": "Alaska", "code": "AK"},
    {"slug": "vermont", "name": "Vermont", "code": "VT"},
    {"slug": "wyoming", "name": "Wyoming", "code": "WY"},
    {"slug": "new-hampshire", "name": "New Hampshire", "code": "NH"}
]

cities = [
    {"slug": "atlanta", "name": "Atlanta", "code": "GA"},
    {"slug": "dallas", "name": "Dallas", "code": "TX"},
    {"slug": "miami", "name": "Miami", "code": "FL"},
    {"slug": "houston", "name": "Houston", "code": "TX"},
    {"slug": "austin", "name": "Austin", "code": "TX"},
    {"slug": "chicago", "name": "Chicago", "code": "IL"},
    {"slug": "phoenix", "name": "Phoenix", "code": "AZ"},
    {"slug": "tampa", "name": "Tampa", "code": "FL"},
    {"slug": "orlando", "name": "Orlando", "code": "FL"},
    {"slug": "charlotte", "name": "Charlotte", "code": "NC"},
    {"slug": "raleigh", "name": "Raleigh", "code": "NC"},
    {"slug": "nashville", "name": "Nashville", "code": "TN"},
    {"slug": "denver", "name": "Denver", "code": "CO"},
    {"slug": "las-vegas", "name": "Las Vegas", "code": "NV"},
    {"slug": "seattle", "name": "Seattle", "code": "WA"},
    {"slug": "philadelphia", "name": "Philadelphia", "code": "PA"},
    {"slug": "san-antonio", "name": "San Antonio", "code": "TX"},
    {"slug": "san-diego", "name": "San Diego", "code": "CA"},
    {"slug": "columbus", "name": "Columbus", "code": "OH"},
    {"slug": "indianapolis", "name": "Indianapolis", "code": "IN"},
    {"slug": "jacksonville", "name": "Jacksonville", "code": "FL"},
    {"slug": "fort-worth", "name": "Fort Worth", "code": "TX"},
    {"slug": "detroit", "name": "Detroit", "code": "MI"},
    {"slug": "memphis", "name": "Memphis", "code": "TN"},
    {"slug": "baltimore", "name": "Baltimore", "code": "MD"},
    {"slug": "boston", "name": "Boston", "code": "MA"},
    {"slug": "portland", "name": "Portland", "code": "OR"},
    {"slug": "louisville", "name": "Louisville", "code": "KY"},
    {"slug": "milwaukee", "name": "Milwaukee", "code": "WI"},
    {"slug": "albuquerque", "name": "Albuquerque", "code": "NM"},
    {"slug": "tucson", "name": "Tucson", "code": "AZ"},
    {"slug": "fresno", "name": "Fresno", "code": "CA"},
    {"slug": "sacramento", "name": "Sacramento", "code": "CA"},
    {"slug": "kansas-city", "name": "Kansas City", "code": "MO"},
    {"slug": "mesa", "name": "Mesa", "code": "AZ"},
    {"slug": "omaha", "name": "Omaha", "code": "NE"},
    {"slug": "colorado-springs", "name": "Colorado Springs", "code": "CO"},
    {"slug": "virginia-beach", "name": "Virginia Beach", "code": "VA"},
    {"slug": "oakland", "name": "Oakland", "code": "CA"},
    {"slug": "minneapolis", "name": "Minneapolis", "code": "MN"},
    {"slug": "tulsa", "name": "Tulsa", "code": "OK"},
    {"slug": "arlington", "name": "Arlington", "code": "TX"},
    {"slug": "new-orleans", "name": "New Orleans", "code": "LA"},
    {"slug": "wichita", "name": "Wichita", "code": "KS"},
    {"slug": "cleveland", "name": "Cleveland", "code": "OH"},
    {"slug": "bakersfield", "name": "Bakersfield", "code": "CA"},
    {"slug": "aurora", "name": "Aurora", "code": "CO"},
    {"slug": "anaheim", "name": "Anaheim", "code": "CA"},
    {"slug": "honolulu", "name": "Honolulu", "code": "HI"},
    {"slug": "santa-ana", "name": "Santa Ana", "code": "CA"}
]

# Build the map with ONLY slug keys (not state codes for cities)
state_map_entries = []

# Add states - use full slug and state name
for st in states:
    slug = st["slug"]
    name = st["name"]
    code = st["code"]
    state_map_entries.append(f'  "{slug}": {{ slug: "{slug}", name: "{name}", code: "{code}" }}')

# Add cities - use ONLY city slug (NOT state code which causes duplicates)
for ct in cities:
    slug = ct["slug"]
    name = ct["name"]
    code = ct["code"]
    state_map_entries.append(f'  "{slug}": {{ slug: "{slug}", name: "{name}", code: "{code}" }}')

new_map = "const stateMap: Record<string, { slug: string; name: string; code: string }> = {\n" + ",\n".join(state_map_entries) + "\n};"

with open(file_path, "r") as f:
    content = f.read()

# Replace between `const stateMap` and `};`
pattern = re.compile(r"const stateMap: Record<string, \{ slug: string; name: string; code: string \}> = \{.*?\};", re.DOTALL)
new_content = pattern.sub(new_map, content)

with open(file_path, "w") as f:
    f.write(new_content)

print(f"Fixed page.tsx - {len(states)} states + {len(cities)} cities (no duplicate keys)")
