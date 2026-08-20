"use client";

import { useState } from "react";
import styles from "./product.module.css";

const tabs = ["Details", "Reports", "Usage", "Similar", "Buy", "Terms & Exclusions", "Disclaimers"];
const assurances = [["⌂","Available where legal"],["♧","Quality sourced"],["▦","Industry standards"],["✺","Batch documented"],["↻","Customer support"]];

function Questions({ items }) {
  return <div className={styles.infoQuestions}>{items.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}

function SideEffects() {
  const items = [
    ["Dry mouth", "A common sensation of oral dryness associated with cannabis use.", "Common"],
    ["Dry eyes", "Temporary eye dryness or redness may occur for some consumers.", "Common"],
    ["Dizziness", "Lightheadedness may occur, particularly with higher intake or low tolerance.", "Moderate"],
    ["Anxiety", "THC-sensitive consumers may experience unease, especially with higher intake.", "Moderate"],
  ];
  return <div className={styles.sideEffects}><h3>Possible side effects</h3><p>Individual responses vary. Start low, avoid combining intoxicants, and stop use if unwanted effects occur.</p>{items.map(([name,text,level],i) => <div className={i < 2 ? styles.commonRisk : styles.moderateRisk} key={name}><span><strong>{name}</strong><small>{text}</small></span><b>{level}</b></div>)}</div>;
}

export default function ProductInfoTabs() {
  const [active, setActive] = useState("Details");
  return (
    <section className={styles.infoTabs}>
      <div className={styles.infoTabList} role="tablist" aria-label="Additional product information">
        {tabs.map(tab => <button type="button" role="tab" aria-selected={active === tab} className={active === tab ? styles.infoActive : ""} onClick={() => setActive(tab)} key={tab}>{tab}</button>)}
      </div>
      <div className={styles.infoPanel} role="tabpanel">
        {active === "Details" && <><p className={styles.kicker}>Quick answers</p><h2>Gruntz strain FAQs</h2><Questions items={[["What is the THC level of Gruntz Strain?","This example profile uses a 20–24% THC range. Confirm potency using the certificate of analysis for the specific batch."],["Is Gruntz indica-dominant or sativa?","Gruntz is generally described as a balanced hybrid, although expression can vary by phenotype."],["What does Gruntz taste like?","Gruntz is commonly associated with berry, candy, citrus, and earthy notes."]]} /></>}
        {active === "Reports" && <><p className={styles.kicker}>Batch documentation</p><h2>Lab reports</h2><a className={styles.reportLink} href="#">View available lab reports →</a><div className={styles.infoAssurances}>{assurances.map(([icon,label]) => <div key={label}><b>{icon}</b><span>{label}</span></div>)}</div></>}
        {active === "Usage" && <><p className={styles.kicker}>Responsible-use overview</p><h2>Gruntz usage guide</h2><p className={styles.infoLead}>General educational information for adults of legal age. This is not medical advice.</p><div className={styles.usageCards}><div><small>Experience type</small><strong>Balanced hybrid</strong></div><div><small>Commonly reported</small><strong>Relaxed · Happy · Creative</strong></div><div><small>Consider timing</small><strong>When no driving is required</strong></div><div><small>Flavor profile</small><strong>Berry · Candy · Earthy</strong></div></div><h3 className={styles.centerHeading}>Strain comparison</h3><div className={styles.tableWrap}><table><thead><tr><th>Strain</th><th>THC</th><th>Primary profile</th><th>Experience type</th></tr></thead><tbody><tr><td>Gruntz</td><td>20–24%</td><td>Berry, candy, earthy</td><td>Balanced hybrid</td></tr><tr><td>Zkittlez</td><td>15–23%</td><td>Fruit-forward, light</td><td>Hybrid</td></tr><tr><td>Gelato</td><td>20–26%</td><td>Creamy, dessert-like</td><td>Hybrid</td></tr></tbody></table></div><div className={styles.usageSummary}><div><b>◎</b><span><strong>Best for</strong><small>A controlled, legal setting with no driving.</small></span></div><div><b>△</b><span><strong>Watch out for</strong><small>Dry mouth, dizziness, or anxiety.</small></span></div><div><b>☆</b><span><strong>Experience</strong><small>Responses vary by person and batch.</small></span></div></div><SideEffects /></>}
        {active === "Similar" && <><p className={styles.kicker}>Compare profiles</p><h2>Similar strains</h2><Questions items={[["What makes Gruntz different from other hybrid strains?","Its commonly described combination of candy-like flavor, berry notes, and a balanced hybrid profile distinguishes it."],["What are the Gruntz strain crosses?","Gruntz is commonly associated with Gelato and Zkittlez lineage."],["What strains are most similar to Gruntz?","Gelato, Zkittlez, Candy Rain, and other dessert-profile hybrids are useful comparisons."],["Is Gruntz more similar to Gelato or Zkittlez?","It shares creamy depth with Gelato and fruit-forward sweetness with Zkittlez."]]} /></>}
        {active === "Buy" && <div className={styles.buyInfo}><p className={styles.kicker}>Availability</p><h2>Where to find Gruntz</h2><article><h3>Authorized local retailers</h3><p>Use the store locator to check current availability, pricing, and batch documentation in your jurisdiction.</p><h4>Product features</h4><ul><li>Batch-specific testing where available</li><li>Documented cannabinoid and terpene profiles</li><li>Age verification and compliant packaging</li><li>Availability varies by location</li></ul></article><button type="button">Find in store</button></div>}
        {active === "Terms & Exclusions" && <><p className={styles.kicker}>Purchase terms</p><h2>Returns and exclusions</h2><a className={styles.reportLink} href="#">View the full return policy →</a><div className={styles.infoAssurances}>{assurances.map(([icon,label]) => <div key={label}><b>{icon}</b><span>{label}</span></div>)}</div></>}
        {active === "Disclaimers" && <div className={styles.legalPanel}><div><h2>Important legal notice</h2><p>Cannabis laws vary by location. Confirm that you meet all age and jurisdictional requirements before purchase or possession.</p></div><article><h3>Educational-use disclaimer</h3><ul><li>Purchase only from licensed, regulated retailers.</li><li>Do not drive or operate machinery under the influence.</li><li>Cannabis may carry health risks and can be habit-forming.</li><li>Consult a healthcare professional regarding medical conditions or medications.</li><li>Product use may result in a positive drug test.</li></ul></article></div>}
      </div>
    </section>
  );
}
