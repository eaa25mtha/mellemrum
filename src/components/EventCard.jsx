import { Link } from "react-router";

export default function EventCard({ event }) {
  const date = new Date(event.date);

  const formattedDate = date.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formattedDateCapitalized =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const imageUrl = event.image.replace(/w=\d+/, "w=800");

  return (
    <article className="event-card">
      <Link
        className="event-card-link"
        to={`/events/${event.id}`}
        aria-label={`Læs mere om ${event.title}`}
      >
        <img src={imageUrl} alt="" loading="lazy" width="800" height="600" />
        <div className="event-card-content">
          <p className="event-category">{event.category}</p>
          <h3>{event.title}</h3>
          <p>{event.summary}</p>
          <div className="event-meta">
            <span>{formattedDateCapitalized}</span>
            <span>{event.venueName}</span>
          </div>
          <span className="card-link-text">Læs mere</span>
        </div>
      </Link>
    </article>
  );
}
