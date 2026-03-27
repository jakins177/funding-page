import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import posts from "../../data/blog/posts.json";

export const metadata: Metadata = {
  title: "Funding Connect Blog | Real Estate Investing Strategies & Loans",
  description: "Expert insights on financing real estate investments, fix-and-flips, BRRRR strategies, and hard money loans in 2026.",
};

export default function BlogIndex() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Investor Insights</h1>
          <p className={styles.heroSubtitle}>
            Strategies, market updates, and funding guides to scale your real estate portfolio.
          </p>
        </header>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
              {post.image && (
                <img src={post.image} alt={post.title} className={styles.cardImage} />
              )}
              <div className={styles.cardContent}>
                <div className={styles.cardDate}>{post.date}</div>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.readMore}>Read Article &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
