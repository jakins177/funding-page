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
    {"slug": "hawaii", "name": "Hawaii", "code": "HI"}
]

state_map_entries = []
for st in states:
    slug = st["slug"]
    name = st["name"]
    code = st["code"]
    code_lower = code.lower()
    state_map_entries.append(f'  "{code_lower}": {{ slug: "{slug}", name: "{name}", code: "{code}" }},\n  "{slug}": {{ slug: "{slug}", name: "{name}", code: "{code}" }}')

new_map = "const stateMap: Record<string, { slug: string; name: string; code: string }> = {\n" + ",\n".join(state_map_entries) + "\n};"

with open(file_path, "r") as f:
    content = f.read()

# Replace between `const stateMap` and `};`
pattern = re.compile(r"const stateMap: Record<string, \{ slug: string; name: string; code: string \}> = \{.*?\};", re.DOTALL)
new_content = pattern.sub(new_map, content)

with open(file_path, "w") as f:
    f.write(new_content)

print(f"Updated page.tsx with {len(states)} states.")
