import "../styles/globals.css";
import type { AppProps } from "next/app";
import store from "../app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster
          toastOptions={{
            className: "text-xs",
          }}
          containerStyle={{
            top: 80,
          }}
        />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
