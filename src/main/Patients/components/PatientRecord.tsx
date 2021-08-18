import React, { FC } from "react";
import { PatientRecordProps } from "../types";

const PatientRecord: FC<PatientRecordProps> = ({
  patient,
}: PatientRecordProps) => {
  const PatientName = ({ name = [] }) => {
    let entry: any =
      name.find((nameRecord: any) => nameRecord.use === "official") || name[0];
    if (!entry) {
      return <h1>No Name</h1>;
    }
    return <h1>{entry?.given.join(" ") + " " + entry.family}</h1>;
  };
  return (
    <div>
      {patient.id} <PatientName name={patient.name}></PatientName>
    </div>
  );
};

export default PatientRecord;
