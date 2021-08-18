import React, { FC, useEffect, useContext, useState } from "react";
import { SchedulerRecordProps } from "../types";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  AppointmentTooltip,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { FhirContext } from "../../../contexts/Fhir/provider";
import { fhirclient } from "fhirclient/lib/types";
import {
  FormatPractitioners,
  FormatPatients,
} from "../../Common/utils/CommonFunctions";

const SchedulerComponent: FC<SchedulerRecordProps> = ({
  patient,
  practitioner,
}: SchedulerRecordProps) => {
  const { state } = useContext(FhirContext);
  const [Practitioners, setPractitioners] = useState<
    fhirclient.FHIR.Practitioner[]
  >([]);
  const [Patients, setPatients] = useState<fhirclient.FHIR.Patient[]>([]);
  const today = new Date();
  const currentDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const [schedulerData, setSchedulerData] = useState<any[]>([]);
  const setData = (patientList: any[], practitionerList: any[]) => {
    let tempSchedulerData: any[] = [];
    patientList.map((patient) => {
      let startDate = new Date();
      let endDate = new Date();
      let endHour = 11;
      let startHour = 9;
      if (parseInt(patient.id) < 10) {
        endHour = 12;
        startHour = 13;
      }

      startDate.setHours(startHour);
      endDate.setHours(endHour);

      tempSchedulerData.push({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        title: `${patient.fullName}  Doctor: ${practitionerList[0].fullName}`,
      });
    });
    setSchedulerData(tempSchedulerData);
  };
  useEffect(() => {
    (async () => {
      const practitioners = await state.client?.request("Practitioner");
      const patients = await state.client?.request("Patient");
      const practitionerList = FormatPractitioners(practitioners);
      const patientList = FormatPatients(patients);
      //   setPractitioners(practitionerList);
      //   setPatients(patientList);
      setData(patientList, practitionerList);
    })();
  }, []);
  console.log(Practitioners, Patients, schedulerData);
  return (
    <div>
      <h1>Scheduler</h1>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <WeekView startDayHour={9} endDayHour={15} />
        <MonthView />
        <DayView startDayHour={9} endDayHour={14} />
        <Appointments />
        <Toolbar />
        <ViewSwitcher />
        <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
      </Scheduler>
    </div>
  );
};
export default SchedulerComponent;
