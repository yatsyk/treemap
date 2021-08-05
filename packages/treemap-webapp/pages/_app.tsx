import { configure } from "mobx";
import React from "react";
import { observer } from "mobx-react";
import "@tabler/core/dist/css/tabler.min.css";

configure({ enforceActions: "never" });

export const App = observer(({ Component, pageProps }) => {
  return (
      <Component {...pageProps} />
  );
});

export default App;

