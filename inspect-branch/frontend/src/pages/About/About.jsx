import "./About.css";

function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Building the future of trading and investments</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to make investing and trading accessible to everyone. Our
            platform provides real-time market data, analysis tools, and a
            seamless trading experience for both beginners and experienced
            investors.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Fast and reliable trading platform</li>
            <li>Advanced charting and analysis tools</li>
            <li>Low-cost commissions</li>
            <li>24/7 customer support</li>
            <li>Secure and encrypted transactions</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of experienced traders, developers, and financial
            experts dedicated to providing you with the best trading experience.
            We're passionate about democratizing investment opportunities for
            everyone.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
