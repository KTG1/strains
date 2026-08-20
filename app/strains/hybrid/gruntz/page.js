import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.css";

const product = {
  name: "Gruntz Strain",
  type: "Hybrid",
  price: "$14.99",
  image: "/products/gruntz.jpg",
  thc: "20–24%",
  effects: ["Relaxed", "Happy", "Creative"],
  terpenes: ["Caryophyllene", "Limonene", "Linalool"],
  flavor: ["Berry", "Candy", "Earthy"],
};

const facts = [
  ["THC level", product.thc],
  ["Primary effect", "Balanced calm"],
  ["Terpene lead", product.terpenes[0]],
  ["Growing factor", "Moderate"],
  ["Aroma & flavor", product.flavor.join(" · ")],
  ["Customer rating", "New arrival"],
];

export const metadata = {
  title: "Gruntz Strain | Strains",
  description: "Explore the Gruntz hybrid strain profile, effects, terpene profile, aroma, flavor, and growing characteristics.",
};

function Icon({ children }) {
  return <span className={styles.icon} aria-hidden="true">{children}</span>;
}

export default function GruntzProductPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">⌂</Link><span>/</span><Link href="/">Flower</Link><span>/</span><Link href="/">Hybrid</Link><span>/</span><strong>{product.name}</strong>
        </nav>

        <section className={styles.hero}>
          <div className={styles.visual}>
            <span className={styles.badge}><span>✽</span> THC</span>
            <div className={styles.imageFrame}>
              <Image src={product.image} alt="Gruntz strain flower" fill priority sizes="(max-width: 820px) 92vw, 48vw" />
            </div>
            <p className={styles.imageNote}>Actual appearance may vary by harvest.</p>
          </div>

          <div className={styles.summary}>
            <p className={styles.kicker}>{product.type} flower</p>
            <h1>{product.name}</h1>
            <div className={styles.rating}><span aria-label="5 out of 5 stars">★★★★★</span> <a href="#reviews">0 reviews</a></div>
            <p className={styles.price}>{product.price}</p>
            <p className={styles.lede}>A fruit-forward hybrid with a candy-sweet aroma, balanced character, and an easygoing finish.</p>

            <div className={styles.buyRow}>
              <label className={styles.selectLabel}>Size
                <select defaultValue="1g" aria-label="Select size">
                  <option value="1g">1 gram</option>
                  <option value="3.5g">3.5 grams</option>
                </select>
              </label>
              <button type="button">Find in store</button>
            </div>
            <p className={styles.disclaimer}>Availability and pricing vary by location.</p>

            <div className={styles.facts}>
              {facts.map(([label, value], index) => (
                <a href={`#detail-${index}`} key={label}>
                  <Icon>{["♨", "✦", "♧", "⌁", "◡", "☆"][index]}</Icon>
                  <span><small>{label}</small><strong>{value}</strong></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.profile} aria-labelledby="profile-title">
          <div>
            <p className={styles.kicker}>The profile</p>
            <h2 id="profile-title">Sweet up front.<br />Grounded underneath.</h2>
          </div>
          <p>Gruntz is commonly described as a hybrid cross associated with Gelato and Zkittlez lineage. Its character moves from bright berry and confectionery notes into a soft, earthy finish.</p>
        </section>

        <section className={styles.metricGrid}>
          <article id="detail-0" className={styles.thcCard}>
            <p className={styles.kicker}>Potency range</p>
            <div className={styles.bigMetric}>{product.thc}</div>
            <h2>Gruntz strain THC level</h2>
            <p>This example profile places Gruntz in a moderate-to-high THC range. Potency varies by harvest, batch, and testing method.</p>
            <div className={styles.meter}><span /></div>
            <div className={styles.scale}><span>Mild</span><span>Moderate</span><span>Strong</span></div>
          </article>

          <article id="detail-1" className={styles.effectCard}>
            <p className={styles.kicker}>Reported character</p>
            <h2>Effect profile</h2>
            <div className={styles.tags}>{product.effects.map(x => <span key={x}>{x}</span>)}</div>
            <p>Often selected for a rounded experience that pairs an upbeat opening with a calmer, settled finish.</p>
          </article>

          <article id="detail-2">
            <p className={styles.kicker}>Aromatic compounds</p>
            <h2>Terpene profile</h2>
            <ul className={styles.barList}>
              {product.terpenes.map((name, i) => <li key={name}><span>{name}</span><i style={{"--bar": `${88 - i * 19}%`}} /></li>)}
            </ul>
          </article>

          <article id="detail-4">
            <p className={styles.kicker}>Tasting notes</p>
            <h2>Aroma & flavor</h2>
            <div className={styles.flavors}>{product.flavor.map((x, i) => <span key={x}><b>{["●", "◆", "✦"][i]}</b>{x}</span>)}</div>
          </article>
        </section>

        <section id="reviews" className={styles.reviewBlock}>
          <div><p className={styles.kicker}>Community notes</p><h2>Be the first to review Gruntz.</h2></div>
          <button type="button">Write a review</button>
        </section>
      </div>
    </main>
  );
}
