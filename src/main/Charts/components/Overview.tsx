import React, { FC } from "react";
import Chart, {
  CommonSeriesSettings,
  Series,
  Pane,
  ValueAxis,
  Export,
  Legend,
  Label,
  Title,
  Grid,
} from "devextreme-react/chart";
import { weatherData } from "../data/ChartData";

const MultipleCharts: FC = () => {
  return (
    <div>
      <Chart
        id="chart"
        dataSource={weatherData}
        defaultPane="bottomPane"
        title="Visitas mensuales"
      >
        <CommonSeriesSettings argumentField="month" />
        <Series
          pane="topPane"
          valueField="avgT"
          name="No visitas Medellín x (1000)"
        >
          <Label visible={true} customizeText={temperatureCustomizeText} />
        </Series>
        <Series type="bar" valueField="prec" name="No visitas Bogotá x (1000)">
          <Label visible={true} customizeText={precipitationCustomizeText} />
        </Series>

        <Pane name="topPane" />
        <Pane name="bottomPane" />

        <ValueAxis pane="bottomPane">
          <Grid visible={true} />
          <Title text="Bogotá" />
        </ValueAxis>
        <ValueAxis pane="topPane">
          <Grid visible={true} />
          <Title text="Medellín" />
        </ValueAxis>

        <Legend verticalAlignment="bottom" horizontalAlignment="center" />
        <Export enabled={true} />
      </Chart>
    </div>
  );
};

function temperatureCustomizeText({ valueText }: any) {
  return `${valueText}`;
}

function precipitationCustomizeText({ valueText }: any) {
  return `${valueText}`;
}

export default MultipleCharts;
