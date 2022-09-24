import Nav from "../components/Nav";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ShoppingCartProvider>
      <Nav />
      <Component {...pageProps} />
    </ShoppingCartProvider>
  );
}

export default MyApp;
