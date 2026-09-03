import { useEffect, useState } from "react";

import { supabase } from "../services/supabaseClient.js";
import { supabaseFetch } from "../services/supabaseService.js";

export default function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMyRegistrations() {
      setIsLoading(true);
      setError(null);

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw authError;
        }

        if (!user) {
          setError("Du skal være logget ind for at se dine tilmeldinger.");
          return;
        }

        const data = await supabaseFetch(
          `/registrations?userId=eq.${user.id}&select=*,event:events(*)&order=createdAt.desc`,
        );

        setRegistrations(data);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
        setError("Vi kunne ikke hente dine tilmeldinger. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    }

    getMyRegistrations();
  }, []);

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Dit overblik</p>
        <h1>Mine tilmeldinger</h1>

        {!isLoading && !error && (
          <p>
            {registrations.length}{" "}
            {registrations.length === 1 ? "tilmelding" : "tilmeldinger"} i alt
          </p>
        )}
      </header>

      <main>
        {isLoading && (
          <p role="status" aria-live="polite">
            Henter dine tilmeldinger...
          </p>
        )}

        {!isLoading && error && <p role="alert">{error}</p>}

        {!isLoading && !error && registrations.length === 0 && (
          <div role="status" aria-live="polite">
            <h2>Ingen tilmeldinger endnu</h2>
            <p>Du har endnu ikke tilmeldt dig nogen events.</p>
          </div>
        )}

        {!isLoading && !error && registrations.length > 0 && (
          <div className="registration-list">
            <table>
              <thead>
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Dato</th>
                  <th scope="col">Sted</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td>{registration.event?.title ?? "Event mangler"}</td>

                    <td>
                      {registration.event?.date
                        ? new Date(registration.event.date).toLocaleDateString(
                            "da-DK",
                          )
                        : "—"}
                    </td>

                    <td>{registration.event?.venueName ?? "—"}</td>

                    <td>
                      <span className="status">{registration.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
