import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MapPin, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const photo0004 = "/IMG-20261119-WA0004.jpg";
const photo0005 = "/IMG-20261119-WA0005.jpg";
const photo0006 = "/IMG-20261119-WA0006.jpg";
const photo0007 = "/IMG-20261119-WA0011.jpg";
const photo0009 = "/IMG-20261119-WA0014.jpg";
const photo0010 = "/IMG-20261119-WA0010.jpg";
const photo0012 = "/IMG-20261119-WA0012.jpg";
const photo0013 = "/IMG-20261119-WA0013.jpg";
const photo0015 = "/IMG-20261119-WA0015.jpg";
const photo0016 = "/IMG-20261119-WA0016.jpg";


const mapUrl = "https://maps.app.goo.gl/ZccRny3RZvWBu699A?g_st=ac";

const products = [
  { id: "shirt-indigo", name: "Washed indigo shirt", category: "Shirts", tone: "Deep indigo", image: photo0009.url },
  { id: "jean-blue-tie", name: "Relaxed tie denim", category: "Jeans", tone: "Vintage blue", image: photo0007.url },
  { id: "shirt-charcoal", name: "Charcoal button-up", category: "Shirts", tone: "Charcoal wash", image: photo0013.url },
  { id: "jean-black", name: "Wide-leg black denim", category: "Jeans", tone: "Washed black", image: photo0004.url },
  { id: "jean-sage", name: "Relaxed sage denim", category: "Jeans", tone: "Sage wash", image: photo0005.url },
  { id: "jean-deep-blue", name: "Wide-leg indigo denim", category: "Jeans", tone: "Dark indigo", image: photo0006.url },
  { id: "shirt-plum", name: "Smoky plum shirt", category: "Shirts", tone: "Plum wash", image: photo0015.url },
  { id: "jean-classic", name: "Tie-detail blue denim", category: "Jeans", tone: "Classic blue", image: photo0010.url },
  { id: "shirt-stone", name: "Stonewashed shirt", category: "Shirts", tone: "Stone grey", image: photo0016.url },
  { id: "shirt-midnight", name: "Midnight button-up", category: "Shirts", tone: "Midnight black", image: photo0012.url },
];

const filters = ["All pieces", "Jeans", "Shirts"] as const;
type Filter = (typeof filters)[number];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "First Choice PKD — Denim, with a point of view" },
      { name: "description", content: "Discover washed denim shirts and relaxed-fit jeans at First Choice PKD, Sathrapadi, Kanjikode." },
      { property: "og:title", content: "First Choice PKD — Denim, with a point of view" },
      { property: "og:description", content: "Explore the latest denim shirts and relaxed-fit jeans at First Choice PKD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<Filter>("All pieces");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesFilter = filter === "All pieces" || product.category === filter;
      const matchesSearch = !query || `${product.name} ${product.tone} ${product.category}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <main className="storefront">
      <div className="announcement"><span>NEW SEASON, SAME GOOD DENIM</span><span>Find us in Kanjikode <ArrowRight size={13} aria-hidden="true" /></span></div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="First Choice PKD home"><span>FIRST CHOICE</span><small>PKD · EST. LOCAL</small></a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our edit</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>Visit us</a>
        </nav>
        <Button asChild variant="outline" className="header-visit"><a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={15} /> Find the shop</a></Button>
        <Button className="mobile-menu" variant="ghost" size="icon" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <section className="hero" id="home">
        <div className="hero-image-wrap"><img className="hero-image" src={photo0010.url} alt="Blue wide-leg denim with a striped tie detail" fetchPriority="high" /></div>
        <div className="hero-copy">
          <span className="eyebrow"><i /> THE DENIM EDIT · 01</span>
          <h1>Denim,<br />with a point<br /><em>of view.</em></h1>
          <p>Good washes. Easy fits. The pieces you reach for on repeat.</p>
          <Button asChild className="hero-cta"><a href="#collection">Explore the collection <ArrowDown size={16} /></a></Button>
          <div className="hero-note"><span>LOCAL FINDS</span><span>SATHRAPADI · KANJIKODE</span></div>
        </div>
        <span className="hero-index">01 / 10</span>
      </section>

      <section className="collection section-wrap" id="collection">
        <div className="section-heading">
          <div><span className="eyebrow">MADE FOR YOUR EVERYDAY</span><h2>The denim<br className="mobile-break" /> rotation.</h2></div>
          <p>Washed shirts and easy-going fits. Take a look through our latest edit, then come find your favourite in store.</p>
        </div>
        <div className="collection-toolbar">
          <div className="filter-list" role="group" aria-label="Filter collection">
            {filters.map((item) => <Button key={item} variant={filter === item ? "default" : "ghost"} className="filter-button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</Button>)}
          </div>
          <label className="search-field"><Search size={16} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a fit or wash" aria-label="Search denim collection" />{search && <button type="button" aria-label="Clear search" onClick={() => setSearch("")}><X size={14} /></button>}</label>
          <span className="result-count">{visibleProducts.length.toString().padStart(2, "0")} PIECES</span>
        </div>
        {visibleProducts.length > 0 ? <div className="product-grid">{visibleProducts.map((product, index) => (
          <article className="product" key={product.id}>
            <a className="product-image-link" href={mapUrl} target="_blank" rel="noreferrer" aria-label={`Ask about ${product.name} at First Choice PKD`}>
              <img src={product.image} alt={product.name} loading="lazy" />
              <span className="product-number">0{index + 1}</span><span className="product-action" aria-hidden="true"><ArrowRight size={18} /></span>
            </a>
            <div className="product-meta"><div><h3>{product.name}</h3><span>{product.tone}</span></div><span className="category-tag">{product.category}</span></div>
          </article>
        ))}</div> : <div className="empty-state"><p>No pieces match that search.</p><Button variant="outline" onClick={() => { setSearch(""); setFilter("All pieces"); }}>Show all pieces</Button></div>}
      </section>

      <section className="story" id="story">
        <div className="story-image"><img src={photo0009.url} alt="Close view of a washed indigo denim shirt" loading="lazy" /><span>THE EVERYDAY DENIM, FOUND.</span></div>
        <div className="story-copy"><span className="eyebrow">OUR LITTLE CORNER OF DENIM</span><h2>Made to wear.<br /><em>Made to be you.</em></h2><p>From soft, washed shirts to laid-back wide-leg denim, our edit is all about personal style and pieces that feel like yours.</p><a className="text-link" href="#collection">See what’s in the edit <ArrowRight size={16} /></a></div>
      </section>

      <section className="visit section-wrap" id="visit">
        <div className="visit-topline"><span className="eyebrow">COME SAY HELLO</span><span className="visit-asterisk" aria-hidden="true">✳</span></div>
        <div className="visit-content"><h2>Your next<br />favourite fit<br /><em>is right here.</em></h2><div className="visit-details"><p>Find First Choice PKD at Sathrapadi, Kanjikode. Drop by and explore the collection in person.</p><Button asChild className="visit-cta"><a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Get directions <ArrowRight size={16} /></a></Button><span className="address">Sathrapadi Para Road<br />Kanjikode, Kerala 678621</span></div></div>
      </section>

      <footer className="site-footer"><a className="footer-mark" href="#home">FIRST CHOICE <span>PKD</span></a><span>DENIM FOR THE EVERYDAY.</span><a href={mapUrl} target="_blank" rel="noreferrer">SATHRAPADI, KANJIKODE <ArrowRight size={13} /></a><span>© FIRST CHOICE PKD</span></footer>
    </main>
  );
}
