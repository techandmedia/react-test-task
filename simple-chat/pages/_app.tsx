import React from "react";
import { Button, ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import theme from "../theme/themeConfig";

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default App;
