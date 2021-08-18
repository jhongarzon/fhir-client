import { fhirclient } from "fhirclient/lib/types";
import React, { FC, useContext, useEffect, useState } from "react";
import { FhirContext } from "../../../contexts/Fhir/provider";
import DataGrid, {
  Scrolling,
  Sorting,
  LoadPanel,
} from "devextreme-react/data-grid";
import { FormatPractitioners } from "../../Common/utils/CommonFunctions";

const PractitionerList: FC = () => {
  const columns = ["id", "fullName", "birthDate", "phone", "email", "fax"];
  const [loadPanelEnabled, setLoadPanelEnabled] = useState<boolean>(true);
  const [Practitioners, setPractitioners] = useState<
    fhirclient.FHIR.Practitioner[]
  >([]);
  const { state } = useContext(FhirContext);

  const onContentReady = () => {
    setLoadPanelEnabled(false);
  };
  const customizeColumns = (columns: any) => {
    columns[0].width = 40;
  };
  useEffect(() => {
    state.client?.request("Practitioner").then((result) => {
      const PractitionerList = FormatPractitioners(result);
      setPractitioners(PractitionerList);
    });
  }, []);
  return (
    <div>
      <h1>Practitioner List</h1>
      <DataGrid
        dataSource={Practitioners}
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

export default PractitionerList;
