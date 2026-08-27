import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabaseFetch } from "../services/supabaseService.js";
import EventDetails from "../components/EventDetails.jsx";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getEvent() {
      const data = await supabaseFetch(`/events?id=eq.${eventId}`); //sorteret efter et event
      setEvent(data[0]);
    }

    getEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
    console.log({ name, email, event: event.title });
  }

  if (!event) {
    return null;
  }

  return (
    <>
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>
        <EventDetails event={event} /> {/* EventDetails komponenten */}
        <section className="signup-panel">
          <div>
            <p className="eyebrow dark">Tilmelding</p>
            <h2>Reserver din plads</h2>
            <p>
              Udfyld formularen, så sender vi din tilmelding til arrangøren.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Navn
              <input
                value={name}
                onChange={(inputEvent) => setName(inputEvent.target.value)}
              />
            </label>
            <span>E-mail</span>
            <input
              value={email}
              onChange={(inputEvent) => setEmail(inputEvent.target.value)}
              placeholder="dig@example.com"
            />
            <button type="submit">Tilmeld mig</button>
          </form>
        </section>
      </main>
    </>
  );
}
