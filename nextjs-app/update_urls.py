states = [
    "Florida", "Texas", "California", "Georgia", "North Carolina",
    "New York", "Illinois", "Ohio", "Pennsylvania", "New Jersey",
    "Michigan", "Virginia", "Washington", "Arizona", "Massachusetts",
    "Tennessee", "Indiana", "Missouri", "Maryland", "Colorado",
    "Wisconsin", "Minnesota", "South Carolina", "Alabama", "Louisiana",
    "Kentucky", "Oregon", "Oklahoma", "Connecticut", "Utah",
    "Iowa", "Nevada", "Arkansas", "Mississippi", "Kansas",
    "New Mexico", "Nebraska", "Idaho", "West Virginia", "Hawaii"
]

deal_types = [
    ("Fix & Flip", "fix-and-flip"),
    ("BRRRR", "brrrr"),
    ("Hard Money", "hard-money"),
    ("Rental Purchase", "rental-purchase"),
    ("Commercial", "commercial")
]

with open("projects/funding/generated_urls.md", "w") as f:
    f.write("# Generated URLs (200 Pages)\n\nThese are the 200 programmatic SEO pages generated for Funding Connect.\n\n")
    for state in states:
        f.write(f"## {state}\n")
        slug_state = state.lower().replace(" ", "-")
        for deal_name, deal_slug in deal_types:
            url = f"https://fundingconnect.net/loans/{slug_state}/{deal_slug}"
            f.write(f"- [{deal_name} in {state}]({url})\n")
        f.write("\n")

print("Updated generated_urls.md")
