import React from "react";
import { oauth2 as SMART } from "fhirclient";

function FhirQueryTest() {
  SMART.init({
    iss: "http://localhost:8080/fhir",
    clientId: "whatever",
    scope: "launch/patient offline_access openid fhirUser",
  })
    .then((client) => client.request("Practitioner"))
    .then((patient) => {
      console.log(patient);
    })
    .catch(console.error);
  return <div>Test Jhon</div>;
}
export default FhirQueryTest;
