import json
import re

# 50 States
states = [
    {"slug": "florida", "name": "Florida", "code": "FL", "type": "state"},
    {"slug": "texas", "name": "Texas", "code": "TX", "type": "state"},
    {"slug": "california", "name": "California", "code": "CA", "type": "state"},
    {"slug": "georgia", "name": "Georgia", "code": "GA", "type": "state"},
    {"slug": "north-carolina", "name": "North Carolina", "code": "NC", "type": "state"},
    {"slug": "new-york", "name": "New York", "code": "NY", "type": "state"},
    {"slug": "illinois", "name": "Illinois", "code": "IL", "type": "state"},
    {"slug": "ohio", "name": "Ohio", "code": "OH", "type": "state"},
    {"slug": "pennsylvania", "name": "Pennsylvania", "code": "PA", "type": "state"},
    {"slug": "new-jersey", "name": "New Jersey", "code": "NJ", "type": "state"},
    {"slug": "michigan", "name": "Michigan", "code": "MI", "type": "state"},
    {"slug": "virginia", "name": "Virginia", "code": "VA", "type": "state"},
    {"slug": "washington", "name": "Washington", "code": "WA", "type": "state"},
    {"slug": "arizona", "name": "Arizona", "code": "AZ", "type": "state"},
    {"slug": "massachusetts", "name": "Massachusetts", "code": "MA", "type": "state"},
    {"slug": "tennessee", "name": "Tennessee", "code": "TN", "type": "state"},
    {"slug": "indiana", "name": "Indiana", "code": "IN", "type": "state"},
    {"slug": "missouri", "name": "Missouri", "code": "MO", "type": "state"},
    {"slug": "maryland", "name": "Maryland", "code": "MD", "type": "state"},
    {"slug": "colorado", "name": "Colorado", "code": "CO", "type": "state"},
    {"slug": "wisconsin", "name": "Wisconsin", "code": "WI", "type": "state"},
    {"slug": "minnesota", "name": "Minnesota", "code": "MN", "type": "state"},
    {"slug": "south-carolina", "name": "South Carolina", "code": "SC", "type": "state"},
    {"slug": "alabama", "name": "Alabama", "code": "AL", "type": "state"},
    {"slug": "louisiana", "name": "Louisiana", "code": "LA", "type": "state"},
    {"slug": "kentucky", "name": "Kentucky", "code": "KY", "type": "state"},
    {"slug": "oregon", "name": "Oregon", "code": "OR", "type": "state"},
    {"slug": "oklahoma", "name": "Oklahoma", "code": "OK", "type": "state"},
    {"slug": "connecticut", "name": "Connecticut", "code": "CT", "type": "state"},
    {"slug": "utah", "name": "Utah", "code": "UT", "type": "state"},
    {"slug": "iowa", "name": "Iowa", "code": "IA", "type": "state"},
    {"slug": "nevada", "name": "Nevada", "code": "NV", "type": "state"},
    {"slug": "arkansas", "name": "Arkansas", "code": "AR", "type": "state"},
    {"slug": "mississippi", "name": "Mississippi", "code": "MS", "type": "state"},
    {"slug": "kansas", "name": "Kansas", "code": "KS", "type": "state"},
    {"slug": "new-mexico", "name": "New Mexico", "code": "NM", "type": "state"},
    {"slug": "nebraska", "name": "Nebraska", "code": "NE", "type": "state"},
    {"slug": "idaho", "name": "Idaho", "code": "ID", "type": "state"},
    {"slug": "west-virginia", "name": "West Virginia", "code": "WV", "type": "state"},
    {"slug": "hawaii", "name": "Hawaii", "code": "HI", "type": "state"},
    {"slug": "maine", "name": "Maine", "code": "ME", "type": "state"},
    {"slug": "montana", "name": "Montana", "code": "MT", "type": "state"},
    {"slug": "rhode-island", "name": "Rhode Island", "code": "RI", "type": "state"},
    {"slug": "delaware", "name": "Delaware", "code": "DE", "type": "state"},
    {"slug": "south-dakota", "name": "South Dakota", "code": "SD", "type": "state"},
    {"slug": "north-dakota", "name": "North Dakota", "code": "ND", "type": "state"},
    {"slug": "alaska", "name": "Alaska", "code": "AK", "type": "state"},
    {"slug": "vermont", "name": "Vermont", "code": "VT", "type": "state"},
    {"slug": "wyoming", "name": "Wyoming", "code": "WY", "type": "state"},
    {"slug": "new-hampshire", "name": "New Hampshire", "code": "NH", "type": "state"}
]

# 50 Top Cities for Real Estate
cities = [
    {"slug": "atlanta", "name": "Atlanta", "code": "GA", "type": "city"},
    {"slug": "dallas", "name": "Dallas", "code": "TX", "type": "city"},
    {"slug": "miami", "name": "Miami", "code": "FL", "type": "city"},
    {"slug": "houston", "name": "Houston", "code": "TX", "type": "city"},
    {"slug": "austin", "name": "Austin", "code": "TX", "type": "city"},
    {"slug": "chicago", "name": "Chicago", "code": "IL", "type": "city"},
    {"slug": "phoenix", "name": "Phoenix", "code": "AZ", "type": "city"},
    {"slug": "tampa", "name": "Tampa", "code": "FL", "type": "city"},
    {"slug": "orlando", "name": "Orlando", "code": "FL", "type": "city"},
    {"slug": "charlotte", "name": "Charlotte", "code": "NC", "type": "city"},
    {"slug": "raleigh", "name": "Raleigh", "code": "NC", "type": "city"},
    {"slug": "nashville", "name": "Nashville", "code": "TN", "type": "city"},
    {"slug": "denver", "name": "Denver", "code": "CO", "type": "city"},
    {"slug": "las-vegas", "name": "Las Vegas", "code": "NV", "type": "city"},
    {"slug": "seattle", "name": "Seattle", "code": "WA", "type": "city"},
    {"slug": "philadelphia", "name": "Philadelphia", "code": "PA", "type": "city"},
    {"slug": "san-antonio", "name": "San Antonio", "code": "TX", "type": "city"},
    {"slug": "san-diego", "name": "San Diego", "code": "CA", "type": "city"},
    {"slug": "columbus", "name": "Columbus", "code": "OH", "type": "city"},
    {"slug": "indianapolis", "name": "Indianapolis", "code": "IN", "type": "city"},
    {"slug": "jacksonville", "name": "Jacksonville", "code": "FL", "type": "city"},
    {"slug": "fort-worth", "name": "Fort Worth", "code": "TX", "type": "city"},
    {"slug": "detroit", "name": "Detroit", "code": "MI", "type": "city"},
    {"slug": "memphis", "name": "Memphis", "code": "TN", "type": "city"},
    {"slug": "baltimore", "name": "Baltimore", "code": "MD", "type": "city"},
    {"slug": "boston", "name": "Boston", "code": "MA", "type": "city"},
    {"slug": "portland", "name": "Portland", "code": "OR", "type": "city"},
    {"slug": "louisville", "name": "Louisville", "code": "KY", "type": "city"},
    {"slug": "milwaukee", "name": "Milwaukee", "code": "WI", "type": "city"},
    {"slug": "albuquerque", "name": "Albuquerque", "code": "NM", "type": "city"},
    {"slug": "tucson", "name": "Tucson", "code": "AZ", "type": "city"},
    {"slug": "fresno", "name": "Fresno", "code": "CA", "type": "city"},
    {"slug": "sacramento", "name": "Sacramento", "code": "CA", "type": "city"},
    {"slug": "kansas-city", "name": "Kansas City", "code": "MO", "type": "city"},
    {"slug": "mesa", "name": "Mesa", "code": "AZ", "type": "city"},
    {"slug": "omaha", "name": "Omaha", "code": "NE", "type": "city"},
    {"slug": "colorado-springs", "name": "Colorado Springs", "code": "CO", "type": "city"},
    {"slug": "virginia-beach", "name": "Virginia Beach", "code": "VA", "type": "city"},
    {"slug": "oakland", "name": "Oakland", "code": "CA", "type": "city"},
    {"slug": "minneapolis", "name": "Minneapolis", "code": "MN", "type": "city"},
    {"slug": "tulsa", "name": "Tulsa", "code": "OK", "type": "city"},
    {"slug": "arlington", "name": "Arlington", "code": "TX", "type": "city"},
    {"slug": "new-orleans", "name": "New Orleans", "code": "LA", "type": "city"},
    {"slug": "wichita", "name": "Wichita", "code": "KS", "type": "city"},
    {"slug": "cleveland", "name": "Cleveland", "code": "OH", "type": "city"},
    {"slug": "bakersfield", "name": "Bakersfield", "code": "CA", "type": "city"},
    {"slug": "aurora", "name": "Aurora", "code": "CO", "type": "city"},
    {"slug": "anaheim", "name": "Anaheim", "code": "CA", "type": "city"},
    {"slug": "honolulu", "name": "Honolulu", "code": "HI", "type": "city"},
    {"slug": "santa-ana", "name": "Santa Ana", "code": "CA", "type": "city"}
]

locations = states + cities

deal_types = [
    {"slug": "fix-and-flip", "label": "fix-and-flip"},
    {"slug": "brrrr", "label": "BRRRR"},
    {"slug": "hard-money", "label": "hard money"},
    {"slug": "rental-purchase", "label": "rental purchase"},
    {"slug": "commercial", "label": "commercial real estate"}
]

seo_data = {}

# SEO Variations based on index to create unique footprints
def get_market_context(loc_name, loc_code, deal_label, loc_type, index):
    variations = [
        f"{loc_name} {deal_label} operators work in dynamic local markets where success depends on targeted property acquisition and a borrower that understands {loc_name} real estate trends. In {loc_code}, the strategy sharpens when teams track localized market shifts and compare renovation costs against realistic hold assumptions instead of optimistic averages. The best {deal_label} executions in {loc_name} usually combine precise scope control, localized neighborhood review, and a plan tailored specifically to current inventory rather than generic national playbooks.",
        
        f"Investing in {loc_name} requires a sharp approach to {deal_label} financing. The {loc_name} real estate landscape is highly localized, meaning that borrowers need capital partners who understand the nuances of {loc_code} neighborhoods. From tracking local zoning to navigating rehab timelines, {deal_label} operators here succeed by aligning fast execution with reliable bridge debt. Whether you're acquiring a distressed asset or stabilizing a multi-unit property, having the right leverage in {loc_name} is the difference between scaling and stalling.",
        
        f"For {deal_label} projects in {loc_name}, speed and certainty of close are critical. As the {loc_name} market continues to evolve, investors need flexible capital that isn't bogged down by traditional bank underwriting. In {loc_code}, the most profitable {deal_label} deals are secured by borrowers who move quickly, understand neighborhood-level comps, and secure high-leverage funding that allows them to execute their rehab or stabilization plan without liquidity bottlenecks."
    ]
    return variations[index % len(variations)]

def get_faqs(loc_name, loc_code, deal_label, index):
    base_faqs = [
        {
            "question": f"For {loc_name} {deal_label} deals, what factors matter most when local market shifts can alter the budget?",
            "answer": f"For {loc_name} {deal_label} borrowers, lenders want to see how renovation plans, neighborhood trends, and buyer demand interact before proceeds are sized. Sponsors usually gain traction by documenting assumptions before the lender has to ask for them."
        },
        {
            "question": f"In {loc_code}, how quickly should investors expect to execute without overstating post-rehab value?",
            "answer": f"The workable approach is to anchor the file in neighborhood evidence, then show how local review and scope control remain intact if the schedule slips. Execution improves when reserves are sized for the {loc_name} market instead of copied from another state."
        },
        {
            "question": f"Why do experienced sponsors in {loc_name} focus heavily on credible exit estimates for {deal_label}?",
            "answer": f"That question matters because {loc_name} lenders often separate average-looking files from credible ones by whether the borrower has planned for localized costs and reserves tied to the exit path. Borrowers that map milestones to cash needs tend to avoid avoidable extension pressure."
        }
    ]
    return base_faqs

count = 0
for loc in locations:
    l_name = loc["name"]
    l_code = loc["code"]
    l_slug = loc["slug"]
    l_type = loc["type"]
    
    for deal in deal_types:
        d_slug = deal["slug"]
        d_label = deal["label"]
        
        key = f"{l_slug}-{d_slug}"
        
        marketContext = get_market_context(l_name, l_code, d_label, l_type, count)
        faqs = get_faqs(l_name, l_code, d_label, count)
        
        seo_data[key] = {
            "marketContext": marketContext,
            "faqs": faqs
        }
        count += 1

with open("projects/funding/repo/nextjs-app/data/seo_content.json", "w") as f:
    json.dump(seo_data, f, indent=2)

print(f"Generated data/seo_content.json with {len(seo_data)} entries.")

# Update stateMap in page.tsx
file_path = "projects/funding/repo/nextjs-app/app/loans/[state]/[dealType]/page.tsx"
state_map_entries = []
for loc in locations:
    slug = loc["slug"]
    name = loc["name"]
    code = loc["code"]
    code_lower = code.lower()
    
    state_map_entries.append(f'  "{code_lower}": {{ slug: "{slug}", name: "{name}", code: "{code}" }}')
    if code_lower != slug:
        state_map_entries.append(f'  "{slug}": {{ slug: "{slug}", name: "{name}", code: "{code}" }}')

new_map = "const stateMap: Record<string, { slug: string; name: string; code: string }> = {\n" + ",\n".join(state_map_entries) + "\n};"

with open(file_path, "r") as f:
    content = f.read()

pattern = re.compile(r"const stateMap: Record<string, \{ slug: string; name: string; code: string \}> = \{.*?\};", re.DOTALL)
new_content = pattern.sub(new_map, content)

with open(file_path, "w") as f:
    f.write(new_content)

print(f"Updated page.tsx with {len(locations)} locations.")

# Update generated_urls.md
with open("projects/funding/generated_urls.md", "w") as f:
    f.write("# Generated URLs (500 Pages)\n\nThese are the 500 programmatic SEO pages (50 States + 50 Top Cities).\n\n")
    for loc in locations:
        f.write(f"## {loc['name']}\n")
        l_slug = loc['slug']
        for deal_name, deal_slug in [
            ("Fix & Flip", "fix-and-flip"),
            ("BRRRR", "brrrr"),
            ("Hard Money", "hard-money"),
            ("Rental Purchase", "rental-purchase"),
            ("Commercial", "commercial")
        ]:
            url = f"https://fundingconnect.net/loans/{l_slug}/{deal_slug}"
            f.write(f"- [{deal_name} in {loc['name']}]({url})\n")
        f.write("\n")

print("Updated generated_urls.md")
