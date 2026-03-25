import type { Metadata } from "next";
import { notFound } from "next/navigation";
import seoContent from "@/data/seo_content.json";
import styles from "./page.module.css";

type RouteParams = {
  state: string;
  dealType: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type SeoEntry = {
  marketContext: string;
  faqs: FaqItem[];
};

const stateMap: Record<string, { slug: string; name: string; code: string }> = {
  "florida": { slug: "florida", name: "Florida", code: "FL" },
  "texas": { slug: "texas", name: "Texas", code: "TX" },
  "california": { slug: "california", name: "California", code: "CA" },
  "georgia": { slug: "georgia", name: "Georgia", code: "GA" },
  "north-carolina": { slug: "north-carolina", name: "North Carolina", code: "NC" },
  "new-york": { slug: "new-york", name: "New York", code: "NY" },
  "illinois": { slug: "illinois", name: "Illinois", code: "IL" },
  "ohio": { slug: "ohio", name: "Ohio", code: "OH" },
  "pennsylvania": { slug: "pennsylvania", name: "Pennsylvania", code: "PA" },
  "new-jersey": { slug: "new-jersey", name: "New Jersey", code: "NJ" },
  "michigan": { slug: "michigan", name: "Michigan", code: "MI" },
  "virginia": { slug: "virginia", name: "Virginia", code: "VA" },
  "washington": { slug: "washington", name: "Washington", code: "WA" },
  "arizona": { slug: "arizona", name: "Arizona", code: "AZ" },
  "massachusetts": { slug: "massachusetts", name: "Massachusetts", code: "MA" },
  "tennessee": { slug: "tennessee", name: "Tennessee", code: "TN" },
  "indiana": { slug: "indiana", name: "Indiana", code: "IN" },
  "missouri": { slug: "missouri", name: "Missouri", code: "MO" },
  "maryland": { slug: "maryland", name: "Maryland", code: "MD" },
  "colorado": { slug: "colorado", name: "Colorado", code: "CO" },
  "wisconsin": { slug: "wisconsin", name: "Wisconsin", code: "WI" },
  "minnesota": { slug: "minnesota", name: "Minnesota", code: "MN" },
  "south-carolina": { slug: "south-carolina", name: "South Carolina", code: "SC" },
  "alabama": { slug: "alabama", name: "Alabama", code: "AL" },
  "louisiana": { slug: "louisiana", name: "Louisiana", code: "LA" },
  "kentucky": { slug: "kentucky", name: "Kentucky", code: "KY" },
  "oregon": { slug: "oregon", name: "Oregon", code: "OR" },
  "oklahoma": { slug: "oklahoma", name: "Oklahoma", code: "OK" },
  "connecticut": { slug: "connecticut", name: "Connecticut", code: "CT" },
  "utah": { slug: "utah", name: "Utah", code: "UT" },
  "iowa": { slug: "iowa", name: "Iowa", code: "IA" },
  "nevada": { slug: "nevada", name: "Nevada", code: "NV" },
  "arkansas": { slug: "arkansas", name: "Arkansas", code: "AR" },
  "mississippi": { slug: "mississippi", name: "Mississippi", code: "MS" },
  "kansas": { slug: "kansas", name: "Kansas", code: "KS" },
  "new-mexico": { slug: "new-mexico", name: "New Mexico", code: "NM" },
  "nebraska": { slug: "nebraska", name: "Nebraska", code: "NE" },
  "idaho": { slug: "idaho", name: "Idaho", code: "ID" },
  "west-virginia": { slug: "west-virginia", name: "West Virginia", code: "WV" },
  "hawaii": { slug: "hawaii", name: "Hawaii", code: "HI" },
  "maine": { slug: "maine", name: "Maine", code: "ME" },
  "montana": { slug: "montana", name: "Montana", code: "MT" },
  "rhode-island": { slug: "rhode-island", name: "Rhode Island", code: "RI" },
  "delaware": { slug: "delaware", name: "Delaware", code: "DE" },
  "south-dakota": { slug: "south-dakota", name: "South Dakota", code: "SD" },
  "north-dakota": { slug: "north-dakota", name: "North Dakota", code: "ND" },
  "alaska": { slug: "alaska", name: "Alaska", code: "AK" },
  "vermont": { slug: "vermont", name: "Vermont", code: "VT" },
  "wyoming": { slug: "wyoming", name: "Wyoming", code: "WY" },
  "new-hampshire": { slug: "new-hampshire", name: "New Hampshire", code: "NH" },
  "atlanta": { slug: "atlanta", name: "Atlanta", code: "GA" },
  "dallas": { slug: "dallas", name: "Dallas", code: "TX" },
  "miami": { slug: "miami", name: "Miami", code: "FL" },
  "houston": { slug: "houston", name: "Houston", code: "TX" },
  "austin": { slug: "austin", name: "Austin", code: "TX" },
  "chicago": { slug: "chicago", name: "Chicago", code: "IL" },
  "phoenix": { slug: "phoenix", name: "Phoenix", code: "AZ" },
  "tampa": { slug: "tampa", name: "Tampa", code: "FL" },
  "orlando": { slug: "orlando", name: "Orlando", code: "FL" },
  "charlotte": { slug: "charlotte", name: "Charlotte", code: "NC" },
  "raleigh": { slug: "raleigh", name: "Raleigh", code: "NC" },
  "nashville": { slug: "nashville", name: "Nashville", code: "TN" },
  "denver": { slug: "denver", name: "Denver", code: "CO" },
  "las-vegas": { slug: "las-vegas", name: "Las Vegas", code: "NV" },
  "seattle": { slug: "seattle", name: "Seattle", code: "WA" },
  "philadelphia": { slug: "philadelphia", name: "Philadelphia", code: "PA" },
  "san-antonio": { slug: "san-antonio", name: "San Antonio", code: "TX" },
  "san-diego": { slug: "san-diego", name: "San Diego", code: "CA" },
  "columbus": { slug: "columbus", name: "Columbus", code: "OH" },
  "indianapolis": { slug: "indianapolis", name: "Indianapolis", code: "IN" },
  "jacksonville": { slug: "jacksonville", name: "Jacksonville", code: "FL" },
  "fort-worth": { slug: "fort-worth", name: "Fort Worth", code: "TX" },
  "detroit": { slug: "detroit", name: "Detroit", code: "MI" },
  "memphis": { slug: "memphis", name: "Memphis", code: "TN" },
  "baltimore": { slug: "baltimore", name: "Baltimore", code: "MD" },
  "boston": { slug: "boston", name: "Boston", code: "MA" },
  "portland": { slug: "portland", name: "Portland", code: "OR" },
  "louisville": { slug: "louisville", name: "Louisville", code: "KY" },
  "milwaukee": { slug: "milwaukee", name: "Milwaukee", code: "WI" },
  "albuquerque": { slug: "albuquerque", name: "Albuquerque", code: "NM" },
  "tucson": { slug: "tucson", name: "Tucson", code: "AZ" },
  "fresno": { slug: "fresno", name: "Fresno", code: "CA" },
  "sacramento": { slug: "sacramento", name: "Sacramento", code: "CA" },
  "kansas-city": { slug: "kansas-city", name: "Kansas City", code: "MO" },
  "mesa": { slug: "mesa", name: "Mesa", code: "AZ" },
  "omaha": { slug: "omaha", name: "Omaha", code: "NE" },
  "colorado-springs": { slug: "colorado-springs", name: "Colorado Springs", code: "CO" },
  "virginia-beach": { slug: "virginia-beach", name: "Virginia Beach", code: "VA" },
  "oakland": { slug: "oakland", name: "Oakland", code: "CA" },
  "minneapolis": { slug: "minneapolis", name: "Minneapolis", code: "MN" },
  "tulsa": { slug: "tulsa", name: "Tulsa", code: "OK" },
  "arlington": { slug: "arlington", name: "Arlington", code: "TX" },
  "new-orleans": { slug: "new-orleans", name: "New Orleans", code: "LA" },
  "wichita": { slug: "wichita", name: "Wichita", code: "KS" },
  "cleveland": { slug: "cleveland", name: "Cleveland", code: "OH" },
  "bakersfield": { slug: "bakersfield", name: "Bakersfield", code: "CA" },
  "aurora": { slug: "aurora", name: "Aurora", code: "CO" },
  "anaheim": { slug: "anaheim", name: "Anaheim", code: "CA" },
  "honolulu": { slug: "honolulu", name: "Honolulu", code: "HI" },
  "santa-ana": { slug: "santa-ana", name: "Santa Ana", code: "CA" }
};

const dealTypeMap: Record<string, { slug: string; label: string; summary: string }> = {
  "fix-and-flip": {
    slug: "fix-and-flip",
    label: "Fix-and-Flip Loans",
    summary: "Bridge financing designed for fast closings, rehab execution, and profitable resale timelines."
  },
  brrrr: {
    slug: "brrrr",
    label: "BRRRR Loans",
    summary: "Short-term capital built for buy, rehab, rent, refinance, and repeat strategies."
  },
  "hard-money": {
    slug: "hard-money",
    label: "Hard Money Loans",
    summary: "Asset-focused lending for investors who need speed, flexibility, and reliable certainty of close."
  },
  "rental-purchase": {
    slug: "rental-purchase",
    label: "Rental Purchase Loans",
    summary: "Financing for acquiring income properties with a clear long-term hold and cash-flow plan."
  },
  commercial: {
    slug: "commercial",
    label: "Commercial Real Estate Loans",
    summary: "Bridge capital for multifamily, mixed-use, retail, industrial, and transitional commercial assets."
  }
};

const seoEntries = seoContent as Record<string, SeoEntry>;

function getPageData(params: RouteParams) {
  const normalizedState = stateMap[params.state.toLowerCase()];
  const normalizedDealType = dealTypeMap[params.dealType.toLowerCase()];

  if (!normalizedState || !normalizedDealType) {
    return null;
  }

  const slug = `${normalizedState.slug}-${normalizedDealType.slug}`;
  const content = seoEntries[slug];

  if (!content) {
    return null;
  }

  return {
    content,
    deal: normalizedDealType,
    slug,
    state: normalizedState
  };
}

export function generateMetadata({ params }: { params: RouteParams }): Metadata {
  const pageData = getPageData(params);

  if (!pageData) {
    return {
      title: "Loan Program | Funding Connect"
    };
  }

  return {
    title: `${pageData.deal.label} in ${pageData.state.name} | Funding Connect`,
    description: pageData.content.marketContext,
    alternates: {
      canonical: `/loans/${pageData.state.slug}/${pageData.deal.slug}`
    }
  };
}

export default function LoanPage({ params }: { params: RouteParams }) {
  const pageData = getPageData(params);

  if (!pageData) {
    notFound();
  }

  const { content, deal, slug, state } = pageData;
  const heroTitle = `${deal.label} for ${state.name} Investors`;

  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Funding Connect",
    description: `${deal.label} in ${state.name} with top partner program highlights and fast investor funding guidance.`,
    areaServed: {
      "@type": "State",
      name: state.name
    },
    serviceType: deal.label,
    knowsAbout: [
      `${state.name} real estate investing`,
      deal.label,
      "Bridge lending",
      "Investment property financing"
    ],
    provider: {
      "@type": "Organization",
      name: "Funding Connect Partners"
    },
    offers: {
      "@type": "Offer",
      category: "Real Estate Investment Loan",
      priceCurrency: "USD",
      description: "Rates from 9%, up to 90% LTV, and fast funding for qualified investment property loans."
    }
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
      />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Funding Connect • Powered by our partner's loan programs</div>
          <h1 className={styles.heroTitle}>{heroTitle}</h1>
          <p className={styles.heroSubtitle}>
            {deal.summary} The page is tailored to {state.name} investors, with localized market context,
            investor FAQs, and direct access to the embedded funding agent.
          </p>

          <div className={styles.statRow}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Program Focus</span>
              <span className={styles.statValue}>{deal.label}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Coverage</span>
              <span className={styles.statValue}>{state.name} ({state.code})</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Content Key</span>
              <span className={styles.statValue}>{slug}</span>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <section className={`${styles.panel} ${styles.contentPanel}`}>
            <p className={styles.sectionTag}>Market Context</p>
            <h2 className={styles.sectionTitle}>{state.name} insights for {deal.label.toLowerCase()}</h2>
            <p className={styles.lede}>{content.marketContext}</p>

            <div className={styles.highlightGrid}>
              <div className={styles.highlightCard}>
                <span className={styles.highlightValue}>Rates from 9%</span>
                <span className={styles.highlightLabel}>Competitive pricing for qualified investment scenarios.</span>
              </div>
              <div className={styles.highlightCard}>
                <span className={styles.highlightValue}>Up to 90% LTV</span>
                <span className={styles.highlightLabel}>Higher leverage options to support acquisitions and growth.</span>
              </div>
              <div className={styles.highlightCard}>
                <span className={styles.highlightValue}>Fast Funding</span>
                <span className={styles.highlightLabel}>Built for borrowers who need execution speed and certainty.</span>
              </div>
            </div>

            <p className={styles.lede}>
              Our partner loan specifics are positioned for serious operators who need to move quickly, present a
              coherent deal story, and keep capital aligned with the exit. That makes the program especially relevant
              for investors balancing acquisition pace with rehab, lease-up, or stabilization milestones.
            </p>

            <div className={styles.faqList}>
              {content.faqs.map((faq) => (
                <article key={faq.question} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className={styles.sidebar}>
            
            <section className={`${styles.panel} ${styles.sidebarPanel}`}>
              <p className={styles.sectionTag}>Limited Time Offer</p>
              <h2 className={styles.sectionTitle}>Get $350 Cash Bonus</h2>
              <p className={styles.lede}>
                Apply through our partner link and receive a <strong>$350 cash bonus</strong> at closing! 
                This offer is available for qualified investors.
              </p>
              <a 
                href="https://bit.ly/kiavi-real-estate-funding" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.iframe}
                style={{
                  display: 'block',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  marginTop: '16px'
                }}
              >
                Apply Now + Get $350 Bonus
              </a>
            </section>

<section className={`${styles.panel} ${styles.sidebarPanel}`}>
              <p className={styles.sectionTag}>Embedded Funding Agent</p>
              <h2 className={styles.sectionTitle}>Discuss your deal live</h2>
              <p className={styles.lede}>
                Use Our AI agent below to walk through the property, timeline, budget, and exit plan. It
                stays embedded on the page so visitors can move from research to qualification without leaving the
                experience.
              </p>
              <div className={styles.iframeWrap}>
                <iframe
                  className={styles.iframe}
                  src="https://agentbuilder.palmtreesai.com/embed/a830e00b-bf36-4df9-b66b-cbd69d2491ea"
                  title="Funding Connect AI Agent"
                />
              </div>
            </section>

            <section className={`${styles.panel} ${styles.sidebarPanel}`}>
              <p className={styles.sectionTag}>Why this page converts</p>
              <h2 className={styles.sectionTitle}>Clear investor positioning</h2>
              <div className={styles.checkList}>
                <div className={styles.checkItem}>
                  <span className={styles.checkDot} />
                  <span>Localized SEO copy tied directly to the selected state and deal type.</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkDot} />
                  <span>Visible partner value points presented before the qualification conversation.</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkDot} />
                  <span>Structured data that reinforces financial-service relevance for search engines.</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <footer className={styles.footer}>
        Funding Connect is not a direct lender. We help investment-property borrowers evaluate options and connect
        with lender programs that match the deal strategy.
      </footer>
    </div>
  );
}
