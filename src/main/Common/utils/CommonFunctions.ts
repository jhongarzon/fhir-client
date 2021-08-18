import { fhirclient } from "fhirclient/lib/types";

const PractitionerName = (name = []) => {
  let entry: any =
    name.find((nameRecord: any) => nameRecord.use === "official") || name[0];
  if (!entry) {
    return "No name";
  }
  return entry?.given.join(" ") + " " + entry.family;
};

const ContactInfo = (telecom = [], system = "") => {
  let entry: any =
    telecom.find((nameRecord: any) => nameRecord.system === system) ||
    telecom[0];
  if (!entry) {
    return "No name";
  }
  return `${entry?.value} (${entry.use})`;
};
const PatientName = (name = []) => {
  let entry: any =
    name.find((nameRecord: any) => nameRecord.use === "official") || name[0];
  if (!entry) {
    return "No name";
  }
  return entry?.given.join(" ") + " " + entry.family;
};
const FormatPractitioners = (practitioners: any) => {
  const PractitionerList = practitioners.entry.reduce(
    (
      accum: fhirclient.FHIR.Resource[],
      current: { resource: fhirclient.FHIR.Resource }
    ) => {
      current.resource.fullName = PractitionerName(current.resource.name);
      current.resource.phone = ContactInfo(current.resource.telecom, "phone");
      current.resource.email = ContactInfo(current.resource.telecom, "email");
      current.resource.fax = ContactInfo(current.resource.telecom, "fax");

      return accum.concat(current.resource);
    },
    []
  );
  return PractitionerList;
};
const FormatPatients = (patients: any) => {
  const patientList = patients.entry.reduce(
    (
      accum: fhirclient.FHIR.Resource[],
      current: { resource: fhirclient.FHIR.Resource }
    ) => {
      // debugger;
      current.resource.fullName = PatientName(current.resource.name);
      return accum.concat(current.resource);
    },
    []
  );
  return patientList;
};

export { PractitionerName, ContactInfo, PatientName, FormatPractitioners, FormatPatients };
