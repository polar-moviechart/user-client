import { ChartDataset } from "chart.js";
import { DataPoint } from "./DataPoint";

export interface Dataset extends ChartDataset<'line'> {
    label: string;
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    data: number[];
}