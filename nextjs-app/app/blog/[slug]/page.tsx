import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../page.module.css";
import posts from "../../../data/blog/posts.json";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Funding Connect Blog`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.postHeader}>
          <div className={styles.postMeta}>
            {post.date} • By {post.author}
          </div>
          <h1 className={styles.postTitle}>{post.title}</h1>
        </header>

        {post.image && (
          <img src={post.image} alt={post.title} className={styles.postImage} />
        )}

        <div 
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <Link href="/blog" style={{ color: "#2563eb", fontWeight: "bold" }}>
            &larr; Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
