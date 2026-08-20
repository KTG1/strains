"use client";

import { useMemo, useState } from "react";

const products = [
  { name: "Gruntz", type: "Hybrid", price: 14.99, thcFree: false, grams: 1, tone: "sage" },
  { name: "Purple Kush", type: "Indica", price: 14.99, thcFree: false, grams: 1, tone: "plum" },
  { name: "Zookies", type: "Hybrid", price: 14.99, thcFree: true, grams: 1, tone: "mint" },
  { name: "G13", type: "Indica", price: 29.99, thcFree: false, grams: 3.5, tone: "forest" },
  { name: "Candy Rain", type: "Hybrid", price: 29.99, thcFree: true, grams: 3.5, tone: "gold" },
  { name: "Alien Cookies", type: "Sativa", price: 29.99, thcFree: false, grams: 3.5, tone: "lime" }
];

function Bud({ tone }) {
  return (
    <svg className={`bud bud--${tone}`} viewBox="0 0 220 260" role="img" aria-label="Botanical flower illustration">
      <defs>
        <filter id={`grain-${tone}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence baseFrequency=".75" numOctaves="3" seed={tone.length * 7} result="noise" />
          <feComposite in="noise" in2="SourceGraphic" operator="in" result="texture" />
          <feBlend in="SourceGraphic" in2="texture" mode="multiply" />
        </filter>
      </defs>
      <g filter={`url(#grain-${tone})`}>
        <ellipse cx="110" cy="145" rx="58" ry="92" className="bud-main" />
        <ellipse cx="87" cy="92" rx="31" ry="51" transform="rotate(-24 87 92)" />
        <ellipse cx="133" cy="86" rx="30" ry="49" transform="rotate(22 133 86)" />
        <ellipse cx="73" cy="156" rx="29" ry="52" transform="rotate(-31 73 156)" />
        <ellipse cx="147" cy="154" rx="29" ry="52" transform="rotate(31 147 154)" />
        <ellipse cx="110" cy="48" rx="25" ry="39" />
      </g>
      <g className="bud-lines">
        <path d="M63 181c30-36 27-77 51-131M151 180c-19-42-13-77-37-130M75 119c20 7 34 18 43 39M143 111c-15 13-25 27-30 47" />
        <path d="M67 84c13 8 18 17 23 29M154 78c-15 10-21 20-26 34" />
      </g>
      <g className="trichomes">
        {[[84,70],[116,76],[144,95],[72,126],[111,118],[148,148],[92,164],[120,188],[68,184],[137,205]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />)}
      </g>
    </svg>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-art"><span className="badge">{product.type}</span><Bud tone={product.tone} /></div>
      <div className="product-copy">
        <h3>{product.name} Strain</h3>
        <p className="rating" aria-label="Not yet rated"><span>☆☆☆☆☆</span> 0 Reviews</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <button className="shop-button" type="button" onClick={() => alert(`${product.name} added to your selection`)}><span>＋</span> Shop now</button>
      </div>
    </article>
  );
}

export default function Home() {
  const [sort, setSort] = useState("relevance");
  const [thc, setThc] = useState("all");
  const [category, setCategory] = useState("All");
  const [grams, setGrams] = useState("all");
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesThc = thc === "all" || (thc === "yes" ? product.thcFree : !product.thcFree);
      const matchesCategory = category === "All" || product.type === category;
      const matchesGrams = grams === "all" || product.grams === Number(grams);
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesThc && matchesCategory && matchesGrams && matchesSearch;
    });
    return [...filtered].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : a.name.localeCompare(b.name));
  }, [sort, thc, category, grams, search]);

  return (
    <main>
      <div className="shipping">Free shipping with $99 purchase.</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Strains home"><span className="brand-mark">S</span><span><strong>Strains</strong><small>Botanical collection</small></span></a>
        <label className="search"><span className="sr-only">Search strains</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search strains"/><button aria-label="Search">⌕</button></label>
        <div className="header-actions"><button aria-label="Shopping bag">♧ <span>0</span></button><button aria-label="Open menu">☰</button><a href="#locator"><span>●</span> Store locator</a></div>
      </header>
      <nav className="main-nav" aria-label="Main navigation">{["Home","Shop","About","Botanical FAQ","Programs","Journal","Contact"].map((item) => <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>{item}</a>)}</nav>
      <div className="category-strip">{["Essentials","Gummies","Alkaloids","Skin care","Flower","Topicals","Capsules","Delta 9","Pet care"].map((item, i) => <a href="#collection" key={item}><span className={`category-orb orb-${i}`}>✦</span><strong>{item}</strong></a>)}</div>

      <section className="hero" id="top"><div><p>Explore the collection</p><h1>List of All Strains</h1></div><div className="hero-botanical">❧</div></section>

      <section className="catalog" id="collection">
        <button className="mobile-filter" onClick={() => setFiltersOpen(!filtersOpen)}>☷ {filtersOpen ? "Hide filters" : "Show filters"}</button>
        <aside className={filtersOpen ? "filters open" : "filters"}>
          <label className="sort-label">Sort by<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="relevance">Relevance</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
          <div className="filter-panel">
            <h2><span>◆</span> Filters</h2>
            <fieldset><legend>THC free <span title="Choose whether products contain THC">ⓘ</span></legend><div className="pills"><button className={thc === "yes" ? "active" : ""} onClick={() => setThc(thc === "yes" ? "all" : "yes")}>Yes</button><button className={thc === "no" ? "active" : ""} onClick={() => setThc(thc === "no" ? "all" : "no")}>No</button></div></fieldset>
            <fieldset><legend>Categories <span>⌃</span></legend><div className="category-list">{["All","Indica","Sativa","Hybrid"].map(item => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item === "All" ? "All categories" : item}</button>)}</div></fieldset>
            <fieldset><legend>Grams <span>⌄</span></legend><div className="pills"><button className={grams === "1" ? "active" : ""} onClick={() => setGrams(grams === "1" ? "all" : "1")}>1 g</button><button className={grams === "3.5" ? "active" : ""} onClick={() => setGrams(grams === "3.5" ? "all" : "3.5")}>3.5 g</button></div></fieldset>
          </div>
        </aside>
        <div className="results"><div className="results-heading"><p>{visibleProducts.length} strains</p><button onClick={() => {setThc("all"); setCategory("All"); setGrams("all"); setSearch("");}}>Clear filters</button></div>{visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard product={product} key={product.name} />)}</div> : <div className="empty"><h2>No strains match</h2><p>Try clearing a filter or searching another name.</p></div>}</div>
      </section>
      <footer><strong>Strains</strong><p>Explore thoughtfully. Choose confidently.</p></footer>
    </main>
  );
}
