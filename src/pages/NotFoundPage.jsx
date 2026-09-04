import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found-content">
        <p className="eyebrow dark">Siden findes ikke</p>
        <h1>404</h1>
        <h2>Her er der lidt for meget mellemrum.</h2>
        <p>Siden, du leder efter, findes ikke eller er blevet flyttet.</p>
        <Link to="/" className="not-found-link">
          Gå til forsiden
        </Link>
      </div>
    </main>
  );
}
