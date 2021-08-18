import { fhirclient } from "fhirclient/lib/types";
export type SchedulerRecordProps = {
  practitioner: fhirclient.FHIR.Practitioner,
  patient: fhirclient.FHIR.Patient,
};