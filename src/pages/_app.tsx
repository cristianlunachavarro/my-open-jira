import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { darkTheme } from "../../themes";
import { UIProvider } from "../../context/ui";
import { EntriesProvider } from "../../context/entries";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} raton={true} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}
