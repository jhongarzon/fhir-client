import Client from "fhirclient/lib/Client";

export type FhirState = {
  client?: Client;
  error?: Error;
};

export const initialFhirState: FhirState = {
  client: undefined,
  error: undefined,
};
