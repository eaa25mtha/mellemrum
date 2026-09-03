import { useEffect, useState } from "react";
import { supabaseFetch } from "../services/supabaseService.js";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRegistrations() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await supabaseFetch("/registrations?order=createdAt.desc");

        setRegistrations(data);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
        setError("Vi kunne ikke hente tilmeldingerne. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    }

    getRegistrations();
  }, []);

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

                    <td>{registration.eventTitle}</td>

                    <td>
                      {new Date(registration.eventDate).toLocaleDateString(
                        "da-DK",
                      )}
                    </td>

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
