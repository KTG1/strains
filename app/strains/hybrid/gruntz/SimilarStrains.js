import Image from "next/image";
import Link from "next/link";
import { strains } from "../../strainData";
import styles from "./product.module.css";

const normalize = (value = "") => value.toLowerCase().replace(/\s+strain$/, "").trim();

function relatedProfiles(product, limit = 4) {
  const selected = [];
  const add = (candidate) => {
    if (candidate && candidate.slug !== product.slug && !selected.some((item) => item.slug === candidate.slug)) {
      selected.push(candidate);
    }
  };

  (product.similar || []).forEach((name) => {
    add(strains.find((item) => normalize(item.shortName) === normalize(name) || normalize(item.name) === normalize(name)));
  });
  strains.filter((item) => item.type === product.type).forEach(add);
  strains.forEach(add);
  return selected.slice(0, limit);
}

export default function SimilarStrains({ product }) {
  const related = relatedProfiles(product);

  return (
    <section className={styles.similar} aria-labelledby="similar-strains-heading">
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.kicker}>Explore related profiles</p>
          <h2 id="similar-strains-heading">Strains similar to {product.shortName}</h2>
        </div>
        <Link href="/">View all strains</Link>
      </div>
      <div className={styles.productGrid}>
        {related.map((item) => {
          const href = `/strains/${item.type}/${item.slug}`;
          return (
            <article className={styles.productCard} key={`${item.type}-${item.slug}`}>
              <Link href={href} className={styles.thumb}>
                <Image src={item.image} alt={`${item.shortName} strain reference flower`} fill sizes="(max-width: 560px) 90vw, (max-width: 900px) 45vw, 280px" />
              </Link>
              <p>{item.classification || item.type} flower</p>
              <h3><Link href={href} style={{ color: "inherit", textDecoration: "none" }}>{item.name}</Link></h3>
              <div className={styles.miniRating}>★★★★★ <span>Profile</span></div>
              <strong>{item.price}</strong>
              <Link href={href} style={{ height: 46, display: "grid", placeItems: "center", background: "#272526", color: "#fff", fontWeight: 800, textDecoration: "none", textTransform: "uppercase" }}>View strain</Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
