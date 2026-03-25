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
  "fl": { slug: "florida", name: "Florida", code: "FL" },
  "florida": { slug: "florida", name: "Florida", code: "FL" },
  "tx": { slug: "texas", name: "Texas", code: "TX" },
  "texas": { slug: "texas", name: "Texas", code: "TX" },
  "ca": { slug: "california", name: "California", code: "CA" },
  "california": { slug: "california", name: "California", code: "CA" },
  "ga": { slug: "georgia", name: "Georgia", code: "GA" },
  "georgia": { slug: "georgia", name: "Georgia", code: "GA" },
  "nc": { slug: "north-carolina", name: "North Carolina", code: "NC" },
  "north-carolina": { slug: "north-carolina", name: "North Carolina", code: "NC" },
  "ny": { slug: "new-york", name: "New York", code: "NY" },
  "new-york": { slug: "new-york", name: "New York", code: "NY" },
  "il": { slug: "illinois", name: "Illinois", code: "IL" },
  "illinois": { slug: "illinois", name: "Illinois", code: "IL" },
  "oh": { slug: "ohio", name: "Ohio", code: "OH" },
  "ohio": { slug: "ohio", name: "Ohio", code: "OH" },
  "pa": { slug: "pennsylvania", name: "Pennsylvania", code: "PA" },
  "pennsylvania": { slug: "pennsylvania", name: "Pennsylvania", code: "PA" },
  "nj": { slug: "new-jersey", name: "New Jersey", code: "NJ" },
  "new-jersey": { slug: "new-jersey", name: "New Jersey", code: "NJ" },
  "mi": { slug: "michigan", name: "Michigan", code: "MI" },
  "michigan": { slug: "michigan", name: "Michigan", code: "MI" },
  "va": { slug: "virginia", name: "Virginia", code: "VA" },
  "virginia": { slug: "virginia", name: "Virginia", code: "VA" },
  "wa": { slug: "washington", name: "Washington", code: "WA" },
  "washington": { slug: "washington", name: "Washington", code: "WA" },
  "az": { slug: "arizona", name: "Arizona", code: "AZ" },
  "arizona": { slug: "arizona", name: "Arizona", code: "AZ" },
  "ma": { slug: "massachusetts", name: "Massachusetts", code: "MA" },
  "massachusetts": { slug: "massachusetts", name: "Massachusetts", code: "MA" },
  "tn": { slug: "tennessee", name: "Tennessee", code: "TN" },
  "tennessee": { slug: "tennessee", name: "Tennessee", code: "TN" },
  "in": { slug: "indiana", name: "Indiana", code: "IN" },
  "indiana": { slug: "indiana", name: "Indiana", code: "IN" },
  "mo": { slug: "missouri", name: "Missouri", code: "MO" },
  "missouri": { slug: "missouri", name: "Missouri", code: "MO" },
  "md": { slug: "maryland", name: "Maryland", code: "MD" },
  "maryland": { slug: "maryland", name: "Maryland", code: "MD" },
  "co": { slug: "colorado", name: "Colorado", code: "CO" },
  "colorado": { slug: "colorado", name: "Colorado", code: "CO" },
  "wi": { slug: "wisconsin", name: "Wisconsin", code: "WI" },
  "wisconsin": { slug: "wisconsin", name: "Wisconsin", code: "WI" },
  "mn": { slug: "minnesota", name: "Minnesota", code: "MN" },
  "minnesota": { slug: "minnesota", name: "Minnesota", code: "MN" },
  "sc": { slug: "south-carolina", name: "South Carolina", code: "SC" },
  "south-carolina": { slug: "south-carolina", name: "South Carolina", code: "SC" },
  "al": { slug: "alabama", name: "Alabama", code: "AL" },
  "alabama": { slug: "alabama", name: "Alabama", code: "AL" },
  "la": { slug: "louisiana", name: "Louisiana", code: "LA" },
  "louisiana": { slug: "louisiana", name: "Louisiana", code: "LA" },
  "ky": { slug: "kentucky", name: "Kentucky", code: "KY" },
  "kentucky": { slug: "kentucky", name: "Kentucky", code: "KY" },
  "or": { slug: "oregon", name: "Oregon", code: "OR" },
  "oregon": { slug: "oregon", name: "Oregon", code: "OR" },
  "ok": { slug: "oklahoma", name: "Oklahoma", code: "OK" },
  "oklahoma": { slug: "oklahoma", name: "Oklahoma", code: "OK" },
  "ct": { slug: "connecticut", name: "Connecticut", code: "CT" },
  "connecticut": { slug: "connecticut", name: "Connecticut", code: "CT" },
  "ut": { slug: "utah", name: "Utah", code: "UT" },
  "utah": { slug: "utah", name: "Utah", code: "UT" },
  "ia": { slug: "iowa", name: "Iowa", code: "IA" },
  "iowa": { slug: "iowa", name: "Iowa", code: "IA" },
  "nv": { slug: "nevada", name: "Nevada", code: "NV" },
  "nevada": { slug: "nevada", name: "Nevada", code: "NV" },
  "ar": { slug: "arkansas", name: "Arkansas", code: "AR" },
  "arkansas": { slug: "arkansas", name: "Arkansas", code: "AR" },
  "ms": { slug: "mississippi", name: "Mississippi", code: "MS" },
  "mississippi": { slug: "mississippi", name: "Mississippi", code: "MS" },
  "ks": { slug: "kansas", name: "Kansas", code: "KS" },
  "kansas": { slug: "kansas", name: "Kansas", code: "KS" },
  "nm": { slug: "new-mexico", name: "New Mexico", code: "NM" },
  "new-mexico": { slug: "new-mexico", name: "New Mexico", code: "NM" },
  "ne": { slug: "nebraska", name: "Nebraska", code: "NE" },
  "nebraska": { slug: "nebraska", name: "Nebraska", code: "NE" },
  "id": { slug: "idaho", name: "Idaho", code: "ID" },
  "idaho": { slug: "idaho", name: "Idaho", code: "ID" },
  "wv": { slug: "west-virginia", name: "West Virginia", code: "WV" },
  "west-virginia": { slug: "west-virginia", name: "West Virginia", code: "WV" },
  "hi": { slug: "hawaii", name: "Hawaii", code: "HI" },
  "hawaii": { slug: "hawaii", name: "Hawaii", code: "HI" },
  "me": { slug: "maine", name: "Maine", code: "ME" },
  "maine": { slug: "maine", name: "Maine", code: "ME" },
  "mt": { slug: "montana", name: "Montana", code: "MT" },
  "montana": { slug: "montana", name: "Montana", code: "MT" },
  "ri": { slug: "rhode-island", name: "Rhode Island", code: "RI" },
  "rhode-island": { slug: "rhode-island", name: "Rhode Island", code: "RI" },
  "de": { slug: "delaware", name: "Delaware", code: "DE" },
  "delaware": { slug: "delaware", name: "Delaware", code: "DE" },
  "sd": { slug: "south-dakota", name: "South Dakota", code: "SD" },
  "south-dakota": { slug: "south-dakota", name: "South Dakota", code: "SD" },
  "nd": { slug: "north-dakota", name: "North Dakota", code: "ND" },
  "north-dakota": { slug: "north-dakota", name: "North Dakota", code: "ND" },
  "ak": { slug: "alaska", name: "Alaska", code: "AK" },
  "alaska": { slug: "alaska", name: "Alaska", code: "AK" },
  "vt": { slug: "vermont", name: "Vermont", code: "VT" },
  "vermont": { slug: "vermont", name: "Vermont", code: "VT" },
  "wy": { slug: "wyoming", name: "Wyoming", code: "WY" },
  "wyoming": { slug: "wyoming", name: "Wyoming", code: "WY" },
  "nh": { slug: "new-hampshire", name: "New Hampshire", code: "NH" },
  "new-hampshire": { slug: "new-hampshire", name: "New Hampshire", code: "NH" },
  "ga": { slug: "atlanta", name: "Atlanta", code: "GA" },
  "atlanta": { slug: "atlanta", name: "Atlanta", code: "GA" },
  "tx": { slug: "dallas", name: "Dallas", code: "TX" },
  "dallas": { slug: "dallas", name: "Dallas", code: "TX" },
  "fl": { slug: "miami", name: "Miami", code: "FL" },
  "miami": { slug: "miami", name: "Miami", code: "FL" },
  "tx": { slug: "houston", name: "Houston", code: "TX" },
  "houston": { slug: "houston", name: "Houston", code: "TX" },
  "tx": { slug: "austin", name: "Austin", code: "TX" },
  "austin": { slug: "austin", name: "Austin", code: "TX" },
  "il": { slug: "chicago", name: "Chicago", code: "IL" },
  "chicago": { slug: "chicago", name: "Chicago", code: "IL" },
  "az": { slug: "phoenix", name: "Phoenix", code: "AZ" },
  "phoenix": { slug: "phoenix", name: "Phoenix", code: "AZ" },
  "fl": { slug: "tampa", name: "Tampa", code: "FL" },
  "tampa": { slug: "tampa", name: "Tampa", code: "FL" },
  "fl": { slug: "orlando", name: "Orlando", code: "FL" },
  "orlando": { slug: "orlando", name: "Orlando", code: "FL" },
  "nc": { slug: "charlotte", name: "Charlotte", code: "NC" },
  "charlotte": { slug: "charlotte", name: "Charlotte", code: "NC" },
  "nc": { slug: "raleigh", name: "Raleigh", code: "NC" },
  "raleigh": { slug: "raleigh", name: "Raleigh", code: "NC" },
  "tn": { slug: "nashville", name: "Nashville", code: "TN" },
  "nashville": { slug: "nashville", name: "Nashville", code: "TN" },
  "co": { slug: "denver", name: "Denver", code: "CO" },
  "denver": { slug: "denver", name: "Denver", code: "CO" },
  "nv": { slug: "las-vegas", name: "Las Vegas", code: "NV" },
  "las-vegas": { slug: "las-vegas", name: "Las Vegas", code: "NV" },
  "wa": { slug: "seattle", name: "Seattle", code: "WA" },
  "seattle": { slug: "seattle", name: "Seattle", code: "WA" },
  "pa": { slug: "philadelphia", name: "Philadelphia", code: "PA" },
  "philadelphia": { slug: "philadelphia", name: "Philadelphia", code: "PA" },
  "tx": { slug: "san-antonio", name: "San Antonio", code: "TX" },
  "san-antonio": { slug: "san-antonio", name: "San Antonio", code: "TX" },
  "ca": { slug: "san-diego", name: "San Diego", code: "CA" },
  "san-diego": { slug: "san-diego", name: "San Diego", code: "CA" },
  "oh": { slug: "columbus", name: "Columbus", code: "OH" },
  "columbus": { slug: "columbus", name: "Columbus", code: "OH" },
  "in": { slug: "indianapolis", name: "Indianapolis", code: "IN" },
  "indianapolis": { slug: "indianapolis", name: "Indianapolis", code: "IN" },
  "fl": { slug: "jacksonville", name: "Jacksonville", code: "FL" },
  "jacksonville": { slug: "jacksonville", name: "Jacksonville", code: "FL" },
  "tx": { slug: "fort-worth", name: "Fort Worth", code: "TX" },
  "fort-worth": { slug: "fort-worth", name: "Fort Worth", code: "TX" },
  "mi": { slug: "detroit", name: "Detroit", code: "MI" },
  "detroit": { slug: "detroit", name: "Detroit", code: "MI" },
  "tn": { slug: "memphis", name: "Memphis", code: "TN" },
  "memphis": { slug: "memphis", name: "Memphis", code: "TN" },
  "md": { slug: "baltimore", name: "Baltimore", code: "MD" },
  "baltimore": { slug: "baltimore", name: "Baltimore", code: "MD" },
  "ma": { slug: "boston", name: "Boston", code: "MA" },
  "boston": { slug: "boston", name: "Boston", code: "MA" },
  "or": { slug: "portland", name: "Portland", code: "OR" },
  "portland": { slug: "portland", name: "Portland", code: "OR" },
  "ky": { slug: "louisville", name: "Louisville", code: "KY" },
  "louisville": { slug: "louisville", name: "Louisville", code: "KY" },
  "wi": { slug: "milwaukee", name: "Milwaukee", code: "WI" },
  "milwaukee": { slug: "milwaukee", name: "Milwaukee", code: "WI" },
  "nm": { slug: "albuquerque", name: "Albuquerque", code: "NM" },
  "albuquerque": { slug: "albuquerque", name: "Albuquerque", code: "NM" },
  "az": { slug: "tucson", name: "Tucson", code: "AZ" },
  "tucson": { slug: "tucson", name: "Tucson", code: "AZ" },
  "ca": { slug: "fresno", name: "Fresno", code: "CA" },
  "fresno": { slug: "fresno", name: "Fresno", code: "CA" },
  "ca": { slug: "sacramento", name: "Sacramento", code: "CA" },
  "sacramento": { slug: "sacramento", name: "Sacramento", code: "CA" },
  "mo": { slug: "kansas-city", name: "Kansas City", code: "MO" },
  "kansas-city": { slug: "kansas-city", name: "Kansas City", code: "MO" },
  "az": { slug: "mesa", name: "Mesa", code: "AZ" },
  "mesa": { slug: "mesa", name: "Mesa", code: "AZ" },
  "ne": { slug: "omaha", name: "Omaha", code: "NE" },
  "omaha": { slug: "omaha", name: "Omaha", code: "NE" },
  "co": { slug: "colorado-springs", name: "Colorado Springs", code: "CO" },
  "colorado-springs": { slug: "colorado-springs", name: "Colorado Springs", code: "CO" },
  "va": { slug: "virginia-beach", name: "Virginia Beach", code: "VA" },
  "virginia-beach": { slug: "virginia-beach", name: "Virginia Beach", code: "VA" },
  "ca": { slug: "oakland", name: "Oakland", code: "CA" },
  "oakland": { slug: "oakland", name: "Oakland", code: "CA" },
  "mn": { slug: "minneapolis", name: "Minneapolis", code: "MN" },
  "minneapolis": { slug: "minneapolis", name: "Minneapolis", code: "MN" },
  "ok": { slug: "tulsa", name: "Tulsa", code: "OK" },
  "tulsa": { slug: "tulsa", name: "Tulsa", code: "OK" },
  "tx": { slug: "arlington", name: "Arlington", code: "TX" },
  "arlington": { slug: "arlington", name: "Arlington", code: "TX" },
  "la": { slug: "new-orleans", name: "New Orleans", code: "LA" },
  "new-orleans": { slug: "new-orleans", name: "New Orleans", code: "LA" },
  "ks": { slug: "wichita", name: "Wichita", code: "KS" },
  "wichita": { slug: "wichita", name: "Wichita", code: "KS" },
  "oh": { slug: "cleveland", name: "Cleveland", code: "OH" },
  "cleveland": { slug: "cleveland", name: "Cleveland", code: "OH" },
  "ca": { slug: "bakersfield", name: "Bakersfield", code: "CA" },
  "bakersfield": { slug: "bakersfield", name: "Bakersfield", code: "CA" },
  "co": { slug: "aurora", name: "Aurora", code: "CO" },
  "aurora": { slug: "aurora", name: "Aurora", code: "CO" },
  "ca": { slug: "anaheim", name: "Anaheim", code: "CA" },
  "anaheim": { slug: "anaheim", name: "Anaheim", code: "CA" },
  "hi": { slug: "honolulu", name: "Honolulu", code: "HI" },
  "honolulu": { slug: "honolulu", name: "Honolulu", code: "HI" },
  "ca": { slug: "santa-ana", name: "Santa Ana", code: "CA" },
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
