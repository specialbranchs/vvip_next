import axios from "axios";

import { CLIENT_ID, CLIENT_SECRET, PIMS_AUTH } from "./url";
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const clientCredentials = btoa(`${clientId}:${clientSecret}`);
const tokenUrl = PIMS_AUTH;

export const pims_token = async () => {
  const response = await fetch(tokenUrl, {
    method: "POST",
    body: `grant_type=client_credentials`,
    headers: {
      Authorization: `Basic ${clientCredentials}`,
      "Content-Type": `application/x-www-form-urlencoded`,
    },
  });

  return response.json();
};
