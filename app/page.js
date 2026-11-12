import Link from "next/link";

export default function Home() {
  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <span className="hero-label">
            AICTE Internship Verification Platform
          </span>

          <h1>
            Check an Internship
            <br />
            Before You Apply
          </h1>

          <p>
            Verify internship providers using organization information,
            digital signals, internship details, and complaint history.
          </p>

          <div className="hero-buttons">

            <Link href="/check" className="primary-button">
              Check Organization
            </Link>

            <Link href="/report" className="secondary-button">
              Report an Internship
            </Link>

          </div>

        </div>

      </section>


      <section className="features">

        <h2>How the Platform Works</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>01</h3>
            <h4>Search Organization</h4>
            <p>
              Search for an internship provider using its organization
              name or available details.
            </p>
          </div>

          <div className="feature-card">
            <h3>02</h3>
            <h4>Risk Assessment</h4>
            <p>
              Review an explainable risk score and the indicators
              contributing to that score.
            </p>
          </div>

          <div className="feature-card">
            <h3>03</h3>
            <h4>Review Evidence</h4>
            <p>
              Examine verification information and structured complaint
              history.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}