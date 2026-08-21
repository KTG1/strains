"use client";

import { useState } from "react";
import styles from "./product.module.css";

const tabs = [
  { id: "thc", icon: "♨", label: "THC level" },
  { id: "effect", icon: "✦", label: "Effect" },
  { id: "terpenes", icon: "♧", label: "Terpene profile" },
  { id: "growing", icon: "⌁", label: "Growing factor" },
  { id: "flavor", icon: "◡", label: "Aroma & flavor" },
  { id: "review", icon: "☆", label: "Review" },
];

export default function StrainTabs({ product, growingFactors }) {
  const [active, setActive] = useState("thc");

  return (
    <section className={styles.tabModule}>
      <div className={styles.tabList} role="tablist" aria-label="Strain details">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" role="tab" id={`tab-${tab.id}`} aria-selected={active === tab.id} aria-controls={`panel-${tab.id}`} className={active === tab.id ? styles.selectedTab : ""} onClick={() => setActive(tab.id)}>
            <span aria-hidden="true">{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabPanel} role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        {active === "thc" && <><p className={styles.kicker}>Potency range</p><div className={styles.bigMetric}>{product.thc}</div><h2>{product.shortName} strain THC level</h2><p>This profile places {product.shortName} in its commonly reported THC range. Potency varies by harvest, batch, and testing method.</p><div className={styles.meter}><span /></div><div className={styles.scale}><span>Mild</span><span>Moderate</span><span>Strong</span></div></>}
        {active === "effect" && <><p className={styles.kicker}>Reported character</p><h2>{product.shortName} strain effects</h2><div className={styles.tags}>{product.effects.map((item) => <span key={item}>{item}</span>)}</div><p>Commonly described as {product.effects.join(", ").toLowerCase()}. Individual experience varies by person and batch.</p></>}
        {active === "terpenes" && <><p className={styles.kicker}>Aromatic compounds</p><h2>{product.shortName} terpene profile</h2><ul className={styles.barList}>{product.terpenes.map((name, i) => <li key={name}><span>{name}</span><i style={{ "--bar": `${88 - i * 19}%` }} /></li>)}</ul></>}
        {active === "growing" && <><p className={styles.kicker}>Cultivation overview</p><h2>{product.shortName} strain growing factors</h2><p>{product.shortName} commonly finishes in {product.flowering} and benefits from stable airflow, canopy management, and careful late-flower humidity control.</p><div className={styles.tableWrap}><table><thead><tr><th>Growing factor</th><th>Description</th></tr></thead><tbody>{growingFactors.map(([factor, description]) => <tr key={factor}><td>{factor}</td><td>{description}</td></tr>)}</tbody></table></div></>}
        {active === "flavor" && <><p className={styles.kicker}>Tasting notes</p><h2>{product.shortName} aroma & flavor</h2><div className={styles.flavors}>{product.flavor.map((item, i) => <span key={item}><b>{["●", "◆", "✦"][i]}</b>{item}</span>)}</div><p>{product.summary}</p></>}
        {active === "review" && <><p className={styles.kicker}>Community notes</p><h2>Review {product.shortName} strain</h2><div className={styles.reviewInline}><span aria-label="No rating yet">☆☆☆☆☆</span><p>No reviews yet. Be the first to share your experience.</p><button type="button">Write a review</button></div></>}
      </div>
    </section>
  );
}
