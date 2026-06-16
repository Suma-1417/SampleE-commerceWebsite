import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <img
          className="hero-image"
          src="https://zerodha.com/static/images/landing.svg"
          alt="invest"
        />
        <h1 className="hero-title">Invest in Everything</h1>
        <p className="hero-description">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>
        <button className="hero-button">Get Started</button>
      </section>
    </div>
  );
}

export default Home;
