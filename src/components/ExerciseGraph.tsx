import { IonCard } from '@ionic/react';
import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


const ExerciseGraph: React.FC<{chartData: any, children: React.ReactNode}> = ({chartData}) => {

    const chartConfigs = {
        type: "column2d", // The chart type
        width: "350", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            caption: "Exercise History",    //Set the chart caption
            subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
            xAxisName: "Day",           //Set the x-axis name
            yAxisName: "Reps",  //Set the y-axis name
            numberSuffix: "K",
            theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: chartData
        }
    }

    return (
        <IonCard>
            <ReactFC {...chartConfigs} />
        </IonCard>
    );
}

export default ExerciseGraph;