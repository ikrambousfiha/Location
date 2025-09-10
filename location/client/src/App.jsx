import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Models from "./Pages/Models";
import Contact from "./Pages/Contact";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return ( 
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
