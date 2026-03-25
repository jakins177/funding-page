import json

states = [
    # Original 20
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
    # Next 20
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

deal_types = [
    {"slug": "fix-and-flip", "label": "fix-and-flip"},
    {"slug": "brrrr", "label": "BRRRR"},
    {"slug": "hard-money", "label": "hard money"},
    {"slug": "rental-purchase", "label": "rental purchase"},
    {"slug": "commercial", "label": "commercial real estate"}
]

seo_data = {}

for state in states:
    s_name = state["name"]
    s_code = state["code"]
    s_slug = state["slug"]
    
    for deal in deal_types:
        d_slug = deal["slug"]
        d_label = deal["label"]
        
        key = f"{s_slug}-{d_slug}"
        
        marketContext = f"{s_name} {d_label} operators work in dynamic local markets where success depends on targeted property acquisition and a borrower that understands {s_name} real estate trends. In {s_code}, the strategy sharpens when teams track localized market shifts and compare renovation costs against realistic hold assumptions instead of optimistic averages. The best {d_label} executions in {s_name} usually combine precise scope control, localized neighborhood review, and a plan tailored specifically to current inventory rather than generic national playbooks."
        
        faqs = [
            {
                "question": f"For {s_name} {d_label} deals, what factors matter most when local market shifts can alter the budget?",
                "answer": f"For {s_name} {d_label} borrowers, lenders want to see how renovation plans, neighborhood trends, and buyer demand interact before proceeds are sized. Sponsors usually gain traction by documenting assumptions before the lender has to ask for them."
            },
            {
                "question": f"In {s_code}, how quickly should investors expect to execute without overstating post-rehab value?",
                "answer": f"The workable approach is to anchor the file in neighborhood evidence, then show how local review and scope control remain intact if the schedule slips. Execution improves when reserves are sized for the {s_name} market instead of copied from another state."
            },
            {
                "question": f"Why do experienced sponsors in {s_name} focus heavily on credible exit estimates for {d_label}?",
                "answer": f"That question matters because {s_name} lenders often separate average-looking files from credible ones by whether the borrower has planned for localized costs and reserves tied to the exit path. Borrowers that map milestones to cash needs tend to avoid avoidable extension pressure."
            }
        ]
        
        seo_data[key] = {
            "marketContext": marketContext,
            "faqs": faqs
        }

with open("projects/funding/repo/nextjs-app/data/seo_content.json", "w") as f:
    json.dump(seo_data, f, indent=2)

print(f"Generated data/seo_content.json with {len(seo_data)} entries.")
