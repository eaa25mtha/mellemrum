import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabaseFetch } from "../services/supabaseService.js";
import EventDetails from "../components/EventDetails.jsx";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEvent() {
      try {
        const data = await supabaseFetch(`/events?id=eq.${eventId}`);
        setEvent(data[0]);
      } catch {
        setError("Vi kunne ikke hente eventet. Prøv igen senere.");
      }
    }

    getEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();

    setSuccess(null);
    setError(null);

    try {
      await supabaseFetch("/registrations", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          status: "Tilmeldt",
          eventTitle: event.title,
          eventDate: event.date,
          eventLocation: event.venueName,
        }),
      });

      setSuccess("Du er nu tilmeldt eventet.");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Tilmeldingen kunne ikke gennemføres. Prøv igen.");
    }
  }

  if (!event) {
    return null;
  }

  return (
    <main className="event-page">
      <Link className="back-link" to="/">
        ← Alle events
      </Link>
      <EventDetails event={event} />

      <section className="signup-panel">
        <div>
          <p className="eyebrow dark">Tilmelding</p>
          <h2>Reserver din plads</h2>

          <p>Udfyld formularen, så sender vi din tilmelding til arrangøren.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Navn
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="dig@example.com"
              required
            />
          </label>

          <button type="submit">Tilmeld mig</button>

          {success && (
            <p role="status" aria-live="polite">
              {success}
            </p>
          )}

          {error && <p role="alert">{error}</p>}
        </form>
      </section>
    </main>
  );
}
