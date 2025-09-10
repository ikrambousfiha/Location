import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/models">Models</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;


