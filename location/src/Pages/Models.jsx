import { Link } from "react-router-dom";

function Models() {
  return (
    <>
      <section className="models-page" style={{ padding: 24 }}>
        <h1>Vehicle Models</h1>
        <p>Explore our popular models and book a ride.</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
          {["Audi A1", "Golf 6", "Toyota", "BMW 320", "Mercedes", "VW Passat"].map((name) => (
            <div key={name} style={{ border: "1px solid #eee", padding: 16, borderRadius: 8, width: 220 }}>
              <h3 style={{ marginTop: 0 }}>{name}</h3>
              <p style={{ margin: "8px 0" }}>$30–$50 / day</p>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>Book Ride</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Models;
