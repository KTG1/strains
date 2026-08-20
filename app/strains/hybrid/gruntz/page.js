import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.css";
import StrainTabs from "./StrainTabs";

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

const growingFactors = [
  ["Difficulty", "Moderate"],
  ["Flowering time", "9–10 weeks"],
  ["Yield", "Moderate to high with consistent canopy management"],
  ["Ideal conditions", "Indoor or outdoor with steady airflow and environmental control"],
  ["Temperature", "72–78°F day · 65–70°F night"],
  ["Humidity", "40–50% RH in flower · 35–45% in late flower"],
  ["pH", "Soil: 6.2–6.8 · Hydro: 5.8–6.1"],
];

const recommendations = [
  ["G13 Strain", "$29.99", "Calm · Earthy"],
  ["Candy Rain Strain", "$29.99", "Bright · Sweet"],
  ["Alien Cookies Strain", "$29.99", "Balanced · Herbal"],
  ["Purple Kush Strain", "$14.99", "Relaxed · Grape"],
];

export const metadata = {
  title: "Gruntz Strain | Strains",
  description: "Explore the Gruntz hybrid strain profile, effects, terpene profile, aroma, flavor, and growing characteristics.",
};

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

            <StrainTabs product={product} growingFactors={growingFactors} />
          </div>
        </section>

        <section id="faq" className={styles.faq}>
          <p className={styles.kicker}>Quick answers</p><h2>Gruntz strain FAQs</h2>
          <details><summary>What is the THC level of Gruntz Strain?</summary><p>This example profile uses a typical 20–24% THC range. Actual potency must be confirmed by the certificate of analysis for each batch.</p></details>
          <details><summary>Is Gruntz indica-dominant or sativa?</summary><p>Gruntz is generally presented as a balanced hybrid, though expression may vary by phenotype and grower.</p></details>
          <details><summary>What does Gruntz taste like?</summary><p>Its profile is commonly associated with berry, candy, citrus, and a soft earthy finish.</p></details>
        </section>

        <section className={styles.assurances} aria-label="Shopping assurances">
          {[["⌂","Available locally"],["♧","Quality sourced"],["▦","Batch tested"],["✺","Profile documented"],["↻","Satisfaction support"]].map(([icon,label]) => <div key={label}><b>{icon}</b><span>{label}</span></div>)}
        </section>

        <section id="similar" className={styles.similar}>
          <div className={styles.sectionHeading}><div><p className={styles.kicker}>Explore next</p><h2>Customers also viewed</h2></div><Link href="/">View all strains →</Link></div>
          <div className={styles.productGrid}>{recommendations.map(([name, price, note], index) => <article className={styles.productCard} key={name}><div className={styles.thumb}><Image src={product.image} alt="" fill sizes="(max-width:560px) 80vw, 25vw" style={{filter:`hue-rotate(${index * 34}deg) saturate(${1 + index * .08})`}} /></div><p>{note}</p><h3>{name}</h3><div className={styles.miniRating}>★★★★★ <span>New</span></div><strong>{price}</strong><button type="button">View strain</button></article>)}</div>
        </section>

        <section id="reviews" className={styles.reviewBlock}>
          <div><p className={styles.kicker}>Community notes</p><h2>Be the first to review Gruntz.</h2></div>
          <button type="button">Write a review</button>
        </section>
        <p id="disclaimer" className={styles.legal}>For adults of legal age only. Product information is educational and does not constitute medical advice. Effects and cannabinoid levels vary by person and batch. Always follow local laws and the product label.</p>
      </div>
    </main>
  );
}
