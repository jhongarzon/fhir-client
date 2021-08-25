import React, { useState } from "react";
import "./App.css";
import "devextreme/dist/css/dx.light.css";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import FhirProvider from "./contexts/Fhir/provider";
import PatientList from "./main/Patients/components/PatientList";
import PractitionerList from "./main/Practitioners/components/PractitionerList";
import Home from "./main/Home";
import { Drawer } from "devextreme-react";
import Menu from "./main/Menu";
import Toolbar from "devextreme-react/toolbar";
import SchedulerComponent from "./main/Scheduler/components/Scheduler";
import MultipleCharts from "./main/Charts/components/Overview";
import AdvancedScheduler from "./main/Scheduler/components/AdvancedScheduler";

const DrawerWithRouter = withRouter(Drawer);

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toolbarItems = [
    {
      widget: "dxButton",
      location: "before",
      options: {
        icon: "menu",
        onClick: () => setIsOpen(!isOpen),
      },
    },
    {
      text: "Health & Care",
      location: "center",
      locateInMenu: "never",
    },
  ];

  return (
    <FhirProvider>
      <Toolbar items={toolbarItems} />
      <BrowserRouter>
        <DrawerWithRouter opened={isOpen} component={Menu}>
          <Route path="/" component={Home} />
          <div id="content">
            <Route path="/patients" component={PatientList} />
            <Route path="/practitioners" component={PractitionerList} />
            <Route path="/scheduler" component={SchedulerComponent} />
            <Route path="/charts" component={MultipleCharts} />
            <Route path="/advanced" component={AdvancedScheduler} />
            
          </div>
        </DrawerWithRouter>
      </BrowserRouter>
    </FhirProvider>
  );
}

export default App;
