import { useParams, Link } from "react-router-dom";
import { Navbar, Footer } from "./App";
import { pageContent } from "./pages";

// Renders any footer-linked info page from the content map, keyed by URL slug.
export default function InfoPage() {
  const { slug } = useParams();
  const page = pageContent[slug];

  if (!page) {
    return (
      <div className="page">
        <Navbar />
        <main className="info">
          <div className="container info__notfound">
            <h1 className="display">Page not found</h1>
            <p>The page you're looking for doesn't exist or has moved.</p>
            <Link to="/" className="btn btn--amber">Back home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <main className="info">
        <header className="info__hero">
          <div className="container">
            <h1 className="display info__title">{page.title}</h1>
            <p className="info__intro">{page.intro}</p>
          </div>
        </header>

        <div className="container info__body">
          {page.sections.map((s) => (
            <section className="info__section" key={s.heading}>
              <h2>{s.heading}</h2>
              {Array.isArray(s.body) ? (
                s.body.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{s.body}</p>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
