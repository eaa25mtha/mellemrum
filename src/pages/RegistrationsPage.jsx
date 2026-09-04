import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../services/supabaseClient.js";
import { supabaseFetch } from "../services/supabaseService.js";

export default function RegistrationsPage() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRegistrations() {
      setIsLoading(true);
      setError(null);

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          navigate("/");
          return;
        }

        const profiles = await supabaseFetch(`/profiles?userId=eq.${user.id}`);
        const profile = profiles[0];

        if (!profile || profile.role !== "organizer") {
          navigate("/");
          return;
        }

        const data = await supabaseFetch(
          "/registrations?select=*,event:events(*)&order=createdAt.desc",
        );

        setRegistrations(data);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
        setError("Vi kunne ikke hente tilmeldingerne. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    }

    getRegistrations();
  }, [navigate]);

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>

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
            Henter tilmeldinger...
          </p>
        )}

        {!isLoading && error && <p role="alert">{error}</p>}

        {!isLoading && !error && registrations.length === 0 && (
          <div role="status" aria-live="polite">
            <h2>Ingen tilmeldinger endnu</h2>
            <p>Der er endnu ikke registreret nogen tilmeldinger.</p>
          </div>
        )}

        {!isLoading && !error && registrations.length > 0 && (
          <div className="registration-list">
            <table>
              <thead>
                <tr>
                  <th scope="col">Navn</th>
                  <th scope="col">Event</th>
                  <th scope="col">Dato</th>
                  <th scope="col">Sted</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td>
                      <strong>{registration.name}</strong>
                      <br />
                      <small>{registration.email}</small>
                    </td>
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
