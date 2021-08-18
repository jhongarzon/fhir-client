import React, { FC } from "react";
import { PractitionerRecordProps } from "../types";

const PractitionerRecord: FC<PractitionerRecordProps> = ({
  practitioner,
}: PractitionerRecordProps) => {
  const PractitionerName = ({ name = [] }) => {
    let entry: any =
      name.find((nameRecord: any) => nameRecord.use === "official") || name[0];
    if (!entry) {
      return <h1>No Name</h1>;
    }
    return <h1>{entry?.given.join(" ") + " " + entry.family}</h1>;
  };
  return (
    <div>
      {practitioner.id}{" "}
      <PractitionerName name={practitioner.name}></PractitionerName>
    </div>
  );
};

export default PractitionerRecord;
