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
  "colorado": { slug: "colorado", name: "Colorado", code: "CO" }
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
