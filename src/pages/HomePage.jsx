import { useEffect, useState } from "react";
import { supabaseFetch } from "../services/supabaseService.js";
import EventCard from "../components/EventCard.jsx";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEvents() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await supabaseFetch("/events?order=date.asc");
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setError("Vi kunne ikke hente events. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    }

    getEvents();
  }, []);

  const categories = [
    "Alle",
    ...new Set(events.map((event) => event.category)),
  ];

  const filteredEvents = events.filter((event) => {
    const searchText =
      `${event.title} ${event.summary} ${event.venueName}`.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Kultur i Aarhus</p>

        <h1>Find plads til noget nyt.</h1>

        <p className="hero-copy">
          Koncerter, talks og workshops samlet ét sted. Find dit næste event, og
          tilmeld dig på få minutter.
        </p>

        <a className="hero-link" href="#events">
          Se kommende events
        </a>
      </header>

      <main>
        <section id="events" aria-labelledby="events-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">Det sker</p>
              <h2 id="events-heading">Kommende events</h2>
            </div>

            <p>
              Kuraterede oplevelser i byen – fra små scener til store idéer.
            </p>
          </div>

          <div className="filters">
            <label>
              Søg
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Søg efter titel eller sted"
              />
            </label>

            <label>
              Kategori
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          {isLoading && (
            <p role="status" aria-live="polite">
              Henter events...
            </p>
          )}

          {!isLoading && error && <p role="alert">{error}</p>}

          {!isLoading && !error && filteredEvents.length === 0 && (
            <div role="status" aria-live="polite">
              <h3>Ingen events fundet</h3>
              <p>Prøv et andet søgeord eller vælg en anden kategori.</p>
            </div>
          )}

          {!isLoading && !error && filteredEvents.length > 0 && (
            <div className="event-grid">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
