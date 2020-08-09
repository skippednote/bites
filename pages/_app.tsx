import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider
      option={{
        clientMaxAge: 3600,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
