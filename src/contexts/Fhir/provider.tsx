import React, { FC, createContext, useEffect, useState } from "react";
import { FhirState, initialFhirState } from "./types";
import { oauth2 as SMART } from "fhirclient";

const FhirContext = createContext<{
  state: FhirState;
}>({ state: initialFhirState });

type FhirProviderProps = {
  children: React.ReactNode;
};

const FhirProvider: FC<FhirProviderProps> = ({
  children,
}: FhirProviderProps) => {
  const [fhirState, setFhirState] = useState<FhirState>(initialFhirState);

  useEffect(() => {
    SMART.init({
      iss: "http://localhost:8080/fhir",
      clientId: "whatever",
      scope: "launch/patient offline_access openid fhirUser",
    })
      .then((client) => {
        setFhirState({ ...fhirState, client: client });
      })
      .catch((error) => setFhirState({ ...fhirState, error: error }));
  }, []);

  return (
    <FhirContext.Provider value={{ state: fhirState }}>
      <FhirContext.Consumer>
        {({ state }) => {
          // any error that SMART.ready() may have been rejected with
          if (state.error) {
            return <pre>{state.error.stack}</pre>;
          }

          // if client is already available render the subtree
          if (state.client) {
            return children;
          }

          // client is undefined until SMART.ready() is fulfilled
          return "Authorizing...";
        }}
      </FhirContext.Consumer>
    </FhirContext.Provider>
  );
};
export { FhirContext };
export default FhirProvider;
