import { fhirclient } from "fhirclient/lib/types";
import React, { FC, useContext, useEffect, useState } from "react";
import { FhirContext } from "../../../contexts/Fhir/provider";
import { FormatPatients } from "../../Common/utils/CommonFunctions";
import DataGrid, {
  Scrolling,
  Sorting,
  LoadPanel,
} from "devextreme-react/data-grid";

const PatientList: FC = () => {
  const columns = ["id", "fullName", "birthDate"];
  const [loadPanelEnabled, setLoadPanelEnabled] = useState<boolean>(true);
  const [patients, setPatients] = useState<fhirclient.FHIR.Patient[]>([]);
  const { state } = useContext(FhirContext);

  const onContentReady = () => {
    setLoadPanelEnabled(false);
  };
  const customizeColumns = (columns: any) => {
    columns[0].width = 40;
  };

  useEffect(() => {
    state.client?.request("Patient").then((result) => {
      const patientList = FormatPatients(result);
      setPatients(patientList);
    });
  }, []);
  return (
    <div>
      <h1>Patient List</h1>
      <DataGrid
        dataSource={patients}
        defaultColumns={columns}
        showBorders={true}
        onContentReady={onContentReady}
        customizeColumns={customizeColumns}
      >
        <Sorting mode="none" />
        <Scrolling mode="virtual" />
        <LoadPanel enabled={loadPanelEnabled} />
      </DataGrid>
    </div>
  );
};

export default PatientList;
