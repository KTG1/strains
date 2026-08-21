"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { strains } from "./strains/strainData";

const tones = ["sage", "plum", "mint", "forest", "gold", "lime"];
const products = strains.map((strain, index) => {
  const parsedPrice = Number.parseFloat(String(strain.price).replace(/[^0-9.]/g, ""));
  return {
    ...strain,
    label: strain.shortName,
    category: strain.type.charAt(0).toUpperCase() + strain.type.slice(1),
    priceValue: Number.isFinite(parsedPrice) ? parsedPrice : Number.MAX_SAFE_INTEGER,
    tone: tones[index % tones.length],
  };
});

function Bud({ tone }) {
  return (
    <svg className={`bud bud--${tone}`} viewBox="0 0 220 260" role="img" aria-label="Botanical flower illustration">
      <g>
        <ellipse cx="110" cy="145" rx="58" ry="92" />
        <ellipse cx="87" cy="92" rx="31" ry="51" transform="rotate(-24 87 92)" />
        <ellipse cx="133" cy="86" rx="30" ry="49" transform="rotate(22 133 86)" />
        <ellipse cx="73" cy="156" rx="29" ry="52" transform="rotate(-31 73 156)" />
        <ellipse cx="147" cy="154" rx="29" ry="52" transform="rotate(31 147 154)" />
        <ellipse cx="110" cy="48" rx="25" ry="39" />
      </g>
      <g className="bud-lines">
        <path d="M63 181c30-36 27-77 51-131M151 180c-19-42-13-77-37-130M75 119c20 7 34 18 43 39M143 111c-15 13-25 27-30 47" />
      </g>
    </svg>
  );
}

function ProductCard({ product }) {
  const href = `/strains/${product.type}/${product.slug}`;
  return (
    <article className="product-card">
      <div className="product-art"><span className="badge">{product.category}</span><Bud tone={product.tone} /></div>
      <div className="product-copy">
        <h3><Link href={href} style={{ color: "inherit", textDecoration: "none" }}>{product.label} Strain</Link></h3>
        <p className="rating" aria-label="Not yet rated"><span>☆☆☆☆☆</span> 0 Reviews</p>
        <p className="price">{product.price}</p>
        <Link className="shop-button" href={href} style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}><span>＋</span> View strain</Link>
      </div>
    </article>
  );
}

export default function Home() {
  const [sort, setSort] = useState("relevance");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      return matchesCategory && product.label.toLowerCase().includes(search.toLowerCase());
    });
    return [...filtered].sort((a, b) => sort === "price-low" ? a.priceValue - b.priceValue : sort === "price-high" ? b.priceValue - a.priceValue : a.label.localeCompare(b.label));
  }, [sort, category, search]);

  return (
    <main>
      <div className="shipping">Free shipping with $99 purchase.</div>
      <header className="site-header">
        <a className="brand" href="#top"><span className="brand-mark">S</span><span><strong>Strains</strong><small>Botanical collection</small></span></a>
        <label className="search"><span className="sr-only">Search strains</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search strains"/><button aria-label="Search">⌕</button></label>
        <div className="header-actions"><button aria-label="Shopping bag">♧ <span>0</span></button><button aria-label="Open menu">☰</button><a href="#collection"><span>●</span> Browse strains</a></div>
      </header>
      <nav className="main-nav" aria-label="Main navigation">{["Home","Shop","About","Botanical FAQ","Programs","Journal","Contact"].map((item) => <a href="#collection" key={item}>{item}</a>)}</nav>
      <div className="category-strip">{["Essentials","Gummies","Alkaloids","Skin care","Flower","Topicals","Capsules","Delta 9","Pet care"].map((item, index) => <a href="#collection" key={item}><span className={`category-orb orb-${index}`}>✦</span><strong>{item}</strong></a>)}</div>
      <section className="hero" id="top"><div><p>Explore the collection</p><h1>List of All Strains</h1></div><div className="hero-botanical">❧</div></section>
      <section className="catalog" id="collection">
        <button className="mobile-filter" onClick={() => setFiltersOpen(!filtersOpen)}>☷ {filtersOpen ? "Hide filters" : "Show filters"}</button>
        <aside className={filtersOpen ? "filters open" : "filters"}>
          <label className="sort-label">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevance">A–Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
          <div className="filter-panel">
            <h2><span>◆</span> Filters</h2>
            <fieldset><legend>Categories <span>⌃</span></legend><div className="category-list">{["All","Indica","Sativa","Hybrid"].map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item === "All" ? "All categories" : item}</button>)}</div></fieldset>
          </div>
        </aside>
        <div className="results">
          <div className="results-heading"><p>{visibleProducts.length} strains</p><button onClick={() => { setCategory("All"); setSearch(""); }}>Clear filters</button></div>
          {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard product={product} key={`${product.type}-${product.slug}`} />)}</div> : <div className="empty"><h2>No strains match</h2><p>Try another name or clear the filters.</p></div>}
        </div>
      </section>
      <footer><strong>Strains</strong><p>Explore thoughtfully. Choose confidently.</p></footer>
    </main>
  );
}
