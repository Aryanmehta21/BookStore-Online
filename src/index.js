import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-1fhtzxqxkx47v015.us.auth0.com"
    clientId="QQn88IiuWFt6poCWClaNH7el4BrInJnv"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
