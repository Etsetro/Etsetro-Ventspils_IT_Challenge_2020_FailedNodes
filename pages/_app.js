import "../styles/globals.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Navbar />
      <Component {...pageProps} />
      <p className="info">Developed within Ventspils IT challenge 2020</p>
    </div>
  );
}

export default MyApp;
