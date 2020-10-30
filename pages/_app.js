import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [scrollPos, setScrollPos] = useState(0);
  return (
    <div className="app">
      <Navbar setScrollPos={setScrollPos} />
      <Component {...pageProps} scrollPos={scrollPos} />
      <p className="info">Developed within Ventspils IT challenge 2020</p>
    </div>
  );
}

export default MyApp;
