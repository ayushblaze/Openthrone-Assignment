import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-eetr2xcgmehkm5y5.us.auth0.com"
      clientId="4tTELvwp8bPINxpVA6DLUzuPsg953l18"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      audience="firstApi"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
