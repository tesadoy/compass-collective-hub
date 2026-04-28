import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
};

const articles: Article[] = [
  {
    slug: "integrated-contracting-edge",
    title: "The Integrated Contracting Edge: Why Single-Source Delivery Wins",
    excerpt:
      "How combining procurement, construction and logistics under one roof compresses timelines and reduces risk for institutional clients.",
    category: "Construction",
    date: "Apr 18, 2026",
    readTime: "6 min read",
    author: "TESADOY Editorial",
  },
  {
    slug: "agro-processing-frontier",
    title: "The Agro-Processing Frontier: Capturing Value Beyond the Farm Gate",
    excerpt:
      "Forward integration is reshaping agricultural margins. We unpack what midstream investments mean for emerging-market portfolios.",
    category: "Agriculture",
    date: "Apr 02, 2026",
    readTime: "8 min read",
    author: "Private Equity Desk",
  },
  {
    slug: "logistics-discipline",
    title: "Logistics Discipline: Where Projects Quietly Win or Lose",
    excerpt:
      "On-time, in-spec material flows are the unsung backbone of every megaproject. A field note from our logistics division.",
    category: "Logistics",
    date: "Mar 21, 2026",
    readTime: "5 min read",
    author: "Operations Team",
  },
  {
    slug: "interiors-that-perform",
    title: "Interiors That Perform: Designing for Operations, Not Just Optics",
    excerpt:
      "Finishes are a five-year decision. We share our framework for interior specifications that age well in commercial environments.",
    category: "Design",
    date: "Mar 09, 2026",
    readTime: "7 min read",
    author: "Interior Studio",
  },
  {
    slug: "consulting-with-skin-in-the-game",
    title: "Consulting With Skin in the Game",
    excerpt:
      "Why our advisory practice operates alongside delivery teams — and what that means for the recommendations we sign off on.",
    category: "Consulting",
    date: "Feb 24, 2026",
    readTime: "4 min read",
    author: "Advisory Practice",
  },
  {
    slug: "responsible-private-equity",
    title: "Responsible Private Equity in Frontier Markets",
    excerpt:
      "Our investment thesis: long-hold capital, operational support, and governance discipline produce durable returns where others cannot.",
    category: "Private Equity",
    date: "Feb 10, 2026",
    readTime: "9 min read",
    author: "Investment Committee",
  },
];

const categories = ["All", "Construction", "Agriculture", "Logistics", "Design", "Consulting", "Private Equity"];

const Insights = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Insights | TESADOY DYNAMICS";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Perspectives from TESADOY DYNAMICS on construction, agriculture, logistics, design, consulting and private equity.");
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesCat = activeCategory === "All" || a.category === activeCategory;
      const matchesQuery = !query.trim() ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, query]);

  const featured = articles[0];

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-hero text-primary-foreground">
        <div className="container-tight py-20 lg:py-28">
          <Badge variant="secondary" className="mb-5 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/15">
            Insights
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            Field notes from an integrated operator.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
            Original perspectives, project lessons and market commentary from across our seven divisions.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="container-tight py-16 lg:py-20">
        <Link to={`/insights/${featured.slug}`} className="group block">
          <Card className="overflow-hidden border-border/70 transition-all hover:shadow-elegant">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-[16/10] lg:aspect-auto bg-gradient-accent" />
              <CardContent className="flex flex-col justify-center p-8 lg:p-12">
                <Badge variant="outline" className="self-start mb-4">Featured · {featured.category}</Badge>
                <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                  <span>{featured.author}</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      </section>

      {/* Filters */}
      <section className="container-tight">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="pl-9"
              maxLength={100}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-tight py-12 lg:py-16">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No articles match your filters.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <Link key={article.slug} to={`/insights/${article.slug}`} className="group">
                <Card className="h-full border-border/70 transition-all hover:shadow-elegant hover:-translate-y-0.5">
                  <div className="aspect-[16/10] bg-gradient-to-br from-secondary to-muted rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <Badge variant="outline" className="text-xs">{article.category}</Badge>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface">
        <div className="container-tight py-16 lg:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Want our perspective on a specific challenge?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our division leads regularly publish briefings for clients and partners. Get in touch to request one.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/contact">Contact our team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Insights;
