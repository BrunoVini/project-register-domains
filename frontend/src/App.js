import React from "react";
import GlobalStyle from "./styles/global";
import RoutesApp from "./routes/index";

const App = () => {
  return (
    <>
      <RoutesApp />
      <GlobalStyle />
    </>
  );
};

export default App;
