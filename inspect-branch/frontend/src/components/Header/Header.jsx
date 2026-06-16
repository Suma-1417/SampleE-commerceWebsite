import { Link } from "react-router-dom";

function Header() {
  let togglemode = () => {
    document.body.classList.toggle("change");
  };

  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-evenly" }}>
        <img
          height={30}
          width={100}
          src="https://zerodha.com/static/images/logo.svg"
          alt="logo"
        />

        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/register">Signup</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/login">signin</Link>
          <button onClick={togglemode}>dark/light</button>
        </nav>
      </header>
    </>
  );
}

export default Header;
