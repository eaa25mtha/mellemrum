import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabaseFetch } from "../services/supabaseService.js";
import EventDetails from "../components/EventDetails.jsx";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEvent() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await supabaseFetch(`/events?id=eq.${eventId}`);

        if (!data || data.length === 0) {
          setError("Vi kunne ikke finde det event, du leder efter.");
          return;
        }

        setEvent(data[0]);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setError("Vi kunne ikke hente eventet. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    }

    getEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();

    setSuccess(null);
    setError(null);
    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="event-page">
        <p role="status" aria-live="polite">
          Henter event...
        </p>
      </main>
    );
  }

  if (error && !event) {
    return (
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>

        <p role="alert">{error}</p>
      </main>
    );
  }

  return (
    <main className="event-page">
      <Link className="back-link" to="/">
        ← Alle events
      </Link>

      <EventDetails event={event} />

      <section className="signup-panel" aria-labelledby="signup-heading">
        <div>
          <p className="eyebrow dark">Tilmelding</p>
          <h2 id="signup-heading">Reserver din plads</h2>
          <p>Udfyld formularen, så sender vi din tilmelding til arrangøren.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Navn
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
              disabled={isSubmitting}
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="dig@example.com"
              required
              disabled={isSubmitting}
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Tilmelding..." : "Tilmeld mig"}
          </button>

          {success && (
            <p className="form-message" role="status" aria-live="polite">
              {success}
            </p>
          )}

          {error && (
            <p className="form-message" role="alert">
              {error}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
