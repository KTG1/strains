import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../hybrid/gruntz/product.module.css";
import StrainTabs from "../../hybrid/gruntz/StrainTabs";
import ProductInfoTabs from "../../hybrid/gruntz/ProductInfoTabs";
import { getStrain, strains } from "../../strainData";

export function generateStaticParams() {
  return strains.filter((item) => item.slug !== "gruntz").map(({type,slug}) => ({type,slug}));
}

export async function generateMetadata({params}) {
  const {type,slug}=await params;
  const product=getStrain(type,slug);
  if(!product) return {};
  return {title:`${product.name} | Strains`,description:`Explore ${product.shortName} strain effects, THC range, lineage, terpenes, aroma, flavor, comparisons, and growing characteristics.`};
}

export default async function StrainProductPage({params}) {
  const {type,slug}=await params;
  const product=getStrain(type,slug);
  if(!product) notFound();
  const typeLabel=product.type[0].toUpperCase()+product.type.slice(1);
  const growingFactors=[["Difficulty","Moderate"],["Flowering time",product.flowering],["Yield","Moderate to high with consistent canopy management"],["Ideal conditions","Indoor or outdoor with steady airflow and environmental control"],["Temperature","72–78°F day · 65–70°F night"],["Humidity","40–50% RH in flower · 35–45% in late flower"],["pH","Soil: 6.2–6.8 · Hydro: 5.8–6.1"]];
  return <main className={styles.page}><div className={styles.shell}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">⌂</Link><span>/</span><Link href="/">Flower</Link><span>/</span><Link href="/">{typeLabel}</Link><span>/</span><strong>{product.name}</strong></nav>
    <section className={styles.hero}><div className={styles.visual}><span className={styles.badge}><span>✽</span> THC</span><div className={styles.imageFrame}><Image src={product.image} alt={`${product.shortName} strain reference flower`} fill priority sizes="(max-width: 820px) 92vw, 48vw" /></div><p className={styles.imageNote}>Reference image only. Actual appearance varies by cultivar and harvest.</p></div>
      <div className={styles.summary}><p className={styles.kicker}>{typeLabel} flower</p><h1>{product.name}</h1><div className={styles.rating}><span aria-label="5 out of 5 stars">★★★★★</span><a href="#reviews">0 reviews</a></div><p className={styles.price}>{product.price}</p><p className={styles.lede}>{product.summary}</p><div className={styles.buyRow}><label className={styles.selectLabel}>Size<select defaultValue="1g" aria-label="Select size"><option value="1g">1 gram</option><option value="3.5g">3.5 grams</option></select></label><button type="button">Find in store</button></div><p className={styles.disclaimer}>Availability and pricing vary by location.</p><StrainTabs product={product} growingFactors={growingFactors}/></div>
    </section>
    <ProductInfoTabs product={product}/>
    <section id="reviews" className={styles.reviewBlock}><div><p className={styles.kicker}>Community notes</p><h2>Be the first to review {product.shortName}.</h2></div><button type="button">Write a review</button></section>
    <p className={styles.legal}>For adults of legal age only. Product information is educational and does not constitute medical advice. Effects and cannabinoid levels vary by person and batch. Always follow local laws and the product label.</p>
  </div></main>;
}
