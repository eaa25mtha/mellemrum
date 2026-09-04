import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { supabase } from "../services/supabaseClient.js";
import { supabaseFetch } from "../services/supabaseService.js";

export default function Footer() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadUser(session) {
      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        return;
      }

      try {
        const profiles = await supabaseFetch(
          `/profiles?userId=eq.${currentUser.id}`,
        );

        setProfile(profiles[0] ?? null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setProfile(null);
      }
    }

    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      loadUser(session);
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUser(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <p className="footer-brand">
            mellemrum<span>.</span>
          </p>

          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <div className="footer-link-group">
            <p className="footer-heading">Udforsk</p>

            <NavLink to="/">Events</NavLink>
            <NavLink to="/om">Om Mellemrum</NavLink>
          </div>

          <div className="footer-link-group">
            <p className="footer-heading">Din adgang</p>

            {!user && <NavLink to="/login">Log ind</NavLink>}

            {profile?.role === "user" && (
              <NavLink to="/mine-tilmeldinger">Mine tilmeldinger</NavLink>
            )}

            {profile?.role === "organizer" && (
              <NavLink to="/tilmeldinger">Se tilmeldinger</NavLink>
            )}

            <a href="mailto:hej@mellemrum.dk">Kontakt os</a>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <p className="footer-meta">© 2026 Mellemrum</p>
        <p>Aarhus, Danmark</p>
      </div>
    </footer>
  );
}
