import "@/styles/globals.css";
import { Provider } from "react-redux";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
import { Poppins } from "next/font/google";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
