import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { supabase } from "../services/supabaseClient.js";
import { supabaseFetch } from "../services/supabaseService.js";

export default function Navbar() {
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

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="site-nav" aria-label="Primær navigation">
      <Link className="brand" to="/">
        mellemrum<span>.</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Events</NavLink>
        <NavLink to="/om">Om Mellemrum</NavLink>

        {profile?.role === "user" && (
          <NavLink to="/mine-tilmeldinger">Mine tilmeldinger</NavLink>
        )}

        {profile?.role === "organizer" && (
          <NavLink to="/tilmeldinger">Tilmeldinger</NavLink>
        )}

        {user ? (
          <button
            className="nav-auth-button"
            type="button"
            onClick={handleLogout}
          >
            Log ud
          </button>
        ) : (
          <NavLink to="/login">Log ind</NavLink>
        )}
      </div>
    </nav>
  );
}
