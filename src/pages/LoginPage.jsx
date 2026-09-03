import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../services/supabaseClient.js";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login mislykkedes. Tjek din e-mail og adgangskode.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-heading">
        <div className="login-intro">
          <p className="eyebrow dark">Login</p>

          <h1 id="login-heading">Log ind på Mellemrum</h1>

          <p>Log ind for at få adgang til dine tilmeldinger.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              disabled={isSubmitting}
            />
          </label>

          <label>
            Adgangskode
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              disabled={isSubmitting}
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logger ind..." : "Log ind"}
          </button>

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
