export default function EventDetails({ event }) {
  const date = new Date(event.date);

  const imageUrl = event.image.replace(/w=\d+/, "w=1600");

  const formattedDate = date.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formattedTime = date.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="event-detail">
      <img src={imageUrl} alt="" width="1600" height="1200" />

      <div className="event-detail-content">
        <p className="event-category">{event.category}</p>

        <h1>{event.title}</h1>

        <p className="lead">{event.summary}</p>

        <dl className="detail-list">
          <div>
            <dt>Dato</dt>
            <dd>
              {formattedDate} kl. {formattedTime}
            </dd>
          </div>

          <div>
            <dt>Sted</dt>
            <dd>
              <address>
                {event.venueName}
                <span>
                  {event.venueAddress}, {event.venuePostalCode}{" "}
                  {event.venueCity}
                </span>
              </address>

              {event.venueWebsite && (
                <a href={event.venueWebsite}>Besøg venue</a>
              )}
            </dd>
          </div>

          <div>
            <dt>Pris</dt>
            <dd>{event.price === 0 ? "Gratis" : `${event.price} kr.`}</dd>
          </div>
        </dl>

        <p>{event.description}</p>
      </div>
    </section>
  );
}
